const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchuser");

const JWT_SECRET = "Keshavisagoodb$oy";

const router = express.Router();
// Signup
try {
  router.post("/signup", async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    //console.log(req.body);
    const { name, password, email } = req.body;
    const secPass = await bcrypt.hash(password, salt);
    //console.log(secPass);

    const user = await User.create({ name, password: secPass, email });
    var jwtToken = jwt.sign({ user: { id: user.id } }, JWT_SECRET);
    console.log(jwtToken);
    res.json({ success: true, jwtToken });
  });
} catch (error) {
  res.json({ success: false, error });
}

// Authenticate User - with login
try {
  router.post("/login", async (req, res) => {
    const { password, email } = req.body;
    const user = await User.findOne({ email });

    if (user === null) {
      res.status(404).json({ success: false, error: "Invalid credentials" });
    }
    console.log(password, user, email);

    const isValidPass = await bcrypt.compare(password, user.password);

    if (!isValidPass) {
      res.status(404).json({ success: false, error: "Invalid credentials" });
    }

    const jwtToken = jwt.sign({ user: { id: user.id } }, JWT_SECRET);
    res.json({ success: true, jwtToken });
  });
} catch (error) {
  console.error(error?.message);
  res.status(500).send("Internal Server Error");
}

module.exports = router;

//fetch user details - login required

try {
  router.get("/user", fetchUser, async (req, res) => {
    const { id } = req.user;

    const user = await User.findById(id).select("-password");
    console.log(user);
    res.send(user);
  });
} catch (error) {
  console.error(error.message);
  res.status(500).send("Internal Server Error");
}
