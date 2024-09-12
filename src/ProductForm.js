import React, { useState } from 'react';
import axios from 'axios';
import { AiFillProduct } from "react-icons/ai";

const ProductForm = ({ className = '' }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // Success message state

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedPrice = parseFloat(price).toFixed(2); // Ensure the price is formatted to 2 decimal places

    axios.post('https://rimes-product-management-backend.onrender.com/api/products/', { name, description, price: formattedPrice })
      .then(() => {
        setName('');
        setDescription('');
        setPrice('');
        setSuccess('Product added successfully!'); // Set success message
        setTimeout(() => setSuccess(''), 2000);
      })
      .catch(err => {
        const errorResponse = err.response?.data;
        const errorDetails = errorResponse?.details || 'An unexpected error occurred.';

        // Format error details into a readable string
        const formattedError = Object.entries(errorDetails).map(
          ([field, messages]) => `${field}: ${messages.join(', ')}`
        ).join(', ');

        setError(`Error: ${formattedError}`);

        // Hide error message after 2 seconds
        setTimeout(() => setError(''), 2000);
      });
  };

  const handlePriceChange = (e) => {
    // Allow only numbers and a single decimal point
    const value = e.target.value;
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setPrice(value);
    }
  };

  return (
    <div className={`p-8 w-full max-w-md mx-auto bg-white rounded-lg shadow-md border-neutral-600 ${className}`}>
      {/* Error Message */}
      {error && (
        <div className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg">
          {error}
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg">
          {success}
        </div>
      )}
      
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 flex">
        <AiFillProduct className="mt-1 mr-2"/> Add New Product
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input 
            type="text" 
            placeholder="Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <input 
            type="text" 
            placeholder="Description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <input 
            type="text" 
            placeholder="Price" 
            value={price} 
            onChange={handlePriceChange} 
            required 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
