const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: path.join(__dirname, "../src/index.tsx"), // 人口文件
  output: {
    filename: "static/js/[name].js", // 每个输出js的名称
    path: path.join(__dirname, "../dist"),
    clean: true,
    publicPath: "/",
  }, // 出口文件
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /.(css|less)$/, // 匹配css文件
        use: ["style-loader", "css-loader", "postcss-loader", "less-loader"],
      },
      {
        test: /.(png|jpg|gif|jpeg|gif|svg)$/, // 匹配图片文件
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 10kb
          },
        },
        generator: {
          filename: "static/images/[name][ext]",
        },
      },
      {
        test: /.(woff|woff2|eot|ttf|otf)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 10kb
          },
        },
        generator: {
          filename: "static/fonts/[name][ext]",
        },
      },
      {
        test: /.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          },
        },
        generator: {
          filename: "static/media/[name][ext]", // 文件输出目录和命名
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".tsx", ".ts"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"), // 模板取定义root节点的模板
      inject: true, // 自动注入静态资源
    }),
    new webpack.DefinePlugin({
      "process.env.BASE_ENV": JSON.stringify(process.env.BASE_ENV),
    }),
  ],
  cache: {
    type: "filesystem",
  },
};
