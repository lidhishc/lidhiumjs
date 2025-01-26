// host/vue.config.js
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  configureWebpack: {
    plugins: [
      new ModuleFederationPlugin({
        name: "host",
        filename: "remoteEntry.js",
        remotes: {
          remoteApp: "remoteApp@http://localhost:8002/remoteEntry.js",
        },
        exposes: {
          "./store": "./src/store/index.ts",
          "./AboutPage": "./src/views/AboutView.vue",
        },
        shared: {
          vue: { singleton: true, eager: true, requiredVersion: "^3.0.0" },
          vuex: { singleton: true, eager: true, requiredVersion: "^4.0.0" },
        },
      }),
    ],
  },
  devServer: {
    port: 8080,
  },
};
