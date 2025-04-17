import Message from"../models/message.model.js"
import cloudinary from "../lib/cloudinary.js"
import { getRecieverSocketId } from "../lib/socket.js";
import { io } from "../lib/socket.js";

export const getUsersForSidebar = async (req,res) =>{
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password");
        res.status(200).json(filteredUsers)
    } catch (error) {
        console.log("Error in getUsersForSidebar", error.message)
        res.status(500).json({message:"Inetrnal server error"})
    }
}

export const getMessages = async(req,res)=>{
    try {
        const {id:userToChatId} = req.params;
        const myId = req.user._id;

        //finding all msges where im the sender and other is reciever or im reciever and other is sender
        const messages = await Message.find({
            $or:[
                {senderId:myId, recieverId:userToChatId},
                {senderId:userToChatId, recieverId:myId}
            ]
        })
        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMsg controller", error.message)
        res.status(500).json({message:"Internal server error"})
    }
}

export const sendMessages = async(req,res)=>{
    try {
        const {text,image} = req.body;
        const {id:recieverId} = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            //upload image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            recieverId,
            text,
            image:imageUrl
        })
        await newMessage.save();

        //realtime messaging
        const recieverSocketId = getRecieverSocketId(recieverId);
        if(recieverSocketId){
            io.to(recieverSocketId).emit("newMessage", newMessage)
        }
        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller", error.message);
        res.status(500).json({message: "Internal server error"})
    }
}