#!/usr/bin/env node

import yargs from "yargs";
import { configFile, dataLocation } from "./config.js";
import { install } from "./source_manager.js";

yargs
  .command("install <mod-slug> [mod-version] [-t TAG] [-s SOURCE] [-m MINECRAFT]",
    `Install a mod from the given repository.`,
    yargs => {
      yargs.positional("mod-slug", {
        describe: "Slug (e.g. thermal-expansion) of the mod.",
        type: "string",
      });
      yargs.positional("mod-version", {
        describe: "Version of the mod to install. In most cases in SemVer, but also can be labels if applicable",
        type: "string",
        default: "latest",
      });
      yargs.option("tag", {
        describe: "Tag of the mod file.",
        alias: "t",
        type: "string",
      });
      yargs.option("source", {
        describe: "The source to install the mod from.",
        alias: "s",
        type: "string",
        default: "curseforge",
      });
      yargs.option("minecraft", {
        describe: "Minecraft version of the mod.",
        alias: "m",
        type: "string",
        default: "1.14.4",
      });
    },
    argv => {
      install(argv)
    })
  .command("uninstall <mod-slug> [-r REPO]",
    `Uninstall a mod from the given repository.`,
    yargs => {
      yargs.positional("mod-slug", {
        describe: "Slug (e.g. the-one-probe) of the mod.",
        type: "string",
      });
    },
    argv => {

    })
  .command("pd <target>",
    "Print location of the various data stroages.",
    {},
    argv => {
      if (argv.target === "data") {
        console.log(`Data location: ${dataLocation}`);
      } else if (argv.target === "config") {
        console.log(`Config location: ${configFile}`);
      }
    })
  .help()
  .alias("help", "h")
  .argv;
