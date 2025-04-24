// src/Components/Dashboard.jsx

import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useTaskContext } from "../assets/Context/TaskContext";

function Dashboard() {
  const { filteredTasks } = useTaskContext();

  const statusCounts = {
    loading: filteredTasks.filter((task) => task.status === "to-do").length,
    ongoing: filteredTasks.filter((task) => task.status === "in-progress").length,
    completed: filteredTasks.filter((task) => task.status === "done").length,
  };

  return (
    <div className="w-full max-w-3xl p-6 mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Dashboard</h2>

      <div className="w-full flex justify-center">
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: statusCounts.loading, label: "To-Do", color: "#26A69A" },
                { id: 1, value: statusCounts.ongoing, label: "In Progress", color: "#42A5F5" },
                { id: 2, value: statusCounts.completed, label: "Completed", color: "#AB47BC" },
              ],
            },
          ]}
          width={400}
          height={200}
          slotProps={{
            legend: { hidden: true },
          }}
          className="w-full sm:w-3/4 md:w-1/2"
        />
      </div>

      {/* Custom Legend */}
      <div className="flex justify-center mt-4 space-x-4">
        <div className="flex items-center">
          <span className="w-4 h-4 mr-2 bg-[#26A69A] rounded-sm"></span>
          <span>To-Do: {statusCounts.loading}</span>
        </div>
        <div className="flex items-center">
          <span className="w-4 h-4 mr-2 bg-[#42A5F5] rounded-sm"></span>
          <span>In Progress: {statusCounts.ongoing}</span>
        </div>
        <div className="flex items-center">
          <span className="w-4 h-4 mr-2 bg-[#AB47BC] rounded-sm"></span>
          <span>Completed: {statusCounts.completed}</span>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
