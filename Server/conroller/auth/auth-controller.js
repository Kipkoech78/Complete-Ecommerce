require('dotenv').config()
const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const salt = 10;

//register

const registerUser = async (req,res) =>{
    const {userName, email, password} = req.body;

    console.log("userName",userName);
    
    try{
        //check if user already exists
        const checkUser = await User.findOne({email})
        if(checkUser){
            return res.json({
                message:"User Already Exists",
                success: false
            });
        }
        const hash = await bcrypt.hash(password,salt);
        const newUser = new User({
            userName,
            email,
            password: hash
        })
        await newUser.save();
        res.status(200).json({
            message:"User Created Successfully",
            success: true
        })


    }catch(error){
        console.log(error);
        res.status(500).json({
            message:"Error Occured",
            success: false
        })
    }

}

//login
const loginUser = async (req, res) =>{

    const {email, password} = req.body;
    try{
        const checkUser = await User.findOne({email})
        if(!checkUser){
            return res.json({
                message:"User Not Found. Please Register",
                success: false
            })
        }
        const checkPassword = await bcrypt.compare(password, checkUser.password);
        if(!checkPassword){
            return res.json({
                message:"Incorrect Password. Try Again",
                success: false
            })
        }
        const token = jwt.sign({id: checkUser._id, role: checkUser.role, userName:checkUser.userName , email: checkUser.email},
             process.env.CLIENTSECRET, {expiresIn: '60m'} )
        res.cookie('token', token, {httpOnly: true, secure : false}).json({
            success : true,
            message : "Logged In Successfuly",
            user : {
                email : checkUser.email,
                role : checkUser.role,
                id : checkUser._id,
                userName: checkUser.userName
            }
        })      
    }catch(error){
        console.log(error);
        res.status(500).json({
            message:"Error Occured",
            success: false
        })
    }
}
//logout 
const logout = async (req,res)=>{
    res.clearCookie('token').json({
        message:"Logged Out Successfully",
        success: true
    })
}
//auth-middlewares
const authMiddleware = async (req, res , next) =>{
    const token = req.cookies.token;
    if(!token){
        return res.json({
            message: "Unauthorized User.. backend say no tocken",
            success: false
        })
    }
    try{
        const decoded = jwt.verify(token, process.env.CLIENTSECRET);
        req.user = decoded
        next()
    }catch(err){
        console.log(err)
        return res.json({
            message: "Unauthorized User",
            success: false
        })
    }
}
module.exports = {
    registerUser, loginUser, logout, authMiddleware
}