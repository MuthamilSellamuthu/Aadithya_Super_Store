import React from 'react';

const VirtualStore = () => {
  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-black overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full bg-slate-900/80 backdrop-blur-sm text-white py-3 px-6 shadow-md z-20 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
            </svg>
            Immersive 3D Store Experience
          </h1>
        </div>
        <div className="hidden sm:block">
          <span className="bg-white/10 text-xs px-3 py-1.5 rounded text-slate-300 font-medium border border-white/20">
            Navigation Mode
          </span>
        </div>
      </div>
      
      {/* 360 Viewer iframe */}
      <div className="flex-1 relative z-10 w-full h-full pt-12">
        <iframe 
          title="Virtual Store 360 View"
          src="/vrtour.html" 
          className="w-full h-full border-0" 
          allowFullScreen 
          loading="lazy"
          allow="xr-spatial-tracking; gyroscope; accelerometer"
        ></iframe>
      </div>
    </div>
  );
};

export default VirtualStore;
