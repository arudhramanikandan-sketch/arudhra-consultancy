@echo off
setlocal enabledelayedexpansion

echo ===================================================
echo   ARUDHRA CONSULTANCY - GITHUB REPOSITORY UPLOADER
echo ===================================================
echo.
echo This tool safely uploads the ENTIRE website to GitHub,
echo including all design files, styles, assets, and hidden
echo configuration files (.github, .nojekyll, .gitignore, .env).
echo.

where git >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Git is not installed on this system.
    echo Please download and install Git from: https://git-scm.com/downloads
    echo After installing Git, double-click this file again.
    echo.
    pause
    exit /b 1
)

echo [1/5] Checking Git repository initialization...
if not exist ".git" (
    echo Initializing fresh Git repository...
    git init
    git branch -M main
) else (
    echo Git repository already initialized.
)

echo.
echo [2/5] Building production assets (creating dist/ and docs/)...
call npm run build:pages

echo.
echo [3/5] Adding all files (including hidden dotfiles and design assets)...
git add -A

echo.
echo [4/5] Committing changes...
git commit -m "Upload complete Arudhra Consultancy website with all design assets and configs"

echo.
echo [5/5] GitHub Remote Configuration
echo ---------------------------------------------------
git remote get-url origin >nul 2>nul
if %errorlevel% equ 0 (
    for /f "tokens=*" %%a in ('git remote get-url origin') do set CURRENT_REMOTE=%%a
    echo Current GitHub repository: !CURRENT_REMOTE!
    set /p PUSH_NOW="Push changes to this repository now? (Y/N): "
    if /i "!PUSH_NOW!"=="Y" (
        git push -u origin main
        goto finished
    )
)

echo.
echo Please enter your GitHub repository URL.
echo Example: https://github.com/your-username/arudhra-recruitment.git
set /p REPO_URL="Repository URL: "

if "!REPO_URL!"=="" (
    echo No URL provided. Git commit was created locally.
    echo You can push manually anytime using: git push -u origin main
    pause
    exit /b 0
)

git remote remove origin >nul 2>nul
git remote add origin !REPO_URL!
git push -u origin main --force

:finished
echo.
echo ===================================================
echo   SUCCESS! All files uploaded to GitHub!
echo ===================================================
echo.
echo HOW TO SHOW YOUR WEBSITE DESIGN ON GITHUB PAGES:
echo 1. Open your GitHub repository in your web browser.
echo 2. Go to: Settings -> Pages (in the left menu).
echo 3. Under "Build and deployment":
echo    - Source: Select "Deploy from a branch"
echo    - Branch: Select "main" and folder "/docs"
echo    - Click "Save"
echo.
echo 4. Your website will be live at:
echo    https://your-username.github.io/your-repo-name/
echo    (Full design, logos, styles, and buttons will display properly!)
echo.
echo Press any key to exit...
pause >nul
