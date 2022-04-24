/**
 * 验证参数的工具
 * @param {*} param
 * @param {*} callback
 * @returns
 */
const Response = require("../response");
const tool = require("./tool");
const toolKit = require("./toolKit");

/**
 * 验证方法
 * @param {*} rules 验证规则
 * 验证规则 有 param ， validator ， customValidator
 * @returns
 */
const validator = function (rules) {
  return (req, res, next) => {
    const validationList = [];

    rules.forEach(({ body, query, validator, customValidator }) => {
      let param = "";
      let location = "";
      if (query) {
        param = query;
        location = "query";
      }
      if (body) {
        param = body;
        location = "body";
      }
      if (location) {
        validator.forEach((ele) => {
          if (typeof ele === "string" && tool[ele]) {
            validationList.push([location, param, toolKit[ele]]);
          }
          if (Array.isArray(ele) && ele.length > 0 && tool[ele[0]]) {
            ele[0] = toolKit[ele[0]];
            ele.unshift(location, param);
            validationList.push(ele);
          }
        });
        customValidator &&
          validationList.push([location, param, customValidator]);
      }
    });

    const errorList = [];
    validationList.forEach(([location, param, fn, errorMsg]) => {
      const error = fn(req, res, location, param, errorMsg);
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
