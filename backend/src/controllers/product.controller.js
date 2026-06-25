const productModel = require("../models/product.model");
const adminModel = require("../models/admin.model");


const addProduct = async (req, res) => {
  const adminId = req.session.adminId;

  if(!adminId){
    return res.status(403).json({
      message: "Admin id not found in the session"
    })
  }

  const admin = await adminModel.findById(adminId);

  if(!admin){
    return res.status(403).json({
      message: "Admin not found"
    })
  }

  const {name, desc, price, image} = req.body;

  const product = await productModel.create({
    name,
    desc,
    price,
    image,
    adminId: adminId,
  });

  res.status(200).json({
    message: "Product created successfully"
  })
}

const getAdminProducts = async (req, res) => {
  const adminId = req.session.adminId;

  if(!adminId){
    return res.status(401).json({
      message: "Admin is not authenticated"
    })
  }

  const products = await productModel.find({
    adminId: adminId,
  })

  res.status(200).json({
    message: "Products Found",
    products
  })
}

const showProducts = async (req, res) => {
  const products = await productModel.find({});

  if(!products){
    return res.status(404).json({
      message: "Product not found"
    })
  }

  res.status(200).json({
    message: "Found all products",
    products
  })
}

const showOneProduct = async (req, res) => {
  const {id} = req.params;

  const product = await productModel.findById(id);

  if(!product){
    return res.status(404).json({
      message: "Product not found"
    })
  }

  res.status(200).json({
    message: "Product found successfully",
    product,
  })
}

const updateProduct = async (req, res) => {
  const adminId = req.session.adminId;

  if(!adminId){
    return res.status(403).json({
      message: "Admin id not found in the session"
    })
  }

  const {id} = req.params;

  const product = await productModel.findById(id);

  if(!product){
    return res.status(404).json({
      message: "Product not found"
    })
  }

  const isAdmin = product.adminId == req.session.adminId;

  if(!isAdmin){
    return res.status(403).json({
      message: "Access denied"
    })
  }

  const {name, desc, price, image} = req.body;


  await product.updateOne({
    name,
    desc,
    price,
    image,
  });

  res.status(200).json({
    message: "Product updated successfully"
  })
}

const deleteProduct = async (req, res) => {
   const adminId = req.session.adminId;

  if(!adminId){
    return res.status(403).json({
      message: "Admin id not found in the session"
    })
  }

  const {id} = req.params;

  const product = await productModel.findById(id);

  if(!product){
    return res.status(404).json({
      message: "Product not found"
    })
  }

  const isAdmin = product.adminId == adminId;

  if(!isAdmin){
    return res.status(403).json({
      message: "Access denied"
    })
  }

  await productModel.findByIdAndDelete(id);

  res.status(200).json({
    message: "Product deleted successfully"
  })
}

module.exports = {
    addProduct,
    getAdminProducts,
    showProducts,
    showOneProduct,
    updateProduct,
    deleteProduct
}