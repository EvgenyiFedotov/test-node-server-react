const { getMiniCssExtractPlugin } = require("./plugins");
const { resolveCwd, resolveDirname } = require("./utils");
const { getTsJsRule, getCssSassRule } = require("./module-rules");

module.exports = () => ({
  mode: "production",
  entry: {
    index: resolveCwd("./index"),
  },
  output: {
    path: resolveCwd("./dist"),
    filename: "[name].js",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    modules: [resolveDirname("../node_modules")],
  },
  externals: {},
  module: {
    rules: [getTsJsRule(), getCssSassRule()],
  },
  plugins: [getMiniCssExtractPlugin()],
  optimization: {
    // runtimeChunk: "single",
    // moduleIds: "named",
    // chunkIds: "named",
    // splitChunks: {
    //   chunks: "all",
    // },
  },
});
