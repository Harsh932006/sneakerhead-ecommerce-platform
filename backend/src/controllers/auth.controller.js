const router = require("../models/user.model");
const crypto = require("crypto");
const {userModel, validateUser} = require("../models/user.model");
const {AdminModel, validateAdmin} = require("../models/admin.model");
const session = require("express-session");

//user auth
const userRegister = async (req, res) => {

  const {error} = validateUser(req.body);

  if(error){
    return res.status(400).json({
      message: error.details[0].message,
    })
  }


  const { username, email, password } = req.body;

  const isAlreadyRegisterd = await userModel.findOne({ email });

  if (isAlreadyRegisterd) {
    return res.status(409).json({
      message: "User already registered",
    });
  }

  const hashedPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  const user = await userModel.create({
    username,
    email,
    password: hashedPassword,
  });

  req.session.userId = user._id;
  await req.session.save();
  console.log(req.session);


  res.status(200).json({
    message: "User created successfully",
    user: {
        username: user.username,
        email: user.email,
    }
  })
}

const userLogin = async (req, res) => {
  const {email, password} = req.body;

  const user = await userModel.findOne({email});


  if(!user){
    return res.status(401).json({
      message: "Invalid email or password"
    })
  }

  const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

  if(user.password != hashedPassword){
    return res.status(401).json({
      message: "Invalid email or password"
    })
  }

  req.session.regenerate(async (err) => {
    if(err){
      return res.status(500).json({
        message: "Session error"
      })
    }
  });


  req.session.userId = user._id;
  await req.session.save();

  return res.status(200).json({
    message: "User logged in successfully",
    user: {
      email,
    }
  })

}

const userLogout = async(req, res) => {
  const userId = req.session.userId;

  if(!userId){
    return res.status(401).json({
      message: "No active session"
    })
  }

  const user = await userModel.findById(userId);

  if(!user){
    return res.status(404).json({
      message: "User not found"
    })
  }

  req.session.destroy((err) => {
    if(err){
      return res.status(500).json({
        message: "Could not logout please try again later"
      })
    }
  });

  res.clearCookie("connect.sid");

  res.status(200).json({
    message: "User logged out successfully",
    user: {
      username: user.username,
      email: user.email,
    }
  })
}

const getCurrUser = async (req, res) => {
  const userId = req.session.userId;

  if(!userId){
    return res.status(401).json({
      message: "Not Authenticated"
    })
  }

  const user = await userModel.findById(userId);

  if(!user){
    return res.status(404).json({
      message: "User not found"
    })
  }

  res.status(200).json({
    message: "User authenticated",
    user: {
      username: user.username,
      email: user.email
    }
  })
}

//admin auth
const adminRegister = async (req, res) => {

  const {error} = validateAdmin(req.body);

  if(error){
    return res.status(400).json({
      message: error.details[0].message,
    })
  }


  const {username, orgName, email, password, address} = req.body;

  const isAlreadyRegistered = await AdminModel.findOne({email});

  if(isAlreadyRegistered){
    return res.status(409).json({
      message: "User already exists"
    })
  }

  const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

  const user = await AdminModel.create({
    username,
    orgName,
    email,
    password: hashedPassword,
    address
  });

  req.session.adminId = user._id;
  await req.session.save();

  res.status(200).json({
    message: "Admin registered successfully",
    user: {
      username: user.username,
      orgName: user.orgName,
      email: user.email,
      address: user.address
    }
  })
}

const adminLogin = async (req, res) => {
  const {email, password} = req.body;

  const user = await AdminModel.findOne({email});

  if(!user){
    return res.status(401).json({
      message: "Invalid email or password"
    })
  }

  const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

  if(user.password != hashedPassword){
    return res.status(401).json({
      message: "Invalid email or password"
    })
  }

  req.session.regenerate(async (err) => {
    if(err){
      return res.status(500).json({
        message: "Session error"
      })
    }
  })

  req.session.adminId = user._id;
  await req.session.save();

  res.status(200).json({
    message: "Admin logged in successfully",
    user: {
      username: user.username,
      email: user.email,
      orgName: user.orgName,
      address: user.address
    }
  })
}

const adminLogout = async (req, res) => {
  const adminId = req.session.adminId;
  
  if(!adminId){
    return res.status(401).json({
      messsage: "No active session"
    })
  }

  const user = await adminModel.findById(adminId);

  if(!user){
    return res.status(404).json({
      message: "User not found"
    })
  }

  req.session.destroy((err) => {
    if(err){
      return res.status(500).json({
        message: "Could not logout please try again later"
      })
    }
  })

  res.clearCookie("connect.sid");

  res.status(200).json({
    message: "User logged out successfully",
    user: {
      username: user.username,
      email: user.email,
      orgName: user.orgName,
      address: user.address
    }
  })
}

const getCurrAdmin = async (req, res) => {
  const adminId = req.session.adminId;

  if(!adminId){
    return res.status(401).json({
      message: "Not Authenticated"
    })
  }

  const admin = await adminModel.findById(adminId);

  if(!admin){
    return res.status(404).json({
      message: "User not found"
    })
  }

  res.status(200).json({
    message: "Admin authenticated",
    admin: {
      username: admin.username,
      email: admin.email,
      orgName: admin.orgName,
      address: admin.address
    }
  })
}

module.exports = {
  userRegister,
  userLogin,
  userLogout,
  getCurrUser,
  adminRegister,
  adminLogin,
  adminLogout,
  getCurrAdmin
};
