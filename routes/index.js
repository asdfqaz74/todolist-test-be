// express router 초기화
const express = require("express");
const router = express.Router();
const todoApi = require("./todo.api");

router.use("/todos", todoApi);

module.exports = router;