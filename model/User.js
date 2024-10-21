const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET_KEY = `${process.env.JWT_SECRET_KEY}`;

// User 스키마를 정의합니다.
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// toJSON 메소드를 통해 password 필드를 제거합니다.
UserSchema.methods.toJSON = function () {
  const user = this._doc;
  delete user.password;
  return user;
};

// 토큰을 생성하는 메소드를 정의합니다.
UserSchema.methods.generateToken = function () {
  const token = jwt.sign({ _id: this.id }, JWT_SECRET_KEY);
  return token;
};

// User 모델을 생성하여 내보냅니다.
const User = mongoose.model("User", UserSchema);
module.exports = User;
