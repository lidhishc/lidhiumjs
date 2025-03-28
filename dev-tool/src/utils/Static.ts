export const testConfig = {
  project: "myapp",
  webapp: "vue3",
  bundler: "webpack",
  apps: {
    shell: {
      port: "3000",
      appType: "host",
      remotes: ["header", "body", "tile1"],
      exposedComponents: {},
      url: "http://localhost:3000",
    },
    header: {
      port: "3001",
      appType: "remote",
      remotes: [],
      exposedComponents: {
        TestMyAPP: {
          source: "./src/components/TestMyAPP.vue",
          remoteComponentValue: "header/TestMyAPP",
        },
      },
      url: "http://localhost:3001",
    },
    body: {
      port: "3002",
      appType: "remote",
      remotes: ["header"],
      exposedComponents: {
        Body: {
          source: "./src/components/Body.vue",
          remoteComponentValue: "body/Body",
        },
      },
      url: "http://localhost:3002",
    },
    tile1: {
      port: "3003",
      appType: "remote",
      remotes: ["header"],
      exposedComponents: {
        Body: {
          source: "./src/components/Body.vue",
          remoteComponentValue: "body/Body",
        },
      },
      url: "http://localhost:3002",
    },
  },
};
