class MavenSource:
    def generate_parser(self, subparsers):
        maven = subparsers.add_parser("maven", help="Mod management with Curseforge")
        sps = maven.add_subparsers()