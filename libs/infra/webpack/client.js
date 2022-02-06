const getCommonConfig = require("./common");
const { resolveCwd } = require("./utils");

module.exports = () => {
  const config = getCommonConfig();

  config.target = "web";
  config.resolve.modules.push(
    resolveCwd("./client"),
    resolveCwd("./node_modules")
  );

  return config;
};
