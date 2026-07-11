import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CreateProduct = ({onProductCreated}) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const [fileName, setFileName] = useState("No file chosen");

  const clearFile = () => {
    setImage(null);
    setFileName("No file chosen");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("desc", desc);
      formData.append("price", price);
      formData.append("image", image);

      const response = await axios.post(
        "https://sneakerhead-ecommerce-platform.vercel.app/api/products",
        formData,
        {
          withCredentials: true,
        },
      );


      setName("");
      setDesc("");
      setPrice("");
      setImage(response.data.url);
      toast.success(response.data.message);
    } catch (err) {
      console.log(err);
    }
  };

  return (

    <section className="w-full bg-neutral-900 border border-neutral-800/80 rounded-2xl p-6 md:p-8 shadow-2xl">
      <div className="mb-6">
        <h2 className="text-2xl font-black text-neutral-100 tracking-tight">
          Add New Product
        </h2>
        <p className="text-sm text-neutral-400 mt-0.5">
          List a new hot release into the customer storefront index
        </p>
      </div>

      <form
        onSubmit={handleFormSubmit}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8"
      >
        {/* Left Grid: Input Fields Data Layout */}
        <div className="lg:col-span-7 w-full flex flex-col items-stretch gap-5">
          
          {/* Product Title Container */}
          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-xs font-semibold text-blue-400 tracking-wider uppercase px-1">
              Product Title
            </label>
            <input
              required
              type="text"
              placeholder="e.g. Air Jordan 1 Retro High"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: '100%' }}
              className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
            />
          </div>

          
          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-xs font-semibold text-blue-400 tracking-wider uppercase px-1">
              Description
            </label>
            <textarea
              required
              rows="4"
              placeholder="Describe the sneakers, materials, limited collaborative details..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}         
              style={{ width: '100%' }}
              className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 resize-none"
            ></textarea>
          </div>

          
          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-xs font-semibold text-blue-400 tracking-wider uppercase px-1">
              Price (INR)
            </label>
            <input
              required
              type="number"
              placeholder="2999"
              value={price}
              onChange={(e) => setPrice(e.target.value)}             
              style={{ width: '100%' }}
              className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
            />
          </div>
        </div>

        
        <div className="lg:col-span-5 flex flex-col justify-between gap-5">
          <div className="flex flex-col gap-1.5 h-full">
            <label className="text-xs font-semibold text-blue-400 tracking-wider uppercase px-1">
              Product Showcase Image
            </label>

            <div className="flex-grow border-2 border-dashed border-neutral-800 hover:border-neutral-700 bg-neutral-950/40 rounded-xl flex flex-col items-center justify-center p-6 text-center transition-all min-h-[200px]">
              <i className="fa-solid fa-cloud-arrow-up text-3xl text-neutral-600 mb-3"></i>

              <label
                htmlFor="custom-file-input"
                className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-xs font-bold text-neutral-200 cursor-pointer transition-colors shadow-sm"
              >
                Choose Image File
              </label>

              <input
                id="custom-file-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files[0]) {
                    setImage(e.target.files[0]);
                    setFileName(e.target.files[0].name);
                  }
                }}
              />
              <p className="mt-2.5 text-xs text-neutral-500 max-w-[240px] truncate">
                {fileName}
              </p>

              {image && (
                <button
                  type="button"
                  onClick={clearFile}
                  className="mt-3 px-3 py-1 rounded-lg bg-red-950/40 hover:bg-red-900/40 border border-red-900/40 text-red-400 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  Remove Asset ✕
                </button>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-blue-600/20 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-neutral-900 transition-all duration-150"
          >
            Publish Product Listing
          </button>
        </div>
      </form>
    </section>

  );
};

export default CreateProduct;
