function LoadConfig($file) {
  try {
    return (Get-Content $file -Raw | ConvertFrom-Json -ErrorAction Stop)
  }
  catch {
    Write-Error "Error while reading config $file`: $($_.exception.message)"
  }
}

# Adapted from Scoop lib/config.ps1, Unlicense
function GetConfig($name, $default) {
  if ($null -eq $mmmConfig.$name -and $null -ne $default) {
    return $default
  }
  return $mmmConfig.$name
}

function SetConfig($name, $value) {
  if ($null -eq $mmmConfig -or $mmmConfig.Count -eq 0) {
    $mmmConfig = New-Object PSObject
    $mmmConfig | Add-Member -MemberType NoteProperty -Name $name -Value $value
  }
  else {
    if ($value -eq [bool]::TrueString -or $value -eq [bool]::FalseString) {
      $value = [System.Convert]::ToBoolean($value)
    }
    if ($null -eq $mmmConfig.$name) {
      $mmmConfig | Add-Member -MemberType NoteProperty -Name $name -Value $value
    }
    else {
      $mmmConfig.$name = $value
    }
  }

  if ($null -eq $value) {
    $mmmConfig.PSObject.Properties.Remove($name)
  }

  ConvertTo-Json $mmmConfig | Set-Content $configFile -Encoding ASCII
  return $mmmConfig
}