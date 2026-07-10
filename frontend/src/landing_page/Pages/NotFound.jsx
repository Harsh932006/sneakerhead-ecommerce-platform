import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
  return (
    // <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-24 sm:py-32 lg:px-8">
    //   <div className="text-center">
    //     {/* Error Code Graphic */}
    //     <p className="text-base font-semibold text-indigo-600 sm:text-lg">404</p>
        
    //     {/* Main Heading */}
    //     <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
    //       Page not found
    //     </h1>
        
    //     {/* Subtext */}
    //     <p className="mt-6 text-base leading-7 text-gray-600 max-w-md mx-auto">
    //       Sorry, we couldn’t find the page you’re looking for. Perhaps you misspelled the URL or the page has been moved.
    //     </p>
        
    //     {/* Action Buttons */}
    //     <div className="mt-10 flex items-center justify-center gap-x-4">
    //       {/* Go Back Button (Uses browser history) */}
    //       <button
    //         onClick={() => navigate(-1)}
    //         className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-all duration-200"
    //       >
    //         &larr; Go back
    //       </button>

    //       {/* Go Home Link */}
    //       <Link
    //         to="/"
    //         className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-200"
    //       >
    //         Take me home
    //       </Link>
    //     </div>
    //   </div>
    // </div>


    <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white antialiased px-6 py-24">
      <div className="text-center max-w-md mx-auto relative group">
        
        {/* Decorative Ambient Blue Glow behind the 404 message */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-64 h-64 bg-blue-600/10 rounded-full blur-[96px] pointer-events-none"></div>

        {/* Error Code Graphic using custom Cornflower Blue */}
        <p className="text-sm font-extrabold uppercase tracking-widest text-blue-400">
          Error Code 404
        </p>
        
        {/* Main Heading */}
        <h1 className="mt-4 text-4xl font-black tracking-tight text-neutral-100 sm:text-5xl leading-tight">
          Lost in Space?
        </h1>
        
        {/* Subtext with balanced dark text color rendering */}
        <p className="mt-6 text-sm md:text-base leading-relaxed text-neutral-400">
          Sorry, we couldn’t find the page you’re looking for. The custom sneaker collection or dashboard route might have dropped somewhere else.
        </p>
        
        {/* Action Buttons with your theme colors */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          
          {/* Go Back Button (Uses browser history) */}
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-neutral-700 bg-neutral-950 hover:bg-neutral-900 text-neutral-200 text-xs font-bold tracking-wide shadow-md active:scale-[0.98] transition-all duration-200"
          >
            &larr; Go Back
          </button>

          {/* Go Home Link (Royal Blue CTA) */}
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