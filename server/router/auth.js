const express= require('express')
const router = express.Router()
const bcrypt= require('bcrypt')
const authValidation = require('../validations/authValidation')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

router.post('/register', async (req,res)=>{
    try {
        const{name,email,password} = req.body;
        const validationResult = authValidation.validate(req.body);

        if(validationResult.error){
            return res.status(400).json({ error: validationResult.error.message, success: false,})
        }

        const emailCheck = await User.findOne({ email:email })

        if(emailCheck){
            return res.status(409).json({message: "User Already Exists", success: false,})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userData = new User({
            name, email, password : hashedPassword
        })

        const userResponse = await userData.save();
        const token = await jwt.sign({ userId: userResponse._id}, process.env.JWT_SECRET)

        res.status(201).json({message: "User Registered Successfully", token:token, name:name, success:true})

    } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: "Internal Server Error" ,success: false,});
    }
})

router.post('/login', async(req,res)=>{
    try {
    const {email, password} = req.body;

    if(!email, !password){
        return res.status(409).json({
            error:"Invalid Credentials",
            success: false,
        })
    }

    const userDetail = await User.findOne({email})
    if(!userDetail){
        return res.status(400).json({
            message:"User Not Found",
            success:false,
        })
    }

    const passwordCheck = await bcrypt.compare(password, userDetail.password);
    if(!passwordCheck){
        return res.status(400).json({
            message:"Invalid Password",
            success:false,
        })
    }
    const token = await jwt.sign({userId : userDetail._id}, process.env.JWT_SECRET);
    res.status(201).json({
        message:"User Login Successfull",
        token:token,
        name: userDetail.name,
        success: true,
    })

     } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: "Internal Server Error" ,success: false,});
    }
})

module.exports = router;