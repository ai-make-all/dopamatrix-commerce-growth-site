param(
  [string]$ListFile = ".\review-files.txt",
  [string]$OutputFile = ".\_review\phase-1-core-files-bundle.txt"
)

$ErrorActionPreference = "Stop"

[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()
$OutputEncoding = [System.Text.UTF8Encoding]::new()

function Write-ReviewLine {
  param([string]$Text = "")
  Add-Content -LiteralPath $OutputFile -Value $Text -Encoding utf8
}

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

if (!(Test-Path -LiteralPath ".\_review")) {
  New-Item -ItemType Directory -Path ".\_review" | Out-Null
}

if (Test-Path -LiteralPath $OutputFile) {
  Remove-Item -LiteralPath $OutputFile -Force
}

New-Item -ItemType File -Path $OutputFile -Force | Out-Null

Write-ReviewLine "===== PROJECT FILE SNAPSHOT ====="

$dirs = @("pages", "components", "data", "types", "composables", "plugins", "public")

foreach ($d in $dirs) {
  Write-ReviewLine ""
  Write-ReviewLine "----- $d -----"

  if (Test-Path -LiteralPath $d) {
    Get-ChildItem -LiteralPath $d -Recurse -File | ForEach-Object {
      $relative = $_.FullName.Substring((Get-Location).Path.Length + 1)
      Write-ReviewLine $relative
    }
  } else {
    Write-ReviewLine "Directory not found: $d"
  }
}

Write-ReviewLine ""
Write-ReviewLine "===== CORE FILE CONTENTS ====="
Write-ReviewLine ""

if (!(Test-Path -LiteralPath $ListFile)) {
  Write-ReviewLine "ERROR: List file not found: $ListFile"
  Write-Host "ERROR: List file not found: $ListFile" -ForegroundColor Red
  exit 1
}

$files = Get-Content -LiteralPath $ListFile |
  ForEach-Object { Clean-ReviewPath $_ } |
  Where-Object { $_ -ne "" -and -not $_.StartsWith("#") }

Write-ReviewLine "File list count: $($files.Count)"
Write-ReviewLine ""

Write-Host "File list count: $($files.Count)" -ForegroundColor Cyan

foreach ($source in $files) {
  if (!(Test-Path -LiteralPath $source)) {
    Write-ReviewLine "===== MISSING: $source ====="
    Write-ReviewLine ""
    Write-Host "MISSING: $source" -ForegroundColor Yellow
    continue
  }

  Write-ReviewLine "===== FILE: $source ====="

  $content = Get-Content -LiteralPath $source -Raw
  Add-Content -LiteralPath $OutputFile -Value $content -Encoding utf8

  Write-ReviewLine ""
  Write-ReviewLine ""

  Write-Host "Added: $source" -ForegroundColor Green
}

Write-Host "Bundle generated: $OutputFile" -ForegroundColor Cyan