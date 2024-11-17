const express = require("express");
const {
  registerUser,
  loginUser,
} = require("../../controllers/auth-controller/index");
const {authenticate} = require("../../middleware/AuthMiddleware");

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/check-auth", authenticate, (req, res) => {
  const user = req.user;
  console.log(user);
  res
    .status(200)
    .json({ success: true, message: "User authenticated", data: { user } });
});

module.exports = router;
