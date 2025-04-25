import React, { useState } from "react";
import { useTaskContext } from "../assets/Context/TaskContext";
import DeleteModal from "../assets/Modals/DeleteModal";
import EditModal from "../assets/Modals/EditModal";

function TaskList() {
  const { filteredTasks, editTask } = useTaskContext();
  const [taskId, setTaskId] = useState('');
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const handleDelete = (taskId) => {
    setTaskId(taskId);
    setIsDeleteModalOpen(true);
    setOpenDropdownId(null);
  };

  const handleEdit = (taskId, taskTitle, taskDescription) => {
    setTaskId(taskId);
    setTaskTitle(taskTitle);
    setTaskDescription(taskDescription);
    setIsEditModalOpen(true);
    setOpenDropdownId(null);
  };

  const handleComplete = async (taskId) => {
    try {
      const task = filteredTasks.find(t => t.id === taskId);
      if (!task) {
        console.error('Task not found');
        return;
      }
  
      console.log('Marking task as completed:', taskId, task);
      
      // Use the exact status value that matches your database
      const success = await editTask(
        taskId, 
        task.task, 
        task.description, 
        'completed' // Make sure this matches exactly what's in your DB
      );
  
      if (success) {
        console.log('Successfully marked as completed');
        setOpenDropdownId(null);
      } else {
        console.error('Failed to mark task as completed');
      }
    } catch (error) {
      console.error('Error in handleComplete:', error);
    }
  };
  

  const toggleDropdown = (taskId) => {
    setOpenDropdownId(openDropdownId === taskId ? null : taskId);
  };

  const isDropdownOpen = (taskId) => openDropdownId === taskId;

  const getStatusColor = (status) => {
    switch (status) {
      case 'todo':
        return 'bg-yellow-200';
      case 'completed':
        return 'bg-green-200';
      case 'in-progress':
        return 'bg-blue-200';
      default:
        return 'bg-gray-200';
    }
  };

  return (
    <div className="my-8 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {filteredTasks.map((task) => (
        <div
          key={task.id}
          className={`relative rounded-md shadow-md p-4 ${getStatusColor(task.status)}`}
        >
          {/* Dropdown toggle button in top-right */}
          <div className="absolute top-2 right-2 z-20 cursor-pointer">
            <button onClick={() => toggleDropdown(task.id)} className="text-gray-500 hover:text-gray-700 cursor-pointer">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          <div>
            <h3 className="text-lg font-semibold">{task.task}</h3>
            <p className="text-sm text-gray-600 mb-4">{task.description}</p>
          </div>

          {isDropdownOpen(task.id) && (
            <div className="absolute top-10 left-2 w-48 bg-white border rounded-md shadow-md z-30">
              <button
                className="block w-full py-2 px-4 text-left hover:bg-gray-100 cursor-pointer"
                onClick={() => handleEdit(task.id, task.task, task.description)}
              >
                Edit
              </button>
              <button
                className="block w-full py-2 px-4 text-left text-red-600 hover:bg-red-100 cursor-pointer"
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </button>
              {task.status !== 'completed' && (
                <button
                  className="block w-full py-2 px-4 text-left hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleComplete(task.id)}
                >
                  Mark as Completed
                </button>
              )}
            </div>
          )}
        </div>
      ))}

      {/* Delete Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        closeModal={() => setIsDeleteModalOpen(false)}
        taskId={taskId}
      />

      {/* Edit Modal */}
      <EditModal
        isOpen={isEditModalOpen}
        closeModal={() => setIsEditModalOpen(false)}
        taskId={taskId}
        initialTitle={taskTitle}
        initialDescription={taskDescription}
      />
    </div>
  );
}

export default TaskList;