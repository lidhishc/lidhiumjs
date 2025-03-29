import { copyFolder, createFile, createFolder } from "../file-manager";

import chalk from "chalk";
import fs from "fs";
import inquirer from "inquirer";
import { printLibraryHeader } from "../utils/common";

export default () => async (appName: string) => {
  printLibraryHeader();
  const isFileExist = fs.existsSync(`./lidhium.config.json`);

  if (isFileExist) {
    console.error(
      chalk.red(`lidhium.config.json already exists`),
      chalk.green(
        `Run ${chalk.magenta(
          `'lidhium generate <appName> <Port> for creating a new app'`
        )}`
      )
    );
    return;
  }

  const { selectedApp, selectedBundle } = {
    selectedApp: "Vue3",
    selectedBundle: "webpack",
  };
  // await inquirer.prompt([
  //   {
  //     type: "list", // Works like a radio button
  //     name: "selectedApp",
  //     message: "Select App:",
  //     choices: ["Vue3", "React", "Angular"],
  //   },
  //   {
  //     type: "list", // Works like a radio button
  //     name: "selectedBundle",
  //     message: "Select Bundler:",
  //     choices: ["webpack", "vite"],
  //   },
  // ]);

  console.log(selectedApp, selectedBundle);
  console.log(chalk.green(`Creating a ${appName}`));
  createFolder(`./${appName}`);
  createFile(
    `./${appName}/lidhium.config.json`,
    JSON.stringify({
      project: appName,
      webapp: selectedApp.toLowerCase(),
      bundler: selectedBundle,
      apps: {},
    })
  );
  createFile(
    `./${appName}/package.json`,
    JSON.stringify(
      {
        name: appName,
        private: true,
        scripts: {
          start: "lidhium start",
          build: "lidhium build",
          "dev-tool": "lidhium dev-tool",
        },
        dependencies: {
          "core-js": "3.40.0",
          "eslint-config-prettier": "10.0.1",
          fs: "^0.0.1-security",
          "node-polyfill-webpack-plugin": "^4.1.0",
          prettier: "^3.4.2",
          "regenerator-runtime": "0.14.1",
          "register-service-worker": "^1.7.2",
          vue: "3",
          "vue-class-component": "^8.0.0-0",
          "vue-router": "^4.5.0",
          vuex: "^4.0.0",
          webpack: "^5.97.1",
          "webpack-cli": "^6.0.1",
          "webpack-merge": "^6.0.1",
        },
        devDependencies: {
          "@babel/core": "^7.26.0",
          "@babel/preset-env": "^7.26.0",
          "@types/jest": "^29.5.14",
          "@types/mocha": "^10.0.10",
          "@types/node": "^22.13.8",
          "@types/webpack-env": "^1.18.4",
          "@typescript-eslint/eslint-plugin": "^8.24.1",
          "@typescript-eslint/parser": "^8.24.1",
          "@vue/cli-plugin-babel": "~5.0.0",
          "@vue/cli-plugin-e2e-cypress": "~5.0.0",
          "@vue/cli-plugin-eslint": "~5.0.0",
          "@vue/cli-plugin-pwa": "~5.0.0",
          "@vue/cli-plugin-router": "~5.0.0",
          "@vue/cli-plugin-typescript": "~5.0.0",
          "@vue/cli-plugin-unit-jest": "~5.0.0",
          "@vue/cli-plugin-vuex": "~5.0.0",
          "@vue/cli-service": "~5.0.0",
          "@vue/eslint-config-standard": "^9.0.0",
          "@vue/eslint-config-typescript": "^14.4.0",
          "@vue/test-utils": "^2.0.0-0",
          "@vue/vue3-jest": "^29.2.6",
          ajv: "^8.17.1",
          "ajv-keywords": "^5.1.0",
          "babel-jest": "^29.7.0",
          "babel-loader": "^9.2.1",
          "css-loader": "^7.1.2",
          cypress: "^14.0.3",
          eslint: "^9.21.0",
          "eslint-plugin-import": "^2.25.3",
          "eslint-plugin-node": "^11.1.0",
          "eslint-plugin-promise": "^7.2.1",
          "eslint-plugin-vue": "^9.32.0",
          "file-loader": "^6.2.0",
          jest: "^29.7.0",
          sass: "^1.83.1",
          "sass-loader": "^16.0.4",
          "schema-utils": "^4.3.0",
          "style-loader": "^4.0.0",
          "terser-webpack-plugin": "^5.3.12",
          "ts-jest": "^29.2.6",
          "ts-loader": "^9.5.1",
          typescript: "^5.7.2",
          "vue-loader": "^17.4.2",
          "vue-template-compiler": "^2.7.16",
          "webpack-bundle-analyzer": "^4.10.2",
          "webpack-dev-server": "^5.2.0",
          "compression-webpack-plugin": "^11.1.0",
        },
      },
      null,
      2
    )
  );

  createFile(
    `./${appName}/tsconfig.json`,
    JSON.stringify(
      {
        compilerOptions: {
          target: "ESNext",
          module: "ESNext",
          strict: true,
          jsx: "preserve",
          moduleResolution: "Node",
          experimentalDecorators: true,
          skipLibCheck: true,
          esModuleInterop: true,
          allowSyntheticDefaultImports: true,
          forceConsistentCasingInFileNames: true,
          useDefineForClassFields: true,
          sourceMap: true,
          lib: ["ESNext", "DOM", "DOM.Iterable", "ScriptHost"],
          paths: {
            "@config": ["./package.json"],
          },
          types: ["webpack-env", "jest"],
        },
        exclude: ["node_modules", "dist"],
      },
      null,
      2
    )
  );
  copyFolder(`../static/config_files`, `./${appName}`);
};
