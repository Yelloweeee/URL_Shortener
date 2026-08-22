const{v4: uuidv4}= require('uuid');
const User= require('../models/user')

async function userSignup(req, res){
    const {name,email,password}=req.body;
    await User.create({
        name, email, password
    });
    return res.render("home");
}

async function userLogin(req, res){
    const {email,password}=req.body;
    const user=await User.findOne({
        email, password
    });
    if(!user)
        return res.render("login", {
    error: "invalid username or password"})

    const sessionId=uuidv4(); //generates a unique identifying string
    return res.redirect("/");
}

module.exports={
    userSignup, userLogin
}