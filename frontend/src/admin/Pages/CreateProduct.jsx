import React, { useContext, useState } from "react";
import axios from "axios"

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try{
        const response = await axios.post(
            "http://localhost:3000/api/products",
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

        console.log(response.data);

    }catch(err){
        console.log(err);
    }
  };

  return (
    <div className="bg-black admin-dashboard">
      {/* <Layout> */}
      {/* <h1 className="text-white text-center text-4xl">Admin Dashboard</h1> */}

      <form
        className="login-form flex flex-col items-center justify-start pt-40 gap-10"
        onSubmit={handleFormSubmit}
        action=""
      >
        <h1 className="text-3xl font-bold">Add Products</h1>
        <input
          type="text"
          placeholder="Enter product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          type="text"
          placeholder="Enter product desc"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>
        <input
          type="text"
          placeholder="Enter product price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="url"
          placeholder="Provide URL of product image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button type="submit">Add Product</button>
      </form>
      {/* </Layout> */}
      <hr className="text-white"/>
    </div>
  );
}

export default CreateProduct