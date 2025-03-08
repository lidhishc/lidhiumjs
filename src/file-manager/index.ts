import execa from "execa";
import fs from "fs";
import path from "path";

export function createFolder(folderName: string) {
  fs.mkdirSync(folderName, { recursive: true });
}

export function createFile(filePath: string, content: string) {
  fs.writeFileSync(filePath, content);
}

export function createFolderAndFile(
  folderName: string,
  fileName: string,
  content: string
) {
  createFolder(folderName);
  createFile(path.join(folderName, fileName), content);
}

export function copyFolder(source: string, destination: string) {
  fs.cpSync(path.resolve(__dirname, source), path.resolve(destination), {
    recursive: true,
  });
}

export function updatePackageJsonName(
  packageJsonPath: string,
  appName: string
) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
  packageJson.name = appName;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
}

export async function installDependencies(appName: string) {
  try {
    await execa("sh", ["-c", `cd ${appName} && yarn install`]);
    console.log("Dependencies installed successfully!");
  } catch (error) {
    console.error("Failed to install dependencies:", error);
  }
}
