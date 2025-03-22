import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Header from '../components/Header';

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Header title="📚 Book Details" showBackButton={true} backDestination="/" />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      
      {/* Book Details */}
      {loading ? (
        <Spinner />
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-8 mt-8 max-w-[600px] w-full border border-gray-200">
          <h2 className="text-2xl font-bold text-center text-sky-800 mb-6">Book Information</h2>
          <div className="grid gap-4">
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">ID:</span>
              <span className="text-gray-800">{book._id}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Title:</span>
              <span className="text-gray-800">{book.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Author:</span>
              <span className="text-gray-800">{book.author}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Publish Year:</span>
              <span className="text-gray-800">{book.publishYear}</span>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default ShowBook;
