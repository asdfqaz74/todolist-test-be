// 라이브러리 프레임워크 로드
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");

// Express 서버 생성 및 설정
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/api", indexRouter);
const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD;

// MongoDB 연결
const mongoURI = MONGODB_URI_PROD;
console.log("mongoURI", mongoURI);
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("MongoDB 연결 성공");
  })
  .catch((e) => {
    console.error("MongoDB 연결 실패");
    console.error(e);
  });

// 라우팅
app.listen(5000, () => {
  console.log("서버가 5000번 포트에서 실행중입니다.");
});
