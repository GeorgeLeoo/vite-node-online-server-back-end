/**
 * 密码创建
 * 首先 use amdin
 * 给 amdin 创建一个密码
 * 创建成功后，验证密码 db.auth('admin', '123456')
 * use 新数据库
 * 给新库创建密码
 * 验证密码
 *
 * 如果有问题，创建密码成功后，退出 mongo shell 重新进
 */
const mongoose = require("mongoose");
const config = require("../config");

function getMongoUri(mongoConfig) {
  const hasAuth = mongoConfig.username && mongoConfig.password;
  const auth = hasAuth
    ? `${mongoConfig.username}:${mongoConfig.password}@`
    : "";
  return `mongodb://${auth}${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.db}`;
}

main().catch((err) => {
  console.log("数据库连接失败");
  console.log(err);
});

async function main() {
  const uri = getMongoUri(config.mongo);
  await mongoose.connect(uri);
  console.log("数据库连接成功");
}

module.exports = mongoose;
