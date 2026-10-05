import React, { useRef } from 'react';

const FilterBar = ({ selectedCategory, setSelectedCategory }) => {
  const scrollRef = useRef(null);

  const categories = [
    'All',
    'Pakistani dramas',
    'Music',
    'Mixes',
    'Food challenges',
    'Vlogs',
    'Podcasts',
    'Gaming',
    'Programming',
    'Movies',
    'Shopping',
    'News',
    'Live'
  ];

  return (
    <div className="relative flex items-center px-4 py-3 bg-[var(--bg)] sticky top-14 z-30">

      
      <div 
        ref={scrollRef}
        className="flex items-center w-full overflow-x-auto no-scrollbar gap-3 scroll-smooth px-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((category, index) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={index}
              onClick={() => setSelectedCategory(category)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-sm font-medium cursor-pointer transition-colors duration-200 ${
                isActive
                  ? 'bg-[var(--text)] text-[var(--bg)]'
                  : 'bg-[var(--search)] text-[var(--text)] border border-[var(--border)] hover:bg-[var(--hover)]'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

    </div>
  );
};

export default FilterBar;