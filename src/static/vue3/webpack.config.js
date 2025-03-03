const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const { generateRemoteRoutes, getAppName } = require("./src/utils/utils");
const TerserPlugin = require("terser-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  mode: isProduction ? "production" : "development",
  context: path.resolve(__dirname, "."), // Ensure correct path
  target: "web",

  entry: "./src/main.ts",

  output: {
    asyncChunks: true,
    chunkFilename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.[contenthash].js",
    clean: true,
    publicPath: "auto",
  },

  resolve: {
    extensions: [".ts", ".js", ".vue"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

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
        test: /\.(sc|sa|c)ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        type: "asset/resource",
        generator: {
          filename: "assets/[name].[contenthash:8][ext]",
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
                  targets: "> 0.25%, not dead",
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

  optimization: {
    minimize: isProduction,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // Remove console logs in production
          },
          output: {
            comments: false, // Remove comments
          },
        },
        extractComments: false,
      }),
    ],
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },

  plugins: [
    new VueLoaderPlugin(),
    new NodePolyfillPlugin(),

    new HtmlWebpackPlugin({
      template: "./public/index.html",
      minify: isProduction ? { collapseWhitespace: true } : false,
    }),

    new webpack.DefinePlugin({
      "process.env.BASE_URL": JSON.stringify("/"),
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development"
      ),
      __VUE_HMR_RUNTIME__: JSON.stringify(isProduction ? "undefined" : "true"),
    }),

    new ModuleFederationPlugin({
      name: getAppName(),
      filename: "remoteEntry.js",
      remotes: generateRemoteRoutes(),
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

  devServer: isProduction
    ? undefined
    : {
        historyApiFallback: true,
        hot: true,
        watchFiles: ["src/**/*"],
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods":
            "GET, POST, PUT, DELETE, PATCH, OPTIONS",
          "Access-Control-Allow-Headers":
            "X-Requested-With, content-type, Authorization",
        },
      },
};
