import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Comments from '../Comments/Comments';
import RecomendedVideos from '../RecomendedVideos/RecomendedVideos';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const VideoDetail = () => {
  const { id } = useParams();
  const [videoDetail, setVideoDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos`,
          {
            params: {
              part: 'snippet,statistics',
              id: id,
              key: 'AIzaSyC0DN_mBN_QjEkmf3R2V93kvhA3-bBEJp8', // API key
            },
          }
        );
        if (response.data.items.length > 0) {
          setVideoDetail(response.data.items[0]);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching video details:', error);
        setLoading(false);
      }
    };

    if (id) {
      fetchVideoDetails();
    }
  }, [id]);

  return (
    <div className="p-6 text-[var(--text)] flex flex-col lg:flex-row gap-6 mt-10">
      {/* Main Video Player Section */}
      <div className="w-full lg:w-[70%]">
        <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-lg">
          <iframe
            src={`https://www.youtube.com/embed/${id}?autoplay=1`}
            title="YouTube video player"
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Dynamic Video Title, Channel & Stats */}
        {loading ? (
          <p className="text-gray-400 text-sm mt-4">Loading video details...</p>
        ) : videoDetail ? (
          <div className="mt-4 flex flex-col gap-3">
            <h1 className="text-xl font-bold leading-snug">{videoDetail.snippet.title}</h1>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center font-bold text-white">
                  {videoDetail.snippet.channelTitle.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-sm flex items-center gap-1">
                    {videoDetail.snippet.channelTitle}
                    <CheckCircleIcon style={{ fontSize: '14px' }} className="text-gray-400" />
                  </h3>
                  <p className="text-xs text-gray-400">Channel</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="bg-gray-800 px-4 py-2 rounded-full text-xs font-semibold">
                  {Number(videoDetail.statistics.viewCount).toLocaleString()} views
                </span>
              </div>
            </div>

            <div className="bg-gray-800/50 p-3 rounded-xl text-xs text-gray-300 leading-relaxed whitespace-pre-line max-h-28 overflow-y-auto">
              {videoDetail.snippet.description}
            </div>
          </div>
        ) : null}

        <Comments videoId={id} />
      </div>

      {/* Recommended Videos Section with dynamic search query prop */}
      <div className="w-full lg:w-[30%] flex flex-col gap-4">
        <RecomendedVideos searchQuery={videoDetail?.snippet?.title} />
      </div>
    </div>
  );
};

export default VideoDetail;