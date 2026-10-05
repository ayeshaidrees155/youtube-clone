import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdHistory, MdThumbUp, MdPlaylistPlay, MdWatchLater, MdVideoLibrary, MdSwitchAccount } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';

const You = () => {
  const [history, setHistory] = useState([]);
  const [hasChannel, setHasChannel] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('youtube_history')) || [];
    setHistory(savedHistory);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('youtube_history');
    setHistory([]);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 mt-4 text-[var(--text)]">
      {/* "You" Top Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-[var(--border)] pt-4">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl sm:text-4xl font-bold shadow-xl">
            A
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Ayesha</h1>
            <p className="text-xs sm:text-sm text-[var(--sub)]">
              ayesha1@gmail.com
            </p>
            {!hasChannel ? (
              <button
                onClick={() => setHasChannel(true)}
                className="text-sm font-semibold text-blue-500 hover:underline text-left mt-0.5 cursor-pointer bg-transparent border-none p-0"
              >
                Create a channel
              </button>
            ) : (
              <span className="text-xs font-semibold text-green-500 mt-0.5">✓ Channel Active</span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--hover)] hover:bg-[var(--border)] text-[var(--text)] text-sm font-semibold rounded-full transition border border-[var(--border)] cursor-pointer">
            <MdSwitchAccount size={18} />
            Switch account
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--hover)] hover:bg-[var(--border)] text-[var(--text)] text-sm font-semibold rounded-full transition border border-[var(--border)] cursor-pointer">
            <FcGoogle size={18} />
            Google Account
          </button>
        </div>
      </div>

      {/* History Section */}
      <div className="mt-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <MdHistory size={26} className="text-red-600" />
            <h2 className="text-xl font-bold">History</h2>
          </div>
          <div className="flex items-center gap-4">
            {history.length > 0 && (
              <button
                onClick={clearHistory}
                className="text-xs font-semibold text-blue-500 hover:underline cursor-pointer bg-transparent border-none"
              >
                Clear all history
              </button>
            )}
            <button className="px-4 py-1.5 text-xs font-semibold rounded-full bg-[var(--hover)] hover:bg-[var(--border)] border border-[var(--border)] transition cursor-pointer">
              See all
            </button>
          </div>
        </div>

        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 border border-[var(--border)] rounded-2xl bg-[var(--hover)] text-center gap-3">
            <MdVideoLibrary size={48} className="text-[var(--sub)]" />
            <p className="text-sm font-medium text-[var(--sub)]">You haven't watched any videos yet.</p>
            <span className="text-xs text-[var(--sub)]">Videos you watch during your live session will appear here automatically.</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {history.map((video, index) => (
              <div
                key={index}
                onClick={() => navigate(`/watch/${video.id}`)}
                className="cursor-pointer group flex flex-col gap-2.5 bg-[var(--hover)] p-3 rounded-2xl border border-[var(--border)] hover:border-red-600/50 transition-all shadow-sm"
              >
                <div className="relative aspect-video rounded-xl overflow-hidden bg-neutral-800">
                  <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold line-clamp-2 leading-snug">{video.title}</h3>
                  <p className="text-xs text-[var(--sub)] mt-1.5">{video.channelTitle}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Playlists, Liked & Watch Later Grid */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-6">Playlists & Saved</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-5 border border-[var(--border)] rounded-2xl bg-[var(--hover)] flex items-center gap-4 cursor-pointer hover:border-red-600 transition shadow-sm group">
            <div className="p-3 rounded-xl bg-red-600/10 text-red-600 group-hover:bg-red-600 group-hover:text-white transition">
              <MdThumbUp size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Liked Videos</h3>
              <p className="text-xs text-[var(--sub)] mt-0.5">12 saved clips</p>
            </div>
          </div>

          <div className="p-5 border border-[var(--border)] rounded-2xl bg-[var(--hover)] flex items-center gap-4 cursor-pointer hover:border-red-600 transition shadow-sm group">
            <div className="p-3 rounded-xl bg-red-600/10 text-red-600 group-hover:bg-red-600 group-hover:text-white transition">
              <MdWatchLater size={24} />
            </div>
            <div>
              <h3 className="text-sm font-semibold">Watch Later</h3>
              <p className="text-xs text-[var(--sub)] mt-0.5">5 videos queued</p>
            </div>
          </div>

          <div className="p-5 border border-[var(--border)] rounded-2xl bg-[var(--hover)] flex items-center gap-4 cursor-pointer hover:border-red-600 transition shadow-sm group">
            <div className="p-3 rounded-xl bg-red-600/10 text-red-600 group-hover:bg-red-600 group-hover:text-white transition">
              <MdPlaylistPlay size={24} />
            </div>
            <div>
              <h3 className="text-sm font-semibold">Playlists</h3>
              <p className="text-xs text-[var(--sub)] mt-0.5">3 public lists</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default You;