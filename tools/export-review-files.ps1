param(
  [string]$ListFile = ".\review-files.txt",
  [string]$OutputDir = ".\_review\phase-1-core-files"
)

$ErrorActionPreference = "Stop"

[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()
$OutputEncoding = [System.Text.UTF8Encoding]::new()

function Clean-ReviewPath {
  param([string]$Text)

  if ($null -eq $Text) {
    return ""
  }

  $s = $Text.Trim()
  $s = $s.Trim([char]34)
  $s = $s.Trim([char]39)
  $s = $s.Trim([char]96)

  return $s
}

if (!(Test-Path -LiteralPath $ListFile)) {
  Write-Host "ERROR: List file not found: $ListFile" -ForegroundColor Red
  exit 1
}

if (Test-Path -LiteralPath $OutputDir) {
  Remove-Item -LiteralPath $OutputDir -Recurse -Force
}

New-Item -ItemType Directory -Path $OutputDir | Out-Null

$files = Get-Content -LiteralPath $ListFile |
  ForEach-Object { Clean-ReviewPath $_ } |
  Where-Object { $_ -ne "" -and -not $_.StartsWith("#") }

Write-Host "File list count: $($files.Count)" -ForegroundColor Cyan

foreach ($source in $files) {
  if (!(Test-Path -LiteralPath $source)) {
    Write-Host "MISSING: $source" -ForegroundColor Yellow
    continue
  }

  $target = Join-Path $OutputDir $source
  $targetDir = Split-Path $target -Parent

  if (!(Test-Path -LiteralPath $targetDir)) {
    New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
  }

  Copy-Item -LiteralPath $source -Destination $target -Force

  Write-Host "Copied: $source" -ForegroundColor Green
}

Write-Host "Export completed: $OutputDir" -ForegroundColor Cyan