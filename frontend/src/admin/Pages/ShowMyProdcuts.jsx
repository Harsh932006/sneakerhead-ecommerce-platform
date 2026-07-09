import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"

const ShowMyProdcuts = () => {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/products/admin-products",
        {
          withCredentials: true,
        },
      );

      setProducts(response.data.products);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/api/products/${productId}`, {
        withCredentials: true,
      });

      fetchProducts();
      toast.success("Product deleted successfully");
    } catch (err) {
      console.log(err);
    }
  };

  return (

//     <div className="products bg-black text-white min-h-screen">
//   {/* Left-aligned header block */}
//   <div className="px-6 md:px-12 pt-8 pb-4">
//     <h1 className="font-bold text-5xl text-center">My Products</h1>
//   </div>

//   {/* FIXED Container: Uses CSS Grid to force every card in a row to stretch to the exact same height */}
//   <div className="w-full px-6 md:px-12 py-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
//     {products.length === 0 ? (
//       <h1 className="font-bold text-2xl col-span-full text-zinc-400 mt-4">
//         Oops! You haven't added any product. Add a product now and start your journey :)
//       </h1>
//     ) : (
//       products.map((product) => (
//         /* FIXED Card: Uses h-full to match the grid row height exactly and prevents button spilling */
//         <div 
//           className="w-80 h-full bg-[#0c0c0c] border-2 border-[#1c1c1e] p-5 rounded-3xl flex flex-col justify-between text-left transition-all duration-300 ease-in-out hover:scale-[1.01] hover:border-zinc-700 shadow-2xl overflow-hidden" 
//           key={product._id}
//         >
//           {/* Top Content Block */}
//           <div className="flex flex-col flex-grow">
//             {/* Standardized Aspect Ratio for Image Box */}
//             <div className="w-full aspect-square bg-[#f3f3f3] rounded-2xl overflow-hidden mb-5 flex items-center justify-center p-2">
//               <img 
//                 className="w-full h-full object-contain" 
//                 src={product.image} 
//                 alt={product.name} 
//               />
//             </div>
            
//             {/* Product Title Section with clean blue bottom accent line */}
//             <div className="inline-block mb-2">
//               <h2 className="text-3xl font-extrabold text-white tracking-tight leading-tight">
//                 {product.name}
//               </h2>
//               <div className="w-14 h-1 bg-blue-500 rounded-full mt-2"></div>
//             </div>
            
//             {/* Description Section stretches invisibly to absorb uneven text lines */}
//             <div className="flex-grow flex flex-col justify-start mb-4">
//               <p className="text-zinc-400 line-clamp-2 text-sm leading-relaxed mt-2 pr-2">
//                 {product.desc}
//               </p>
//             </div>
//           </div>

//           {/* Bottom Actions Block - Safely locked right at the base of the card */}
//           <div className="mt-auto pt-2">
//             <p className="font-bold text-xl mb-4 text-white">
//               Price: <span className="font-extrabold">₹{product.price}</span>
//             </p>

//             <div className="btns flex gap-2 w-full">
//               <button
//                 onClick={() => {
//                   navigate(`/admin/products/edit/${product._id}`);
//                 }}
//                 className="bg-blue-500 py-3 text-white font-bold rounded-xl w-full hover:bg-blue-600 transition text-sm tracking-wide shadow-md"
//               >
//                 Update
//               </button>
//               <button
//                 onClick={() => handleDelete(product._id)}
//                 className="bg-red-700 py-3 text-white font-bold rounded-xl w-full hover:bg-red-800 transition text-sm tracking-wide shadow-md"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>

//         </div>
//       ))
//     )}
//   </div>
// </div>


<div className="products bg-black text-white min-h-screen">
  {/* CHANGED: Reduced padding-top from pt-8 to pt-3 to eliminate the huge gap at the top */}
  <div className="px-6 md:px-12 pt-3 pb-2 text-center">
    <h1 className="font-bold text-5xl">My Products</h1>
  </div>

  {/* Grid container with items-stretch to keep card heights completely uniform */}
  <div className="w-full px-6 md:px-12 py-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
    {products.length === 0 ? (
      <h1 className="font-bold text-2xl col-span-full text-zinc-400 mt-4 text-center">
        Oops! You haven't added any product. Add a product now and start your journey :)
      </h1>
    ) : (
      products.map((product) => (
        <div 
          className="w-80 h-full bg-[#0c0c0c] border-2 border-[#1c1c1e] p-5 rounded-3xl flex flex-col justify-between text-left transition-all duration-300 ease-in-out hover:scale-[1.01] hover:border-zinc-700 shadow-2xl overflow-hidden" 
          key={product._id}
        >
          {/* Top Content Block */}
          <div className="flex flex-col flex-grow">
            {/* CHANGED: Removed inner padding (p-2 -> p-0) and switched to object-cover to make the image take full width */}
            <div className="w-full h-64 bg-[#f3f3f3] rounded-2xl overflow-hidden mb-5 flex items-center justify-center">
              <img 
                className="w-full h-full object-cover" 
                src={product.image} 
                alt={product.name} 
              />
            </div>
            
            {/* Product Title Section */}
            <div className="inline-block mb-2">
              <h2 className="text-3xl font-extrabold text-white tracking-tight leading-tight">
                {product.name}
              </h2>
              <div className="w-14 h-1 bg-blue-500 rounded-full mt-2"></div>
            </div>
            
            {/* Description Section */}
            <div className="flex-grow flex flex-col justify-start mb-4">
              <p className="text-zinc-400 line-clamp-2 text-sm leading-relaxed mt-2 pr-2">
                {product.desc}
              </p>
            </div>
          </div>

          {/* Bottom Actions Block */}
          <div className="mt-auto pt-2">
            <p className="font-bold text-xl mb-4 text-white">
              Price: <span className="font-extrabold">₹{product.price}</span>
            </p>

            <div className="btns flex gap-2 w-full">
              <button
                onClick={() => {
                  navigate(`/admin/products/edit/${product._id}`);
                }}
                className="bg-blue-500 py-3 text-white font-bold rounded-xl w-full hover:bg-blue-600 transition text-sm tracking-wide shadow-md"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="bg-red-700 py-3 text-white font-bold rounded-xl w-full hover:bg-red-800 transition text-sm tracking-wide shadow-md"
              >
                Delete
              </button>
            </div>
          </div>

        </div>
      ))
    )}
  </div>
</div>
  );
};

export default ShowMyProdcuts;
