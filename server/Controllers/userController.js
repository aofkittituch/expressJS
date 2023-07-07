const userModels = require("../Models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    // 1.check user
    const { username, password } = req.body;

    let user = await userModels.findOne({ username });
    if (user) {
      return res.status(400).send("User already exists");
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
    res.status(201).send("User created");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error: " + err.message);
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
        return res.status(400).send("Invalid password");
      }
      // 2.payload
      let payload = {
        user: {
          username: user.username,
        },
      };
      // 3.gen token
      jwt.sign(payload, "jwt-token", { expiresIn: 20 }, (err, token) => {
        if (err) throw err;
        res.json({ token, payload });
      });
    } else {
      return res.status(400).send("Invalid username");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error: " + err.message);
  }
};
