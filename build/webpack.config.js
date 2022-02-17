const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const threadLoader = require("thread-loader");
threadLoader.warmup(
  {
    // workers: 4,
    workerParallelJobs: 50,
    workerNodeArgs: ["--max-old-space-size=1024"],
    poolRespawn: false,
    poolTimeout: 2000,
    poolParallelJobs: 50,
    name: "customer-pool",
  },
  ["cache-loader", "vue-style-loader", "css-loader", "sass-loader"]
);

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "../src/main.js"),
  output: {
    path: path.resolve(__dirname, "../dist"),
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["vue-style-loader", "css-loader", "thread-loader", "sass-loader"],
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "../public/index.html"),
    }),
  ],
};
