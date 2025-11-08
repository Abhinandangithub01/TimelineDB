@echo off
echo.
echo ========================================
echo   TimelineDB Development Server
echo ========================================
echo.

echo [1/3] Clearing build cache...
if exist .next (
    rmdir /s /q .next
    echo ✓ Build cache cleared
) else (
    echo ℹ No build cache to clear
)

echo.
echo [2/3] Building application...
call npm run build

echo.
echo [3/3] Starting development server...
echo.
echo Visit: http://localhost:3000
echo Dashboard: http://localhost:3000/dashboard/timeline
echo.
echo Press Ctrl+C to stop the server
echo.

call npm run dev
