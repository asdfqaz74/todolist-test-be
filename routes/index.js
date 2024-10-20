// express router 초기화
const express = require("express");
const router = express.Router();
const todoApi = require("./todo.api");
const userApi = require("./user.api");

router.use("/todos", todoApi);
router.use("/user", userApi);

module.exports = router;
