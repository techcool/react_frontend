const path = require("path");
const {
  getLoader,
  loaderByName
} = require("@craco/craco");

const packages = [];
packages.push(path.resolve(__dirname, "./packages/main"));
packages.push(path.resolve(__dirname, "./packages/guest"));
packages.push(path.resolve(__dirname, "./packages/admin"));
packages.push(path.resolve(__dirname, "./packages/student"));
packages.push(path.resolve(__dirname, "./packages/teacher"));
packages.push(path.resolve(__dirname, "./packages/common"));

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      const {
        isFound,
        match
      } = getLoader(webpackConfig, loaderByName("babel-loader"));
      if (isFound) {
        const include = Array.isArray(match.loader.include) ? match.loader.include : [match.loader.include];

        match.loader.include = include.concat(packages);
      }
      const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
        ({ constructor }) => constructor && constructor.name === "ModuleScopePlugin"
      );

      webpackConfig.resolve.plugins.splice(scopePluginIndex, 1);
      // webpackConfig.optimization.splitChunks=   {
      //   chunks: "async",
      //   maxSize: 3000000 };

      return webpackConfig;
    }
  }
};
