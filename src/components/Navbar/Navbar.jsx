import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme, fetchVideos, setSelectedCategory } from '../../appSlice/appSlice';
import {
  IoMenuOutline,
  IoSearchOutline,
  IoMicOutline,
  IoAddOutline,
  IoNotificationsOutline,
  IoSunnyOutline,
  IoMoonOutline
} from 'react-icons/io5';
import Notification from './Notification/Notification';
import CreateMenu from './CreateMenu/CreateMenu';
import VoiceSearch from './VoiceSearch/VoiceSearch';

import ProfileMenu from './ProfileMenu/ProfileMenu';
import SignOutPage from './SignOutPage/SignOutPage';

const Navbar = ({ toggleSidebar }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [showVoiceSearch, setShowVoiceSearch] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);

  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.app);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
    document.documentElement.classList.toggle('dark');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      dispatch(setSelectedCategory(searchTerm));
      dispatch(fetchVideos(searchTerm));
    }
  };

  const toggleNotificationMenu = () => {
    setShowNotifications(!showNotifications);
    setShowCreateMenu(false);
    setShowProfileMenu(false);
  };

  const toggleCreateMenu = () => {
    setShowCreateMenu(!showCreateMenu);
    setShowNotifications(false);
    setShowProfileMenu(false);
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
    setShowNotifications(false);
    setShowCreateMenu(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 h-14 bg-[var(--bg)] border-b border-[var(--border)] transition-colors duration-200">

      {/* Menu & Logo */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2.5 rounded-full hover:bg-[var(--hover)] cursor-pointer text-[var(--text)]"
        >
          <IoMenuOutline size={26} />
        </button>

        <div className="flex items-center gap-1 cursor-pointer">
          <div className="bg-red-600 text-white flex items-center justify-center rounded-xl w-8 h-6">
            <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" className="w-4 h-4 fill-current">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path>
            </svg>
          </div>
          <span className="font-bold text-xl tracking-tighter text-[var(--text)]">YouTube</span>
          <sup className="text-[10px] font-normal text-[var(--sub)] ml-0.5">PK</sup>
        </div>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-[600px] mx-4 justify-center">
        <div className="flex items-center w-full max-w-[500px]">
          <div className="flex items-center w-full bg-transparent border border-[var(--border)] rounded-full overflow-hidden focus-within:border-blue-500 shadow-inner">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent outline-none text-[var(--text)] placeholder-[var(--sub)] text-sm px-4 py-2"
            />
            <button
              type="submit"
              className="flex items-center justify-center px-6 py-2 text-[var(--text)] hover:opacity-80 cursor-pointer border-l border-[var(--border)] bg-[var(--hover)] flex-shrink-0"
              title="Search"
            >
              <IoSearchOutline size={20} />
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowVoiceSearch(true)}
          className="ml-3 p-2.5 rounded-full hover:bg-[var(--hover)] bg-[var(--search)] cursor-pointer text-[var(--text)] flex-shrink-0 border border-[var(--border)]"
          title="Search with your voice"
        >
          <IoMicOutline size={22} />
        </button>
      </form>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleThemeToggle}
          className="p-2.5 rounded-full hover:bg-[var(--hover)] cursor-pointer text-[var(--text)]"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <IoSunnyOutline size={24} /> : <IoMoonOutline size={24} />}
        </button>

        {/* Create Button & Dropdown */}
        <div className="relative">
          <button
            onClick={toggleCreateMenu}
            className="rounded-full hover:bg-[var(--hover)] cursor-pointer text-[var(--text)] flex items-center gap-1.5 text-sm font-medium bg-[var(--search)] border border-[var(--border)] px-3.5 py-1.5"
          >
            <IoAddOutline size={22} />
            <span className="hidden sm:inline">Create</span>
          </button>
          {showCreateMenu && <CreateMenu />}
        </div>

        {/* Notifications Icon & Dropdown */}
        <div className="relative">
          <button
            onClick={toggleNotificationMenu}
            className="p-2.5 rounded-full hover:bg-[var(--hover)] cursor-pointer text-[var(--text)] relative"
            title="Notifications"
          >
            <IoNotificationsOutline size={24} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-600 rounded-full"></span>
          </button>
          {showNotifications && <Notification />}
        </div>

        {/* Profile Avatar & Dropdown */}
        <div className="relative">
          <div
            onClick={toggleProfileMenu}
            className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm cursor-pointer ml-1 shadow-sm hover:opacity-90"
          >
            A
          </div>
          {showProfileMenu && (
            <ProfileMenu
              onSignOut={() => {
                setShowProfileMenu(false);
                setShowSignOutModal(true);
              }}
            />
          )}
        </div>
      </div>

      {/* Voice Search Modal Popup */}
      {showVoiceSearch && <VoiceSearch onClose={() => setShowVoiceSearch(false)} />}

      {/* Sign In / Sign Out Modal */}
      {showSignOutModal && (
        <SignOutPage
          onLoginSuccess={() => setShowSignOutModal(false)}
        />
      )}

    </header>
  );
};

export default Navbar;