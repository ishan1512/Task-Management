import React, { useEffect } from 'react';
import {useTaskStore} from '../store/useTaskStore';
import TaskCard from '../components/TaskCard';

const ViewTasks = () => {
  const {
    tasks = [],
    loading,
    getTasks,
    updateTaskStatus,
    deleteTask,
  } = useTaskStore();

  useEffect(() => {
    getTasks(); // Fetch tasks on page load
  }, [getTasks]);

  return (
    <div className="pt-20 px-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Tasks</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : tasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks found.</p>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onUpdateStatus={updateTaskStatus}
              onDelete={deleteTask}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewTasks;