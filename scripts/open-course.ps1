$ErrorActionPreference = 'Stop'
$courseRoot = Split-Path -Parent $PSScriptRoot
$courseDist = Join-Path $courseRoot 'dist'
$courseUrl = 'http://127.0.0.1:8765/'
function Test-CourseServer {
    try {
        $response = Invoke-WebRequest -Uri $courseUrl -UseBasicParsing -TimeoutSec 2
        return ($response.StatusCode -eq 200 -and $response.Content -match 'ROS 2 Lab')
    } catch { return $false }
}
if (-not (Test-CourseServer)) {
    $pythonCommand = Get-Command python -ErrorAction Stop
    $logDirectory = Join-Path $courseRoot '.qa'
    New-Item -ItemType Directory -Path $logDirectory -Force | Out-Null
    Start-Process -FilePath $pythonCommand.Source -ArgumentList @(
        '-u', '-m', 'http.server', '8765', '--bind', '127.0.0.1'
    ) -WorkingDirectory $courseDist -WindowStyle Hidden `
      -RedirectStandardOutput (Join-Path $logDirectory 'server-output.log') `
      -RedirectStandardError (Join-Path $logDirectory 'server-error.log') | Out-Null
    for ($attempt = 0; $attempt -lt 15; $attempt++) {
        if (Test-CourseServer) { break }
        Start-Sleep -Milliseconds 300
    }
    if (-not (Test-CourseServer)) {
        throw 'Khong mo duoc giao trinh tai cong 8765. Xem .qa/server-error.log.'
    }
}
Start-Process $courseUrl
Write-Output 'Da mo giao trinh ROS 2 Lab tai http://127.0.0.1:8765/'
