import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useTaskContext } from '../../assets/Context/TaskContext';

function EditModal({ isOpen, closeModal, taskId, initialTitle, initialDescription, initialStatus }) {
  const { editTask } = useTaskContext();

  const [title, setTitle] = useState(initialTitle || '');
  const [description, setDescription] = useState(initialDescription || '');
  const [status, setStatus] = useState(initialStatus || 'to-do');
  const [loading, setLoading] = useState(false);

  // Reset values when modal opens
  useEffect(() => {
    if (isOpen) {
      setTitle(initialTitle || '');
      setDescription(initialDescription || '');
      setStatus(initialStatus || 'to-do');
    }
  }, [isOpen, initialTitle, initialDescription, initialStatus]);

  const handleSubmit = async () => {
    if (!title.trim()) return;

    setLoading(true);
    const success = await editTask(taskId, title, description, status);

    if (success) {
      toast.success("Task updated successfully!");
      closeModal();
    } else {
      toast.error("Failed to update task.");
    }

    setLoading(false);
  };

  return (
    <div className={`modal ${isOpen ? 'block' : 'hidden'} fixed inset-0 z-10 overflow-y-auto backdrop-blur-sm bg-white/30`}>
      <div className="modal-container bg-white w-full md:w-1/3 mx-auto mt-20 p-6 rounded shadow-lg">
        <div className="modal-header flex justify-between items-center">
          <h3 className="text-lg font-semibold">Edit Task</h3>
          <button className="text-gray-500 hover:text-gray-800 cursor-pointer" onClick={closeModal}>X</button>
        </div>

        <div className="modal-body mt-4">
          <div className="mb-4">
            <label className="block text-sm font-bold mb-1" htmlFor="title">Title</label>
            <input
              id="title"
              className="w-full px-3 py-2 border rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-1" htmlFor="description">Description</label>
            <textarea
              id="description"
              className="w-full px-3 py-2 border rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-1" htmlFor="status">Status</label>
            <select
              id="status"
              className="w-full px-3 py-2 border rounded"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              disabled={loading}
            >
              <option value="to-do">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2 cursor-pointer"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={closeModal}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded cursor-pointer"
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
