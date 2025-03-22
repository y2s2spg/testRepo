import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Header from '../components/Header';

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        alert('An error happened. Please check the console.');
        console.error(err);
      });
  }, [id]);

  const handleEditBook = () => {
    const data = { title, author, publishYear };

    setLoading(true);

    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((err) => {
        setLoading(false);
        alert('An error occurred. Please check the console.');
        console.error(err);
      });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Header title="📚 Edit Book" showBackButton={true} backDestination="/" />
      <br></br>
      <br />
      <br />
      <br />
      <br />
      {loading ? (
        <Spinner />
      ) : (
        <div className="bg-white shadow-lg rounded-lg w-[500px] mx-auto p-6 border border-gray-200">
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-sky-400"
              placeholder="Enter the book title"
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-sky-400"
              placeholder="Enter the author's name"
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">Publish Year</label>
            <input
              type="text"
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-sky-400"
              placeholder="Enter the publish year"
            />
          </div>
          <button
            onClick={handleEditBook}
            className="w-full bg-sky-600 text-white py-3 rounded-lg hover:bg-sky-700 transition-all text-lg font-medium">
            Save Book
          </button>
        </div>
      )}
    </div>
  );
};

export default EditBook;
