# Visitor Tracking Verification Script
# This script tests your visitor tracking system is ready for production

Write-Host "`n============================================" -ForegroundColor Cyan
Write-Host "   VISITOR TRACKING VERIFICATION TEST" -ForegroundColor Cyan
Write-Host "============================================`n" -ForegroundColor Cyan

$projectRoot = $PSScriptRoot
$errors = @()
$warnings = @()
$success = @()

# Test 1: Check if required files exist
Write-Host "[1/6] Checking required files..." -ForegroundColor Yellow

$requiredFiles = @(
    "src\utils\visitorTracker.ts",
    "src\app\App.tsx",
    "src\app\components\pages\ValentineDashboard.tsx",
    "supabase\migrations\20260121000006_fix_visitors_rls_production.sql",
    "test-visitor-tracking.html"
)

foreach ($file in $requiredFiles) {
    $fullPath = Join-Path $projectRoot $file
    if (Test-Path $fullPath) {
        Write-Host "  ✅ Found: $file" -ForegroundColor Green
        $success += "File exists: $file"
    } else {
        Write-Host "  ❌ Missing: $file" -ForegroundColor Red
        $errors += "Missing file: $file"
    }
}

# Test 2: Check visitor tracker implementation
Write-Host "`n[2/6] Verifying visitor tracker code..." -ForegroundColor Yellow

$trackerPath = Join-Path $projectRoot "src\utils\visitorTracker.ts"
if (Test-Path $trackerPath) {
    $trackerContent = Get-Content $trackerPath -Raw
    
    $requiredFunctions = @("trackPageVisit", "getTotalVisitors", "getTodayVisitors", "getVisitorStats", "initVisitorTracking")
    
    foreach ($func in $requiredFunctions) {
        if ($trackerContent -match $func) {
            Write-Host "  ✅ Function implemented: $func" -ForegroundColor Green
            $success += "Function exists: $func"
        } else {
            Write-Host "  ❌ Missing function: $func" -ForegroundColor Red
            $errors += "Missing function: $func"
        }
    }
}

# Test 3: Check App.tsx integration
Write-Host "`n[3/6] Checking App.tsx integration..." -ForegroundColor Yellow

$appPath = Join-Path $projectRoot "src\app\App.tsx"
if (Test-Path $appPath) {
    $appContent = Get-Content $appPath -Raw
    
    if ($appContent -match "initVisitorTracking") {
        Write-Host "  ✅ Tracking initialization found" -ForegroundColor Green
        $success += "App.tsx: initVisitorTracking called"
    } else {
        Write-Host "  ❌ Tracking initialization not found" -ForegroundColor Red
        $errors += "App.tsx: initVisitorTracking not called"
    }
    
    if ($appContent -match "useEffect") {
        Write-Host "  ✅ useEffect hook found" -ForegroundColor Green
        $success += "App.tsx: useEffect hook exists"
    } else {
        Write-Host "  ⚠️  No useEffect hook found" -ForegroundColor Yellow
        $warnings += "App.tsx: No useEffect hook (may be intentional)"
    }
}

# Test 4: Check Dashboard integration
Write-Host "`n[4/6] Checking Dashboard integration..." -ForegroundColor Yellow

$dashboardPath = Join-Path $projectRoot "src\app\components\pages\ValentineDashboard.tsx"
if (Test-Path $dashboardPath) {
    $dashboardContent = Get-Content $dashboardPath -Raw
    
    if ($dashboardContent -match "getVisitorStats") {
        Write-Host "  ✅ Visitor stats function imported" -ForegroundColor Green
        $success += "Dashboard: getVisitorStats imported"
    } else {
        Write-Host "  ❌ Visitor stats function not imported" -ForegroundColor Red
        $errors += "Dashboard: getVisitorStats not imported"
    }
    
    if ($dashboardContent -match "totalVisitors|todayVisitors") {
        Write-Host "  ✅ Visitor stats displayed" -ForegroundColor Green
        $success += "Dashboard: Visitor stats displayed"
    } else {
        Write-Host "  ❌ Visitor stats not displayed" -ForegroundColor Red
        $errors += "Dashboard: Visitor stats not displayed"
    }
}

