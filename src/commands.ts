import { Command } from "commander";
import bindActions from "./actions/bind";
import buildActions from "./actions/build";
import devToolActions from "./actions/devTool";
import exposeActions from "./actions/expose";
import generateActions from "./actions/generate";
import initActions from "./actions/init";
import startActions from "./actions/start";

export default function addGlobalCommand(command: Command) {
  command.command("init <appName>").action(initActions());
  command.command("generate <appName> <Port>").action(generateActions());
  command.command("start <appName>").action(startActions());
  command.command("build <appName>").action(buildActions());
  command.command("expose <componentPath>").action(exposeActions());
  command.command("bind").action(bindActions());
  command
    .command("dev-tool")
    .option("-p, --port <port>", "Port number")
    .action(devToolActions());
}
