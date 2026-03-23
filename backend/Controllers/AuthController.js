const UserModel = require('../Models/User.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const signup = async (req, res)=>{
    try {
        const {name, email, password} = req.body;
        const user = await UserModel.findOne({email});
        if(user){
            return res.status(409).json({
                message: "User with this email already exist.",
                success: false
            });
        }
        
        const userModel = new UserModel({name, email, password});
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(200).json({
            message:"Signup successfull",
            success: true
        });
            
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Internal server error.",
            success: false
        });
    }

}


const login = async (req, res)=>{
    try {
        const { email, password} = req.body;
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(403).json({
                message: "Authentication failed",
                success: false
            });
        }
        const isPasEqual = await bcrypt.compare(password, user.password);
        if(!isPasEqual){
            return res.status(400).json({ message: "Wrong password" });
        }
         const token = jwt.sign(
      { _id: user._id, email: user.email }, // payload
      process.env.JWT_SECRET,              // secret from .env
      { expiresIn: '7d' }                  // token validity
    );
     res.status(200).json({
      message: "Login successful",
      success: true,
      token,
      name: user.name,
      email: user.email
    });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Internal server error.",
            success: false,
            token,
            email: user.email,
            name: user.name
        });
    }

}
module.exports = {signup,login};