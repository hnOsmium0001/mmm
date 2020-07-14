import { CurseForge } from "./sources/curseforge.js";

export function install(argv) {
  const source = argv.source;
  switch (source) {
    case "curseforge": {
      CurseForge.install(argv);
    } break;
    
    default: {
      console.log(`Unable to find source ${source}, aborting`);
    } break;
  }
}