import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import AdminNavbar from "./AdminNavbar";
import {toast} from "react-toastify"

const EditMyProduct = () => {

  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    price: "",
    image: ""
  })

  const {id} = useParams();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try{
        const response = await axios.get(
            `https://sneakerhead-ecommerce-platform.vercel.app/api/products/${id}`,
            {
                withCredentials: true,
            }
        )

        const product = response.data.product;

        setName(product.name);
        setDesc(product.desc);
        setPrice(product.price);
        setImage(product.image);
    }catch(err){
        console.log(err);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
        await axios.patch(
            `https://sneakerhead-ecommerce-platform.vercel.app/api/products/${id}`,
            {
                name: formData.name,
                desc: formData.desc,
                price: formData.price,
                image: formData.image,
            },
            {
                withCredentials: true,
            }
        )
        navigate("/admin-dashboard")
        toast.success("Product updated successfully");
    }catch(err){
        console.log(err);
    }
  }

  return (
    

    <div className="bg-neutral-950 min-h-screen w-full flex flex-col text-white antialiased">
      <AdminNavbar />

      
      <div className="flex-grow w-full max-w-md mx-auto px-4 flex flex-col items-center justify-center py-12">
        <h1 className="text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 mb-6">
          Modify Product
        </h1>

        <form 
          className="w-full p-8 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl flex flex-col gap-5" 
          onSubmit={handleSubmit}
        >
          <div className="w-full flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-blue-400 tracking-wider uppercase px-1">Product Title</label>
            <input 
              required 
              name="name" 
              type="text" 
              placeholder="Enter product name" 
              value={formData.name} 
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
            />
          </div>

          <div className="w-full flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-blue-400 tracking-wider uppercase px-1">Description</label>
            <textarea 
              required 
              name="desc" 
              rows="4"
              placeholder="Enter product desc" 
              value={formData.desc} 
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 resize-none"
            ></textarea>
          </div>

          <div className="w-full flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-blue-400 tracking-wider uppercase px-1">Price (USD)</label>
            <input 
              required 
              name="price" 
              type="number" 
              placeholder="Enter price of product" 
              value={formData.price} 
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
            />
          </div>

          <div className="w-full flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-blue-400 tracking-wider uppercase px-1">Static Image URL</label>
            <input 
              required 
              name="image" 
              type="text" 
              placeholder="Provide image url" 
              value={formData.image} 
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
            />
          </div>

          <button 
            type="submit"
            className="w-full mt-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-600/20 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-neutral-900 transition-all duration-150"
          >
            Update Specifications
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditMyProduct;
