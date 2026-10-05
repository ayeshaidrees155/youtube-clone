import React from 'react';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

const Notification = () => {
  const notifications = [
    { id: 1, text: 'The Untold Legacy uploaded a new video.', time: '2 hours ago' },
    { id: 2, text: 'Traversy Media published a new live stream.', time: '5 hours ago' },
    { id: 3, text: 'Your video is ready to be shared.', time: '1 day ago' },
  ];

  return (
    <div className="absolute right-14 top-14 w-80 bg-[var(--bg)] border border-[var(--border)] rounded-2xl shadow-xl py-3 z-50 text-[var(--text)]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pb-3 border-b border-[var(--border)]">
        <span className="font-semibold text-sm">Notifications</span>
        <NotificationsNoneIcon fontSize="small" className="text-[var(--sub)]" />
      </div>

      {/* Notifications List */}
      <div className="py-2 flex flex-col max-h-72 overflow-y-auto">
        {notifications.map((notif) => (
          <div key={notif.id} className="flex flex-col px-4 py-2.5 hover:bg-[var(--hover)] cursor-pointer border-b border-[var(--border)]/40 text-sm">
            <span className="leading-snug">{notif.text}</span>
            <span className="text-[11px] text-gray-400 mt-1">{notif.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;