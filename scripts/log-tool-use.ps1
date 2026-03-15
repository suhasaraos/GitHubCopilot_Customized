# PreToolUse hook - logs tool invocations to an audit file.
# VS Code Copilot pipes a JSON object to stdin before each tool call.
# The script must write {"continue":true} to stdout to allow the tool to proceed.

# Read the full stdin payload (works when invoked via: pwsh -NoProfile -File .\scripts\log-tool-use.ps1)
$inputJson = [System.Console]::In.ReadToEnd()

# Parse JSON - bail gracefully if input is malformed
try {
    $data = $inputJson | ConvertFrom-Json
} catch {
    '{"continue":true}'
    exit 0
}

# .timestamp is coerced to a DateTime by ConvertFrom-Json; ToString("o") restores ISO 8601
$timestamp  = if ($data.timestamp -is [datetime]) {
                  $data.timestamp.ToUniversalTime().ToString("o")
              } else {
                  [string]$data.timestamp
              }
$toolName   = $data.tool_name
$sessionId  = $data.sessionId

# Resolve audit log path: prefer the env var, fall back to a local file
$auditLog = if ($env:AUDIT_LOG) { $env:AUDIT_LOG } else { "audit.log" }

# Create the directory if it does not exist yet
$logDir = Split-Path $auditLog -Parent
if ($logDir -and -not (Test-Path $logDir)) {
    New-Item -ItemType Directory -Path $logDir -Force | Out-Null
}

# Append one line per tool invocation
"[$timestamp] Session: $sessionId, Tool: $toolName" |
    Out-File -FilePath $auditLog -Append -Encoding utf8

# Signal to VS Code that the tool call should proceed
'{"continue":true}'
