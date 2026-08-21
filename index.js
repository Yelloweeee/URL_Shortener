const express= require("express");
const path= require('path');
const{connectToMongoDB}=require("./connect")
const app=express();
const PORT=8001;
const URL=require('./models/url');
const staticRoute=require("./routes/staticRouter");
const urlRoute=require('./routes/url')
const userRoute = require('./routes/user')

connectToMongoDB('mongodb://localhost:27017/urlShortener')
.then(()=> console.log('MongoDB connected'))

app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));



app.use(express.json()); //middleware
app.use(express.urlencoded({extended: false}))

app.use("/", staticRoute);
app.use("/user", userRoute);
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