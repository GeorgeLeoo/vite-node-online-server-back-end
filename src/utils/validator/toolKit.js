const { INVALID, TYPE_ERROR } = require("./typeError");

const toolKit = {
  notEmpty: function (req, res, key, errorMsg) {
    if (!req.body[key]) {
      return {
        location: "body",
        msg: errorMsg || INVALID,
        param: key,
      };
    }
  },
  trim: function (req, res, key, errorMsg) {
    req.body[key] = req.body[key].trim();
  },
  trimL: function (req, res, key, errorMsg) {
    req.body[key] = req.body[key].trimLeft();
  },
  trimR: function (req, res, key, errorMsg) {
    req.body[key] = req.body[key].trimRight();
  },
  isString: function (req, res, key, errorMsg) {
    if (typeof req.body[key] !== "string") {
      return {
        location: "body",
        msg: errorMsg || TYPE_ERROR,
        param: key,
      };
    }
  },
};

module.exports = toolKit;
