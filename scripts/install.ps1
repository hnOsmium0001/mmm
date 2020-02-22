param(
  [string]$InstallLocation = "~/mmm/"
)

$configDirectory = "~/.config/mmm/"
$configFile = "~/.config/mmm/config.json"

if (Test-Path $configFile) {
  Write-Output "The installation info file at $configFile already exists!"
  Write-Output "If it is from a known former installation, remove the file manually and then run this install script"
  Write-Error "Installation config already exists"
  exit
}
New-Item $configDirectory -Force -ItemType Directory | Out-Null
New-Item $configFile -Force -ItemType File | Out-Null


if(Test-Path $InstallLocation) {
  Write-Output "The install location $InstallLocation already exists!"
  Write-Output "Delete the directory manually (if applicable) and then run this install script to proceed"
  Write-Error "Install location unavailable"
  exit
}
New-Item $InstallLocation -Force -ItemType Directory | Out-Null

# Downloading logic adapted from Scoop, Unlicense
# Download mmm from github
$downloadUrl = "https://github.com/hnOsmium0001/mmm/archive/master.zip"
$downloadFile = "$InstallLocation/mmm.zip"
Write-Output "Downloading mmm..."
Invoke-WebRequest $downloadUrl -OutFile $downloadFile

# Extract files from the downloaded zip
Write-Output "Extracting mmm..."
Expand-Archive $downloadFile -DestinationPath $InstallLocation
Move-Item "$InstallLocation/mmm-master/bin/" -Destination $InstallLocation
Remove-Item "$InstallLocation/mmm.zip/"
Remove-Item -Recurse "$InstallLocation/mmm-master/"

$config = New-Object PSObject
$config | Add-Member -MemberType NoteProperty -Name "InstallLocation" -Value $InstallLocation
ConvertTo-Json $config | Set-Content $configFile -Encoding ASCII

$env:Path += ";$InstallLocation/bin/"
