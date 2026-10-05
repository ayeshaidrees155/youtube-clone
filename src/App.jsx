import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar, setSelectedCategory } from './appSlice/appSlice';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Home from './pages/Home/Home';
import VideoDetail from './pages/VideoDetail/VideoDetail';
import Shorts from './components/Sidebar/Shorts/Shorts';
import Subscriptions from './components/Sidebar/Subscriptions/Subscriptions';
import You from './components/Sidebar/You/You';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSidebarOpen, selectedCategory } = useSelector((state) => state.app);

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const handleSetCategory = (category) => {
    dispatch(setSelectedCategory(category));
  };

  const handleSelectTab = (title) => {
    if (title === 'Shorts') {
      navigate('/shorts');
    } else if (title === 'Subscriptions') {
      navigate('/subscriptions');
    } else if (title === 'You' || title === 'History') {
      navigate('/you');
    } else if (title === 'Home') {
      navigate('/');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] overflow-x-hidden">
      <Navbar toggleSidebar={handleToggleSidebar} />

      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} onSelectTab={handleSelectTab} />

        {/* Added w-full and min-w-0 so child grids stretch properly on mobile */}
        <div
          className={`flex-1 w-full min-w-0 transition-all duration-200 ${isSidebarOpen ? 'sm:ml-64' : 'sm:ml-18'
            }`}
        >
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  selectedCategory={selectedCategory}
                  setSelectedCategory={handleSetCategory}
                />
              }
            />
            <Route path="/watch/:id" element={<VideoDetail />} />
            <Route path="/shorts" element={<Shorts />} />
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/you" element={<You />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;