# TimelineDB Verification Script
# Run this to verify you're in the correct folder with TimelineDB code

Write-Host "🔍 Verifying TimelineDB Installation..." -ForegroundColor Cyan
Write-Host ""

$errors = 0
$warnings = 0

# Check 1: Current directory
Write-Host "[1/8] Checking current directory..." -ForegroundColor Yellow
$currentDir = Get-Location
Write-Host "    Current: $currentDir" -ForegroundColor Gray

if ($currentDir -like "*- Copy*") {
    Write-Host "    ❌ ERROR: You're in a COPY folder!" -ForegroundColor Red
    Write-Host "    Please navigate to the main 'fortify' folder" -ForegroundColor Red
    $errors++
} else {
    Write-Host "    ✅ Correct folder" -ForegroundColor Green
}

Write-Host ""

# Check 2: package.json name
Write-Host "[2/8] Checking package.json..." -ForegroundColor Yellow
if (Test-Path "package.json") {
    $packageJson = Get-Content "package.json" | ConvertFrom-Json
    if ($packageJson.name -eq "timelinedb") {
        Write-Host "    ✅ Package name: timelinedb" -ForegroundColor Green
    } else {
        Write-Host "    ❌ ERROR: Package name is '$($packageJson.name)', should be 'timelinedb'" -ForegroundColor Red
        $errors++
    }
} else {
    Write-Host "    ❌ ERROR: package.json not found!" -ForegroundColor Red
    $errors++
}

Write-Host ""

# Check 3: TimelineDB components exist
Write-Host "[3/8] Checking TimelineDB components..." -ForegroundColor Yellow
$components = @(
    "app/components/TimelineHeroSection.tsx",
    "app/components/TimelineFeaturesSection.tsx",
    "app/components/TimelineHowItWorksSection.tsx",
    "app/components/TimelineDemoSection.tsx"
)

foreach ($component in $components) {
    if (Test-Path $component) {
        Write-Host "    ✅ $component" -ForegroundColor Green
    } else {
        Write-Host "    ❌ Missing: $component" -ForegroundColor Red
        $errors++
    }
}

Write-Host ""

# Check 4: Old Fortify components removed
Write-Host "[4/8] Checking old Fortify components removed..." -ForegroundColor Yellow
$oldComponents = @(
    "app/components/NewHeroSection.tsx",
    "app/components/NewFeaturesSection.tsx",
    "app/components/icons/FortifyLogo.tsx",
    "app/components/dashboard/AnalysisView.tsx"
)

$foundOld = $false
foreach ($component in $oldComponents) {
    if (Test-Path $component) {
        Write-Host "    ⚠️  Old file still exists: $component" -ForegroundColor Yellow
        $warnings++
        $foundOld = $true
    }
}

if (-not $foundOld) {
    Write-Host "    ✅ Old Fortify components removed" -ForegroundColor Green
}

Write-Host ""

# Check 5: Timeline API routes exist
Write-Host "[5/8] Checking Timeline API routes..." -ForegroundColor Yellow
$apiRoutes = @(
    "app/api/timeline/create/route.ts",
    "app/api/timeline/list/route.ts",
    "app/api/timeline/compare/route.ts",
    "app/api/timeline/merge/route.ts"
)

foreach ($route in $apiRoutes) {
    if (Test-Path $route) {
        Write-Host "    ✅ $route" -ForegroundColor Green
    } else {
        Write-Host "    ❌ Missing: $route" -ForegroundColor Red
        $errors++
    }
}

Write-Host ""

# Check 6: Old Fortify API routes removed
Write-Host "[6/8] Checking old Fortify API routes removed..." -ForegroundColor Yellow
$oldRoutes = @(
    "app/api/analysis/start/route.ts",
    "app/api/experiments/route.ts",
    "app/api/multi-agent/route.ts"
)

$foundOldRoutes = $false
foreach ($route in $oldRoutes) {
    if (Test-Path $route) {
        Write-Host "    ⚠️  Old route still exists: $route" -ForegroundColor Yellow
        $warnings++
        $foundOldRoutes = $true
    }
}

if (-not $foundOldRoutes) {
    Write-Host "    ✅ Old Fortify API routes removed" -ForegroundColor Green
}

Write-Host ""

# Check 7: Core library
Write-Host "[7/8] Checking core library..." -ForegroundColor Yellow
if (Test-Path "lib/timeline-db.ts") {
    Write-Host "    ✅ lib/timeline-db.ts exists" -ForegroundColor Green
} else {
    Write-Host "    ❌ Missing: lib/timeline-db.ts" -ForegroundColor Red
    $errors++
}

Write-Host ""

# Check 8: Metadata
Write-Host "[8/8] Checking app metadata..." -ForegroundColor Yellow
if (Test-Path "app/layout.tsx") {
    $layout = Get-Content "app/layout.tsx" -Raw
    if ($layout -match "TimelineDB") {
        Write-Host "    ✅ Metadata contains 'TimelineDB'" -ForegroundColor Green
    } else {
        Write-Host "    ❌ Metadata still has 'Fortify'" -ForegroundColor Red
        $errors++
    }
} else {
    Write-Host "    ❌ app/layout.tsx not found" -ForegroundColor Red
    $errors++
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Summary
if ($errors -eq 0 -and $warnings -eq 0) {
    Write-Host "✅ SUCCESS! TimelineDB is correctly installed!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Run: npm run dev" -ForegroundColor White
    Write-Host "2. Visit: http://localhost:3000" -ForegroundColor White
    Write-Host "3. You should see TimelineDB branding!" -ForegroundColor White
} elseif ($errors -eq 0) {
    Write-Host "⚠️  WARNING: TimelineDB is installed but has $warnings warnings" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "You can proceed, but consider cleaning up old files" -ForegroundColor Yellow
} else {
    Write-Host "❌ ERROR: Found $errors errors and $warnings warnings" -ForegroundColor Red
    Write-Host ""
    Write-Host "Possible solutions:" -ForegroundColor Yellow
    Write-Host "1. Make sure you're in the correct folder (not '- Copy')" -ForegroundColor White
    Write-Host "2. Pull latest changes: git pull origin main" -ForegroundColor White
    Write-Host "3. Reinstall: Remove-Item -Recurse -Force node_modules; npm install" -ForegroundColor White
}

Write-Host ""
