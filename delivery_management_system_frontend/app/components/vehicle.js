"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  // State to store vehicle names from the API
  const [vehicles, setVehicles] = useState([]);
  
  // State to store the input field value
  const [newName, setNewName] = useState('');
  
  // Fetch vehicle names from the API on component mount
  useEffect(() => {
    fetchVehicles();
  }, []);

  // Function to fetch the vehicles from the API
  const fetchVehicles = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/vehicles/'); // Replace with your actual API URL
      setVehicles(res.data);  // Assuming the response structure is [{ "name": "Vehicle 1" }, ...]
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };

  // Handle input change
  const handleInputChange = (event) => {
    setNewName(event.target.value);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!newName) return;

    try {
      // Post the new name to the API
      const response = await axios.post('http://127.0.0.1:8000/vehicles/', {
        name: newName,
      }, {
        headers: {
          'Content-Type': 'application/json', // Ensure the content-type is set
        },
      });

      if (response.status === 201 || response.status === 200) {
        // After successful post, refresh the vehicle list
        fetchVehicles();  // Fetch the updated list of vehicles
        setNewName('');  // Clear the input field
      } else {
        console.error('Error posting new vehicle. Status:', response.status);
      }
    } catch (error) {
      console.error('Error posting new vehicle:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-4">Vehicle List</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4 mb-4">
        <input
          type="text"
          value={newName}
          onChange={handleInputChange}
          placeholder="Enter new vehicle name"
          className="px-4 py-2 border border-gray-300 rounded-md w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Submit
        </button>
      </form>

      <ul className="space-y-2 mb-4">
        {vehicles.map((vehicle, index) => (
          <li key={index} className="p-2 border border-gray-300 rounded-md shadow-sm">
            {vehicle.name}
          </li>
        ))}
      </ul>

    
    </div>
  );
}
