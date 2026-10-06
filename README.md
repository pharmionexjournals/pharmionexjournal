# Pharmionex Journal — Google Apps Script Backend (v2)

**Official Editorial Account:** `pharmionex.journal@gmail.com`
**Publisher & Editor-in-Chief:** Vivek Sharma

The script receives submissions from the website, logs them in the Google Sheet, stores the manifest and files in the Drive folder "Pharmionex Journal - Submissions Archive", and emails the author and the editorial office.

## Deploy (once)
1. Open the editorial Google Sheet while signed in as `pharmionex.journal@gmail.com` (use a private window if you have several Google accounts).
2. **Extensions → Apps Script**, paste `Code.gs`, **Save**.
3. Select `setupSheetHeaders` → **Run** → approve the permissions (Drive, Sheets, Gmail).
4. **Deploy → New deployment → Web app** → Execute as **Me**, Who has access **Anyone** → **Deploy**.
5. Copy the URL ending in `/exec` and put it in `script.js` line 14 (`GOOGLE_APPS_SCRIPT_URL`).

## After ANY change to Code.gs
**Deploy → Manage deployments → Edit (pencil) → Version: New version → Deploy.** The URL stays the same. Nothing changes online until you do this.

## Sheet menu: "📑 Pharmionex Editorial Control"
Click a row in the **Submissions** tab first, then use:
- **Send Status Email to Selected Author**
- **Send Double-Blind Reviewer Invitation** (sends only title, abstract, keywords — never author details)
- **Generate Official Acceptance Letter (PDF)** (saves to the submission's Drive folder, sets stage 5, can email the author)

All actions are recorded in the **AuditLog** tab.

## Built-in protections
- Max 3 submissions per email per hour, 40 per hour overall
- Author text is HTML-escaped in all emails
- Only safe file types are saved (pdf/doc/docx/zip/tex; supplementary: xlsx/csv/zip/images); 20 MB total
- Unguessable tracking IDs, e.g. `PHARMIONEX-2026-K7QX4M`
- A retry of the same submission never creates duplicates
- A Sheet/Drive/email failure never loses the submission (the sheet row is always written, and problems are returned as warnings)

Gmail's free quota is about 100 emails per day; each submission uses 2.
