# Arudhra Consultancy - Singapore Overseas Recruitment Portal
## How to Run This Website After Downloading the ZIP File

If you downloaded this project as a ZIP file from Google AI Studio and experienced a **white blank screen** or wondered why files were missing, this guide explains exactly why that happened and how to run it in 1 minute.

---

### Why did a white blank screen appear?
1. **Modern React & TypeScript App**: This website is built using React 19, Vite, and Node.js/Express. It is **not** a basic old-fashioned HTML file.
2. **Browsers block raw source files**: When you double-click `index.html` directly from your file manager, your browser opens it with `file:///...`. Browsers block modern JavaScript/TypeScript module imports on `file:///` for security reasons (CORS policy).
3. **Dependencies (`node_modules`)**: Like all professional web applications, external packages (React, Lucide icons, Express, etc.) are installed on your machine using `npm install`.

---

### Quick Start (Recommended - 1 Click for Windows)

1. **Extract all files** from the ZIP file into a normal folder.
2. Ensure you have **Node.js** installed on your computer. If not, download and install the free LTS version from:
   👉 **https://nodejs.org/**
3. **Double-click `start.bat`**:
   - It will automatically check your Node.js setup.
   - It installs the required packages (`node_modules`) on first run.
   - It starts the server and opens **http://localhost:3000** in your browser automatically!

---

### Quick Start for Mac / Linux

1. Open your **Terminal** and navigate (`cd`) into the extracted project folder.
2. Make `start.sh` executable and run it:
   ```bash
   chmod +x start.sh
   ./start.sh
   ```
3. Open **http://localhost:3000** in your browser.

---

### Manual Terminal Instructions (All Systems)

1. Open your Command Prompt, PowerShell, or Terminal inside this folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the application:
   ```bash
   npm run dev
   ```
4. Visit **http://localhost:3000** in your web browser.

---

### Production Deployment / Hosting Options

#### Option A: Node.js VPS / Cloud Run / Render / Railway / Heroku
To build and run the production server:
```bash
npm run build
npm start
```
The server will run on port `3000` (or the port defined in your `PORT` environment variable).

#### Option B: GitHub Pages Deployment (Zero Build Steps)
For full instructions on deploying to GitHub Pages without missing hidden files or design assets, see **`GITHUB_SETUP_GUIDE.md`**:
1. Push your repository to GitHub using **`upload_to_github.bat`** (or git command line).
2. In GitHub repository **Settings -> Pages**:
   - Source: Select **Deploy from a branch**
   - Branch: **main**, Folder: **/docs**
   - Click **Save**. The website design and styling will show properly on your `.github.io` domain!

#### Option C: Pre-built Static Files (`dist/` or `docs/` folder)
If you want static HTML/CSS/JS files to upload to cPanel `public_html`, Apache, Nginx, or Netlify:
1. Run:
   ```bash
   npm run build:pages
   ```
2. The folder named **`dist`** and **`docs`** will contain:
   - `index.html`
   - `assets/` (bundled CSS and JS)
   - logos and media
3. Upload the contents of `dist` to your web server root.

---

### Admin Login Credentials
- **Admin Portal**: Click "Admin Portal" in the website menu or visit `http://localhost:3000/#admin`
- **Username**: `admin`
- **Password**: `admin123`
- **2FA TOTP Secret**: `ARUDHRA7MZQK4X2P` (or scan the on-screen QR code with Google Authenticator / Microsoft Authenticator)

---

### Support
If you have any questions or need custom deployment assistance, contact Arudhra Consultancy:
- **Phone / WhatsApp**: +91 6374509488
- **Email**: info@arudhraconsultancy.com
