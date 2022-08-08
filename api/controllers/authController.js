const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }
    console.log("req.body", req.body);
    const hashedPass = await bcrypt.hashSync(password, 10);
    const newUser = new User({
      email,
      password: hashedPass,
    });
    await newUser.save();
    const payload = {
      id: newUser._id,
      email: newUser.email,
    };
    console.log(payload);
    const token = await jwt.sign(payload, process.env.SECRET_KEY);
    console.log("token", token);
    res.json({
      token: token,
      user: payload,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    console.log("user", user);
    if (!user) {
      return res.status(400).json({ msg: "User doesn't exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("isMatch", isMatch);
    if (isMatch) {
      const payload = {
        id: user._id,
        email: user.email,
      };
      const token = await jwt.sign(payload, process.env.SECRET_KEY);
      console.log("token", token);
      delete user.password;
      res.json({
        token: token,
        user,
      });
    } else {
      res.status(400).json({ msg: "Incorrect password" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("access_token").json({ message: "Logout successful" });
  } catch (error) {
    res.json({ success: false, message: "An error occured" });
  }
};

module.exports = {
  register,
  login,
  logout,
};
