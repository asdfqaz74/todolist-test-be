const User = require("../model/User");
const bcrypt = require("bcryptjs");

const saltRounds = 10;

const userController = {};

userController.createUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Error("이미 존재하는 사용자입니다.");
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    const newUser = new User({ email, name, password: hash });

    await newUser.save();
    res.status(200).json({ status: "success" });
  } catch (e) {
    res.status(400).json({ status: "error", message: e.message });
  }
};

userController.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }, "-__v -createdAt -updatedAt");
    if (user) {
      const isMatch = bcrypt.compareSync(password, user.password);
      if (isMatch) {
        const token = user.generateToken();
        return res.status(200).json({ status: "success", user, token });
      }
    }
    throw new Error("이메일 또는 비밀번호가 일치하지 않습니다.");
  } catch (e) {
    res.status(400).json({ status: "error", message: e.message });
  }
};

module.exports = userController;
