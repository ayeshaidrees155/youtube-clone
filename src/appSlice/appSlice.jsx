import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//Official API key
const API_KEY = 'AIzaSyC0DN_mBN_QjEkmf3R2V93kvhA3-bBEJp8';

const getTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + ' years ago';

  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + ' months ago';

  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + ' days ago';

  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + ' hours ago';

  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + ' minutes ago';

  return 'Just now';
};
//async thunk is a utility function
export const fetchVideos = createAsyncThunk(
  'app/fetchVideos',
  async (category) => {
    const cacheKey = `youtube_videos_${category}`;
    
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const searchQuery = category === 'All' ? 'pakistani popular' : category;
    try {
      const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
        params: {
          part: 'snippet',
          maxResults: 18,
          q: searchQuery,
          type: 'video',
          key: API_KEY,
        },
      });

      if (!response.data || !response.data.items) {
        return [];
      }

      const formattedVideos = response.data.items.map((item) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        channel: item.snippet.channelTitle,
        views: '125K views', 
        timestamp: item.snippet.publishedAt ? getTimeAgo(item.snippet.publishedAt) : '2 days ago',
        duration: '10:00',
        thumbnail: item.snippet.thumbnails.medium.url,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop',
        category: category,
      }));

      
      localStorage.setItem(cacheKey, JSON.stringify(formattedVideos));

      return formattedVideos;
    } catch (error) {
      console.error('Error fetching videos from YouTube API:', error);
      return [];
    }
  }
);

 
const savedSidebar = localStorage.getItem('isSidebarOpen');

const initialState = {
  isSidebarOpen: savedSidebar !== null ? JSON.parse(savedSidebar) : false,
  selectedCategory: 'All',
  theme: 'dark',//set theme dark by default
  videos: [],
  status: 'idle',
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
      
      localStorage.setItem('isSidebarOpen', JSON.stringify(state.isSidebarOpen));
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
    },
  },
  //API life cycle handling
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.videos = action.payload;
      })
      .addCase(fetchVideos.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { toggleSidebar, setSelectedCategory, toggleTheme } = appSlice.actions;
export default appSlice.reducer;