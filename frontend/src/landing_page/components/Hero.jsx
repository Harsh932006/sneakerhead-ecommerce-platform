import React from 'react'

const Hero = () => {
  return (
    <div className='hero-img'>
        <img className="rounded-2xl" src="/Hero.png" alt="Hero image" />

        <div className='hero-text'>
          <h1>Explore Trendy <br /> Sneakers</h1>
          <button className=''>Explore Now <i class="fa-solid fa-right-long"></i></button>
        </div>
    </div>
  )
}

export default Hero