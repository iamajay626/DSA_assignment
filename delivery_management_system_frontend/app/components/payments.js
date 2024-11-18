"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const Payment = () => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://127.0.0.1:8000/vehicles/");
      const validVehicles = response.data.filter(
        (vehicle) => vehicle && vehicle.name
      );
      setVehicles(validVehicles);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      setError("Error fetching vehicles");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVehicleChange = async (event) => {
    const vehicleName = event.target.value;
    setSelectedVehicle(vehicleName);

    if (vehicleName) {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/payments/?vehicle=${vehicleName}`
        );
        const paymentData = response.data;
        if (paymentData.length > 0) {
          setAmount(paymentData[0].total_amount); // Set amount as per API response
        } else {
          setAmount(""); // Reset amount if no data available
        }
      } catch (error) {
        console.error("Error fetching amount:", error);
        setError("Error fetching amount for the selected vehicle");
      }
    } else {
      setAmount("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedVehicle || !amount) {
      setError("Please select a vehicle and ensure the amount is valid");
      return;
    }

    const paymentData = {
      amount: parseFloat(amount),
      date: new Date().toISOString(),
      vehicle: selectedVehicle,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/payments/",
        paymentData
      );
      if (response.status === 201) {
        setSuccessMessage("Payment submitted successfully!");
        setAmount("");
        setSelectedVehicle("");
        setError("");
      } else {
        setError("Error posting payment");
      }
    } catch (error) {
      setError("Error posting payment");
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <p className="mt-2">Loading vehicles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-4">Make a Payment</h1>

      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {successMessage && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <span className="block sm:inline">{successMessage}</span>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label
            htmlFor="vehicle"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Select Vehicle
          </label>
          <select
            id="vehicle"
            value={selectedVehicle}
            onChange={handleVehicleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select a Vehicle</option>
            {vehicles.map((vehicle, index) => (
              <option key={`vehicle-${index}`} value={vehicle.name}>
                {vehicle.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="amount"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Amount
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none"
            readOnly
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
        >
          Submit Payment
        </button>
      </form>
    </div>
  );
};

export default Payment;
