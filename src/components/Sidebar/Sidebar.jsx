import React from 'react';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import {
  miniLinks,
  mainLinks,
  youLinks,
  exploreLinks,
  moreFromYoutubeLinks,
  bottomLinks,
} from './SidebarData';

const SidebarItem = ({ icon: Icon, title, mini, onClick }) => (
  <div
    onClick={onClick}
    className={
      mini
        ? 'flex flex-col items-center justify-center gap-1 w-full py-4 rounded-lg cursor-pointer text-[var(--text)] hover:bg-[var(--hover)]'
        : 'flex items-center gap-6 px-3 py-2.5 rounded-lg cursor-pointer text-[var(--text)] hover:bg-[var(--hover)]'
    }
  >
    <Icon sx={{ fontSize: mini ? 24 : 22 }} />
    <span className={mini ? 'text-[10px] leading-none' : 'text-sm'}>{title}</span>
  </div>
);

const SidebarSection = ({ title, links, showChevron, withBorder = true, onSelectTab }) => (
  <div className={`py-2 px-3 ${withBorder ? 'border-b border-[var(--border)]' : ''}`}>
    {title && (
      <div className="flex items-center justify-between px-3 py-2 rounded-lg text-[15px] font-medium text-[var(--text)] cursor-pointer hover:bg-[var(--hover)]">
        <span>{title}</span>
        {showChevron && (
          <ChevronRightOutlinedIcon sx={{ fontSize: 20, color: 'var(--sub)' }} />
        )}
      </div>
    )}
    {links.map((item) => (
      <SidebarItem 
        key={item.title} 
        icon={item.icon} 
        title={item.title} 
        onClick={() => onSelectTab && onSelectTab(item.title)} 
      />
    ))}
  </div>
);

const Sidebar = ({ isOpen, onSelectTab }) => {
  if (!isOpen) {
    return (
      <aside className="hidden sm:flex flex-col items-center fixed top-14 left-0 h-[calc(100vh-56px)] w-[72px] bg-[var(--bg)] pt-2 z-20">
        {miniLinks.map((item) => (
          <SidebarItem 
            key={item.title} 
            icon={item.icon} 
            title={item.title} 
            mini 
            onClick={() => onSelectTab && onSelectTab(item.title)} 
          />
        ))}
      </aside>
    );
  }

  return (
    <aside className="hidden sm:block fixed top-14 left-0 h-[calc(100vh-56px)] w-[240px] bg-[var(--bg)] overflow-y-auto pt-2 z-20">
      <SidebarSection links={mainLinks} onSelectTab={onSelectTab} />
      <SidebarSection title="You" links={youLinks} showChevron onSelectTab={onSelectTab} />
      <SidebarSection title="Explore" links={exploreLinks} onSelectTab={onSelectTab} />
      <SidebarSection title="More from YouTube" links={moreFromYoutubeLinks} onSelectTab={onSelectTab} />
      <SidebarSection links={bottomLinks} withBorder={false} onSelectTab={onSelectTab} />
    </aside>
  );
};

export default Sidebar;