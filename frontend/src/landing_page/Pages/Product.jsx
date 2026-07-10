import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/products");

      setProducts(response.data.products);
    } catch (err) {
      console.log(err);
    }
  };

  const addToCart = async (productId) => {
    try {
      if (!user) {
        return toast.error("Please login to add products to cart");
      }

      const response = await axios.post(
        "http://localhost:3000/api/cart/add",
        {
          productId: productId,
        },
        {
          withCredentials: true,
        },
      );

      toast.success(response.data.message);
      
    } catch (err) {
      console.log(err);
    }
  };

  return (
    // <div className="products bg-black">
    //   <Layout>
    //     <h1 className="text-center font-bold text-4xl p-4">Products</h1>

    //     <div className="card-container">
    //       {products.map((product) => (
    //         <div
    //           className="card cursor-pointer"
    //           key={product._id}
    //           onClick={() => navigate(`/product/${product._id}`)}
    //         >
    //           <div className="card-image-wrapper">
    //             <img src={product.image} alt="Shoe image" />
    //           </div>
    //           <div className="card-header-group">
    //             <h2 className="text-3xl font-bold">{product.name}</h2>
    //             <div className="h-1 w-20 bg-blue-500 rounded"></div>
    //           </div>
    //           <p className="text-gray-400 text-sm line-clamp-2">
    //             {product.desc}
    //           </p>
    //           <div className="flex flex-col gap-2 mt-auto">
    //             <p className="font-bold text-lg text-white">
    //               Price: ₹{product.price}
    //             </p>
    //             <button className="bg-blue-500 hover:bg-blue-600 transition-colors py-2.5 text-white font-bold rounded-xl text-center text-sm w-full">
    //               Explore Now
    //             </button>
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   </Layout>
    // </div>

    <Layout>
      {/* Structural layout wrapper syncing completely with your global 92% width format parameters */}
      <div className="w-full flex flex-col gap-10 py-4">
        
        {/* Page Context Headline */}
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-black text-neutral-100 tracking-tight">
            All Collections
          </h1>
          <p className="text-sm text-neutral-400 mt-0.5">
            Browse through our premium, hand-picked catalog of limited edition drops
          </p>
        </div>

        {/* Responsive Grid System: Handled completely via Tailwind columns math, dropping custom container css constraints */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
          {products.map((product) => (
            <div
              className="w-full h-full bg-neutral-900 border border-neutral-800/80 p-5 rounded-2xl flex flex-col justify-between text-left transition-all duration-300 hover:-translate-y-1 hover:border-neutral-700 shadow-2xl overflow-hidden group cursor-pointer"
              key={product._id}
              onClick={() => navigate(`/product/${product._id}`)}
            >
              {/* Product Top Image Meta Layer */}
              <div className="flex flex-col flex-grow">
                {/* Edge-to-Edge Image Box with immersive hover scaling configurations */}
                <div className="w-full h-60 bg-neutral-950/60 border border-neutral-800/30 rounded-xl overflow-hidden mb-4 flex items-center justify-center relative">
                  <img 
                    src={product.image} 
                    alt={product.name || "Sneaker profile asset"} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>

                {/* Title Segment Block */}
                <div className="flex flex-col mb-2">
                  <h2 className="text-xl font-black text-neutral-100 tracking-tight truncate group-hover:text-blue-400 transition-colors duration-200">
                    {product.name}
                  </h2>
                  <div className="w-8 h-1 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full mt-2"></div>
                </div>

                {/* Secondary Subtext Detail Descriptor */}
                <p className="text-neutral-400 text-xs leading-relaxed line-clamp-2 my-2 min-h-[32px]">
                  {product.desc}
                </p>
              </div>

              {/* Price and Navigation Actions Footer Grid */}
              <div className="mt-4 pt-3 border-t border-neutral-800/60 flex flex-col gap-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-[10px] font-bold text-neutral-500 tracking-wider uppercase">Retail Price</span>
                  <p className="font-extrabold text-base text-neutral-100">
                    ₹{product.price?.toLocaleString('en-IN')}
                  </p>
                </div>

                {/* Interactive Action Control */}
                <button 
                  onClick={(e) => {
                    // FIXED: Stops propagation to protect button actions from misfiring into parent card click navigations
                    e.stopPropagation();
                    navigate(`/product/${product._id}`);
                  }}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs tracking-wide shadow-md active:scale-[0.98] transition-all duration-150"
                >
                  Explore Now
                </button>
              </div>

            </div>
          ))}
        </div>
        
      </div>
    </Layout>
  );
};

export default Product;
