const router = require("../models/user.model");
const crypto = require("crypto");
const { userModel, validateUser } = require("../models/user.model");
const { AdminModel, validateAdmin } = require("../models/admin.model");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const sessionModel = require("../models/session.model");

//user auth
const userRegister = async (req, res) => {
  const { error } = validateUser(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
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

  const refreshToken = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  const refreshTokenHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  const session = await sessionModel.create({
    user: user._id,
    refreshTokenHash,
    ip: req.ip,
    userAgent: req.headers["user-agent"],
  });

  const accessToken = jwt.sign(
    {
      id: user._id,
      sessionId: session._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "15m",
    },
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    message: "User created successfully",
    user: {
      username: user.username,
      email: user.email,
    },
    accessToken,
  });
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  const hashedPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  if (user.password != hashedPassword) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  const refreshToken = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  const refreshTokenHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  const session = await sessionModel.create({
    user: user._id,
    refreshTokenHash,
    ip: req.ip,
    userAgent: req.headers["user-agent"],
  });

  const accessToken = jwt.sign(
    {
      id: user._id,
      sessionId: session._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "15m",
    },
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    message: "User logged in successfully",
    user: {
      email,
    },
    accessToken,
  });
};

const userRefreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      message: "Refresh token not found",
    });
  }

  const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

  const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");

  const session = await sessionModel.findOne({
    refreshTokenHash,
    revoked: false
  });

  if(!session){
    return res.status(401).json({
      message: "Invalid refresh token"
    })
  }

  const accessToken = jwt.sign(
    {
      id: decoded.id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "15m",
    },
  );

  const newRefreshToken = jwt.sign(
    {
      id: decoded.id,
    }, process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  )

  const newRefreshTokenHash = crypto.createHash("sha256").update(newRefreshToken).digest("hex");

  session.refreshTokenHash = newRefreshTokenHash;
  await session.save();

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 1 * 24 * 60 * 60 * 1000
  })

  res.status(201).json({
    message: "Access token refreshed successfully",
    accessToken
  })
};

const userLogout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      message: "Token not found",
    });
  }

  const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");
  
  const session = await sessionModel.findOne({
    refreshTokenHash,
    revoked: false,
  })

  if(!session){
    return res.status(400).json({
      message: "Invalid refresh token"
    })
  }

  session.revoked = true;
  await session.save();

  res.clearCookie("refreshToken");

  res.status(200).json({
    message: "Logged out successfully"
  })

  // const user = await userModel.findById(decoded.id);

  // if (!user) {
  //   return res.status(404).json({
  //     message: "User not found",
  //   });
  // }

  // req.session.destroy((err) => {
  //   if (err) {
  //     return res.status(500).json({
  //       message: "Could not logout please try again later",
  //     });
  //   }
  // });

  // res.clearCookie("connect.sid");

  // res.status(200).json({
  //   message: "User logged out successfully",
  //   user: {
  //     username: user.username,
  //     email: user.email,
  //   },
  // });
};

const getCurrUser = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Token not found",
    });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await userModel.findById(decoded.id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.status(200).json({
    message: "User authenticated",
    user: {
      username: user.username,
      email: user.email,
    },
  });
};

//admin auth
const adminRegister = async (req, res) => {
  const { error } = validateAdmin(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  const { username, orgName, email, password, address } = req.body;

  const isAlreadyRegistered = await AdminModel.findOne({ email });

  if (isAlreadyRegistered) {
    return res.status(409).json({
      message: "User already exists",
    });
  }

  const hashedPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  const user = await AdminModel.create({
    username,
    orgName,
    email,
    password: hashedPassword,
    address,
  });

  const refreshToken = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");

  const session = await sessionModel.create({
    user: user._id,
    refreshTokenHash,
    ip: req.ip,
    userAgent: req.headers["user-agent"]
  })

  const accessToken = jwt.sign(
    {
      id: user._id,
      sessionId: session._id
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "15m",
    },
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    message: "Admin registered successfully",
    user: {
      username: user.username,
      orgName: user.orgName,
      email: user.email,
      address: user.address,
    },
    accessToken
  });
};

const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await AdminModel.findOne({ email });

  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  const hashedPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  if (user.password != hashedPassword) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  const refreshToken = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");

  const session = await sessionModel.create({
    user: user._id,
    refreshTokenHash,
    ip: req.ip,
    userAgent: req.headers["user-agent"]
  })

  const accessToken = jwt.sign(
    {
      id: user._id,
      sessionId: session._id
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "15m",
    },
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    message: "Admin logged in successfully",
    user: {
      username: user.username,
      email: user.email,
      orgName: user.orgName,
      address: user.address,
    },
    accessToken
  });
};

const adminRefreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      message: "Refresh token not found",
    });
  }

  const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

  const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");

  const session = await sessionModel.findOne({
    refreshTokenHash,
    revoked: false
  });

  if(!session){
    return res.status(401).json({
      message: "Invalid refresh token"
    })
  }

  const accessToken = jwt.sign(
    {
      id: decoded.id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "15m",
    },
  );

  const newRefreshToken = jwt.sign(
    {
      id: decoded.id,
    }, process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  )

  const newRefreshTokenHash = crypto.createHash("sha256").update(newRefreshToken).digest("hex");

  session.refreshTokenHash = newRefreshTokenHash;
  await session.save();

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 1 * 24 * 60 * 60 * 1000
  })

  res.status(201).json({
    message: "Access token refreshed successfully",
    accessToken
  })
};

const adminLogout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if(!refreshToken){
    return res.status(400).json({
      message: "Refresh token not found"
    })
  }

  const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");

  const session = await sessionModel.findOne({
    refreshTokenHash,
    revoked: false,
  })

  if(!session){
    return res.status(400).json({
      message: "Invalid refresh token"
    })
  }

  session.revoked = true;
  await session.save();

  res.clearCookie("refreshToken");

  res.status(200).json({
    message: "Logged out successfully"
  })

  // const user = await AdminModel.findById(adminId);

  // if (!user) {
  //   return res.status(404).json({
  //     message: "User not found",
  //   });
  // }

  // req.session.destroy((err) => {
  //   if (err) {
  //     return res.status(500).json({
  //       message: "Could not logout please try again later",
  //     });
  //   }
  // });

  // res.clearCookie("connect.sid");

  // res.status(200).json({
  //   message: "User logged out successfully",
  //   user: {
  //     username: user.username,
  //     email: user.email,
  //     orgName: user.orgName,
  //     address: user.address,
  //   },
  // });
};

const getCurrAdmin = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Token not found",
    });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const admin = await AdminModel.findById(decoded.id);

  if (!admin) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.status(200).json({
    message: "Admin authenticated",
    admin: {
      username: admin.username,
      email: admin.email,
      orgName: admin.orgName,
      address: admin.address,
    },
  });
};

module.exports = {
  userRegister,
  userLogin,
  userRefreshToken,
  userLogout,
  getCurrUser,
  adminRegister,
  adminLogin,
  adminRefreshToken,
  adminLogout,
  getCurrAdmin,
};
