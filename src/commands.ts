import { Command } from "commander";
import initActions from "./actions/init";
import { log } from "console";
import generateActions from "./actions/generate";
import startActions from "./actions/start";
import buildActions from "./actions/build";

export default function addGlobalCommand(command: Command) {
  log("Adding global commands");
  command.command("init <appName>").action(initActions());
  command.command("generate <appName> <Port>").action(generateActions());
  command.command("start <appName>").action(startActions());
  command.command("build <appName>").action(buildActions());
}
