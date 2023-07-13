const userModels = require("../Models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    // 1.check user
    const { username, password } = req.body;

    let user = await userModels.findOne({ username });
    if (user) {
      return res
        .status(400)
        .send({ "status": false, "message": "User already exists" });
    }
    // 2.encrypt password
    const salt = await bcrypt.genSalt(10);
    user = new userModels({
      username,
      password,
    });
    user.password = await bcrypt.hash(password, salt);
    // 3. save
    await user.save();
    res
      .status(201)
      .send({
        "status": true,
        "message": "User saved successfully",
        "data": user,
      });
  } catch (err) {
    console.log(err);
    res.status(500).send({ "status": false, "message": err.message });
  }
};

exports.login = async (req, res) => {
  try {
    // 1.check user
    const { username, password } = req.body;
    let user = await userModels.findOneAndUpdate({ username }, { new: true });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .send({ "status": false, "message": "Invalid password" });
      }
      // 2.payload
      let payload = {
        user: {
          username: user.username,
        },
      };
      // 3.gen token
      jwt.sign(payload, "jwt-token", { expiresIn: "1days" }, (err, token) => {
        if (err) throw err;
        res.json({
          token,
          payload,
          "status": true,
          "message": "Login successfully",
        });
      });
    } else {
      return res
        .status(400)
        .send({ "status": false, "message": "Invalid username" });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ "status": false, "message": "Server error: " + err.message });
  }
};
