import React, { Children } from 'react'
import Navbar from './Navbar'
import Footer from "./Footer"

const Layout = ({children}) => {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-white antialiased">
      {/* Navbar stays fixed at the top */}
      <Navbar />
      
      {/* flex-grow pushes everything below it down, centering your form perfectly */}
      <main className="flex-grow flex flex-col justify-center items-center w-full px-4 py-8">
        {children}
      </main>
      
      {/* Footer stays glued to the absolute bottom */}
      <Footer />
    </div>
  )
}

export default Layout