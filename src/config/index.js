const { resolve } = require("path");

module.exports = {
  mongo: {
    host: "localhost",
    port: "27017",
    db: "node-online-server",
    username: "admin",
    password: "123456",
  },
  DIR: resolve(__dirname, "../"),
};
