import React from 'react';
import { Link } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const VideoCard = ({ video }) => {
  return (
    <Link to={`/watch/${video.id}`} className="flex flex-col gap-2 cursor-pointer group w-full max-w-full overflow-hidden">
      {/* Thumbnail */}
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
        <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded font-medium">
          {video.duration}
        </span>
      </div>

      {/* Details */}
      <div className="flex gap-3 mt-1 w-full">
        {/* Channel Avatar */}
        <div className="flex-shrink-0">
          <div className="w-9 h-9 rounded-full bg-gray-700 overflow-hidden">
            <img
              src={video.avatar}
              alt={video.channel}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Text Info */}
        <div className="flex flex-col pr-2 min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-[var(--text)] line-clamp-2 leading-tight">
            {video.title}
          </h3>
          <p className="text-xs text-gray-400 mt-1 flex items-center gap-1 hover:text-[var(--text)]">
            <span className="truncate">{video.channel}</span>
            <CheckCircleIcon style={{ fontSize: '12px' }} className="text-gray-400 flex-shrink-0" />
          </p>
          <p className="text-xs text-gray-400">
            {video.views} • {video.timestamp}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;