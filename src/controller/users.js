var express = require("express");
var router = express.Router();
const { body, validationResult } = require("express-validator");
const { signUp } = require("../service/users");
const { validator, tool } = require("../utils/validator");

router.post("/sign-in", function (req, res, next) {
  res.send("respond with a resource");
});

const customUsername = function (req, res, key, errorMsg) {
  // console.log(11);
};

/**
 * 注册帐户
 * 注册后会分配一个数据库
 */
router.post("/sign-up", function (req, res, next) {
  validator([
    {
      key: "username",
      validator: [[tool.notEmpty, "用户名不能为空"], tool.trimL],
      customValidator: customUsername,
    },
    {
      key: "password",
      validator: [[tool.notEmpty, "密码不能为空"]],
    },
  ])(req, res, next)
    .then(() => {
      signUp(req, res, next);
    })
    .catch(() => {});
});

module.exports = router;
