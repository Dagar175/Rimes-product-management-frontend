import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal'; // Import the react-modal package
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook from react-router-dom
import { IoMdArrowRoundBack } from "react-icons/io";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // State for success messages
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: ''
  });
  const [showConfirmDelete, setShowConfirmDelete] = useState(false); // State for confirmation dialog
  const [productToDelete, setProductToDelete] = useState(null); // State for the product to delete

  const navigate = useNavigate(); // Initialize useNavigate hook for navigation

  // Modal styles
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      padding: '20px',
      borderRadius: '10px',
      width: '80%',
      maxWidth: '500px',
      background: '#f9f9f9',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }
  };

  const fetchProducts = () => {
    axios.get('https://rimes-product-management-backend.onrender.com/api/products/')
      .then(response => {
        setProducts(response.data);
        setFilteredProducts(response.data); // Set initial filtered products
      })
      .catch(err => {
        const errorResponse = err.response?.data;
        const errorDetails = errorResponse?.details || 'An unexpected error occurred.';
        const formattedError = Object.entries(errorDetails).map(
          ([field, messages]) => `${field}: ${messages.join(', ')}`
        ).join(', ');

        setError(`Error: ${formattedError}`);
        setTimeout(() => setError(''), 2000);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const handleEdit = (product) => {
    setEditingProduct(product.id);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price
    });
  };

  const handleDelete = (id) => {
    setProductToDelete(id);
    setShowConfirmDelete(true); // Show the confirmation dialog
  };

  const confirmDelete = () => {
    axios.delete(`https://rimes-product-management-backend.onrender.com/api/products/${productToDelete}/`)
      .then(() => {
        setShowConfirmDelete(false); // Hide confirmation dialog
        setProductToDelete(null);
        fetchProducts();
        setSuccessMessage('Product deleted successfully.'); // Show success message
        setTimeout(() => setSuccessMessage(''), 2000); // Hide success message after 2 seconds
      })
      .catch(err => {
        const errorResponse = err.response?.data;
        const errorDetails = errorResponse?.details || 'An unexpected error occurred.';
        const formattedError = Object.entries(errorDetails).map(
          ([field, messages]) => `${field}: ${messages.join(', ')}`
        ).join(', ');

        setError(`Error: ${formattedError}`);
        setTimeout(() => setError(''), 2000);
      });
  };

  const cancelDelete = () => {
    setShowConfirmDelete(false);
    setProductToDelete(null);
  };

  const handleUpdate = () => {
    axios.put(`https://rimes-product-management-backend.onrender.com/api/products/${editingProduct}/`, formData)
      .then(() => {
        setEditingProduct(null);
        fetchProducts();
      })
      .catch(err => {
        const errorResponse = err.response?.data;
        const errorDetails = errorResponse?.details || 'An unexpected error occurred.';
        const formattedError = Object.entries(errorDetails).map(
          ([field, messages]) => `${field}: ${messages.join(', ')}`
        ).join(', ');

        setError(`Error: ${formattedError}`);
        setTimeout(() => setError(''), 2000);
      });
  };

  return (
    <div className="flex flex-col">
      {/* Sidebar */}
      <div className='flex  bg-gray-900 h-min'>
      <button
          onClick={() => navigate(-1)} // Navigate back on button click
          className="fixed px-2 mt-1 ml-4 py-2 bg-slate-400 text-white rounded-full hover:bg-gray-500 transition duration-300 mb-4"
        >
          <IoMdArrowRoundBack />
        </button>
        <div  className="w-full bg-gray-900">.</div>
      </div>
      <div className="w-full bg-gray-900 text-white p-1 flex flex-col items-center justify-center shadow-xl">
      
        <h2 className="text-2xl font-bold mb-6">Product Dashboard</h2>
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          className="w-1/2 px-4 py-2 mb-4 border border-gray-600 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {error && (
          <div className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg z-50">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50">
            {successMessage}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-2 flex-1">{product.description}</p>
              <p className="text-gray-900 font-bold mb-4">${product.price}</p>
              <div className="flex gap-4">
                <button
                  onClick={() => handleEdit(product)}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 w-full"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 w-full"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Confirmation Modal for Deletion */}
      <Modal
        isOpen={showConfirmDelete}
        onRequestClose={cancelDelete}
        style={customStyles}
        ariaHideApp={false}
      >
        <h2 className="text-2xl font-bold mb-4">Confirm Deletion</h2>
        <p className="mb-4">Are you sure you want to delete this product?</p>
        <div className="flex gap-4">
          <button
            onClick={confirmDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 w-full"
          >
            Yes, Delete
          </button>
          <button
            onClick={cancelDelete}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300 w-full"
          >
            Cancel
          </button>
        </div>
      </Modal>

      {/* Modal for Editing Product */}
      <Modal
        isOpen={editingProduct !== null}
        onRequestClose={() => setEditingProduct(null)}
        style={customStyles}
        ariaHideApp={false}
      >
        <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter product name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter product description"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="Enter product price"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 w-full"
            >
              Update
            </button>
            <button
              onClick={() => setEditingProduct(null)}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300 w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProductList;
