import curseforge from "mc-curseforge-api";

export const CurseForge = {
  install: (argv) => {
    const slug = argv.modSlug;
    const mcVer = argv.minecraft;
    const ver = argv.version;
    curseforge.getMods({ searchFilter: slug }).then(console.log)
  },

  getIDFromSlug: async (slug) => {

  }
}