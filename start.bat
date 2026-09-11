@echo off
title Arudhra Consultancy - Singapore Recruitment Portal
color 0F

echo ======================================================================
echo    ARUDHRA CONSULTANCY - SINGAPORE OVERSEAS RECRUITMENT PORTAL
echo ======================================================================
echo.
echo Checking environment...
echo.

:: 1. Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is NOT installed on your computer!
    echo.
    echo To run this website locally, Node.js is required.
    echo Please download and install the free LTS version of Node.js from:
    echo https://nodejs.org/
    echo.
    echo After installing Node.js, double-click start.bat again.
    echo.
    pause
    exit /b 1
)

echo [OK] Node.js is detected:
node -v

:: 2. Check if node_modules exists, otherwise run npm install
if not exist "node_modules\" (
    echo.
    echo [SETUP] First-time setup: Installing required packages...
    echo This may take 1-2 minutes depending on your internet connection.
    echo Please wait...
    echo.
    call npm install
    if %errorlevel% neq 0 (
        echo.
        echo [ERROR] npm install encountered an error.
        echo Please ensure you are connected to the internet and try again.
        pause
        exit /b 1
    )
    echo.
    echo [OK] Installation completed successfully!
)

:: 3. Launch the development server
echo.
echo ======================================================================
echo Starting server on: http://localhost:3000
echo ======================================================================
echo.
echo Opening website in your default browser...
echo To stop the server at any time, press Ctrl + C in this window.
echo.

:: Open browser automatically after 2 seconds in background
start "" "http://localhost:3000"

:: Start the app using tsx server.ts
call npm run dev

pause
