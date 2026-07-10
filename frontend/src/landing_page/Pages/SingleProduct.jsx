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
        <div className='bg-black min-h-screen text-gray-100 individual-product-container'>
      <Layout>
        {/* Main Grid Wrapper: 1 column on mobile, 2 columns on large screens */}
        <div className="individual-product max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Image Container with subtle dark border and shadow */}
          <div className="flex justify-center items-center bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800 shadow-2xl">
            <img 
              src={product.image} 
              alt={product.name || "Product image"} 
              className="w-auto object-contain hover:scale-105 transition-transform duration-300 ease-in-out"
            />
          </div>

          {/* Right Column: Product Info */}
          <div className="flex flex-col space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2">
                {product.name}
              </h2>
              <div className="h-1 w-20 bg-blue-500 rounded"></div>
            </div>

            <p className="text-gray-400 text-lg leading-relaxed">
              {product.desc}
            </p>

            <div className="pt-2">
              <span className="text-sm text-gray-500 uppercase tracking-widest block mb-1">Price</span>
              <p className="text-3xl font-black text-white">
                ₹{product.price?.toLocaleString('en-IN')}
              </p>
            </div>

            {/* Action Buttons: Preserving your exact colours */}
            <div className="btns flex flex-wrap gap-4 pt-4">
              <button className="bg-blue-500 hover:bg-blue-600 active:scale-95 transition-all px-8 py-3.5 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 flex-1 sm:flex-none text-center">
                Buy Now
              </button>
              <button 
                className="bg-blue-700 hover:bg-blue-800 active:scale-95 transition-all px-8 py-3.5 text-white font-bold rounded-xl shadow-lg shadow-blue-700/20 flex-1 sm:flex-none text-center" 
                onClick={() => addToCart(product._id)}
              >
                Add To Cart
              </button>
            </div>
          </div>

        </div>
        <Review productId={id}/>
      </Layout>
    </div>
    
  )
}

export default SingleProduct