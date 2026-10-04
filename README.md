# Pharmionex Journal — Google Apps Script Backend (For Vivek Sharma)

**Official Editorial Account:** `pharmioneex.journal@gmail.com`  
**Publisher & Editor-in-Chief:** Vivek Sharma  
**Journal:** *Pharmionex Journal (International Journal of Pharmaceutical, Biomedical & Clinical Research)*

This script automates manuscript reception, logs records into Google Sheets, stores files and manifests into a dedicated Google Drive folder under `pharmioneex.journal@gmail.com`, and sends official branded confirmation emails to submitting authors.

---

### Step-by-Step Deployment Instructions

1. **Sign in to Google Drive**:
   - Open your browser and log into `pharmioneex.journal@gmail.com`.
2. **Create the Editorial Google Sheet**:
   - Create a new Google Spreadsheet named `Pharmionex Journal - Editorial Database`.
3. **Open Apps Script**:
   - In the spreadsheet menu, click **Extensions** → **Apps Script**.
4. **Copy Code**:
   - Delete any default code in `Code.gs` and paste the contents of `google_apps_script/Code.gs`.
5. **Run Sheet Setup**:
   - In the toolbar dropdown, select the function `setupSheetHeaders` and click **Run**.
   - Grant the standard Google permissions (Drive, Sheets, Mail).
6. **Deploy as Web App**:
   - Click **Deploy** → **New deployment**.
   - Select type: **Web app**.
   - Set **Execute as**: `Me (pharmioneex.journal@gmail.com)`.
   - Set **Who has access**: `Anyone`.
   - Click **Deploy** and copy the resulting Web App URL (starts with `https://script.google.com/macros/s/.../exec`).
7. **Connect to Journal**:
   - On the journal website, open the footer link **"🔒 Editorial Control Portal"** (or set `GOOGLE_APPS_SCRIPT_URL` in `script.js`).
   - Paste the Web App URL and click **Save**.
   - Submissions from the website will now automatically record into your Google Sheet and Google Drive!
