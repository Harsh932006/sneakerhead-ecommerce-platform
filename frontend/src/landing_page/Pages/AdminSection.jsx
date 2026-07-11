import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminSection = () => {

    const navigate = useNavigate();
    
  return (
    <section className="relative overflow-hidden w-full p-8 md:p-12 rounded-3xl bg-neutral-900 border border-neutral-800/80 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 transition-all duration-300">
      
      
      <div className="absolute top-0 right-0 -z-10 w-72 h-72 bg-blue-600/5 rounded-full blur-3xl pointer-events-none"></div>

      
      <div className="flex flex-col text-center md:text-left max-w-xl">
        <h2 className="font-black text-4xl md:text-5xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
          Become a Seller
        </h2>
        <p className="text-base md:text-lg text-neutral-400 mt-3 leading-relaxed">
          Reach millions of sneaker enthusiasts globally. List your collection, manage inventory seamlessly, and scale your business using our professional analytics toolkit.
        </p>
      </div>

      
      <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto shrink-0">
        
        
        <button 
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-neutral-700 bg-neutral-950 hover:bg-neutral-800 text-neutral-200 text-sm font-bold tracking-wide shadow-md active:scale-[0.99] transition-all duration-200" 
          onClick={() => navigate("/admin-login")}
        >
          Login as Seller
        </button>

        
        <button 
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold tracking-wide shadow-lg shadow-blue-600/20 active:scale-[0.99] transition-all duration-200" 
          onClick={() => navigate("/admin-signup")}
        >
          Sign Up as Seller &rarr;
        </button>
        
      </div>
    </section>
  )
}

export default AdminSection