#!/bin/bash
echo "======================================================================"
echo "   ARUDHRA CONSULTANCY - SINGAPORE OVERSEAS RECRUITMENT PORTAL"
echo "======================================================================"
echo ""

# 1. Check Node.js
if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js is not installed on this system!"
    echo "Please download and install Node.js (LTS) from https://nodejs.org/"
    exit 1
fi

echo "[OK] Node.js $(node -v) detected."

# 2. Check dependencies
if [ ! -d "node_modules" ]; then
    echo ""
    echo "[SETUP] Installing dependencies for first-time use..."
    npm install
    if [ $? -ne 0 ]; then
        echo "[ERROR] npm install failed. Check internet connection."
        exit 1
    fi
fi

echo ""
echo "======================================================================"
echo " Starting server on: http://localhost:3000"
echo "======================================================================"
echo ""
echo "Press Ctrl + C to stop the server."
echo ""

# Attempt to open browser automatically
if which xdg-open > /dev/null 2>&1; then
    (sleep 2 && xdg-open "http://localhost:3000") &
elif which open > /dev/null 2>&1; then
    (sleep 2 && open "http://localhost:3000") &
fi

npm run dev
