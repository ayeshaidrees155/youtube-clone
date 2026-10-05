import React from 'react';
import { IoMicOutline, IoCloseOutline } from 'react-icons/io5';

const VoiceSearch = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs">
      <div className="bg-[var(--bg)] border border-[var(--border)] rounded-2xl w-[90%] max-w-lg p-6 shadow-2xl relative text-[var(--text)] flex flex-col items-center">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-[var(--hover)] text-[var(--text)] cursor-pointer"
        >
          <IoCloseOutline size={24} />
        </button>

        {/* Title */}
        <h2 className="text-xl font-normal self-start mb-2">Search with your voice</h2>
        <p className="text-sm text-[var(--sub)] self-start mb-10">
          To search by voice, go to your browser settings and allow access to microphone.
        </p>

        {/* Mic Animation Button */}
        <div className="my-6 relative flex items-center justify-center">
          <div className="absolute w-24 h-24 bg-red-500/20 rounded-full animate-ping"></div>
          <div className="w-20 h-20 bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg relative z-10 cursor-pointer">
            <IoMicOutline size={36} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default VoiceSearch;