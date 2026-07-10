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
    <div className="products bg-black">
      <Layout>
        <h1 className="text-center font-bold text-4xl p-4">Products</h1>

        <div className="card-container">
          {products.map((product) => (
            <div
              className="card cursor-pointer"
              key={product._id}
              onClick={() => navigate(`/product/${product._id}`)}
            >
              <div className="card-image-wrapper">
                <img src={product.image} alt="Shoe image" />
              </div>
              <div className="card-header-group">
                <h2 className="text-3xl font-bold">{product.name}</h2>
                <div className="h-1 w-20 bg-blue-500 rounded"></div>
              </div>
              <p className="text-gray-400 text-sm line-clamp-2">
                {product.desc}
              </p>
              <div className="flex flex-col gap-2 mt-auto">
                <p className="font-bold text-lg text-white">
                  Price: ₹{product.price}
                </p>
                <button className="bg-blue-500 hover:bg-blue-600 transition-colors py-2.5 text-white font-bold rounded-xl text-center text-sm w-full">
                  Explore Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </Layout>
    </div>
  );
};

export default Product;
