// src/Components/Navbar.jsx

import React, { useState } from 'react';
import AddTaskModal from '../assets/Modals/AddTaskModal';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 py-4">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <span className="text-white text-lg font-bold">Task Manager</span>
        <div className="flex gap-2">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={openModal}>
            Add
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      <AddTaskModal isOpen={isModalOpen} closeModal={closeModal} />
    </nav>
  );
}

export default Navbar;
