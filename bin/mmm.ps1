. "$PSScriptRoot/lib/config.ps1"

$configDirectory = "~/.config/mmm/"
$configFile = "~/.config/mmm/config.json"
if (!(Test-Path $configDirectory)) {
  New-Item $configDirectory -ItemType Directory | Out-Null
}
if (!(Test-Path $configFile)) {
  New-Item $configFile -ItemType File | Out-Null
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
  "search" {
    . "$PSScriptRoot/commands/mmm-search.ps1"
  }
  Default {
    Write-Error "The command $task is not recognized by mmm"
  }
}