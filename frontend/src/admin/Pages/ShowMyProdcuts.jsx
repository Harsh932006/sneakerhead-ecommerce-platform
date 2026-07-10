import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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

    <div className="w-full text-white">
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-black text-neutral-100 tracking-tight">
          My Products
        </h2>
        <p className="text-sm text-neutral-400 mt-0.5">
          Manage and track your active inventory listings
        </p>
      </div>

      {/* Grid Container: Fixed to handle card scaling perfectly across multi-display monitors */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
        {products.length === 0 ? (
          <div className="col-span-full border-2 border-dashed border-neutral-800 rounded-2xl p-12 text-center bg-neutral-900/20 backdrop-blur-sm">
            <i className="fa-solid fa-box-open text-4xl text-neutral-600 mb-3"></i>
            <h3 className="font-bold text-xl text-neutral-300">
              Oops! You haven't added any products.
            </h3>
            <p className="text-sm text-neutral-500 mt-1 max-w-sm mx-auto">
              Add a new shoe listing above to launch your seller storefront
              journey :)
            </p>
          </div>
        ) : (
          products.map((product) => (
            <div
              // FIXED: Swapped 'w-80' for 'w-full' so your cards scale cleanly to fill grid columns fluidly without gaps
              className="w-full h-full bg-neutral-900 border border-neutral-800/80 p-5 rounded-2xl flex flex-col justify-between text-left transition-all duration-300 hover:-translate-y-1 hover:border-neutral-700 shadow-2xl overflow-hidden group"
              key={product._id}
            >
              {/* Top Content Block */}
              <div className="flex flex-col flex-grow">
                {/* Product Image Frame */}
                {/* FIXED: Replaced light gray bg with dark studio background + dynamic hover scaling */}
                <div className="w-full h-60 bg-neutral-950/60 border border-neutral-800/30 rounded-xl overflow-hidden mb-4 flex items-center justify-center relative">
                  <img
                    // FIXED: Changed object-contain to object-cover and removed all padding (p-2/p-4) to span edge-to-edge
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                    src={product.image}
                    alt={product.name}
                  />
                </div>

                {/* Title Section */}
                <div className="flex flex-col mb-2">
                  <h3 className="text-xl font-black text-neutral-100 tracking-tight truncate group-hover:text-blue-400 transition-colors duration-200">
                    {product.name}
                  </h3>
                  <div className="w-8 h-1 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full mt-2"></div>
                </div>

                {/* Description Paragraph Container */}
                <p className="text-neutral-400 text-xs leading-relaxed line-clamp-2 my-2 min-h-[32px]">
                  {product.desc}
                </p>
              </div>

              {/* Bottom Actions Frame */}
              <div className="mt-4 pt-3 border-t border-neutral-800/60">
                <div className="flex items-baseline justify-between mb-4">
                  <span className="text-[10px] font-bold text-neutral-500 tracking-wider uppercase">
                    Listing Price
                  </span>
                  <p className="font-extrabold text-lg text-neutral-100">
                    ₹{product.price}
                  </p>
                </div>

                {/* Action Control Buttons */}
                <div className="flex gap-2 w-full">
                  <button
                    onClick={() =>
                      navigate(`/admin/products/edit/${product._id}`)
                    }
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl w-full text-xs tracking-wide shadow-md active:scale-[0.98] transition-all duration-150"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-950/40 hover:bg-red-900/40 border border-red-900/30 text-red-400 font-bold py-2.5 rounded-xl w-full text-xs tracking-wide active:scale-[0.98] transition-all duration-150"
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
