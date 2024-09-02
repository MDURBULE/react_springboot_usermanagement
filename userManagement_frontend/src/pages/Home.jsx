// src/components/HomePage.jsx
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
const [users,setUser] = useState([]);
// const [users1, setUsers] = useState([]);
const navigate = useNavigate();
useEffect(()=>{
    loadUsers();
},[])

const loadUsers=async()=>{
    const result =await axios.get("http://localhost:8080/users");
    setUser(result.data);
}
const handleDelete = async (id) => {
  const userConfirmed = window.confirm("Are you sure you want to delete this user?");
  
  if (userConfirmed) {
    try {
      await axios.delete(`http://localhost:8080/user/${id}`);
      setUser(users.filter(user => user.id !== id));
      setTimeout(() => {
        navigate('/'); 
      },10);
      setMessage('User deleted successfully!');
    } catch (error) {
      setError('Failed to delete user. Please try again.');
      console.error('Error deleting user:', error);
    }
  }
};

  // State to manage visible users
  const [visibleUsers, setVisibleUsers] = useState(10);

  // Function to load more users
  const showMoreUsers = () => {
    setVisibleUsers((prevValue) => prevValue + 10);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="hidden md:table-header-group">
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Username</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {users.slice(0, visibleUsers).map((user) => (
              <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100 block md:table-row">
                <td className="py-3 px-6 text-left whitespace-nowrap block md:table-cell">
                  <span className="font-medium">{user.id}</span>
                </td>
                <td className="py-3 px-6 text-left block md:table-cell">
                  <span>{user.name}</span>
                </td>
                <td className="py-3 px-6 text-left block md:table-cell">
                  <span>{user.userName}</span>
                </td>
                <td className="py-3 px-6 text-left block md:table-cell">
                  <span>{user.email}</span>
                </td>
                <td className="py-3 px-6 text-center block md:table-cell">
                  <Link to={`/updateUser/${user.id}`} className="bg-blue-500 text-white py-1 px-3 rounded mr-2 hover:bg-blue-600">
                    Update
                  </Link>
                  <Link to={`/viewUser/${user.id}`} className="bg-green-500 text-white py-1 px-3 rounded mr-2 hover:bg-green-600">
                    View
                  </Link>
                  <button onClick={() => handleDelete(user.id)} className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {visibleUsers < users.length && (
        <div className="flex justify-center mt-4">
          <button
            onClick={showMoreUsers}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
