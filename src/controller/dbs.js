var express = require("express");
var router = express.Router();
const { createDb, findDbInfoById } = require("../service/dbs");
const { validator, tool } = require("../utils/validator");
const Response = require("../utils/response");

router.post("/create", function (req, res, next) {
  validator([
    {
      body: "uid",
      validator: [[tool.notEmpty, "uid 不能为空"]],
    },
    {
      body: "dbName",
      validator: [[tool.notEmpty, "数据库名称不能为空"]],
    },
    {
      body: "host",
      validator: [[tool.notEmpty, "数据库 host 不能为空"]],
    },
    {
      body: "port",
      validator: [[tool.notEmpty, "数据库 port 不能为空"]],
    },
  ])(req, res, next)
    .then(() => {
      createDb({
        uid: req.body.uid,
        dbName: req.body.dbName,
        host: req.body.host,
        port: req.body.port,
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
router.post("/run", function (req, res, next) {
  validator([
    {
      body: "dbId",
      validator: [[tool.notEmpty, "dbId 不能为空"]],
    },
  ])(req, res, next)
    .then(() => {
      findDbInfoById(req.body.dbId)
        .then((docs) => {
          Response.SUCCESS(res, docs);
        })
        .catch((err) => {
          Response.ERROR(res, err);
        });
    })
    .catch(() => {});
});

module.exports = router;
