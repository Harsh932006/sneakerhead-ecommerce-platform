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
                `https://sneakerhead-ecommerce-platform.vercel.app/api/products/${id}`,
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
        "https://sneakerhead-ecommerce-platform.vercel.app/api/cart/add",
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
    


    <Layout>
            
            <div className="w-full flex flex-col gap-16 py-6">
                
                
                <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    
                    
                    <div className="lg:col-span-5 w-full bg-neutral-900 border border-neutral-800/80 rounded-3xl p-8 shadow-2xl flex items-center justify-center relative group min-h-[380px] md:min-h-[480px]">
                        
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-64 h-64 bg-blue-600/5 rounded-full blur-[96px] pointer-events-none"></div>
                        
                        <img 
                            src={product.image} 
                            alt={product.name || "Premium sneaker display"} 
                            className="w-full h-auto max-h-[380px] object-contain transform group-hover:scale-105 transition-transform duration-500 ease-out filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
                        />
                    </div>

                    
                    <div className="lg:col-span-7 w-full flex flex-col gap-8 justify-center lg:pt-4">
                        
                        
                        <div className="flex flex-col gap-3">
                            <span className="w-fit px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/20">
                                Certified Authentic
                            </span>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-neutral-100 tracking-tight leading-tight">
                                {product.name}
                            </h2>
                            <div className="w-16 h-1 bg-gradient-to from-blue-500 to-blue-400 rounded-full mt-1"></div>
                        </div>

                        
                        <div className="flex flex-col gap-2">
                            <span className="text-[10px] font-bold text-neutral-500 tracking-wider uppercase">Product Overview</span>
                            <p className="text-neutral-400 text-base md:text-lg leading-relaxed max-w-2xl">
                                {product.desc || "No description provided for this limited collection sneaker drop model."}
                            </p>
                        </div>

                        
                        <div className="pt-4 border-t border-neutral-900 flex flex-col gap-1">
                            <span className="text-[10px] font-bold text-neutral-500 tracking-wider uppercase">Retail Valuation</span>
                            <p className="text-4xl font-black text-neutral-100 tracking-tight">
                                ₹{product.price?.toLocaleString('en-IN')}
                            </p>
                        </div>

                        
                        <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full max-w-xl">
                           
                            <button className="flex-1 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all duration-150">
                                Buy Now
                            </button>
                            
                           
                            <button 
                                onClick={() => addToCart(product._id)}
                                className="flex-1 px-8 py-4 rounded-xl border border-neutral-700 bg-neutral-950 hover:bg-neutral-900 text-neutral-200 text-sm font-bold tracking-wide shadow-md active:scale-[0.98] transition-all duration-150"
                            >
                                Add To Cart
                            </button>
                        </div>
                        
                    </div>
                </div>

                
                <div className="w-full pt-8 border-t border-neutral-900">
                    <Review productId={id}/>
                </div>

            </div>
        </Layout>
    
  )
}

export default SingleProduct