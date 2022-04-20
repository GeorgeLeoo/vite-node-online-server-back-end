const Response = require("../utils/response");

module.exports = {
  signUp: (req, res, next) => {
    Response.SUCCESS(res, "respond with a resource");
  },
};
