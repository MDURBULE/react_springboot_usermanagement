import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddUser = () => {
  const [user, setUser] = useState({
    name: '',
    userName: '',
    email: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { name, userName, email } = user;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post('http://localhost:8080/user', user);
      setMessage('User added successfully!');
      setTimeout(() => {
        navigate('/'); // Redirect to home page after 2 seconds
      }, 100);
    } catch (error) {
      setError('Failed to add user. Please try again.');
      console.error('Error:', error); // Handle error response
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Add User</h2>
      {message && <p className="text-green-500 mb-4">{message}</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="userName" className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={userName}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddUser;
