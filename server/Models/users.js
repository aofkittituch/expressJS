const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    name: String,
    password: {
      type: String,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("users", userSchema);
