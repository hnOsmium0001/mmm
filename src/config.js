import fs from "fs";
import path from "path";
import { INSTALLATION_INFO } from "./constants.js";

/**
 * {
 *   "dataLocation": "/path/to/mmm/data"
 * }
 */
export const installInfo = JSON.parse(fs.readFileSync(INSTALLATION_INFO, "utf8"));

// Format valid but not very readable path, such as "C:\\User\\user\\.mmm/config.json" to "C:\User\user\.mmm\config.json"
export const dataLocation = path.normalize(installInfo.dataLocation);

export const configFile = path.normalize(`${dataLocation}/config.json`);
export const modsDir = path.normalize(`${dataLocation}/mods/`);
export const modsIndexFile = path.normalize(`${dataLocation}/mods.json`);

export const config = JSON.parse(fs.readFileSync(configFile, "utf8"));
process.on("exit", () => fs.writeFileSync(configFile, JSON.stringify(config, null, 2)));