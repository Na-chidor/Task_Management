// EditModal.jsx
import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { toast } from 'react-toastify'; // Import toast

function EditModal({ isOpen, closeModal, taskId, initialTitle = '', refreshTasks }) {
  const [title, setTitle] = useState(initialTitle);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim()) return;

    setLoading(true);

    const { error } = await supabase
      .from('Task')
      .update({ task: title })
      .eq('id', taskId);

    if (error) {
      console.error('Error updating task:', error.message);
    } else {
      toast.success("Task updated successfully!");
      if (refreshTasks) refreshTasks(); // Refresh task list after update
      closeModal();
    }

    setLoading(false);
  };

  return (
    <div className={`modal ${isOpen ? 'block' : 'hidden'} fixed inset-0 z-10 overflow-y-auto`}>
      <div className="modal-container bg-white w-full md:w-1/3 mx-auto mt-20 p-6 rounded shadow-lg">
        <div className="modal-header flex justify-between items-center">
          <h3 className="text-lg font-semibold">Edit Task</h3>
          <button className="text-gray-500 hover:text-gray-800" onClick={closeModal}>X</button>
        </div>
        <div className="modal-body mt-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Title</label>
            <input
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="flex justify-end mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save'}
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

export default EditModal;
