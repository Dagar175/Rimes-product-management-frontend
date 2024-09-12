import React from 'react';
import { Link } from 'react-router-dom';
import ProductForm from './ProductForm';
import { HomeIcon, InformationCircleIcon, MailIcon } from '@heroicons/react/outline';
import { AiFillProduct } from "react-icons/ai";

const Header = () => (
  <header className="bg-gray-800 text-white py-4">
    <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">
      <h1 className="text-2xl font-bold">RIMES Product Management</h1>
      <nav className="flex space-x-4">
        <Link to="/products" className="">
          <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 flex items-center">
            <AiFillProduct className="mr-2" /> All Products
          </button>
        </Link>
      </nav>
    </div>
  </header>
);

const Footer = () => (
  <footer className="bg-gray-800 text-white py-4">
    <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center space-y-2">
      <p>&copy; {new Date().getFullYear()} RIMES Product Management. All rights reserved.</p>
      <div className="flex space-x-4">
        <a href="#" className="text-gray-400 hover:text-gray-300">
          <HomeIcon className="h-5 w-5" />
        </a>
        <a href="#" className="text-gray-400 hover:text-gray-300">
          <InformationCircleIcon className="h-5 w-5" />
        </a>
        <a href="#" className="text-gray-400 hover:text-gray-300">
          <MailIcon className="h-5 w-5" />
        </a>
      </div>
    </div>
  </footer>
);

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Header />
      
      <main className="p-8 flex flex-col items-center space-y-8 md:flex-row md:space-y-0 md:justify-between">
        <div className="hidden md:block">
          <img src="/1.png" className="w-full h-auto" alt="Product" />
        </div>
        <ProductForm className = "sm:w-full"/>
        <div className="hidden md:block">
          <img src="/1.png" className="w-full h-auto" alt="Product" />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
