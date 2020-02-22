. "$PSScriptRoot/lib/config.ps1"

$configDirectory = "~/.config/mmm/"
$configFile = "~/.config/mmm/config.json"
if (!(Test-Path $configDirectory)) {
  [void](New-Item $configDirectory -ItemType Directory)
}
if (!(Test-Path $configFile)) {
  [void](New-Item $configFile -ItemType File)
}

$task = $args[0]

switch ($task) {
  "install" {
    . "$PSScriptRoot/commands/mmm-install.ps1"
    InstallMod "Test install mod"
  }
  "assemble" {
    . "$PSScriptRoot/commands/mmm-assemble.ps1"
  }
  "info" {
    . "$PSScriptRoot/commands/mmm-info.ps1"
  }
  Default {
    Write-Error "The command $task is not recognized by mmm"
  }
}