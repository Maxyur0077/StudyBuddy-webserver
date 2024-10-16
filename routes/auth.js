const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");
router.post("/signup", authController.signUp);
router.put("/completeSignUp/:id", authController.completSignup);
router.post("/login", authController.login);


module.exports = router;
