import React from 'react';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

const ProfileMenu = ({ onSignOut }) => {
  return (
    <div className="absolute right-4 top-14 w-72 bg-[var(--bg)] border border-[var(--border)] rounded-2xl shadow-xl py-3 z-50 text-[var(--text)]">
      {/* User Info Header */}
      <div className="flex items-center gap-3 px-4 pb-3 border-b border-[var(--border)]">
        <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
          A
        </div>
        <div className="flex flex-col overflow-hidden">
          <span className="font-semibold text-sm">Ayesha</span>
          <span className="text-xs text-gray-400 truncate">ayesha1@gmail.com</span>
        </div>
      </div>

      {/* Menu Options */}
      <div className="py-2 flex flex-col">
        <div
          onClick={() => alert("Opening User Channel...")}
          className="flex items-center gap-3 px-4 py-2.5 hover:bg-[var(--hover)] cursor-pointer text-sm"
        >
          <AccountBoxIcon fontSize="small" className="text-[var(--sub)]" />
          <span>Your channel</span>
        </div>
        <div
          onClick={() => alert("Opening YouTube Studio...")}
          className="flex items-center gap-3 px-4 py-2.5 hover:bg-[var(--hover)] cursor-pointer text-sm"
        >
          <SettingsIcon fontSize="small" className="text-[var(--sub)]" />
          <span>YouTube Studio</span>
        </div>
        <div
          onClick={onSignOut}
          className="flex items-center gap-3 px-4 py-2.5 hover:bg-[var(--hover)] cursor-pointer text-sm border-t border-[var(--border)] mt-1 pt-3 text-red-500 hover:text-red-600"
        >
          <LogoutIcon fontSize="small" />
          <span>Sign out</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;