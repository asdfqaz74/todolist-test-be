// express router 초기화
const express = require("express");
const router = express.Router();
const todoController = require("../controller/todo.controller");
const authController = require("../controller/auth.controller");

// 라우터를 내보내기
router.post("/", authController.authenticate, todoController.createTodo);

// router.get("/", (req, res) => {
//   res.send("get all todos");
// });
router.get("/", todoController.getTodo);

router.put("/:id", todoController.updateTodo);

router.delete("/:id", todoController.deleteTodo);

module.exports = router;
