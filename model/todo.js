// 라이브러리 import
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// 스키마 정의
const todoSchema = new Schema(
  {
    todo: {
      type: String,
      required: true,
    },
    isDone: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// 모델 생성
const Todo = mongoose.model("Todo", todoSchema);

// 모델 내보내기
module.exports = Todo;
