import React, { useState } from 'react';
import { useTaskContext } from '../../assets/Context/TaskContext';
import { toast } from 'react-toastify';

function DeleteModal({ isOpen, closeModal, taskId }) {
  const [loading, setLoading] = useState(false);
  const { deleteTask } = useTaskContext();

  const handleDelete = async () => {
    setLoading(true);
    await deleteTask(taskId);
    toast.success('Task deleted successfully!');
    closeModal();
    setLoading(false);
  };

  return (
    <div className={`modal ${isOpen ? 'block' : 'hidden'} fixed inset-0 z-10 overflow-y-auto backdrop-blur-sm bg-white/30`}>
      <div className="modal-container bg-white w-full md:w-1/3 mx-auto mt-40 p-6 rounded shadow-lg">
        <div className="modal-header mb-4">
          <h3 className="text-lg font-semibold text-red-600">Delete Task</h3>
        </div>
        <div className="modal-body text-gray-800">
          <p>Are you sure you want to delete this task?</p>
          <div className="flex justify-end mt-6">
            <button
              onClick={handleDelete}
              disabled={loading}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2 cursor-pointer"
            >
              {loading ? 'Deleting...' : 'Yes, Delete'}
            </button>
            <button
              onClick={closeModal}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
