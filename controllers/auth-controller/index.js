const User = require("../../models/User");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registerUser = async (req, res) => {
  const { userName, userEmail, password, role } = req.body;
  const existingUser = await User.findOne({
    $or: [{ userName }, { userEmail }],
  });
  console.log(existingUser);
  if (existingUser) {
    return res
      .status(400)
      .json({ success: false, message: "User already exists" });
  }

  const hashPassword = await bycrypt.hash(password, 10);
  const newUser = new User({
    userName,
    userEmail,
    password: hashPassword,
    role,
  });
  await newUser.save();
  return res
    .status(200)
    .json({ success: true, message: "User created successfully" });
};

const loginUser = async (req, res) => {
  const { userEmail, password } = req.body;
  console.log("Debugging...");
  console.log(userEmail, password);
  const checkUser = await User.findOne({ userEmail });
  console.log(checkUser);
  if (!checkUser || !(await bycrypt.compare(password, checkUser.password)))
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  const token = jwt.sign(
    {
      _id: checkUser._id,
      userName: checkUser.userName,
      userEmail: checkUser.userEmail,
      role:checkUser.role,
    },
    "JWT_SECRET",
    { expiresIn: "120m" }
  );
  res.status(200).json({
    success: true,
    message: "Login successfully",
    data: {
      token,
      user: {
        _id: checkUser._id,
        userName: checkUser.userName,
        userEmail: checkUser.userEmail,
        role:checkUser.role,
      },
    },
  });
};

module.exports = { registerUser, loginUser };
