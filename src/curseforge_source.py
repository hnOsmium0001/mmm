from typing import Union, List, Dict
import requests
import cfscrape
import json


class CurseforgeModFile:
    def __init__(self, raw: List[Dict]):
        self.raw = raw
        self.id = raw["id"]
        self.download_url = raw["downloadUrl"]
        self.mc_ver = raw["gameVersion"][0]
        # TODO mutliple versions support
        file_name = str(raw["fileName"])
        splitted = file_name.split("-")
        if len(splitted) <= 1:
            print(
                f"Unable to parse version to parse mod version from file name: {file_name}")
            return
        if len(splitted) == 2:
            # Assuming file name contains mod name + version
            self.ver = splitted[1]
        elif len(splitted) == 3:
            if splitted[1] == self.mc_ver:
                # 1st part is mod name, 2nd part is minecraft version, 3rd part is mod version
                self.ver = splitted[2]
            else:
                # 1st part is mod name, 2nd part is mod version, 3rd part is SemVer `prerelease.tag+build.tag`
                self.ver = f"{splitted[1]}-{splitted[2]}"
        else:  # len(splitted) >= 4
            # ... 4th part is SemVer's `prerelease.tag+build.tag`
            self.ver = f"{splitted[2]}-{splitted[3]}"


class CurseforgeSource:
    scraper = cfscrape.create_scraper()

    def __init__(self):
        pass  # TODO

    def _scrape_website(self, mod: str) -> int:
        webpage = self.scraper.get(
            f"https://curseforge.com/minecraft/mc-mods/{mod}").content
        print(webpage)
        return 0  # TODO

    def install(self, mod: str, *, version: str) -> None:
        id = -1
        try:
            id = int(mod)
        except:
            id = self._scrape_website(mod)

        res = requests.get(
            f"https://addons-ecs.forgesvc.net/api/v2/{id}/files")
        specified_file = None
        if version == "latest":
            # specified_file is the latest uploaded file here
            for raw in res.text:
                # File ID is monotonically increasing, so we can just compare the IDs instead of the time
                if specified_file == None or raw["id"] > specified_file.id:
                    specified_file = CurseforgeModFile(raw)
        else:
            # specified_file is the file with a matching version string
            for raw in res.text:
                candidate = CurseforgeModFile(raw)
                if candidate.ver == version:
                    specified_file = candidate
                    break
        
        if specified_file == None:
            print("Unable to find a mod file with matching version. Aborting,")
        # TODO
        download_res = requests.get(specified_file.download_url)

    def uninstall(self, mod: str, *, version: str) -> None:
        pass  # TODO

    def search(self, keywords: List[str]) -> List[str]:
        #res = requests.get(
        #    f"https://addons-ecs.forgesvc.net/api/v2/addon/search?categoryId={categoryID}&gameId={gameId}&gameVersion={gameVersion}&index={index}&pageSize={pageSize}5&searchFilter={searchFilter}§ionId={sectionId}&sort={sort}")
        #res = json.loads(res.text)
        pass  # TODO

    def generate_parser(self, subparsers):
        cf = subparsers.add_parser("cf", help="Mod management with Curseforge")
        sps = cf.add_subparsers()

        install_sps = sps.add_parser("install")
        install_sps.add_argument(
            "mod", type=str, required=True, help="Slug for the mod to install.")
        install_sps.add_argument("version", type=Union[str, int], default="latest",
                                 help="Version of the mod to install. Put \"latest\" for the latest mod version availble for the specified Minecraft versionl.")
        install_sps.add_argument("n", "--file-name", type=str, default="",
                                 help="Specify this argument to override CF source's default version parsing system. Useful when the mod has an unique file naming scheme.")
        install_sps.add_argument("-m", "--minecraft-version", type=str, default="latest",
                                 help="Minecraft version to search mod files from. Put \"latest\" to use the latest stable minecraft version.")

        uninstall_sps = sps.add_parser("uninstall")
        uninstall_sps.add_argument(
            "mod", type=str, help="Slug for the mod to uninstall.")

        search_sps = sps.add_parser("search")
        search_sps.add_argument("keywords", nargs="+", required=True)
