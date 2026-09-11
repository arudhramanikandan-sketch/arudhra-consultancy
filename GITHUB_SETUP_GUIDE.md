# GitHub Upload & Design Fix Guide: Arudhra Consultancy

If you downloaded the project as a ZIP file, uploaded it to GitHub, and noticed that **the website design is not showing properly** or **files seemed hidden**, this guide explains exactly what happened and gives you **immediate, 100% working solutions**.

---

## 1. Why Did the Design Not Show Properly?

1. **Browsers Cannot Run Raw TypeScript / JSX Directly**:
   - The root `index.html` references `/src/main.tsx` and raw Tailwind CSS `@import "tailwindcss";`.
   - Web browsers (Chrome, Edge, Safari) cannot interpret `.tsx` files without Vite compiling them into standard JavaScript (`.js`) and CSS (`.css`).
   - When you host raw repository files directly on GitHub Pages without building, the browser fails to load `/src/main.tsx` and the styling does not appear.

2. **Hidden "Dotfiles" on Windows & Mac**:
   - Files and folders starting with a dot (like `.github/`, `.nojekyll`, `.gitignore`, `.env.example`) are automatically **hidden** by Windows and macOS File Explorer by default.
   - If you drag and drop files from Windows into the GitHub web uploader:
     - The browser web uploader **ignores hidden files**.
     - The web uploader also caps uploads at **100 files** per drag-and-drop, causing critical styling and component files to be missed.

---

## 2. How to Fix the Design and Show the Proper Website

We have pre-configured everything in this project so you have **two instant options** to display the complete, beautiful website design on GitHub Pages.

---

### Option A: Enable GitHub Pages from the `/docs` Folder (Instant - 30 Seconds)

We have pre-built the full production website into the **`docs/`** folder with compiled Tailwind CSS, fonts, logos, and `.nojekyll` configuration.

1. Open your repository on GitHub.
2. Click **Settings** (top tabs) -> click **Pages** in the left sidebar.
3. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch`
   - **Branch**: Select `main` (or `master`)
   - **Folder**: Select `/docs` (not `/root`)
   - Click **Save**.
4. In 1–2 minutes, GitHub will provide your live URL:
   `https://<your-username>.github.io/<your-repository>/`
5. Visit that link: your full design, crimson theme, Singapore job listings, application forms, flyers, and logo will display with complete styling!

---

### Option B: Automatic Upload Script (Uploads ALL Hidden & Design Files)

To upload the entire project to GitHub without missing any hidden dotfiles or hitting browser upload limits:

1. In the project folder on Windows, double-click:
   **`upload_to_github.bat`**
   *(or run `./upload_to_github.sh` on Mac/Linux)*
2. The script will:
   - Compile the latest styles and JavaScript into both `dist/` and `docs/`.
   - Add all files including `.github`, `.nojekyll`, `.gitignore`, and `storage_data.json`.
   - Commit all files cleanly.
   - Ask for your GitHub repository URL and push everything to `main`.
3. Then follow **Option A** above to publish via GitHub Pages.

---

### Option C: GitHub Actions Automated Deployment

This project now includes the official **`.github/workflows/deploy.yml`** workflow.

1. On your GitHub repository, go to **Settings** -> **Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Every time you push changes to GitHub, GitHub Actions will automatically install dependencies, build the production design, and publish it live!

---

## 3. How to Make Hidden Files Visible in Windows

If you want to view all configuration files on your Windows computer:
1. Open Windows File Explorer.
2. In the top toolbar, click **View**.
3. Click **Show** -> check **Hidden items**.
4. You will now see `.github/`, `.nojekyll`, `.gitignore`, and `.env.example`.
*(Note: We also created visible copies named `env.example` and `gitignore.txt` for convenience!)*

---

## 4. Running the Full Stack Website Locally

To run the local server with the full Admin Dashboard, 2FA security, candidate applications, WhatsApp, and Brevo email notifications:
1. Double-click **`start.bat`** in Windows.
2. Or in Command Prompt / Terminal:
   ```bash
   npm install
   npm run dev
   ```
3. Open your browser at **`http://localhost:3000`**.
