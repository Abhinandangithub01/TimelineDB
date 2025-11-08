# TimelineDB Development Server Restart Script
# This will clear cache and restart the dev server

Write-Host "🔄 Restarting TimelineDB Development Server..." -ForegroundColor Cyan
Write-Host ""

# Step 1: Clear build cache
Write-Host "📦 Clearing build cache..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item -Recurse -Force .next
    Write-Host "✅ Build cache cleared" -ForegroundColor Green
} else {
    Write-Host "ℹ️  No build cache to clear" -ForegroundColor Gray
}

Write-Host ""

# Step 2: Clear node modules cache (optional)
Write-Host "🧹 Do you want to clear node_modules? (y/N)" -ForegroundColor Yellow
$clearModules = Read-Host
if ($clearModules -eq "y" -or $clearModules -eq "Y") {
    Write-Host "📦 Clearing node_modules..." -ForegroundColor Yellow
    if (Test-Path "node_modules") {
        Remove-Item -Recurse -Force node_modules
        Write-Host "✅ node_modules cleared" -ForegroundColor Green
        Write-Host "📥 Reinstalling dependencies..." -ForegroundColor Yellow
        npm install
        Write-Host "✅ Dependencies reinstalled" -ForegroundColor Green
    }
}

Write-Host ""

# Step 3: Start dev server
Write-Host "🚀 Starting development server..." -ForegroundColor Cyan
Write-Host ""
Write-Host "📍 Visit: http://localhost:3000" -ForegroundColor Green
Write-Host "📍 Dashboard: http://localhost:3000/dashboard/timeline" -ForegroundColor Green
Write-Host ""
Write-Host "💡 Press Ctrl+C to stop the server" -ForegroundColor Gray
Write-Host ""

npm run dev
