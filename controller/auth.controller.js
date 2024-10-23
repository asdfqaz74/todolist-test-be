const authController = {};
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET_KEY = `${process.env.JWT_SECRET_KEY}`;

authController.authenticate = (req, res, next) => {
  try {
    const tokenString = req.headers.authorization;
    if (!tokenString) {
      throw new Error("invalid token");
    }

    const token = tokenString.replace("Bearer ", "");
    jwt.verify(token, JWT_SECRET_KEY, (err, payload) => {
      if (err) {
        throw new Error("invalid token");
      }
      req.userId = payload._id;
      next();
    });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

module.exports = authController;
