import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RecomendedVideos = ({ searchQuery }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const query = searchQuery ? searchQuery.split(' ').slice(0, 3).join(' ') : 'trending videos';
        
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search`,
          {
            params: {
              part: 'snippet',
              q: query,
              type: 'video',
              maxResults: 15,
              key: 'AIzaSyC0DN_mBN_QjEkmf3R2V93kvhA3-bBEJp8',
            },
          }
        );
        setRecommendations(response.data.items);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recommended videos:', error);
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [searchQuery]);

  if (loading) return <p className="text-gray-400 text-xs">Loading recommendations...</p>;

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-lg font-semibold text-[var(--text)]">Recommended Videos</h3>
      {recommendations.map((item) => {
        const videoIdValue = item.id.videoId || (typeof item.id === 'string' ? item.id : null);
        if (!videoIdValue) return null;
        const snippet = item.snippet;

        return (
          <div 
            key={videoIdValue} 
            onClick={() => navigate(`/video/${videoIdValue}`)}
            className="flex gap-2 cursor-pointer group"
          >
            {/* Thumbnail */}
            <div className="w-40 h-24 bg-black rounded-xl overflow-hidden flex-shrink-0">
              <img 
                src={snippet.thumbnails.medium.url} 
                alt={snippet.title} 
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
              />
            </div>

            {/* Video Info */}
            <div className="flex flex-col gap-1">
              <h4 className="text-xs font-semibold text-[var(--text)] line-clamp-2 group-hover:text-blue-400 transition-colors">
                {snippet.title}
              </h4>
              <span className="text-[10px] text-gray-400">{snippet.channelTitle}</span>
              <span className="text-[10px] text-gray-400">{new Date(snippet.publishedAt).toLocaleDateString()}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecomendedVideos;