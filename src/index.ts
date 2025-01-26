#!/usr/bin/env node

import { Command } from "commander";
import { PackageDetails } from "./intefaces";
import chalk from "chalk";
import { createFolderAndFile } from "./file-manager";
import { execa } from "execa";
import init from "./commands/init";
import inquirer from "inquirer";
import path from "path";
import { readFileSync } from "fs";

// Read version from package.json
const getPackageDetails = (): PackageDetails => {
  let packageDetails: PackageDetails = {
    name: "",
    version: "",
    description: "",
  };
  try {
    const packageJsonPath = path.join(__dirname, "../package.json");
    const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));
    packageDetails.name = packageJson.name;
    packageDetails.version = packageJson.version;
    packageDetails.description = packageJson.description;
    return packageDetails;
  } catch (error) {
    console.error(chalk.red("Failed to read version from package.json"));
    return packageDetails;
  }
};
const packageDetails = getPackageDetails();

const program = new Command();

program.version(packageDetails.version).description(packageDetails.description);

init(program);

program.action(async (appName: string) => {
  console.log(chalk.green(`Starting the creation of React app: ${appName}`));

  try {
    // Run the create-react-app command
    await execa("npx", ["create-react-app", appName], { stdio: "inherit" });

    console.log(chalk.blue("React app created successfully!"));

    // Prompt user for additional packages
    const answers = await inquirer.prompt([
      {
        type: "checkbox",
        name: "packages",
        message: "Select additional packages to install:",
        choices: ["axios", "redux", "react-router-dom"],
      },
    ]);

    // Install selected packages
    if (answers.packages.length > 0) {
      console.log(
        chalk.green(
          `Installing additional packages: ${answers.packages.join(", ")}`
        )
      );
      await execa("npm", ["install", ...answers.packages], {
        cwd: appName,
        stdio: "inherit",
      });
    }

    console.log(chalk.blue("Configuration complete!"));
  } catch (error: any) {
    console.error(chalk.red("An error occurred:", error.message));
  }
});

// Parse the arguments from the CLI
program.parse(process.argv);
