const jwt = require("jsonwebtoken");
const JWT_SECRET = "Keshavisagoodb$oy";

const fetchUser = (req, res, next) => {
  const jwtToken = req.header("auth-token");

  if (!jwtToken) {
    res.status(401).send("No token");
  }

  try {
    const data = jwt.verify(jwtToken, JWT_SECRET);
    //console.log(data);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send("Invalid token");
  }
};

module.exports = fetchUser;
