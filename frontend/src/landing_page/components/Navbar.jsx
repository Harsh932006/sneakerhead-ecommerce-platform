import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { userApi, setUserAccessToken } from "../../api/userApi"
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  
  const navigate = useNavigate();

  const handleLogout = async () => {
    try{
      await userApi.get("/api/auth/user-logout")

      setUserAccessToken(null);
      setUser(null);
      navigate("/");
      toast.success("Logged out successfully.");
    }catch(err){
      console.log(err);
    }
  }
  return (
    

    <header className="w-full max-w-7xl mx-auto px-4 pt-4">
      <nav className="flex justify-between items-center px-8 py-4 rounded-2xl bg-neutral-900/60 backdrop-blur-md border border-neutral-800/50 shadow-lg">
        
        
        <div className="text-2xl sm:text-3xl text-red-600 font-black tracking-tight hover:opacity-90 transition-opacity">
          <Link to="/">SneakerHead</Link>
        </div>

        
        <ul className="flex items-center gap-6 md:gap-12 text-sm font-medium text-neutral-300">
          <li className="hover:text-blue-400 transition-colors duration-200">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-blue-400 transition-colors duration-200">
            <Link to="/products">Products</Link>
          </li>
          
          {user ? (
            <>
              <li className="text-neutral-400 border-l border-neutral-800 pl-4 hidden sm:inline">
                Welcome, <span className="text-blue-400 font-semibold">{user.username}</span>
              </li>
              <li>
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-red-950/40 hover:text-red-400 border border-neutral-700/50 hover:border-red-900/50 transition-all duration-200"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="hover:text-blue-400 transition-colors duration-200">
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link 
                  to="/signup"
                  className=" rounded-xl hover:text-blue-500 text-white transition-all duration-200"
                >
                  Signup
                </Link>
              </li>
            </>
          )}

          {/* Cart Icon */}
          <li className="hover:text-blue-400 text-base transition-colors duration-200 pl-2">
            <Link to="/cart" aria-label="Shopping Cart">
              <i className="fa-solid fa-cart-shopping"></i>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
    
  );
};

export default Navbar;