import React from 'react';
import { useTaskContext } from '../assets/Context/TaskContext';

function Filterbar() {
  const { handleFilterClick, totalTasks, completedTasks, todoTasks, inProgressTasks } = useTaskContext();

  return (
    <div className="flex justify-center mt-8 flex-wrap gap-2 ">
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-pointer"
        onClick={() => handleFilterClick('all')}
      >
        All ({totalTasks})
      </button>
      <button
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded cursor-pointer"
        onClick={() => handleFilterClick('completed')}
      >
        Completed ({completedTasks})
      </button>
      <button
        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded cursor-pointer"
        onClick={() => handleFilterClick('to-do')}
      >
        To Do ({todoTasks})
      </button>
      <button
        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded cursor-pointer"
        onClick={() => handleFilterClick('in-progress')}
      >
        In Progress ({inProgressTasks})
      </button>
    </div>
  );
}

export default Filterbar;