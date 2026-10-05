import React from 'react';

const Shorts = () => {
  return (
    <div className="relative flex flex-col items-center justify-center h-[calc(100vh-56px)] bg-[var(--bg)] text-[var(--text)]">
      <div className="flex flex-col items-center justify-center p-8 border border-[var(--border)] rounded-2xl bg-[var(--hover)] max-w-sm mx-4 shadow-xl text-center gap-4">
        <div className="w-12 h-12 bg-red-600/10 text-red-600 rounded-full flex items-center justify-center font-bold text-xl">
          ⚡
        </div>
        <div>
          <h2 className="text-xl font-bold mb-1">Shorts feed is currently updating</h2>
          <p className="text-xs text-[var(--sub)] leading-relaxed">
            New vertical videos are loading from the server. Check back shortly to watch trending clips.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Shorts;