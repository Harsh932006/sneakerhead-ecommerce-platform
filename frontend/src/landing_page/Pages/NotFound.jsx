import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
  return (
    


    <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white antialiased px-6 py-24">
      <div className="text-center max-w-md mx-auto relative group">
        
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-64 h-64 bg-blue-600/10 rounded-full blur-[96px] pointer-events-none"></div>

        
        <p className="text-sm font-extrabold uppercase tracking-widest text-blue-400">
          Error Code 404
        </p>
        
        
        <h1 className="mt-4 text-4xl font-black tracking-tight text-neutral-100 sm:text-5xl leading-tight">
          Lost in Space?
        </h1>
        
        
        <p className="mt-6 text-sm md:text-base leading-relaxed text-neutral-400">
          Sorry, we couldn’t find the page you’re looking for. The custom sneaker collection or dashboard route might have dropped somewhere else.
        </p>
        
        
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          
          
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-neutral-700 bg-neutral-950 hover:bg-neutral-900 text-neutral-200 text-xs font-bold tracking-wide shadow-md active:scale-[0.98] transition-all duration-200"
          >
            &larr; Go Back
          </button>

         
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold tracking-wide shadow-lg shadow-blue-600/20 active:scale-[0.98] text-center transition-all duration-200"
          >
            Take Me Home
          </Link>
          
        </div>
      </div>
    </div>
  )
}

export default NotFound