const express= require("express");
const{connectToMongoDB}=require("./connect")
const app=express();
const PORT=8001;
const URL=require('./models/url');

connectToMongoDB('mongodb://localhost:27017/urlShortener')
.then(()=> console.log('MongoDB connected'))

const urlRoute=require('./routes/url')

app.use(express.json()); //middleware
app.use("/url", urlRoute);

app.get('/:shortId', async (req,res)=>{
    const shortId=req.params.shortId;
    const entry= await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
        $push:{ visitHistory: {
            timestamp: Date.now()
        }},
        }
    ) 
    res.redirect(entry.redirectURL);
})

app.listen(PORT, ()=> console.log(`Server started at PORT`));