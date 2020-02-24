import { INSTALLATION_INFO_PATH } from "./constants.js";
import fs from "fs";

export const installInfo = JSON.parse(fs.readFileSync(INSTALLATION_INFO_PATH, "utf8"));
export const installLocation = installInfo.installLocation;

export const configLocation = `${installLocation}/config.json`;
export const config = JSON.parse(fs.readFileSync(configLocation, "utf8"));
process.on("exit", () => fs.writeFileSync(configLocation, JSON.stringify(config, null, 2)));