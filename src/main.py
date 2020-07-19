from argparse import ArgumentParser

from curseforge_source import CurseforgeSource
from maven_source import MavenSource

curseforge_src = CurseforgeSource()
maven_src = MavenSource()


parser = ArgumentParser(description="Manage and compose Minecraft mods.")
subparsers = parser.add_subparsers()

src_parser = subparsers.add_parser("source")
src_parser.add_argument("type", type=str, choices=["list", "add", "remove"], required=True)

curseforge_src.generate_parser(subparsers)
maven_src.generate_parser(subparsers)


args = parser.parse_args()