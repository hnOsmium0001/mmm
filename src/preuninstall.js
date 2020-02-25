import fs from "fs";
import readline from "readline-sync";
import { INSTALLATION_DIRECTORY } from "./constants.js";
import { dataLocation } from "./config.js";

while (true) {
  const removeData = readline.question("Do you want to remove all configurations and installed mods? (y/N)").toLowerCase();
  if (removeData === "y") {
    console.log("[mmm] Removing data...");
    fs.rmdirSync(dataLocation);
  } else if (removeData === "n" || removeData === "") {
    // Do nothing
  } else {
    console.log(`Invalid option: ${removeData}!`);
    continue;
  }

  console.log("[mmm] Removing installation info...");
  fs.rmdirSync(INSTALLATION_DIRECTORY);
  console.log("[mmm] Done");
  break;
}
