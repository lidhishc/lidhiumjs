const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

process.env.VUE_APP_BASE_URL = "/";
const randomPORT = Math.floor(Math.random() * (9000 - 8010 + 1)) + 8010;

module.exports = {
  mode: process.env.NODE_ENV || "development",
  // Entry point
  entry: "./src/main.ts",
  target: "web",
  // Output configuration
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.[contenthash].js",
    clean: true, // Cleans the output directory before building
    publicPath: "auto", // Needed for Module Federation
  },
  // Resolve extensions and aliases
  resolve: {
    extensions: [".ts", ".js", ".vue"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  // Module rules for different file types
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.ts$/,
        loader: "ts-loader",
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        type: "asset/resource",
        generator: {
          filename: "assets/[name].[hash:8][ext]",
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: "> 0.25%, not dead", // Adjust based on your target browsers
                  useBuiltIns: "usage",
                  corejs: "3",
                },
              ],
            ],
          },
        },
      },
    ],
  },

  // Plugins
  plugins: [
    new VueLoaderPlugin(),
    new NodePolyfillPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    // Define BASE_URL as a global variable
    new webpack.DefinePlugin({
      "process.env.BASE_URL": JSON.stringify("/"),
    }),
    new ModuleFederationPlugin({
      name: "hostApp", // The name of the host application
      filename: "remoteEntry.js", // Remote entry file
      remotes: {
        authentication: "authentication@http://localhost:8082/remoteEntry.js",
      },
      exposes: {
        "./store": "./src/store",
        "./router": "./src/router",
      },
      shared: {
        vue: { singleton: true, eager: true, requiredVersion: "^3.0.0" },
        vuex: { singleton: true, eager: true, requiredVersion: "^4.0.0" },
        "vue-router": {
          singleton: true,
          eager: true,
          requiredVersion: "^4.0.0",
        },
      },
    }),
  ],

  //   // DevServer configuration
  devServer: {
    historyApiFallback: true,
    port: process.env.PORT || randomPORT,
    hot: true,
    watchFiles: ["src/**/*"],
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
  },
};
