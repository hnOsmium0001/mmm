function _CF_Install($name) {
  # TODO get addonid by a humen readable name
  $addonid = 0
  $file = Invoke-WebRequest "https://addons-ecs.forgesvc.net/api/v2/addon/$addonid/files"
}

$curseforge:Install = _CF_Install