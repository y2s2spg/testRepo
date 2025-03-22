import React from 'react';
import BackButton from './BackButton';

const Header = ({ title, showBackButton = false, backDestination = '/' }) => {
  return (
    <header className='bg-gradient-to-r from-sky-600 to-blue-800 text-white p-6 rounded-lg shadow-lg flex items-center gap-4'>
      <BackButton/>
      <h1 className='text-3xl md:text-4xl font-extrabold tracking-tight'>
        {title}
      </h1>
    </header>
  );
};

export default Header;
