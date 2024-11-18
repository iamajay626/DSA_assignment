"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RevenueGraph = () => {
  const [revenueData, setRevenueData] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRevenueData();
  }, []);

  const fetchRevenueData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/revenue_report/");
      setRevenueData(response.data);
      setError("");
    } catch (err) {
      console.error("Error fetching revenue data:", err);
      setError("Failed to fetch revenue data");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center p-6">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <p className="mt-2">Loading revenue data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
        {error}
      </div>
    );
  }

  if (!revenueData) {
    return <p className="text-center text-gray-500">No data available</p>;
  }

  // Prepare data for the chart
  const chartData = {
    labels: ["Daily Revenue", "Monthly Revenue", "Yearly Revenue"],
    datasets: [
      {
        label: "Revenue (USD)",
        data: [
          revenueData.daily_revenue,
          revenueData.monthly_revenue,
          revenueData.yearly_revenue,
        ],
        backgroundColor: ["#4CAF50", "#2196F3", "#FFC107"],
        borderColor: ["#388E3C", "#1976D2", "#FFA000"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Revenue Overview",
      },
    },
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-4">Revenue Graph</h1>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default RevenueGraph;
