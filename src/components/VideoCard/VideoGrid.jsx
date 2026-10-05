import React from 'react';
import { useSelector } from 'react-redux';
import VideoCard from './VideoCard';

const VideoGrid = () => {
  const { videos, selectedCategory } = useSelector((state) => state.app);

  // Filter videos based on selected category 
  const filteredVideos = selectedCategory === 'All'
    ? videos
    : videos.filter((video) => video.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="w-full max-w-full overflow-x-hidden px-3 sm:px-6 py-5 mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">        {filteredVideos.length > 0 ? (
        filteredVideos.map((video) => (
          <div key={video.id} className="w-full">
            <VideoCard video={video} />
          </div>
        ))
      ) : (
        <div className="col-span-full text-center py-20 text-gray-400 text-lg">
          No videos found for "{selectedCategory}"
        </div>
      )}
      </div>
    </div>
  );
};

export default VideoGrid;