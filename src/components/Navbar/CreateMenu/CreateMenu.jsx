import React from 'react';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';

const CreateMenu = () => {
  const handleAction = (type) => {
    if (type === 'upload') {
      alert("Upload Video is  Ready for demo!");
    } else {
      alert("Go live feature is ready for the demo!");
    }
  };

  return (
    <div className="absolute right-28 top-14 w-56 bg-[var(--bg)] border border-[var(--border)] rounded-2xl shadow-xl py-2 z-50 text-[var(--text)]">
      <div 
        onClick={() => handleAction('upload')}
        className="flex items-center gap-3 px-4 py-2.5 hover:bg-[var(--hover)] cursor-pointer text-sm"
      >
        <VideocamOutlinedIcon fontSize="small" className="text-[var(--sub)]" />
        <span>Upload video</span>
      </div>
      <div 
        onClick={() => handleAction('live')}
        className="flex items-center gap-3 px-4 py-2.5 hover:bg-[var(--hover)] cursor-pointer text-sm"
      >
        <LiveTvOutlinedIcon fontSize="small" className="text-[var(--sub)]" />
        <span>Go live</span>
      </div>
    </div>
  );
};

export default CreateMenu;