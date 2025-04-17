import React from 'react';

const TaskCard = ({ task, onUpdateStatus, onDelete }) => {
  const handleStatusChange = (e) => {
    onUpdateStatus(task._id, e.target.value);
  };

  const handleDelete = () => {
    onDelete(task._id);
  };

  return (
    <div className="bg-white rounded-2xl shadow p-4 mb-4">
      <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>
      <p className="text-gray-600 mt-1">{task.description}</p>

      <div className="flex items-center gap-2 mt-4">
        <label className="text-sm font-medium text-gray-700">Status:</label>
        <select
          className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={task.status}
          onChange={handleStatusChange}
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>

      <button
        onClick={handleDelete}
        className="mt-4 bg-red-500 text-white text-sm px-4 py-2 rounded hover:bg-red-600 transition-all"
      >
        Delete
      </button>
    </div>
  );
};

export default TaskCard;