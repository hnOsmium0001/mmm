import os from "os";
import fs from "fs";
import readline from "readline-sync";
import { INSTALLATION_INFO, INSTALLATION_DIRECTORY } from "./constants.js";

if (fs.existsSync(INSTALLATION_DIRECTORY)) {
  console.error("Already installed mmm! Aborting");
  process.exit(-1);
}

const path = readline.question("Enter prefered data storage: (~/.mmm/) ") || `${os.homedir()}/.mmm/`;

console.log("Configuring...");
{
  !fs.existsSync(path) && fs.mkdirSync(path);
  fs.writeFileSync(`${path}/config.json`, JSON.stringify({}, null, 2));

  const installInfo = {
    dataLocation: path
  };
  fs.mkdirSync(INSTALLATION_DIRECTORY);
  fs.writeFileSync(INSTALLATION_INFO, JSON.stringify(installInfo, null, 2));
}
console.log("Done");
