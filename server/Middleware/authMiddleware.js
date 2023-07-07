const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
  try {
    const token = req.headers["authtoken"];
    if (!token) {
      return res.status(401).send({ message: "No token provided" });
    }
    const decoded = jwt.verify(token, "jwt-token");
    req.user = decoded.user;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send("token is invalid");
  }
};
