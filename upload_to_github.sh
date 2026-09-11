#!/usr/bin/env bash

echo "==================================================="
echo "  ARUDHRA CONSULTANCY - GITHUB REPOSITORY UPLOADER"
echo "==================================================="
echo ""

if ! command -v git &> /dev/null; then
    echo "[ERROR] Git is not installed."
    echo "Please install Git and run this script again."
    exit 1
fi

echo "[1/5] Initializing Git repository..."
if [ ! -d ".git" ]; then
    git init
    git branch -M main
fi

echo "[2/5] Building production assets (dist/ and docs/)..."
npm run build:pages

echo "[3/5] Adding all files (including hidden dotfiles and design assets)..."
git add -A

echo "[4/5] Committing changes..."
git commit -m "Upload complete Arudhra Consultancy website with all design assets and configs"

echo "[5/5] GitHub Remote Configuration..."
read -p "Enter your GitHub repository URL (e.g. https://github.com/user/repo.git): " REPO_URL

if [ -n "$REPO_URL" ]; then
    git remote remove origin 2>/dev/null || true
    git remote add origin "$REPO_URL"
    git push -u origin main --force
    echo "Upload complete!"
    echo "To enable GitHub Pages:"
    echo "Go to GitHub Repo Settings -> Pages -> Deploy from branch: main -> /docs folder -> Save."
fi
