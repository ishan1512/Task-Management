import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";

import {useTaskStore} from '../store/useTaskStore';
import TaskCard from '../components/TaskCard';
import { Loader, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const TaskPage = () => {
  const [form, setForm] = useState({ 
    title: '', 
    description: '' 
  });

  const {tasks=[],loading,setTasks,createTask,updateTaskStatus,deleteTask} = useTaskStore();

  useEffect(() => {
    setTasks();
  }, [setTasks]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTask(form);
    setForm({ title: '', description: '' });
  };

  return (
    <div>
    <motion.div
    className='bg-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto '
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >      
  <h2 className='text-2xl font-semibold mb-6 text-emerald-300'>Create New Task</h2>
  <form onSubmit={handleSubmit} className='space-y-4'>
    <div>
      <label htmlFor='name' className='block text-sm font-medium text-gray-300'>
						Title
					</label>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2
						 px-3 text-white focus:outline-none focus:ring-2
						focus:ring-emerald-500 focus:border-emerald-500'
          required
        />
        </div>
        <div>
        <label htmlFor='name' className='block text-sm font-medium text-gray-300'>
						Description
					</label>
        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2
          px-3 text-white focus:outline-none focus:ring-2
         focus:ring-emerald-500 focus:border-emerald-500'
          required
        />
        </div>
        
        <button
					type='submit'
					className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md 
					shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 
					focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50'
					disabled={loading}
				>
          {loading ? (
						<>
							<Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
							Loading...
						</>
					) : (
						<>
							<PlusCircle className='mr-2 h-5 w-5' />
              Add Task
              </>
					)}
				</button>

      </form>
      

      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onUpdateStatus={updateTaskStatus}
            onDelete={deleteTask}
          />
        ))
      )}
      
      
    </motion.div>
    <div>
    <button type="submit" className='w-full flex justify-center py-3 px-4 border border-transparent rounded-md 
					shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 
					focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50' >
              { 
              <Link
              to={"/view-tasks"}
              className={`
              btn btn-sm gap-2 transition-colors
              
              `}
            >
              
              <span className="hidden sm:inline">View Tasks</span>
            </Link>
}
            </button>
    </div>
   
  </div>

    
    
  );
  
};

export default TaskPage;