const shell = require("shelljs");
const path = require("path");
const DbInfo = require("../schema/Db");
const { DIR } = require("../config");

const DbService = {
  async findDbInfoById(id) {
    return await DbInfo.findOne({ _id: id });
  },
  async findDbByName(dbName) {
    return await DbInfo.findOne({ dbName });
  },
  async hasDbName(dbName) {
    return (await DbService.findDbByName(dbName)) !== null;
  },
  createDb({ uid, dbName, host, port, username, password }) {
    return new Promise(async (resolve, reject) => {
      if (await DbService.hasDbName(dbName)) {
        reject("数据库名称已存在");
      } else {
        await DbInfo.insertMany([
          { uid, dbName, host, port, username, password },
        ]);
        const createDbShPath = path.resolve(DIR, "scripts/create-db.sh");
        shell.exec(`chmod +x ${createDbShPath}`);
        shell.exec(`${createDbShPath} ${dbName} ${username} ${password}`);
        resolve();
      }
    });
  },
};

module.exports = DbService;
