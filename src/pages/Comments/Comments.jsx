import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SortIcon from '@mui/icons-material/Sort';

const Comments = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/commentThreads`,
          {
            params: {
              part: 'snippet',
              videoId: videoId,
              key: 'AIzaSyC0DN_mBN_QjEkmf3R2V93kvhA3-bBEJp8', 
              maxResults: 15,
            },
          }
        );
        setComments(response.data.items);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching comments:', error);
        setLoading(false);
      }
    };

    if (videoId) {
      fetchComments();
    }
  }, [videoId]);

  
  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const dummyComment = {
      id: Date.now(),
      snippet: {
        topLevelComment: {
          snippet: {
            authorDisplayName: 'You (Current User)',
            authorProfileImageUrl: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
            textDisplay: newComment,
            publishedAt: new Date().toISOString(),
          }
        }
      }
    };

    setComments([dummyComment, ...comments]);
    setNewComment('');
  };

  if (loading) return <p className="text-gray-400 text-sm mt-4">Loading comments...</p>;

  return (
    <div className="flex flex-col gap-6 mt-6">
      {/* Comments Header & Sort */}
      <div className="flex items-center gap-8">
        <h3 className="text-xl font-bold text-[var(--text)]">
          {comments.length} Comments
        </h3>
        <button className="flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-[var(--text)]">
          <SortIcon /> Sort by
        </button>
      </div>

      {/* Add Comment Input Box */}
      <form onSubmit={handleAddComment} className="flex gap-4 items-start">
        <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden flex-shrink-0">
          <img 
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" 
            alt="User" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col flex-1 gap-2">
          <input 
            type="text" 
            placeholder="Add a comment..." 
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="bg-transparent border-b border-gray-600 focus:border-white text-[var(--text)] text-sm pb-1 outline-none transition-colors"
          />
          {newComment && (
            <div className="flex justify-end gap-2">
              <button 
                type="button" 
                onClick={() => setNewComment('')}
                className="px-4 py-1.5 text-xs font-semibold rounded-full hover:bg-gray-800 text-[var(--text)]"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-4 py-1.5 text-xs font-semibold rounded-full bg-blue-600 text-white hover:bg-blue-500"
              >
                Comment
              </button>
            </div>
          )}
        </div>
      </form>

      {/* Comments List */}
      <div className="flex flex-col gap-4">
        {comments.map((item) => {
          const comment = item.snippet.topLevelComment.snippet;
          return (
            <div key={item.id} className="flex gap-4 items-start">
              <img 
                src={comment.authorProfileImageUrl} 
                alt={comment.authorDisplayName} 
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[var(--text)]">{comment.authorDisplayName}</span>
                  <span className="text-[10px] text-gray-400">{new Date(comment.publishedAt).toLocaleDateString()}</span>
                </div>
                <p className="text-xs text-[var(--text)] mt-1 leading-relaxed">{comment.textDisplay}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comments;