import React, { useEffect, useState, useContext } from "react";
import Layout from "../components/Layout";
import { userApi } from "../../api/userApi";
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
      const response = await userApi.get("/api/cart");

      // Store only the items array
      setCart(response.data.cart.items);
    } catch (err) {
      console.error(err);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await userApi.delete("/api/cart", {
        data: {
          productId: productId,
        },
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
      const response = await userApi.delete("/api/cart/clear");

      console.log(response.data);
      toast.success(response.data.message);
      setCart([]);
    } catch (err) {
      console.log(err);
    }
  };

  const totalCartPrice = cart.reduce((accumulator, item) => {
    return accumulator + (Number(item.productId?.price) || 0);
  }, 0);
  

  return (
      
<Layout>
      
      <div className="w-full flex flex-col gap-10 py-4">
        
        
        <div className="w-full flex items-center justify-between border-b border-neutral-900 pb-5">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl md:text-3xl font-black text-neutral-100 tracking-tight">Shopping Bag</h1>
            <p className="text-sm text-neutral-400">Review your selected items and finalize your shipping order</p>
          </div>
          
          {user && cart.length > 0 && (
            <button
              className="px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-red-950/40 hover:text-red-400 border border-neutral-800 hover:border-red-900/40 text-xs font-bold tracking-wide transition-all duration-200 active:scale-[0.98]"
              onClick={clearCart}
            >
              Clear Entire Cart
            </button>
          )}
        </div>

        
        {!user ? (
          <div className="w-full border-2 border-dashed border-neutral-800 rounded-2xl p-16 text-center bg-neutral-900/10 backdrop-blur-sm min-h-[40vh] flex flex-col items-center justify-center">
            <i className="fa-solid fa-lock text-4xl text-neutral-700 mb-3"></i>
            <h2 className="text-xl font-bold text-neutral-300">Access Restricted</h2>
            <p className="text-sm text-neutral-500 mt-1">Please log in to your collector profile to access your shopping cart.</p>
          </div>
        ) : cart.length === 0 ? (
          <div className="w-full border-2 border-dashed border-neutral-800 rounded-2xl p-16 text-center bg-neutral-900/10 backdrop-blur-sm min-h-[40vh] flex flex-col items-center justify-center">
            <i className="fa-solid fa-cart-shopping text-4xl text-neutral-700 mb-3"></i>
            <h2 className="text-xl font-bold text-neutral-300">Your bag is empty</h2>
            <p className="text-sm text-neutral-500 mt-1">Looks like you haven't added any sneaker drops to your bag yet.</p>
          </div>
        ) : (
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
            
            
            <div className="lg:col-span-7 w-full flex flex-col gap-4">
              {cart.map((item) => (
                <div 
                  className="w-full p-4 md:p-5 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col sm:flex-row gap-5 items-center justify-between shadow-xl group" 
                  key={item._id}
                >
                  
                  <div className="flex flex-col sm:flex-row gap-5 items-center w-full">
                    
                    <div className="w-full sm:w-32 h-32 bg-neutral-950 border border-neutral-800/60 rounded-xl overflow-hidden shrink-0 relative">
                      <img 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
                        src={item.productId?.image} 
                        alt={item.productId?.name} 
                      />
                    </div>
                    
                    
                    <div className="flex flex-col text-center sm:text-left gap-1 truncate w-full">
                      <h2 className="text-lg font-black text-neutral-100 tracking-tight truncate group-hover:text-blue-400 transition-colors duration-200">
                        {item.productId?.name}
                      </h2>
                      <div className="w-6 h-0.5 bg-blue-500 rounded-full my-1 mx-auto sm:mx-0"></div>
                      <p className="text-neutral-400 text-xs leading-relaxed line-clamp-2 max-w-md">
                        {item.productId?.desc}
                      </p>
                    </div>
                  </div>

                  
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-4 w-full sm:w-auto shrink-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-neutral-800/60">
                    <div className="text-left sm:text-right flex flex-col">
                      <span className="text-[10px] font-bold text-neutral-500 tracking-wider uppercase hidden sm:block">Item Total</span>
                      <p className="font-extrabold text-base text-neutral-100 mt-0.5">
                        ₹{item.productId?.price?.toLocaleString('en-IN')}
                      </p>
                    </div>

                    <button 
                      onClick={() => removeFromCart(item.productId?._id)}
                      className="p-2.5 rounded-xl bg-neutral-950/40 hover:bg-red-950/40 border border-neutral-800 hover:border-red-900/40 text-neutral-400 hover:text-red-400 text-xs font-semibold flex items-center gap-1.5 transition-all duration-150 shadow-sm active:scale-[0.97]"
                    >
                      <i className="fa-solid fa-trash-can text-xs"></i>
                      <span className="sm:hidden">Remove</span>
                    </button>
                  </div>

                </div>
              ))}
            </div>

            
            <div className="lg:col-span-5 w-full p-6 md:p-8 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl flex flex-col gap-6">
              <div>
                <h3 className="text-lg font-bold text-neutral-100 tracking-tight">Order Summary</h3>
                <p className="text-xs text-neutral-500 mt-0.5">Shipping costs and final checkout price details</p>
              </div>

              {/* Fee Calculations Fields Grid */}
              <div className="flex flex-col gap-4 border-t border-b border-neutral-800/80 py-4 text-sm">
                <div className="flex items-center justify-between text-neutral-400">
                  <span>Bag Subtotal ({cart.length} items)</span>
                  <span className="font-medium text-neutral-200">₹{totalCartPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center justify-between text-neutral-400">
                  <span>Estimated Shipping</span>
                  <span className="text-emerald-400 font-bold tracking-wide uppercase text-xs">Free</span>
                </div>
                <div className="flex items-center justify-between text-neutral-400">
                  <span>Tax Surcharges</span>
                  <span className="font-medium text-neutral-200">₹0</span>
                </div>
              </div>

              {/* Total Aggregate Sum Row */}
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-bold text-neutral-300">Total Invoice Amount</span>
                <p className="text-2xl font-black text-neutral-100 tracking-tight">
                  ₹{totalCartPrice.toLocaleString('en-IN')}
                </p>
              </div>

              {/* Checkout Command Control */}
              <button className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-blue-600/20 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-neutral-900 transition-all duration-150 text-center">
                Proceed To Secure Checkout &rarr;
              </button>
            </div>

          </div>
        )}
      </div>
    </Layout>
      
  );
};

export default Cart;