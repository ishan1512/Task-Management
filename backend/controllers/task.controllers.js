import Task from "../models/task.model.js";

export const createTask= async(req,res)=>{
    const {title,description} = req.body;
    if(!title){
        return res.status(400).json({error:"Title is required"})
    }
    try {
        const newTask = await Task.create({
            user:req.user._id,
            title,
            description,
        })
        const savedTask = await newTask.save()
        res.status(201).json(savedTask)
    } catch (error) {
        console.log("Error in create task controller", error.message);
        res.status(500).json({message:"Server error", error:error.message});
    }
}

export const getTasks= async(req,res)=>{
    try {
        const task = await Task.find({user: req.user.id})
        res.status(200).json({task})
    } catch (error) {
        console.log("Error in getTasks controller", error.message);
        res.status(500).json({message:"Server error", error:error.message})
    }
}

export const updateTaskStatus= async(req,res)=>{
    const {taskId} = req.params;
    const {status} = req.body;

    if(!["To Do", "In Progress", "Done"].includes(status)){
        return res.status(400).json({message:"Invalid status input"})
    }
    try {
        const task = await Task.findOneAndUpdate(
           {_id:taskId,
            user:req.user.id},
            {status},
            {new:true},
        )

        if(!task) return res.status(404).json({message:"Task not found"})
        res.status(200).json({task})    
    } catch (error) {
        console.log("Error in updateTask controller", error.message);
        res.status(500).json({message:"Server error", error:error.message})
    }
}

export const deleteTask= async(req,res)=>{
    try {
        const {taskId} =req.params
        await Task.findByIdAndDelete({
            _id:taskId,
            user:req.user.id
        })
        res.json({message:"Task deleted successfully"})
    } catch (error) {
        console.log("Error in deleteTask controller", error.message);
        res.status(500).json({message:"Server error", error:error.message})
    }
}