const { ProductModel, validateProduct } = require("../models/product.model");
const {AdminModel} = require("../models/admin.model");
const { uploadImage, deleteImage } = require("../services/imagekit.service");

const addProduct = async (req, res) => {
  try {

    const {error} = validateProduct(req.body);

    if(error){
      return res.status(400).json({
        message: error.details[0].message,
      })
    }

    const adminId = req.admin.id;

    if (!adminId) {
      return res.status(403).json({
        message: "Admin id not found in the session",
      });
    }

    const admin = await AdminModel.findById(adminId);

    if (!admin) {
      return res.status(403).json({
        message: "Admin not found",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a product image",
      });
    }

    const { name, desc, price } = req.body;

    //Upload image to Imagekit
    const uploadedImage = await uploadImage(req.file);

    const product = await ProductModel.create({
      name,
      desc,
      price,
      image: uploadedImage.url,
      imageFileId: uploadedImage.fileId,
      adminId: adminId,
    });

    res.status(200).json({
      message: "Product created successfully",
      product
    });
  } catch (err) {
    console.log(err);
    (res.status(500).
      json({
        message: "Something went wrong",
      }));
  }
};

const getAdminProducts = async (req, res) => {
  const adminId = req.admin.id;

  if (!adminId) {
    return res.status(401).json({
      message: "Admin is not authenticated",
    });
  }

  const products = await ProductModel.find({
    adminId: adminId,
  });

  res.status(200).json({
    message: "Products Found",
    products,
  });
};

const showProducts = async (req, res) => {
  const products = await ProductModel.find({});

  if (!products) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  res.status(200).json({
    message: "Found all products",
    products,
  });
};

const showOneProduct = async (req, res) => {
  const { id } = req.params;

  const product = await ProductModel.findById(id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  res.status(200).json({
    message: "Product found successfully",
    product,
  });
};

const updateProduct = async (req, res) => {
  const adminId = req.admin.id;

  if (!adminId) {
    return res.status(403).json({
      message: "Admin id not found in the session",
    });
  }

  const { id } = req.params;

  const product = await ProductModel.findById(id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  const isAdmin = product.adminId == req.admin.id;

  if (!isAdmin) {
    return res.status(403).json({
      message: "Access denied",
    });
  }

  const { name, desc, price, image } = req.body;

  await product.updateOne({
    name,
    desc,
    price,
    image,
  });

  res.status(200).json({
    message: "Product updated successfully",
  });
};

const deleteProduct = async (req, res) => {
  const adminId = req.admin.id;

  if (!adminId) {
    return res.status(403).json({
      message: "Admin id not found in the session",
    });
  }

  const { id } = req.params;

  const product = await ProductModel.findById(id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  const isAdmin = product.adminId == adminId;

  if (!isAdmin) {
    return res.status(403).json({
      message: "Access denied",
    });
  }

  if (product.imageFileId) {
    try {
      await deleteImage(product.imageFileId);
      console.log("Image successfully deleted from ImageKit");
    } catch (ikError) {
      console.error("Failed to delete image from ImageKit:", ikError.message);
    }
  }

  await ProductModel.findByIdAndDelete(id);

  res.status(200).json({
    message: "Product deleted successfully",
  });
};

module.exports = {
  addProduct,
  getAdminProducts,
  showProducts,
  showOneProduct,
  updateProduct,
  deleteProduct,
};