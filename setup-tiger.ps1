# PowerShell script to set up Tiger database
Write-Host "🐅 Setting up Tiger Database for Fortify..." -ForegroundColor Cyan

# Check if psql is installed
$psqlPath = Get-Command psql -ErrorAction SilentlyContinue
if (-not $psqlPath) {
    Write-Host "❌ psql not found. Please install PostgreSQL client tools." -ForegroundColor Red
    Write-Host "Download from: https://www.postgresql.org/download/windows/" -ForegroundColor Yellow
    exit 1
}

# Connection string
$connectionString = "postgres://tsdbadmin:ut93pxbc1tnkdne6@be7s3a5lg8.b7upewy6bk.tsdb.cloud.timescale.com:30404/tsdb?sslmode=require"

Write-Host "📊 Connecting to Tiger database..." -ForegroundColor Yellow

# Run the setup script
psql $connectionString -f setup-tiger-db.sql

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Database setup complete!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Create 4 fork services (vector, bm25, hybrid, rerank)" -ForegroundColor White
    Write-Host "2. Update .env.local with fork URLs" -ForegroundColor White
    Write-Host "3. Restart your app: npm run dev" -ForegroundColor White
} else {
    Write-Host "❌ Database setup failed. Check errors above." -ForegroundColor Red
    exit 1
}
