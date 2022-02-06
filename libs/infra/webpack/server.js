const getConfig = require("./common");
const { resolveCwd } = require("./utils");

module.exports = () => {
  const config = getConfig();

  config.target = "node";
  config.resolve.modules.push(
    resolveCwd("./server"),
    resolveCwd("./node_modules")
  );

  return config;
};
