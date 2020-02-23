function PerformTask($task) {
  switch ($task) {
    "install" {
    }
    "assemble" {
    }
    "info" {
    }
    "search" {
    }
    Default {
      Write-Error "The command $task is not recognized by mmm"
    }
  }
}