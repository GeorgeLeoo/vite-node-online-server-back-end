const routes = require("../routes");
const { resolve } = require("path");

module.exports = function (app) {
  routes.forEach((ele) => {
    app.use(
      ele.path,
      require(resolve("./src/routes/modules", ele.name + ".js"))
    );
  });
};
