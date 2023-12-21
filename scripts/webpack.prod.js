const path = require("path");
const baseConfig = require("./webpack.base");
const { default: merge } = require("webpack-merge");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = merge(baseConfig, {
  mode: "production",
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../public/"),
          to: path.resolve(__dirname, "../dist/"),
          filter: (source) => {
            return !source.includes("index.html");
          },
        },
      ],
    }),
  ],
});
