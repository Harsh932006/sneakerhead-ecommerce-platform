import React from 'react'

const Hero = () => {
  return (

    <section className="relative w-full rounded-3xl bg-neutral-900 border border-neutral-800/60 overflow-hidden shadow-2xl">
      
      
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 -z-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[128px] pointer-events-none"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 p-8 md:p-16">
        
        
        <div className="flex flex-col items-center text-center md:items-start md:text-left gap-6 max-w-xl">
          
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/20">
            New Drop 2026
          </span>
          
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-neutral-100">
            Explore Trendy <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600">
              Sneakers
            </span>
          </h1>
          
          
          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed max-w-md">
            Step into the future of streetwear. Discover curated elite collections, timeless retros, and limited edition collaborations tailored to your look.
          </p>
          
          
          <button className="group mt-4 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-blue-600/20 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-neutral-900 flex items-center gap-3 transition-all duration-200">
            Explore Now 
            <i className="fa-solid fa-right-long transform group-hover:translate-x-1 transition-transform duration-200"></i>
          </button>
        </div>

        
        <div className="relative w-full max-w-md lg:max-w-none mx-auto flex items-center justify-center">
          
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent rounded-2xl -rotate-2 pointer-events-none"></div>
          
          
          <img 
            className="w-full max-h-[380px] object-contain rounded-2xl filter drop-shadow-[0_20px_50px_rgba(37,99,235,0.15)] transform hover:-rotate-2 hover:scale-[1.03] transition-all duration-500 ease-out" 
            src="/Hero.png" 
            alt="Premium aesthetic neon blue sneaker showcase display" 
          />
        </div>

      </div>
    </section>
    
  )
}

export default Hero