import User from "../models/user.model.js"
import jwt from "jsonwebtoken";

import { redis } from "../lib/redis.js";
import {generateToken, storeRefreshToken, setCookies} from "../utils/tokens.utils.js";


export const signup = async(req,res)=>{
    const {fullName, email, password} = req.body;
    try {
        if(!fullName || !email || !password){
            return res.status(400).json({message:"All fields are required"})
        }
        if(password.length < 6){
            return res.status(400).json({message:"Password must be atleast 6 characters"})
        }

        const userExists = await User.findOne({email});

        if(userExists) return res.status(400).json({message:"User already exists"})
         
        //new user
        const user = await User.create({fullName,email,password});
        //authenticacte
        const {accessToken, refreshToken} = generateToken(user._id);
        await storeRefreshToken(user._id, refreshToken);
        
        setCookies(res, accessToken, refreshToken);

        res.status(200).json({
            _id:user._id,
            name:user.fullName,
            email:user.email,
        })
    } catch (error) {
        res.status(500).json({message:error.message})
        console.log("Error in signup controller");
    }
}

export const login = async(req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(user && (await user.comparePassword(password))){
            const {accessToken,refreshToken} = generateToken(user._id)

            await storeRefreshToken(user._id, refreshToken);
            setCookies(res,accessToken,refreshToken);

            res.status(200).json({
                _id:user._id,
                name:user.fullName,
                email:user.email,
            })
        }else{
            res.status(400).json({message:"Invalid email or password"})
        }
    } catch (error) {
        console.log("Error in login controller");
        res.status(500).json({message:error.message})
    }
}

export const logout = async(req,res)=>{
    try {
        const refreshToken = req.cookies.refreshToken;
        if(refreshToken){
            const decoded = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET)
            await redis.del(`ref_token:${decoded.userId}`)
        }
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.json({message: "Logged out successfully"})
    } catch (error) {
        res.status(500).json({message:"Server error", error:error.message})
    }
}

export const checkAuth = async(req,res)=>{
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({message: "Internal server error"})
    }
}

export const refreshToken = async(req,res)=>{
    try {
        const refreshToken=req.cookies.refreshToken;
        if(!refreshToken){
            return res.status(401).json({message: "No refresh token found"});
        }

        const decoded = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET);
        
        const storedToken=await redis.get(`ref_token:${decoded.userId}`);
        
        if(storedToken != refreshToken){
            res.status(401).json({message:"Invalid refresh token"})
        }

        const accessToken = jwt.sign({userId: decoded.userId},process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"});
        res.cookie("accessToken", accessToken, {
            httpOnly: true, //prevents xss attacks that is cross site scripting attacks
            secure:process.env.NODE_ENV === "production",
            sameSite:"strict", //prevents CSRF attacks that is cross site request forgery attack
            maxAge:15*60*1000, //15 mins
        })
        res.json({message:"Token refreshed successfully"});
    } catch (error) {
        console.log("Error in refresh token controller", error.message)
        res.status(500).json({message:"Server error", error:error.message})
    }
}