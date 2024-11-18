"use client"
import { useState, useEffect } from "react";
import axios from "axios";

const VehicleRepairForm = () => {
  // State to store vehicles, selected vehicle, components, selected component, description, and isPurchased
  const [vehicles, setVehicles] = useState([]);
  const [components, setComponents] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [selectedComponent, setSelectedComponent] = useState("");
  const [description, setDescription] = useState("");
  const [isPurchased, setIsPurchased] = useState(false); // State for the is_purchased checkbox

  // Fetch issues (vehicles) from the issues API
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/vehicles/")
      .then((response) => {
        const data = response.data;
  
        // Extract vehicle names directly from the response
        const vehicleNames = data.map((item) => item.name);
        setVehicles(vehicleNames);
  
        // Automatically select the first vehicle if available
        if (vehicleNames.length > 0) {
          setSelectedVehicle(vehicleNames[0]);
        }
      })
      .catch((error) => {
        console.error("Error fetching vehicles from API", error);
      });
  }, []);
  

  // Fetch components from the components API
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/components/")
      .then((response) => {
        const data = response.data;

        // Extract the components' names
        setComponents(data);
        if (data.length > 0) {
          setSelectedComponent(data[0].name); // Set default selected component
        }
      })
      .catch((error) => {
        console.error("Error fetching components from API", error);
      });
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedVehicle || !selectedComponent || !description) {
      alert("Please fill in all fields");
      return;
    }

    const formData = {
      vehicle: selectedVehicle,
      component: selectedComponent,
      description: description,
      is_purchased: isPurchased, // Include is_purchased in the payload
    };

    try {
      const response = await axios.post("http://127.0.0.1:8000/issues/", formData);
      alert("Form submitted successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting the form", error);
      alert("Error submitting the form");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Vehicle Repair Form</h2>

        {/* Vehicle Selection */}
        <div className="mb-4">
          <label htmlFor="vehicle" className="block text-sm font-medium text-gray-700">
            Select Vehicle
          </label>
          <select
            id="vehicle"
            value={selectedVehicle}
            onChange={(e) => setSelectedVehicle(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="" disabled>
              Select a Vehicle
            </option>
            {vehicles.map((vehicle) => (
              <option key={vehicle} value={vehicle}>
                {vehicle}
              </option>
            ))}
          </select>
        </div>

        {/* Component Selection */}
        {components.length > 0 && (
          <div className="mb-4">
            <label htmlFor="component" className="block text-sm font-medium text-gray-700">
              Select Component
            </label>
            <select
              id="component"
              value={selectedComponent}
              onChange={(e) => setSelectedComponent(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="" disabled>
                Select a Component
              </option>
              {components.map((component, index) => (
                <option key={`${component.name}-${index}`} value={component.name}>
                  {component.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Description Textarea */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter description..."
          ></textarea>
        </div>

        {/* Is Purchased Checkbox */}
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="isPurchased"
            checked={isPurchased}
            onChange={(e) => setIsPurchased(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="isPurchased" className="text-sm font-medium text-gray-700">
            Is Purchased?
          </label>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default VehicleRepairForm;
