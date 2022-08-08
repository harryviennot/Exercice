const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/users", userController.getUsers);
router.delete("/users/:id", userController.deleteUser);
router.get("/user", userController.user);

module.exports = router;
