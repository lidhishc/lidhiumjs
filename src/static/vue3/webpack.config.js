const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const { configManager } = require("@lidhium/common");

process.env.VUE_APP_BASE_URL = "/";
const CompressionPlugin = require("compression-webpack-plugin");

// Must call init first with the context
configManager.init(__dirname);

// Then you can use the methods
const remoteRoutes = configManager.generateRemoteRoutes();
const exposedComponents = configManager.getExposedComponents();
const appName = configManager.getAppName();

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  context: path.resolve(__dirname, "."),
  mode: isProduction ? "production" : "development",
  entry: "./src/main.ts",
  target: "web",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    clean: true,
    publicPath: "auto",
    chunkFilename: "[name].[contenthash].js",
    globalObject: "self",
    hotUpdateChunkFilename: "[id].[fullhash].hot-update.js",
    hotUpdateMainFilename: "[runtime].[fullhash].hot-update.json",
    library: {
      name: appName,
      type: "var",
    },
  },
  resolve: {
    extensions: [".ts", ".js", ".vue", ".json"],
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@apps": path.resolve(__dirname, "../../apps"),
      "@root": path.resolve(__dirname, "../../"),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          hotReload: false,
        },
      },
      {
        test: /\.ts$/,
        loader: "ts-loader",
        options: {
          appendTsSuffixTo: [/\.vue$/],
          transpileOnly: true,
        },
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["tailwindcss", "autoprefixer"],
              },
            },
          },
        ],
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
                  targets: "> 0.25%, not dead",
                  useBuiltIns: "usage",
                  corejs: "3",
                },
              ],
            ],
            cacheDirectory: true,
          },
        },
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new NodePolyfillPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      excludeChunks: ["mfeBBB"],
      minify: isProduction
        ? {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          }
        : false,
    }),
    new CompressionPlugin({
      algorithm: "gzip",
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new webpack.DefinePlugin({
      "process.env.BASE_URL": JSON.stringify("/"),
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
    }),
    new ModuleFederationPlugin({
      name: appName,
      filename: "remoteEntry.js",
      exposes: {
        ...exposedComponents,
        "./Routes": "./src/routes.ts",
      },
      remotes: remoteRoutes,
      shared: {
        vue: {
          singleton: true,
          eager: true,
          requiredVersion: "^3.0.0",
        },
        "vue-router": {
          singleton: true,
          eager: true,
          requiredVersion: "^4.0.0",
        },
      },
    }),
  ],
  devServer: {
    historyApiFallback: true,
    hot: true,
    port: 3001,
    static: {
      directory: path.join(__dirname, "dist"),
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
    client: {
      overlay: false,
    },
  },
  devtool: isProduction ? "source-map" : "eval-source-map",
};
