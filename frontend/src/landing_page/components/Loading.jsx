import React from 'react';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-slate-200 font-sans select-none">
      <div className="relative flex items-center justify-center">
        {/* Outer subtle glowing ring */}
        <div className="absolute w-14 h-14 rounded-full border border-cyan-500/10 bg-cyan-500/5 animate-pulse blur-sm" />
        
        {/* The clean spinning wheel */}
        <div className="w-12 h-12 rounded-full border-[3px] border-slate-800 border-t-cyan-500 animate-spin" />
      </div>
      
      {/* Interactive/Clean status feedback */}
      <p className="mt-4 text-xs font-medium tracking-widest text-slate-400 uppercase animate-pulse">
        Loading...
      </p>
    </div>
  );
};

export default Loading;