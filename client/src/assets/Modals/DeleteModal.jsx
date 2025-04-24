// src/components/DeleteModal.jsx

import React, { useState } from "react";
import { useTaskContext } from "../Context/TaskContext";
import { toast } from "react-toastify";

const DeleteModal = ({ isOpen, onClose, taskId }) => {
  const { deleteTask } = useTaskContext();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await deleteTask(taskId);
    toast.success("Task deleted");
    onClose();
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-md">
        <h2 className="text-lg font-semibold mb-4">Delete Task</h2>
        <p className="mb-6">Are you sure you want to delete this task?</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
