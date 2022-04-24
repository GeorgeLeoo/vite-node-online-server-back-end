const User = require("../schema/User");

const UserService = {
  async findUserByUsername(username) {
    return await User.findOne({ username });
  },
  async hasUsername(username) {
    return (await UserService.findUserByUsername(username)) !== null;
  },
  signUp({ username, password }) {
    return new Promise(async (resolve, reject) => {
      if (await UserService.hasUsername(username)) {
        reject("用户名已存在");
      } else {
        await User.insertMany([{ username, password }]);
        resolve();
      }
    });
  },
  signIn({ username, password }) {
    return new Promise(async (resolve, reject) => {
      const userInfo = await UserService.findUserByUsername(username);
      if (!userInfo) {
        reject("用户名不存在");
      } else if (userInfo?.password !== password) {
        reject("密码错误");
      } else {
        resolve(userInfo);
      }
    });
  },
};

module.exports = UserService;
