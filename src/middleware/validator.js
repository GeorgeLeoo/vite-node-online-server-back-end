/**
 * 验证参数的工具
 * @param {*} key
 * @param {*} callback
 * @returns
 */
const Response = require("../utils/response");

/**
 * 内置错误类型
 */
const INVALID = "Invalid value";
const TYPE_ERROR = "类型错误 value";

/**
 * 工具名
 */
const tool = {
  notEmpty: "notEmpty",
  trim: "trim",
  trimL: "trimL",
  trimR: "trimR",
  isString: "isString",
  isJsonString: "isJsonString",
  isInt: "isInt",
  isDouble: "isDouble",
  isEmail: "isEmail",
  toString: "toString",
  toInt: "toInt",
  toDouble: "toDouble",
};

/**
 * 具体工具
 */
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

/**
 * 验证方法
 * @param {*} rules 验证规则
 * 验证规则 有 key ， validator ， customValidator
 * @returns
 */
const validator = function (rules) {
  return (req, res, next) => {
    const validationList = [];

    rules.forEach(({ key, validator, customValidator }) => {
      validator.forEach((ele) => {
        if (typeof ele === "string" && tool[ele]) {
          validationList.push([key, toolKit[ele]]);
        }
        if (Array.isArray(ele) && ele.length > 0 && tool[ele[0]]) {
          ele[0] = toolKit[ele[0]];
          ele.unshift(key);
          validationList.push(ele);
        }
      });
      customValidator && validationList.push([key, customValidator]);
    });

    const errorList = [];
    validationList.forEach(([key, fn, errorMsg]) => {
      const error = fn(req, res, key, errorMsg);
      error && errorList.push(error);
    });

    return new Promise((resolve, reject) => {
      if (errorList.length > 0) {
        const errorMsg = errorList
          .reduce((prev, cur) => {
            prev.push(cur.msg);
            return prev;
          }, [])
          .join(", ");

        Response.ERROR(res, {
          errorMsg,
          errors: errorList,
        });
        reject();
        return;
      }
      resolve();
    });
  };
};

module.exports = {
  validator,
  tool,
};
