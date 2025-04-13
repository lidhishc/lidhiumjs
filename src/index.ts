#!/usr/bin/env node

import { Command } from "commander";
import { PackageDetails } from "./intefaces";
import addGlobalCommands from "./commands";
import chalk from "chalk";
import path from "path";
import { readFileSync } from "fs";

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

addGlobalCommands(program);

// addGlobalCommands(command);
// generate(program);
program.parse(process.argv);
