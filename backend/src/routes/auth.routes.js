const express = require("express");
const router = express.Router();
const {
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
} = require("../controllers/auth.controller");

//user auth
router.post("/user-register", userRegister);
router.post("/user-login", userLogin);
router.get("/user-refresh-token", userRefreshToken);
router.get("/user-logout", userLogout);
router.get("/curr-user", getCurrUser);

//admin auth
router.post("/admin-register", adminRegister);
router.post("/admin-login", adminLogin);
router.get("/admin-refresh-token", adminRefreshToken);
router.get("/admin-logout", adminLogout);
router.get("/curr-admin", getCurrAdmin);

module.exports = router;
