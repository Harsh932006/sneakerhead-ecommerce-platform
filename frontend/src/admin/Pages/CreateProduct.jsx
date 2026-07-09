import React, { useContext, useState } from "react";
import axios from "axios"
import {toast} from "react-toastify";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const [fileName, setFileName] = useState('No file chosen');

  const clearFile = () => {
  setImage(null);
  setFileName("No file chosen");

  if (fileInputRef.current) {
    fileInputRef.current.value = "";
  }
};

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try{
      const formData = new FormData();
      
      formData.append("name", name);
      formData.append("desc", desc);
      formData.append("price", price);
      formData.append("image", image);

        const response = await axios.post(
            "http://localhost:3000/api/products",
            formData,
            {
                withCredentials: true,
            }
        )

        console.log(response.data);
        setName("");
        setDesc("");
        setPrice("");
        setImage(response.data.url);
        toast.success(response.data.message);

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

        <div className="file-upload-container flex items-center w-full max-w-md border border-white rounded-xl overflow-hidden p-2">
          <label htmlFor="custom-file-input" className="custom-file-label bg-gray-700 text-white px-4 py-2 cursor-pointer hover:bg-gray-600 whitespace-nowrap">
        Choose Image
        </label>
        <input
          id="custom-file-input"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {setImage(e.target.files[0]);
            setFileName(e.target.files[0].name);
          }}
          
        />
        <span className="file-name-text flex-1 px-3 py-2 text-gray-300 truncate">{fileName}</span>

        {image && (
    <button
      type="button"
      onClick={clearFile}
      className="px-3 text-white-500 font-bold"
    >
      ✕
    </button>
  )}
        </div>
        <button type="submit" className="bg-blue-600">Add Product</button>
      </form>
      {/* </Layout> */}
      <hr className="text-white"/>
    </div>
  );
}

export default CreateProduct