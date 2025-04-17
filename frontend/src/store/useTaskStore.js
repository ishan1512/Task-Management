import {create} from "zustand";
import toast from "react-hot-toast";
import {axiosInstance} from "../lib/axios"

export const useTaskStore = create((set)=>({
    tasks:[],
    isLoading:false,

    setTasks:(tasks)=> set({tasks}),

    createTask: async(data)=>{
        set({isLoading:true})
        try {
            const res = await axiosInstance.post("/tasks", data )
            set((prevstate) => ({ tasks: [...prevstate.tasks, res.data],
                isLoading:false
             }));            
            toast.success("Task added successfully")
        } catch (error) {
            set({loading:false});
        }
    },

    getTasks: async()=>{
        set({isLoading:true})
        try {
            const res = await axiosInstance.get("/tasks")
            set({tasks:res.data.task, isLoading:false})
        } catch (error) {
            set({error:"Failed to fetch tasks", loading:false})
            toast.error(error.response.data.error || "Failed to fetch tasks");
        }
    },

    updateTaskStatus: async (taskId, status) => {
        set({isLoading:true})
        try {
          const res = await axiosInstance.put(`/tasks/${taskId}`, { status });
          set((prevstate) => ({
            tasks: prevstate.tasks.map((task) =>
              task._id === taskId ? res.data.task : task
            ),
            isLoading:false
          }));
        } catch (error) {
            set({isLoading:false})
            toast.error(error.response.data.error || "Failed to update task")
        }
    },

    deleteTask: async(taskId)=>{
        set({isLoading:true});
        try {
            await axiosInstance.delete(`/tasks/${taskId}`);
            set((prevTasks)=>({
                tasks:prevTasks.tasks.filter((task)=> task._id !== taskId),
                isLoading:false
            }))
        } catch (error) {
            set({loading:false});
            toast.error(error.response.data.error || 'Failed to delete task')
        }
    }

}))