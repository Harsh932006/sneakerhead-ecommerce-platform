import React from 'react'
import Hero from '../components/Hero'
import Layout from '../components/Layout'
import AdminSection from './AdminSection'

const HomePage = () => {
  return (
    <div className='home p-2 bg-neutral-800'>
        <Layout>
          <Hero />
          <AdminSection />
        </Layout>    
    </div>
  )
}

export default HomePage