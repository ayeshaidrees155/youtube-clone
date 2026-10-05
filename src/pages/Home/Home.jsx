import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideos } from '../../appSlice/appSlice';
import FilterBar from '../../components/FilterBar/FilterBar';
import VideoGrid from '../../components/VideoCard/VideoGrid';
import Loader from '../../components/Loader/Loader';

const Home = ({ selectedCategory, setSelectedCategory }) => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(fetchVideos(selectedCategory));
  }, [selectedCategory, dispatch]);

  return (
    <div className="w-full min-h-screen bg-[var(--bg)] overflow-x-hidden">
      <FilterBar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      {status === 'loading' ? (
        <Loader />
      ) : (
        <VideoGrid />
      )}
    </div>
  );
};

export default Home;