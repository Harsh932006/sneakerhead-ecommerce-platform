import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full py-6 text-center text-xs tracking-wide text-neutral-500 border-t border-neutral-900 bg-neutral-950">
      &copy; {new Date().getFullYear()} SneakerHead. All rights reserved.
    </footer>
  )
}

export default Footer