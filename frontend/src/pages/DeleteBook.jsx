import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((err) => {
        setLoading(false);
        alert('An error occurred. Please check the console.');
        console.log(err);
      });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Header title="📚 Delete Book" showBackButton={true} backDestination="/" />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Delete Book</h1>
      {loading && <Spinner />}
      <div className="bg-white shadow-lg rounded-lg w-[500px] mx-auto p-6 border border-gray-200 text-center">
        <h3 className="text-2xl font-medium text-gray-700 mb-6">
          Are you sure you want to delete this book?
        </h3>
        <button
          className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-all text-lg font-medium"
          onClick={handleDeleteBook}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
