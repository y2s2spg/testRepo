import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { FaSearch, FaTimes } from 'react-icons/fa';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/books')
      .then((response) => {
        setBooks(response.data.data);
        setFilteredBooks(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = books.filter(
      (book) =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.publishYear.toString().includes(query)
    );
    setFilteredBooks(filtered);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setFilteredBooks(books);
  };

  return (
    <div className='p-6 bg-gray-50 min-h-screen'>
      {/* Header Component */}
      <Header title='📚 Book List' />
      <br />
      <br />
      {/* Search Input with Icon */}
      <div className='mb-6 flex justify-center'>
        <div className='relative w-full max-w-md'>
          <input
            type='text'
            placeholder='Search by Title, Author, or Year'
            value={searchQuery}
            onChange={handleSearch}
            className='w-full p-4 pl-12 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all'
          />
          <FaSearch className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400' />
          {searchQuery && (
            <FaTimes
              onClick={clearSearch}
              className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer'
            />
          )}
        </div>
      </div>

      {/* Add Book Button */}
      <div className='mb-6 flex justify-end'>
        <Link
          to='books/create'
          className='bg-sky-800 hover:bg-sky-700 text-white py-2 px-4 rounded-md flex items-center gap-2 transition-all'>
          <MdOutlineAddBox className='text-2xl' /> Add Book
        </Link>
      </div>

      {/* Table or Spinner */}
      {loading ? (
        <Spinner />
      ) : filteredBooks.length > 0 ? (
        <div className='bg-white shadow-md rounded-lg p-4'>
          <table className='w-full text-left border-collapse'>
            <thead>
              <tr className='bg-sky-800 text-white'>
                <th className='p-3 rounded-tl-md'>No</th>
                <th className='p-3'>Title</th>
                <th className='p-3 max-md:hidden'>Author</th>
                <th className='p-3 max-md:hidden'>Publish Year</th>
                <th className='p-3 rounded-tr-md'>Operations</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book, index) => (
                <tr
                  key={book._id}
                  className={`hover:bg-gray-100 transition-all ${
                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  }`}>
                  <td className='p-3 text-center'>{index + 1}</td>
                  <td className='p-3'>{book.title}</td>
                  <td className='p-3 max-md:hidden'>{book.author}</td>
                  <td className='p-3 max-md:hidden'>{book.publishYear}</td>
                  <td className='p-3 flex justify-center gap-4'>
                    <Link to={`/books/details/${book._id}`}>
                      <BsInfoCircle className='text-2xl text-green-600 hover:scale-110 transition-transform' />
                    </Link>
                    <Link to={`/books/edit/${book._id}`}>
                      <AiOutlineEdit className='text-2xl text-yellow-500 hover:scale-110 transition-transform' />
                    </Link>
                    <Link to={`/books/delete/${book._id}`}>
                      <MdOutlineDelete className='text-2xl text-red-600 hover:scale-110 transition-transform' />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className='text-center text-gray-600 text-xl mt-6'>No books found matching your search.</p>
      )}
    </div>
  );
};

export default Home;
