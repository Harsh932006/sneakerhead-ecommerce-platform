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

    <div className="w-full text-white">
      
      <div className="mb-8">
        <h2 className="text-2xl font-black text-neutral-100 tracking-tight">
          My Products
        </h2>
        <p className="text-sm text-neutral-400 mt-0.5">
          Manage and track your active inventory listings
        </p>
      </div>

      
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
              
              className="w-full h-full bg-neutral-900 border border-neutral-800/80 p-5 rounded-2xl flex flex-col justify-between text-left transition-all duration-300 hover:-translate-y-1 hover:border-neutral-700 shadow-2xl overflow-hidden group"
              key={product._id}
            >
              
              <div className="flex flex-col flex-grow">
                
                
                <div className="w-full h-60 bg-neutral-950/60 border border-neutral-800/30 rounded-xl overflow-hidden mb-4 flex items-center justify-center relative">
                  <img
                    
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                    src={product.image}
                    alt={product.name}
                  />
                </div>

                
                <div className="flex flex-col mb-2">
                  <h3 className="text-xl font-black text-neutral-100 tracking-tight truncate group-hover:text-blue-400 transition-colors duration-200">
                    {product.name}
                  </h3>
                  <div className="w-8 h-1 bg-gradient-to from-blue-500 to-blue-400 rounded-full mt-2"></div>
                </div>

                
                <p className="text-neutral-400 text-xs leading-relaxed line-clamp-2 my-2 min-h-[32px]">
                  {product.desc}
                </p>
              </div>

              
              <div className="mt-4 pt-3 border-t border-neutral-800/60">
                <div className="flex items-baseline justify-between mb-4">
                  <span className="text-[10px] font-bold text-neutral-500 tracking-wider uppercase">
                    Listing Price
                  </span>
                  <p className="font-extrabold text-lg text-neutral-100">
                    ₹{product.price}
                  </p>
                </div>

                
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
