import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import AdminNavbar from "./AdminNavbar";
import {toast} from "react-toastify"

const EditMyProduct = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const {id} = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try{
        const response = await axios.get(
            `http://localhost:3000/api/products/${id}`,
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
            `http://localhost:3000/api/products/${id}`,
            {
                name,
                desc,
                price,
                image
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
    <div className="admin-login bg-black">
      <AdminNavbar />

      <form className="login-form flex flex-col items-center justify-start pt-20 gap-10" onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter product name" value={name} onChange={(e) => setName(e.target.value)}/>
        <textarea type="text" placeholder="Enter product desc" value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
        <input type="number" placeholder="Enter price of product" value={price} onChange={(e) => setPrice(e.target.value)}/>
        <input type="text" placeholder="Provide image url" value={image} onChange={(e) => setImage(e.target.value)} />
        <button type="submit">Edit Product</button>
      </form>
    </div>
  );
};

export default EditMyProduct;
