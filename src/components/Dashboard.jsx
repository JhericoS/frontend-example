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
  RadarController, // Add RadarScale here
  RadialLinearScale,
} from "chart.js";
import { Bar, Line, Pie, Radar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  RadarController, // Add RadarScale here
  RadialLinearScale,
);

const Dashboard = () => {
  const data = {
    labels: [
      "Producto 1",
      "Producto 2",
      "Producto 3",
      "Producto 4",
      "Producto 5",
    ],
    datasets: [
      {
        label: "Sales",
        data: [12, 28, 6, 15, 10],
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
        text: "Stock Chart",
      },
    },
  };

  const options2 = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Ventas Chart",
      },
    },
  };

  return (
    <div className="w-full flex flex-col md:mt-4">
      <div className="flex flex-col items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      </div>
      <div className="flex flex-col w-full items-center max-w-6xl mx-auto">
        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="bg-white p-4 rounded-lg shadow-md items-center justify-center flex flex-col">
            <Line data={data} options={options} />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md items-center justify-center flex flex-col">
            <Pie data={data} options={options} />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md items-center justify-center flex flex-col">
            <Radar data={data} options={options2} />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md items-center justify-center flex flex-col">
            <Bar data={data} options={options2} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