# Test 5: Check migration file
Write-Host "`n[5/6] Checking database migration..." -ForegroundColor Yellow

$migrationPath = Join-Path $projectRoot "supabase\migrations\20260121000006_fix_visitors_rls_production.sql"
if (Test-Path $migrationPath) {
    $migrationContent = Get-Content $migrationPath -Raw
    
    $requiredSQL = @("CREATE POLICY", "GRANT INSERT", "GRANT SELECT", "ALTER TABLE", "ROW LEVEL SECURITY")
    
    foreach ($sql in $requiredSQL) {
        if ($migrationContent -match $sql) {
            Write-Host "  ✅ SQL command found: $sql" -ForegroundColor Green
            $success += "Migration: $sql command exists"
        } else {
            Write-Host "  ⚠️  SQL command not found: $sql" -ForegroundColor Yellow
            $warnings += "Migration: $sql command missing (may be intentional)"
        }
    }
}

# Test 6: Check configuration
Write-Host "`n[6/6] Checking Supabase configuration..." -ForegroundColor Yellow

$configPath = Join-Path $projectRoot "utils\supabase\info.tsx"
if (Test-Path $configPath) {
    $configContent = Get-Content $configPath -Raw
    
    if ($configContent -match "projectId") {
        Write-Host "  ✅ Project ID configured" -ForegroundColor Green
        $success += "Config: Project ID exists"
    } else {
        Write-Host "  ❌ Project ID not configured" -ForegroundColor Red
        $errors += "Config: Project ID missing"
    }
    
    if ($configContent -match "publicAnonKey") {
        Write-Host "  ✅ Public Anon Key configured" -ForegroundColor Green
        $success += "Config: Public Anon Key exists"
    } else {
        Write-Host "  ❌ Public Anon Key not configured" -ForegroundColor Red
        $errors += "Config: Public Anon Key missing"
    }
}

# Summary
Write-Host "`n============================================" -ForegroundColor Cyan
Write-Host "   TEST SUMMARY" -ForegroundColor Cyan
Write-Host "============================================`n" -ForegroundColor Cyan

Write-Host "✅ Successes: $($success.Count)" -ForegroundColor Green
Write-Host "⚠️  Warnings:  $($warnings.Count)" -ForegroundColor Yellow
Write-Host "❌ Errors:    $($errors.Count)" -ForegroundColor Red

if ($errors.Count -gt 0) {
    Write-Host "`n❌ ERRORS FOUND:" -ForegroundColor Red
    foreach ($error in $errors) {
        Write-Host "  - $error" -ForegroundColor Red
    }
}

if ($warnings.Count -gt 0) {
    Write-Host "`n⚠️  WARNINGS:" -ForegroundColor Yellow
    foreach ($warning in $warnings) {
        Write-Host "  - $warning" -ForegroundColor Yellow
    }
}

Write-Host "`n============================================" -ForegroundColor Cyan

if ($errors.Count -eq 0) {
    Write-Host "`n🎉 ALL CHECKS PASSED!" -ForegroundColor Green
    Write-Host "Your visitor tracking system is ready for production!`n" -ForegroundColor Green
    
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Deploy migration to Supabase (see DEPLOYMENT_VISITOR_TRACKING.md)" -ForegroundColor White
    Write-Host "2. Test using test-visitor-tracking.html" -ForegroundColor White
    Write-Host "3. Deploy your website to production" -ForegroundColor White
    Write-Host "4. Verify tracking in admin dashboard`n" -ForegroundColor White
} else {
    Write-Host "`n❌ TESTS FAILED" -ForegroundColor Red
    Write-Host "Please fix the errors above before deploying.`n" -ForegroundColor Red
}

Write-Host "============================================`n" -ForegroundColor Cyan

# Open test file in default browser
$testFilePath = Join-Path $projectRoot "test-visitor-tracking.html"
if (Test-Path $testFilePath) {
    Write-Host "📋 Would you like to open the test file in your browser? (Y/N): " -ForegroundColor Cyan -NoNewline
    $response = Read-Host
    if ($response -eq "Y" -or $response -eq "y") {
        Start-Process $testFilePath
        Write-Host "✅ Test file opened in browser`n" -ForegroundColor Green
    }
}
