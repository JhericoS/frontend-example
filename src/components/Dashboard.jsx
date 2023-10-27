import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const Dashboard = () => {

  const data = {
    labels: ["Producto 1", "Producto 2", "Producto 3", "Producto 4", "Producto 5"],
    datasets: [
      {
        label: "Sales",
        data: [12, 19, 8, 15, 10],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <Bar data={data} options={options} />
          <h2 className="text-lg font-bold mb-2">Stock</h2>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <Doughnut data={data} options={options} />
          <h2 className="text-lg font-bold mb-2">Stock</h2>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md">
          <Line data={data} options={options} />
          <h2 className="text-lg font-bold mb-2">Más vendido</h2>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md">
          <Pie data={data} options={options} />
          <h2 className="text-lg font-bold mb-2">Más vendido</h2>
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;
