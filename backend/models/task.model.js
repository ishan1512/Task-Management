import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        title:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            default:"",
        },
        status:{
            type:String,
            enum:['To Do', 'In Progress', 'Done'],
            default:'To Do',
        },
        createdAt:{
            type:Date,
            default:Date.now,
        }
    },
    {
        timestamps:true,
    }
)

const Task = mongoose.model("Task", taskSchema);
export default Task;