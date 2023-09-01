const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackObfuscator = require("webpack-obfuscator");
const path = require("path");

const dotenv = require("dotenv");
const port = 1111;
dotenv.config();

const pages = ["main", "memo", "routeHome"];

const entryHtmlPlugins = pages.map(
  (page) =>
    new HtmlWebpackPlugin({
      filename: `${page}.html`,
      chunks: [page],
    })
);

module.exports = {
  mode: "development",
  entry: {
    main: "./src/main.js",
    memo: "./src/js/memo.js",
    router: "./src/js/router.js",
  },
  output: {
    filename: "[name].js",
    path: __dirname + "/dist",
  },
  resolve: {
    extensions: [".js"],
    alias: {
      // "@": "src",
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: "/node_modules",
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.png$/,
        exclude: /node_modules/,
        type: "asset/inline",
      },
      // 추후에 scss 쓸 때 쓸 것
      // {
      //   test: /\.scss$/,
      //   use: ExtractTextPlugin.extract({
      //     fallback: "style-loader",
      //     use: ["css-loader", "sass-loader"],
      //   }),
      // },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/public/index.html",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
    new WebpackObfuscator(),
    // new MiniCssExtractPlugin({
    //   filename: "style.css",
    // }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  devServer: {
    host: "localhost",
    port: port,
    hot: true,
  },
};
