import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios"
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  
  const navigate = useNavigate();

  const handleLogout = async () => {
    try{
      await axios.get(
        "http://localhost:3000/api/auth/user-logout",
        {
          withCredentials: true,
        }
      )

      setUser(null);
      navigate("/");
      toast.success("Logged out successfully.");
    }catch(err){
      console.log(err);
    }
  }
  return (
    <div className="flex justify-between items-center p-4 ps-8 pe-8 rounded-2xl bg-black">
      <div className="nav-logo text-4xl text-red-600 font-extrabold">
        <Link to="/">SneakerHead</Link>
      </div>

      <ul className="nav-ul flex gap-10">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        {user ? (
          <>
          <li>Welcome, {user.username}</li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
          </>
          
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}
        <li>
          <Link to="/cart"><i class="fa-solid fa-cart-shopping"></i></Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
