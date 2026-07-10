import React from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
import { useState, useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import { AuthContext } from "../../context/AuthContext";
import {toast} from "react-toastify";
import Review from "../components/Review"

const SingleProduct = () => {

    const [product, setProduct] = useState({});
    const {user} = useContext(AuthContext);

    const {id} = useParams();

    const fetchProduct = async () => {
        try{

            const response = await axios.get(
                `http://localhost:3000/api/products/${id}`,
                {
                    withCredentials: true,
                }
            )
            
            setProduct(response.data.product);

        }catch(err){
            console.log(err);
        }
    }


    useEffect(() => {
        fetchProduct();
    }, []);

    const addToCart = async (productId) => {
    try{

      if(!user){
        return toast.error("Please login to add products to cart");
      }

      const response = await axios.post(
        "http://localhost:3000/api/cart/add",
        {
          productId: productId,
        },
        {
          withCredentials: true,
        }
      )

      toast.success(response.data.message);

    }catch(err){
      console.log(err);
    }
  }
    
  return (
    //     <div className='bg-black min-h-screen text-gray-100 individual-product-container'>
    //   <Layout>
    //     {/* Main Grid Wrapper: 1 column on mobile, 2 columns on large screens */}
    //     <div className="individual-product max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
    //       {/* Left Column: Image Container with subtle dark border and shadow */}
    //       <div className="flex justify-center items-center bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800 shadow-2xl">
    //         <img 
    //           src={product.image} 
    //           alt={product.name || "Product image"} 
    //           className="w-auto object-contain hover:scale-105 transition-transform duration-300 ease-in-out"
    //         />
    //       </div>

    //       {/* Right Column: Product Info */}
    //       <div className="flex flex-col space-y-6">
    //         <div>
    //           <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2">
    //             {product.name}
    //           </h2>
    //           <div className="h-1 w-20 bg-blue-500 rounded"></div>
    //         </div>

    //         <p className="text-gray-400 text-lg leading-relaxed">
    //           {product.desc}
    //         </p>

    //         <div className="pt-2">
    //           <span className="text-sm text-gray-500 uppercase tracking-widest block mb-1">Price</span>
    //           <p className="text-3xl font-black text-white">
    //             ₹{product.price?.toLocaleString('en-IN')}
    //           </p>
    //         </div>

    //         {/* Action Buttons: Preserving your exact colours */}
    //         <div className="btns flex flex-wrap gap-4 pt-4">
    //           <button className="bg-blue-500 hover:bg-blue-600 active:scale-95 transition-all px-8 py-3.5 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 flex-1 sm:flex-none text-center">
    //             Buy Now
    //           </button>
    //           <button 
    //             className="bg-blue-700 hover:bg-blue-800 active:scale-95 transition-all px-8 py-3.5 text-white font-bold rounded-xl shadow-lg shadow-blue-700/20 flex-1 sm:flex-none text-center" 
    //             onClick={() => addToCart(product._id)}
    //           >
    //             Add To Cart
    //           </button>
    //         </div>
    //       </div>

    //     </div>
    //     <Review productId={id}/>
    //   </Layout>
    // </div>


    <Layout>
            {/* Outer Wrapper perfectly matches your 92% layout scale boundaries */}
            <div className="w-full flex flex-col gap-16 py-6">
                
                {/* Main Showcase Grid Layout */}
                <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    
                    {/* Left Column: Premium Interactive Product Display Frame (Takes 5 spaces) */}
                    <div className="lg:col-span-5 w-full bg-neutral-900 border border-neutral-800/80 rounded-3xl p-8 shadow-2xl flex items-center justify-center relative group min-h-[380px] md:min-h-[480px]">
                        {/* Decorative Background Radial Glow Layer */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-64 h-64 bg-blue-600/5 rounded-full blur-[96px] pointer-events-none"></div>
                        
                        <img 
                            src={product.image} 
                            alt={product.name || "Premium sneaker display"} 
                            className="w-full h-auto max-h-[380px] object-contain transform group-hover:scale-105 transition-transform duration-500 ease-out filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
                        />
                    </div>

                    {/* Right Column: Clean Content Typography Block (Takes 7 spaces) */}
                    <div className="lg:col-span-7 w-full flex flex-col gap-8 justify-center lg:pt-4">
                        
                        {/* Title Context Info */}
                        <div className="flex flex-col gap-3">
                            <span className="w-fit px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/20">
                                Certified Authentic
                            </span>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-neutral-100 tracking-tight leading-tight">
                                {product.name}
                            </h2>
                            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full mt-1"></div>
                        </div>

                        {/* Product Detailed Description */}
                        <div className="flex flex-col gap-2">
                            <span className="text-[10px] font-bold text-neutral-500 tracking-wider uppercase">Product Overview</span>
                            <p className="text-neutral-400 text-base md:text-lg leading-relaxed max-w-2xl">
                                {product.desc || "No description provided for this limited collection sneaker drop model."}
                            </p>
                        </div>

                        {/* Price Display Segment */}
                        <div className="pt-4 border-t border-neutral-900 flex flex-col gap-1">
                            <span className="text-[10px] font-bold text-neutral-500 tracking-wider uppercase">Retail Valuation</span>
                            <p className="text-4xl font-black text-neutral-100 tracking-tight">
                                ₹{product.price?.toLocaleString('en-IN')}
                            </p>
                        </div>

                        {/* Action Control Button Handles */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full max-w-xl">
                            {/* Primary Button Strategy Action */}
                            <button className="flex-1 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all duration-150">
                                Buy Now
                            </button>
                            
                            {/* Secondary Button Strategy Action */}
                            <button 
                                onClick={() => addToCart(product._id)}
                                className="flex-1 px-8 py-4 rounded-xl border border-neutral-700 bg-neutral-950 hover:bg-neutral-900 text-neutral-200 text-sm font-bold tracking-wide shadow-md active:scale-[0.98] transition-all duration-150"
                            >
                                Add To Cart
                            </button>
                        </div>
                        
                    </div>
                </div>

                {/* Reviews Section Divider Block Container Layout */}
                <div className="w-full pt-8 border-t border-neutral-900">
                    <Review productId={id}/>
                </div>

            </div>
        </Layout>
    
  )
}

export default SingleProduct