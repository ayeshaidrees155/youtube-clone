import React from 'react';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full">
     
      <div className="w-12 h-12 border-4 border-[#FF0000] border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-400 font-medium text-sm tracking-wide">Loading videos...</p>
    </div>
  );
};

export default Loader;