#!/usr/bin/env node

import yargs from "yargs";
import { configLocation, dataLocation } from "./config.js";

yargs
  .command("install <mod-slug> [version] [-t TAG] [-r REPO] [-m MINECRAFT]",
    `Install a mod from the given repository.`,
    yargs => {
      yargs.positional("mod-slug", {
        describe: "Slug (e.g. the-one-probe) of the mod.",
        type: "string",
      });
      yargs.positional("version", {
        describe: "Version of the mod to install. In most cases in SemVer, but also can be labels if applicable",
        type: "string",
        default: "release",
      });
      yargs.option("tag", {
        describe: "Tag of the mod file.",
        alias: "t",
        type: "string",
      });
      yargs.option("repo", {
        describe: "The repository to install the mod from.",
        alias: "r",
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
      const repo = argv.repo;
      const mcVersion = argv.minecraft;
      const slug = argv.modSlug;
      const version = argv.version;
      const artifact = "";
      const tag = argv.tag;
      const url = tag === ""
        ? `https://www.curseforge.com/api/maven/${slug}/${artifact}/${version}/${artifact}-${version}.jar`
        : `https://www.curseforge.com/api/maven/${slug}/${artifact}/${version}/${artifact}-${version}-${tag}.jar`;
      console.log(url)
    })
  .command("uninstall <mod-slug> [-r REPO]",
    `Uninstall a mod from the given repository.`,
    yargs => {
      yargs.positional("mod-slug", {
        describe: "Slug (e.g. the-one-probe) of the mod.",
        type: "string",
      });
      yargs.option("repo", {
        describe: "The repository to uninstall the mod from",
        alias: "r",
        type: "string",
        default: "curseforge",
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
        console.log(`Config location: ${configLocation}`);
      }
    })
  .help()
  .alias("help", "h")
  .argv;
