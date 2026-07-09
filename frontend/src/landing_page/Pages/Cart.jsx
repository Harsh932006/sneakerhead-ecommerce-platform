import React, { useEffect, useState, useContext } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";

const Cart = () => {
  const [cart, setCart] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/cart", {
        withCredentials: true,
      });

      // Store only the items array
      setCart(response.data.cart.items);
    } catch (err) {
      console.error(err);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await axios.delete("http://localhost:3000/api/cart", {
        data: {
          productId: productId,
        },
        withCredentials: true,
      });

      console.log(response.data);
      toast.success(response.data.message);
      fetchCart(); // Refresh the cart after removing an item
    } catch (err) {
      console.log(err);
    }
  };

  const clearCart = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:3000/api/cart/clear",
        {
          withCredentials: true,
        },
      );

      console.log(response.data);
      toast.success(response.data.message);
      setCart([]);
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
      // <div className="products bg-black relative">
      //   <Layout>
      //     <h1 className="text-center font-bold text-4xl p-4">My Cart</h1>

      //     {cart.length > 0 ? (
      //       <button
      //         className="bg-red-500 px-8 py-2 text-white font-bold rounded-xl absolute right-10 top-22"
      //         onClick={clearCart}
      //       >
      //         Clear Cart
      //       </button>
      //     ) : null}

      //     <div className="card-container">
      //       {user ? null : (
      //         <h2 className="text-center w-[100vw] h-[70vh] flex items-center justify-center text-3xl">
      //           Please login to view your cart.
      //         </h2>
      //       )}
      //       {cart.length === 0 && user ? (
      //         <h2>Your cart is empty.</h2>
      //       ) : (
      //         cart.map((item) => (
      //           <div className="card text-center" key={item._id}>
      //             <img src={item.productId.image} alt="Shoe image" />
      //             <h2 className="text-2xl font-bold">{item.productId.name}</h2>
      //             <p>{item.productId.desc}</p>
      //             <p className="font-bold">Price: ₹{item.productId.price}</p>

      //             <div className="btns flex gap-4">
      //               <button className="bg-blue-500 px-8 py-2 text-white font-bold rounded-xl w-100">
      //                 Buy Now
      //               </button>
      //               <button
      //                 className="bg-red-500 px-8 py-2 text-white font-bold rounded-xl w-100"
      //                 onClick={() => removeFromCart(item.productId._id)}
      //               >
      //                 Remove
      //               </button>
      //             </div>
      //           </div>
      //         ))
      //       )}
      //     </div>
      //   </Layout>
      // </div>


      <div className="products bg-black text-white min-h-screen">
  <Layout>
    {/* Left-aligned header block with Clear Cart button */}
    <div className="px-6 md:px-12 pt-8 pb-4 flex items-center justify-between">
      <h1 className="font-bold text-5xl">My Cart</h1>
      
      {user && cart.length > 0 && (
        <button
          className="bg-red-500 px-6 py-2 text-white font-bold rounded-xl text-sm hover:bg-red-600 transition"
          onClick={clearCart}
        >
          Clear Cart
        </button>
      )}
    </div>

    {/* Flex container aligned to the left side */}
    <div className="card-container w-full px-6 md:px-12 py-2 flex flex-wrap gap-6 justify-start items-stretch">
      
      {!user ? (
        <h2 className="text-center w-full h-[60vh] flex items-center justify-center text-3xl">
          Please login to view your cart.
        </h2>
      ) : cart.length === 0 ? (
        <h2 className="text-center w-full h-[60vh] flex items-center justify-center text-3xl">
          Your cart is empty.
        </h2>
      ) : (
        cart.map((item) => (
          <div 
            /* Main card structure matching your reference layout (smooth borders, left alignment) */
            className="w-80 bg-[#0c0c0c] border-2 border-[#1c1c1e] p-5 rounded-3xl flex flex-col justify-between text-left transition-all duration-300 ease-in-out hover:scale-[1.01] hover:border-zinc-700 shadow-2xl overflow-hidden" 
            key={item._id}
          >
            {/* Top Block Container */}
            <div className="flex-1 flex flex-col">
              {/* Product Image Wrapper */}
              <div className="w-full h-64 rounded-2xl overflow-hidden mb-5 flex items-center justify-center">
                <img 
                  className="w-full h-full object-cover" 
                  src={item.productId.image} 
                  alt={item.productId.name} 
                />
              </div>
              
              {/* Inner text content wrapper */}
              <div className="flex-1 flex flex-col justify-start mb-4">
                {/* Product Title Box with customized blue bottom accent border */}
                <div className="inline-block mb-3">
                  <h2 className="text-3xl font-extrabold text-white tracking-tight leading-tight">
                    {item.productId.name}
                  </h2>
                  <div className="w-14 h-1 bg-blue-500 rounded-full mt-2"></div>
                </div>
                
                {/* Description Text */}
                <p className="text-zinc-400 line-clamp-2 text-sm leading-relaxed mt-2 pr-2">
                  {item.productId.desc}
                </p>
              </div>
            </div>

            {/* Bottom Block Container */}
            <div className="mt-auto">
              {/* Price Details */}
              <p className="font-bold text-xl mb-4 text-white">
                Price: <span className="font-extrabold">₹{item.productId.price}</span>
              </p>

              {/* Single primary button format replacing the original two split buttons */}
              <div className="btns w-full flex gap-2">
                <button className="bg-blue-500 py-3 text-white font-bold rounded-xl w-full hover:bg-blue-600 transition text-sm tracking-wide shadow-md shadow-blue-500/10">
                  Buy Now
                </button>

                <button className="bg-red-500 py-3 text-white font-bold rounded-xl w-full hover:bg-red-600 transition text-sm tracking-wide shadow-md shadow-blue-500/10">
                  Remove
                </button>
                
                
              </div>
            </div>

          </div>
        ))
      )}
    </div>
  </Layout>
</div>
      
      
  );
};

export default Cart;
