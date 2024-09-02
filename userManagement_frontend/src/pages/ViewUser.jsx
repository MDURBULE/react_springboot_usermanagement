// src/pages/UserDetail.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ViewUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/${id}`);
        setUser(response.data);
      } catch (error) {
        setError('Error fetching user data.');
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [id]);

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold mb-6">User Details</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {user && (
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-md">
            <p><strong className="font-medium">ID:</strong> {user.id}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-md">
            <p><strong className="font-medium">Name:</strong> {user.name}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-md">
            <p><strong className="font-medium">Username:</strong> {user.userName}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-md">
            <p><strong className="font-medium">Email:</strong> {user.email}</p>
          </div>
          <div className="flex justify-end mt-6">
            <button
              onClick={handleBack}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Back to List
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewUser;
