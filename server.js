require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth-route/index");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ["GET,POST,PUT,DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

//db connection

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

  app.use("/api/auth", authRoutes);

  

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({ success: false, message: "Something went wrong" });
});

app.listen(PORT, () => {
  console.log("first server is running on port", PORT);
});
