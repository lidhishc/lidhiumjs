import { createApp } from "./create-app";
import { printLibraryHeader } from "../utils/common";
export default function generateActions() {
  return (appName: string, Port: number) => {
    printLibraryHeader();
    createApp({
      appName,
      port: Port,
    });
  };
}
