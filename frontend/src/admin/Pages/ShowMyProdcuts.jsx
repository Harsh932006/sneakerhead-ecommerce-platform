import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="products bg-black">
      <h1 className="text-center font-bold text-4xl p-4">My Products</h1>

      <div className="card-container">
        {products.length == 0 ? (
          <h1 className="font-bold text-2xl">Oops! You haven't added any product. Add a product now and start your journey :)</h1>
        ) : (
          products.map((product) => (
            <div className="card" key={product._id}>
              <img src={product.image} alt="Shoe image" />
              <h2 className="text-2xl font-bold">{product.name}</h2>
              <p>{product.desc}</p>
              <p className="font-bold">Price: ₹{product.price}</p>

              <div className="btns flex gap-4">
                <button
                  onClick={() => {
                    navigate(`/admin/products/edit/${product._id}`);
                  }}
                  className="bg-blue-500 px-8 py-2 text-white font-bold rounded-xl"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-700 px-8 py-2 text-white font-bold rounded-xl"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ShowMyProdcuts;
