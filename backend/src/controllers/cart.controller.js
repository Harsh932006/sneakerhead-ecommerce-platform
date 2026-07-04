const cartModel = require("../models/cart.model");
const productModel = require("../models/product.model");

const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.session.userId;

    // Check if user is logged in
    if (!userId) {
      return res.status(401).json({
        message: "Please login first.",
      });
    }

    // Check if productId is provided
    if (!productId) {
      return res.status(400).json({
        message: "Product ID is required.",
      });
    }

    // Check if product exists
    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found.",
      });
    }

    // Find user's cart
    let cart = await cartModel.findOne({ userId });

    // Create cart if it doesn't exist
    if (!cart) {
      cart = await cartModel.create({
        userId,
        items: [{ productId }],
      });

      return res.status(201).json({
        message: "Product added to cart.",
        cart,
      });
    }

    // Check if product is already in cart
    const alreadyExists = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (alreadyExists) {
      return res.status(400).json({
        message: "Product already exists in cart.",
      });
    }

    // Add product to existing cart
    cart.items.push({ productId });

    await cart.save();

    return res.status(200).json({
      message: "Product added to cart.",
      cart,
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Something went wrong.",
    });
  }
};

const getCart = async (req, res) => {
  try{

    const userId = req.session.userId;

    if(!userId){
      return res.status(401).json({
        message: "Please login first"
      })
    } 

    const cart = await cartModel.findOne({userId}).populate("items.productId");

    if(!cart){
      return res.status(404).json({
        message: "Cart not found"
      })
    }

    return res.status(200).json({
      message: "Cart retrived successfully",
      cart
    })

  }catch(err){
    console.log(err);
    return res.status(500).json({
      message: "Something went wrong"
    })
  }
}

const deleteFromCart = async (req, res) => {
  try{
    const userId = req.session.userId;

  if(!userId){
    return res.status(401).json({
      message: "Please login first"
    })
  }

  const {productId} = req.body;

  if(!productId){
    return res.status(400).json({
      message: "Product not found"
    })
  }

  const cart = await cartModel.findOne({userId});

  if(!cart){
    return res.status(404).json({
      message: "Cart not found"
    })
  }

  cart.items = cart.items.filter(item => item.productId.toString() !== productId);

  await cart.save();

  return res.status(200).json({
    message: "Product deleted from cart",
    cart,
  })
  }catch(err){
    console.log(err);
    return res.status(500).json({
      message: "Something went wrong"
    })
  }
}

const clearCart = async (req, res) => {
  try{
    const userId = req.session.userId;

  if(!userId){
    return res.status(401).json({
      message: "Please login first"
    })
  }

  const cart = await cartModel.deleteMany({userId});

  return res.status(200).json({
    message: "Cart cleared successfully",
    cart
  })
  }catch(err){
    console.log(err);
    return res.status(500).json({
      message: "Something went wrong"
    })
  }
}

module.exports = {
  addToCart,
  getCart,
  deleteFromCart,
  clearCart
};
