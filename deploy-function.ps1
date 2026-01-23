# Deploy Edge Function Script
# Go to https://supabase.com/account/tokens and generate a token starting with sbp_
# Then run: .\deploy-function.ps1 YOUR_TOKEN_HERE

param(
    [Parameter(Mandatory=$true)]
    [string]$Token
)

$env:SUPABASE_ACCESS_TOKEN = $Token
npx supabase functions deploy server --project-ref sbovtiakuigihbkjgnmo

Write-Host "`n✅ Deployment complete!" -ForegroundColor Green
Write-Host "Check your dashboard: https://supabase.com/dashboard/project/sbovtiakuigihbkjgnmo/functions" -ForegroundColor Cyan
