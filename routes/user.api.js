const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
const authController = require("../controller/auth.controller");

// 1. 회원가입 endpoint
router.post("/", userController.createUser);

// 2. 로그인 endpoint
router.post("/login", userController.loginUser);

// 3. 토근 검증 endpoint
router.get("/me", authController.authenticate, userController.getUser);

module.exports = router;
