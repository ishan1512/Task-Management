import jwt from "jsonwebtoken";
import {redis} from "../lib/redis.js";

//generate access and refresh token
export const generateToken = (userId) =>{
    const accessToken = jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:"2d",
    })
    const refreshToken = jwt.sign({userId}, process.env.REFRESH_TOKEN_SECRET,{
        expiresIn:"7d",
    })
    return {accessToken,refreshToken};
}

//store refresh token in redis
export const storeRefreshToken = async(userId,refreshToken) =>{
    await redis.set(`ref_token:${userId}`, refreshToken, "EX", 7*24*60*60);
}

//set cookies for tokens
export const setCookies = (res, accessToken, refreshToken)=>{
    res.cookie("accessToken", accessToken, {
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        sameSite:"strict",
        maxAge: 2*24*60*60*1000,
    })
    res.cookie("refreshToken", refreshToken, {
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        sameSite:"strict",
        maxAge: 7*24*60*60*1000,
    })
}