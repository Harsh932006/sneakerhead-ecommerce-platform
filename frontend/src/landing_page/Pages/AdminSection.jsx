import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminSection = () => {

    const navigate = useNavigate();
    
  return (
    <div className='hero-admin'>
        <h1 className='font-bold text-6xl'>Become a Seller</h1>
        <p className='text-xl'>Join us today to grow your bussiness.</p>

        <div className="btns flex gap-10 px-4 py-2 text-xl mt-8">
            <button className='px-12 py-2 bg-blue-700 rounded-xl' onClick={() => navigate("/admin-signup")}>Sign up as admin/seller</button>
            <button className='px-12 py-2 bg-blue-700 rounded-xl' onClick={() => navigate("/admin-login")}>Login as admin/seller</button>
        </div>
    </div>
  )
}

export default AdminSection