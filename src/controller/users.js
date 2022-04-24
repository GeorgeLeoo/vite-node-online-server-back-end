var express = require("express");
var router = express.Router();
const { signUp, signIn } = require("../service/users");
const { validator, tool } = require("../utils/validator");
const Response = require("../utils/response");

const signInUpValidator = [
  {
    body: "username",
    validator: [[tool.notEmpty, "用户名不能为空"], tool.trim],
  },
  {
    body: "password",
    validator: [[tool.notEmpty, "密码不能为空"]],
  },
];

router.post("/sign-in", function (req, res, next) {
  validator(signInUpValidator)(req, res, next)
    .then(() => {
      signIn({
        username: req.body.username,
        password: req.body.password,
      })
        .then((msg) => {
          Response.SUCCESS(res, msg);
        })
        .catch((err) => {
          Response.ERROR(res, err);
        });
    })
    .catch(() => {});
});

/**
 * 注册帐户
 * 注册后会分配一个数据库
 */
router.post("/sign-up", function (req, res, next) {
  validator(signInUpValidator)(req, res, next)
    .then(() => {
      signUp({
        username: req.body.username,
        password: req.body.password,
      })
        .then(() => {
          Response.SUCCESS(res, "注册成功");
        })
        .catch((err) => {
          Response.ERROR(res, err || "注册失败");
        });
    })
    .catch(() => {});
});

module.exports = router;
