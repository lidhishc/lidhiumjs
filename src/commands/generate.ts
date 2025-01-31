import { createFile, createFolder, createFolderAndFile } from "../file-manager";
import { Command } from "commander";
import chalk from "chalk";
import { createApp } from "./create-app";
import { parentAppPackage } from "../static/turbo/parentapp.package";
import flinget from "figlet";

export default function generate(command: Command) {
  console.log(
    chalk.yellow(
      flinget.textSync("LidhRo", {
        horizontalLayout: "full",
        font: "Big Money-ne",
        whitespaceBreak: true,
      })
    )
  );
  command.command("generate <appName>").action(async (appName: string) => {
    createApp(`${appName}`);
  });
}
