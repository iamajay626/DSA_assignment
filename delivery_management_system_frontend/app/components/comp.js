"use client"
import { useState, useEffect } from "react";
import axios from "axios";

const FormPage = () => {
  const [name, setName] = useState("");
  const [repairPrice, setRepairPrice] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [components, setComponents] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch initial data on component mount
  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/components/");
        
        // Convert the string values for repair_price and purchase_price to numbers
        const componentsData = response.data.map(component => ({
          ...component,
          repair_price: parseFloat(component.repair_price), // Convert to number
          purchase_price: parseFloat(component.purchase_price), // Convert to number
        }));
  
        setComponents(componentsData);
      } catch (error) {
        console.error("Error fetching components:", error);
        alert("There was an error fetching components.");
      }
    };
    fetchComponents();
  }, []);
  

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const repairPriceNum = parseFloat(repairPrice);
    const purchasePriceNum = parseFloat(purchasePrice);

    let validationErrors = {};
    if (!name) validationErrors.name = "Name is required";
    if (isNaN(repairPriceNum)) validationErrors.repairPrice = "Repair price must be a valid number";
    if (isNaN(purchasePriceNum)) validationErrors.purchasePrice = "Purchase price must be a valid number";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/components/', {
        name,
        repair_price: repairPriceNum,
        purchase_price: purchasePriceNum,
      });
      console.log(response.data);
      alert("Form submitted successfully!");

      setComponents([
        ...components,
        {
          name,
          repair_price: repairPriceNum,
          purchase_price: purchasePriceNum,
        },
      ]);

      setName("");
      setRepairPrice("");
      setPurchasePrice("");
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("Error submitting the form. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold text-center mb-4">Add Components</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter component name"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="repairPrice" className="block text-sm font-medium text-gray-700">Repair Price</label>
            <input
              id="repairPrice"
              type="number"
              value={repairPrice}
              onChange={(e) => setRepairPrice(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter repair price"
            />
            {errors.repairPrice && <p className="text-red-500 text-sm">{errors.repairPrice}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="purchasePrice" className="block text-sm font-medium text-gray-700">Purchase Price</label>
            <input
              id="purchasePrice"
              type="number"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter purchase price"
            />
            {errors.purchasePrice && <p className="text-red-500 text-sm">{errors.purchasePrice}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>

      <div className="overflow-x-auto mt-8">
        {components.length === 0 ? (
          <p className="text-center text-gray-500">No components available.</p>
        ) : (
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2 text-sm font-medium text-gray-700">Name</th>
                <th className="px-4 py-2 text-sm font-medium text-gray-700">Repair Price</th>
                <th className="px-4 py-2 text-sm font-medium text-gray-700">Purchase Price</th>
              </tr>
            </thead>
            <tbody>
  {components.map((component, index) => (
    <tr key={index} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} border-b`}>
      <td className="px-4 py-2 text-sm text-gray-700">{component.name}</td>
      <td className="px-4 py-2 text-sm text-gray-700">{component.repair_price.toFixed(2)}</td>
      <td className="px-4 py-2 text-sm text-gray-700">{component.purchase_price.toFixed(2)}</td>
    </tr>
  ))}
</tbody>

          </table>
        )}
      </div>
    </div>
  );
};

export default FormPage;
