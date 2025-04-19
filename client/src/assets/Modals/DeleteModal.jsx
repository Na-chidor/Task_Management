// DeleteModal.jsx
import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { toast } from 'react-toastify'; // Import toast

function DeleteModal({ isOpen, closeModal, taskId, refreshTasks }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    const { error } = await supabase
      .from('Task')
      .delete()
      .eq('id', taskId);

    if (error) {
      console.error('Error deleting task:', error.message);
    } else {
      toast.success("Task deleted successfully!");
      if (refreshTasks) refreshTasks();
      closeModal();
    }

    setLoading(false);
  };

  return (
    <div className={`modal ${isOpen ? 'block' : 'hidden'} fixed inset-0 z-10 overflow-y-auto`}>
      <div className="modal-container bg-white w-full md:w-1/3 mx-auto mt-20 p-6 rounded shadow-lg">
        <div className="modal-header flex justify-between items-center">
          <h3 className="text-lg font-semibold">Confirm Delete</h3>
          <button className="text-gray-500 hover:text-gray-800" onClick={closeModal}>X</button>
        </div>
        <div className="modal-body mt-4">
          <p>Are you sure you want to delete this task?</p>
          <div className="flex justify-end mt-4">
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? 'Deleting...' : 'Delete'}
            </button>
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              onClick={closeModal}
              disabled={loading}
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
