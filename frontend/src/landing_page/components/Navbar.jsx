import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { userApi, setUserAccessToken } from "../../api/userApi";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await userApi.get("/api/auth/user-logout");

      setUserAccessToken(null);
      setUser(null);
      navigate("/");
      toast.success("Logged out successfully.");
      setIsOpen(false); // Close menu on logout
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header className="w-full max-w-7xl mx-auto px-4 pt-4 relative z-50">
      <nav className="flex flex-col md:flex-row md:justify-between md:items-center px-6 md:px-8 py-4 rounded-2xl bg-neutral-900/60 backdrop-blur-md border border-neutral-800/50 shadow-lg">
        
        {/* Brand and Mobile Toggle Button Container */}
        <div className="flex justify-between items-center w-full md:w-auto">
          <div className="text-2xl sm:text-3xl text-red-600 font-black tracking-tight hover:opacity-90 transition-opacity">
            <Link to="/" onClick={() => setIsOpen(false)}>SneakerHead</Link>
          </div>

          {/* Hamburger Menu Icon for Mobile */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="text-neutral-300 hover:text-blue-400 focus:outline-none md:hidden transition-colors"
            aria-label="Toggle Menu"
          >
            <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>

        {/* Navigation links - hidden on mobile, flex on desktop */}
        <ul className={`${isOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row items-start md:items-center w-full md:w-auto gap-6 md:gap-12 text-sm font-medium text-neutral-300 mt-4 md:mt-0 pt-4 md:pt-0 border-t border-neutral-800/50 md:border-t-0`}>
          <li className="hover:text-blue-400 transition-colors duration-200">
            <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          </li>
          <li className="hover:text-blue-400 transition-colors duration-200">
            <Link to="/products" onClick={() => setIsOpen(false)}>Products</Link>
          </li>
          
          {user ? (
            <>
              <li className="text-neutral-400 md:border-l md:border-neutral-800 md:pl-4">
                Welcome, <span className="text-blue-400 font-semibold">{user.username}</span>
              </li>
              <li className="w-full md:w-auto">
                <button 
                  onClick={handleLogout}
                  className="w-full md:w-auto text-center px-4 py-2 rounded-xl bg-neutral-800 hover:bg-red-950/40 hover:text-red-400 border border-neutral-700/50 hover:border-red-900/50 transition-all duration-200"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="hover:text-blue-400 transition-colors duration-200">
                <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
              </li>
              <li className="hover:text-blue-400 transition-colors duration-200">
                <Link 
                  to="/signup" 
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl hover:text-blue-500 text-white transition-all duration-200"
                >
                  Signup
                </Link>
              </li>
            </>
          )}

          {/* Cart Icon */}
          <li className="hover:text-blue-400 text-base transition-colors duration-200 md:pl-2 pt-2 md:pt-0">
            <Link to="/cart" onClick={() => setIsOpen(false)} aria-label="Shopping Cart">
              <i className="fa-solid fa-cart-shopping"></i>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;