import fs from "fs";
import path from "path";
import { INSTALLATION_INFO } from "./constants.js";

export const installInfo = JSON.parse(fs.readFileSync(INSTALLATION_INFO, "utf8"));
// Format valid but not very readable path, such as "C:\\User\\user\\.mmm/config.json" to "C:\User\user\.mmm\config.json"
export const dataLocation = path.normalize(installInfo.dataLocation);
export const configLocation = path.normalize(`${dataLocation}/config.json`);
export const config = JSON.parse(fs.readFileSync(configLocation, "utf8"));
process.on("exit", () => fs.writeFileSync(configLocation, JSON.stringify(config, null, 2)));
export const modsLocation = path.normalize(`${dataLocation}/mods/`);