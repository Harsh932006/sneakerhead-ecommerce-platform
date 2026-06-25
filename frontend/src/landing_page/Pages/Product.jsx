import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

const Product = () => {
  const [products, setProducts] = useState([]);

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

  return (
    <div className="products bg-black">
      <Layout>
        <h1 className="text-center font-bold text-4xl p-4">Products</h1>

        <div className="card-container">
          {products.map((product) => (
            <div className="card" key={product._id}>
              <img src={product.image} alt="Shoe image" />
              <h2 className="text-2xl font-bold">{product.name}</h2>
              <p>{product.desc}</p>
              <p className="font-bold">Price: ₹{product.price}</p>

              <div className="btns flex gap-4">
                <button className="bg-blue-500 px-8 py-2 text-white font-bold rounded-xl">
                  Buy Now
                </button>
                <button className="bg-blue-700 px-8 py-2 text-white font-bold rounded-xl">
                  Add To Cart
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
