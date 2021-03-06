const getAppClientConfig = require("../../webpack/app.client");
const getAppServerConfig = require("../../webpack/app.server");
const {
  getCopyPlugin,
  getNodemonPlugin,
  getModuleFederationPlugin,
} = require("../../webpack/plugins");
const { resolveCwd } = require("../../webpack/utils");

const HTMLWebpackPlugin = require("html-webpack-plugin");

const getClientConfig = (options = {}) => {
  const [config] = getAppClientConfig(options);
  const html = new HTMLWebpackPlugin({
    template: resolveCwd("./public/index.html"),
    filename: resolveCwd("./dist/public/index.html"),
    minify: false,
  });
  const moduleFederation = getModuleFederationPlugin({
    name: "app",
    shared: {
      react: { singleton: true },
      "react-rom": { singleton: true },
    },
    remotes: {
      auth: "auth@/remotes/auth/client/remote.js",
    },
  });

  config.plugins.push(html, moduleFederation);

  return [config];
};

const getServerConfig = (options = {}) => {
  const [config] = getAppServerConfig(options);
  const nodemonPlugin = getNodemonPlugin({
    script: `./dist/server/index.js`,
    watch: `./dist`,
  });
  const moduleFederation = getModuleFederationPlugin({
    name: "app",
    remotes: {
      auth: "auth@/remotes/auth/client/remote.js",
    },
  });

  config.plugins.push(nodemonPlugin, moduleFederation);

  return [config];
};

module.exports = (options = {}) => {
  const [clientConfig] = getClientConfig(options);
  const [serverConfig] = getServerConfig(options);

  return [clientConfig, serverConfig];
};
