import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateUser = () => {
  const { id } = useParams(); // Correct usage of useParams
  const navigate = useNavigate();
  
  const [user, setUser] = useState({
    name: '',
    userName: '',
    email: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch existing user data on component mount
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/${id}`);
        setUser(response.data);
      } catch (error) {
        setError('Error fetching user data');
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.put(`http://localhost:8080/user/${id}`, user);
      setMessage('User updated successfully!');
      setTimeout(() => {
        navigate('/'); // Redirect to home page after 2 seconds
      }, 2000);
    } catch (error) {
      setError('Failed to update user. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Update User</h2>
      {message && <p className="text-green-500 mb-4">{message}</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
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
            value={user.userName}
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
            value={user.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Update User
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
