const express = require('express')
const {userSignup} =require('../controllers/user')
const router= express.Router();

router.post('/', userSignup);

module.exports=router;