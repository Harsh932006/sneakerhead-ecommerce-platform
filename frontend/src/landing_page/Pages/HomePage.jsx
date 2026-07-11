import React from 'react'
import Hero from '../components/Hero'
import Layout from '../components/Layout'
import AdminSection from './AdminSection'

const HomePage = () => {
  return (
    

    <Layout>
      
      <div className="w-full max-w-8xl mx-auto flex flex-col gap-20 px-4 md:px-8 py-6">
        
        {/* Main Hero Showcase */}
        <Hero />

        
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8 rounded-2xl bg-neutral-900/40 border border-neutral-800/60 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600/10 rounded-xl text-blue-400 text-xl">
              <i className="fa-solid fa-truck-fast"></i>
            </div>
            <div>
              <h3 className="font-semibold text-neutral-100">Free Shipping</h3>
              <p className="text-xs text-neutral-400">On all orders above $150</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600/10 rounded-xl text-blue-400 text-xl">
              <i className="fa-solid fa-shield-halved"></i>
            </div>
            <div>
              <h3 className="font-semibold text-neutral-100">Secure Checkout</h3>
              <p className="text-xs text-neutral-400">100% protected payments</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600/10 rounded-xl text-blue-400 text-xl">
              <i className="fa-solid fa-rotate-left"></i>
            </div>
            <div>
              <h3 className="font-semibold text-neutral-100">Easy Returns</h3>
              <p className="text-xs text-neutral-400">30-day money back guarantee</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600/10 rounded-xl text-blue-400 text-xl">
              <i className="fa-solid fa-headset"></i>
            </div>
            <div>
              <h3 className="font-semibold text-neutral-100">24/7 Support</h3>
              <p className="text-xs text-neutral-400">Live chat & phone access</p>
            </div>
          </div>
        </section>

        
        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-neutral-100">Shop by Category</h2>
            <p className="text-sm text-neutral-400">Find the perfect pair curated for your specific style vibe</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 h-48">
            <div className="relative group overflow-hidden rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center cursor-pointer">
              <span className="text-lg font-bold text-neutral-200 z-10 group-hover:text-blue-400 transition-colors">Basketball</span>
              <div className="absolute inset-0 bg-blue-600/5 group-hover:bg-blue-600/10 transition-all duration-300"></div>
            </div>
            <div className="relative group overflow-hidden rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center cursor-pointer">
              <span className="text-lg font-bold text-neutral-200 z-10 group-hover:text-blue-400 transition-colors">Lifestyle & Retro</span>
              <div className="absolute inset-0 bg-blue-600/5 group-hover:bg-blue-600/10 transition-all duration-300"></div>
            </div>
            <div className="relative group overflow-hidden rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center cursor-pointer">
              <span className="text-lg font-bold text-neutral-200 z-10 group-hover:text-blue-400 transition-colors">Running & Performance</span>
              <div className="absolute inset-0 bg-blue-600/5 group-hover:bg-blue-600/10 transition-all duration-300"></div>
            </div>
          </div>
        </section>

        
        <AdminSection />


      </div>
    </Layout>
  )
}

export default HomePage