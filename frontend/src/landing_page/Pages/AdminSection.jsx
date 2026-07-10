import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminSection = () => {

    const navigate = useNavigate();
    
  return (
    // <div className='hero-admin'>
    //     <h1 className='font-bold text-6xl'>Become a Seller</h1>
    //     <p className='text-xl'>Join us today to grow your bussiness.</p>

    //     <div className="btns flex gap-10 px-4 py-2 text-xl mt-8">
    //         <button className='px-12 py-2 bg-blue-700 rounded-xl' onClick={() => navigate("/admin-signup")}>Sign up as admin/seller</button>
    //         <button className='px-12 py-2 bg-blue-700 rounded-xl' onClick={() => navigate("/admin-login")}>Login as admin/seller</button>
    //     </div>
    // </div>

    <section className="relative overflow-hidden w-full p-8 md:p-12 rounded-3xl bg-neutral-900 border border-neutral-800/80 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 transition-all duration-300">
      
      {/* Decorative background radial ambient blue tint */}
      <div className="absolute top-0 right-0 -z-10 w-72 h-72 bg-blue-600/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Typography Block */}
      <div className="flex flex-col text-center md:text-left max-w-xl">
        <h2 className="font-black text-4xl md:text-5xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
          Become a Seller
        </h2>
        <p className="text-base md:text-lg text-neutral-400 mt-3 leading-relaxed">
          Reach millions of sneaker enthusiasts globally. List your collection, manage inventory seamlessly, and scale your business using our professional analytics toolkit.
        </p>
      </div>

      {/* Interactive Action Controls (Keeps your exact routing methods) */}
      <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto shrink-0">
        
        {/* Outlined Action (Secondary) */}
        <button 
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-neutral-700 bg-neutral-950 hover:bg-neutral-800 text-neutral-200 text-sm font-bold tracking-wide shadow-md active:scale-[0.99] transition-all duration-200" 
          onClick={() => navigate("/admin-login")}
        >
          Login as Seller
        </button>

        {/* Solid Blue Action (Primary CTA) */}
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