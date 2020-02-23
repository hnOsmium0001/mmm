. "$PSScriptRoot/lib/config.ps1"

$installationConfig = (Get-Content "~/.config/mmm/installation.json" -Raw | ConvertFrom-Json -ErrorAction Stop)
$installation = $installationConfig.InstallLocation

$configFile = "$installation/config.json"
New-Item $configFile -Force -ItemType File | Out-Null
LoadConfig

. "$PSScriptRoot/lib/resources.ps1"
LoadResources

. "$PSScriptRoot/lib/tasks.ps1"
PerfomTask $args[0]