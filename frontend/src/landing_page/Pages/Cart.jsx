import React, { useEffect, useState, useContext } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";

const Cart = () => {
  const [cart, setCart] = useState([]);

  const {user} = useContext(AuthContext);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/cart",
        {
          withCredentials: true,
        }
      );

      // Store only the items array
      setCart(response.data.cart.items);

    } catch (err) {
      console.error(err);
    }
  };

  const removeFromCart = async (productId) => {
    try{

      const response = await axios.delete(
        "http://localhost:3000/api/cart",
        {
          data: {
            productId: productId,
          },
          withCredentials: true,
        }
      )

      console.log(response.data);
      toast.success(response.data.message);
      fetchCart(); // Refresh the cart after removing an item

    }catch(err){
      console.log(err);
    }
  }

  const clearCart = async () => {
    try{

      const response = await axios.delete(
        "http://localhost:3000/api/cart/clear",
        {
          withCredentials: true,
        }
      )

      console.log(response.data);
      toast.success(response.data.message);
      setCart([]);

    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className="products bg-black relative">
    <Layout>
      
      <h1 className="text-center font-bold text-4xl p-4">My Cart</h1>

      {cart.length > 0 ? (
        <button className="bg-red-500 px-8 py-2 text-white font-bold rounded-xl absolute right-10 top-22" onClick={clearCart}>
        Clear Cart
      </button>
      ): null}

      <div className="card-container">
        {
          user ? (
              null
            ): (
              <h2 className="text-center w-[100%] h-[70vh] flex items-center justify-center text-3xl">Please login to view your cart.</h2>
            )
        }
          {
            cart.length === 0 && user? (
              <h2>Your cart is empty.</h2>
            ) : (
          cart.map((item) => (
            <div className="card text-center" key={item._id}>
              <img src={item.productId.image} alt="Shoe image" />
              <h2 className="text-2xl font-bold">{item.productId.name}</h2>
              <p>{item.productId.desc}</p>
              <p className="font-bold">Price: ₹{item.productId.price}</p>

              <div className="btns flex gap-4">
                <button className="bg-blue-500 px-8 py-2 text-white font-bold rounded-xl w-100">
                  Buy Now
                </button>
                <button className="bg-red-500 px-8 py-2 text-white font-bold rounded-xl w-100" onClick={() => removeFromCart(item.productId._id)}>
                  Remove
                </button>
              </div>
            </div>
          )))}
        </div>
    </Layout>
    </div>
  );
};

export default Cart;