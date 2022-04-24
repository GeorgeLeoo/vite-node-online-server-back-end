const mongoose = require("../db");

module.exports = mongoose.model(
  "User",
  new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  }).set("toJSON", { virtuals: true })
);
