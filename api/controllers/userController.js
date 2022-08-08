const User = require("../models/User");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res, next) => {
  try {
    jwt.verify(req.headers.token, process.env.SECRET_KEY);
    const users = await User.find({});
    if (users.length > 0) {
      res.json({ users });
    } else {
      res.json({ message: "No users found" });
    }
  } catch (error) {
    res.json({ msg: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const payload = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
    await User.findByIdAndDelete(payload.id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.json({ msg: error.message });
  }
};

const user = async (req, res) => {
  //console.log("req headers", req.headers);
  try {
    const payload = jwt.verify(req.headers.token, process.env.SECRET_KEY);
    const user = await User.findById({ _id: payload.id });
    res.json(user);
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "An error occured" });
  }
};

module.exports = { getUsers, user, deleteUser };
