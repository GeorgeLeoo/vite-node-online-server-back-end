const mongoose = require("../db");

module.exports = mongoose.model(
  "Db",
  new mongoose.Schema({
    uid: {
      type: String,
      required: true,
    },
    dbName: {
      type: String,
      required: true,
      unique: true,
    },
    host: {
      type: String,
      required: true,
    },
    port: {
      type: String,
      required: true,
    },
    username: {
      type: String,
    },
    password: {
      type: String,
    },
  }).set("toJSON", { virtuals: true })
);
