import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

function Dashboard() {
  return (
    <div className="w-full max-w-3xl p-6 mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Dashboard</h2>
      <div className="w-full flex justify-center">
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: 10, label: "loading", color: "#26A69A" },
                { id: 1, value: 15, label: "ongoing", color: "#42A5F5" },
                { id: 2, value: 20, label: "completed", color: "#AB47BC" },
              ],
            },
          ]}
          width={400}
          height={200}
          slotProps={{
            legend: { hidden: true }, // Hide the default legend
          }}
          className="w-full sm:w-3/4 md:w-1/2"
        />
      </div>
      {/* Custom Legend */}
      <div className="flex justify-center mt-4 space-x-4">
        <div className="flex items-center">
          <span className="w-4 h-4 mr-2 bg-[#26A69A] rounded-sm"></span>
          <span>loading</span>
        </div>
        <div className="flex items-center">
          <span className="w-4 h-4 mr-2 bg-[#42A5F5] rounded-sm"></span>
          <span>ongoing</span>
        </div>
        <div className="flex items-center">
          <span className="w-4 h-4 mr-2 bg-[#AB47BC] rounded-sm"></span>
          <span>completed</span>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
