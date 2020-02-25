#!/usr/bin/env node

import yargs from "yargs";
import { configLocation, dataLocation } from "./config.js";

const argv = yargs
  .command("install",
    `Install a mod from a given repository.`,
    {
      repo: {
        description: "The repository to install mod from.",
        alias: "r",
        type: "string",
      },
    })
  .command("uninstall",
    `Uninstall a mod from a given repository.`,
    {})
  .command("pd",
    "Print location of the various data stroages.",
    {
      data: {
        description: "Show location of the data directory.",
        alias: "d",
        type: "boolean",
      },
      config: {
        description: "Show location of the config file.",
        alias: "c",
        type: "boolean",
      },
    })
  .help()
  .alias("help", "h")
  .argv;

if (argv._.includes("install")) {

} else if (argv._.includes("uninstall")) {
  
} else if (argv._.includes("pd")) {
  if (argv.data) {
    console.log(`Data location: ${dataLocation}`);
  } else if (argv.config) {
    console.log(`Config location: ${configLocation}`);
  } else {
    console.log("Invalid usage of pd command. Use `mmm pd -h` to show help.")
  }
}