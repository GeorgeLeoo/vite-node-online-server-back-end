const { INVALID, TYPE_ERROR } = require("./typeError");

const toolKit = {
  notEmpty: function (req, res, location, param, errorMsg) {
    if (!req[location][param]) {
      return {
        location,
        msg: errorMsg || INVALID,
        param: param,
      };
    }
  },
  trim: function (req, res, location, param, errorMsg) {
    req[location][param] = req[location][param].trim();
  },
  trimL: function (req, res, location, param, errorMsg) {
    req[location][param] = req[location][param].trimLeft();
  },
  trimR: function (req, res, location, param, errorMsg) {
    req[location][param] = req[location][param].trimRight();
  },
  isString: function (req, res, location, param, errorMsg) {
    if (typeof req[location][param] !== "string") {
      return {
        location: "body",
        msg: errorMsg || TYPE_ERROR,
        param: param,
      };
    }
  },
};

module.exports = toolKit;
