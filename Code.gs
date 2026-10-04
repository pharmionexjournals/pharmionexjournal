/**
 * ============================================================================
 * PHARMIONEX JOURNAL - EDITORIAL MANAGEMENT & GOOGLE DRIVE AUTOMATION
 * ============================================================================
 * Editor-in-Chief & Publisher: Vivek Sharma
 * Official Editorial Email: pharmioneex.journal@gmail.com
 * Google Drive Storage: pharmioneex.journal@gmail.com
 * Journal: Pharmionex Journal (Intl Journal of Pharmaceutical, Biomedical & Clinical Research)
 * ISSN Status: Application in Process (CSIR-NIScPR, New Delhi, India)
 * Ethics & Governance: UGC-CARE, COPE, and ICMJE Guidelines Compliant
 * ============================================================================
 */

const CONFIG = {
  JOURNAL_NAME: "Pharmionex Journal",
  JOURNAL_SUBTITLE: "International Journal of Pharmaceutical, Biomedical & Clinical Research",
  EDITOR_IN_CHIEF: "Vivek Sharma",
  EDITORIAL_EMAIL: "pharmioneex.journal@gmail.com",
  ISSN_STATUS: "Application in Process (CSIR-NIScPR, New Delhi)",
  WEBSITE_URL: "https://viv102ek.github.io/pharmionex-journal-repo/",
  DRIVE_ROOT_FOLDER: "Pharmionex Journal - Submissions Archive",
  SUBMISSIONS_SHEET: "Submissions",
  ARTICLES_SHEET: "Inaugural_Volume_1",
  AUDIT_SHEET: "AuditLog"
};

/**
 * Initialize custom menu in Google Sheets for Vivek Sharma
 */
function onOpen() {
  SpreadsheetApp.getUi().createMenu("📑 Pharmionex Editorial Control")
    .addItem("⚙️ Initialize Editorial Sheet Headers", "setupSheetHeaders")
    .addItem("📁 Open/Verify Submissions Drive Folder", "getOrCreateSubmissionsFolder")
    .addSeparator()
    .addItem("📧 Send Status Email to Selected Author", "sendAuthorStatusEmail")
    .addItem("📨 Send Double-Blind Reviewer Invitation", "sendReviewerInvite")
    .addItem("🎓 Generate Official Acceptance Letter (PDF)", "generateAcceptanceCertificate")
    .addToUi();
}

/**
 * Handle incoming manuscript submissions from the website portal
 */
function doPost(e) {
  try {
    let payload = JSON.parse(e.postData.contents);
    const subId = "PHARMIONEX-" + new Date().getFullYear() + "-" + Math.floor(1000 + Math.random() * 9000);
    
    // 1. Google Drive Integration (under pharmioneex.journal@gmail.com)
    let driveFolder = getOrCreateSubmissionsFolder();
    let authorSubfolder = driveFolder.createFolder(subId + " - " + (payload.authorName || "Author") + " - " + (payload.articleType || "Manuscript"));
    let folderUrl = authorSubfolder.getUrl();
    
    // Create detailed submission manifest in Drive
    let manifestText = "=====================================================\n" +
                       "PHARMIONEX JOURNAL - OFFICIAL SUBMISSION MANIFEST\n" +
                       "=====================================================\n" +
                       "Tracking ID: " + subId + "\n" +
                       "Timestamp: " + new Date().toISOString() + "\n" +
                       "Article Category: " + (payload.articleType || "N/A") + "\n" +
                       "Subject Track: " + (payload.track || "N/A") + "\n" +
                       "Manuscript Title: " + (payload.title || "Untitled") + "\n" +
                       "Corresponding Author: " + (payload.authorName || "N/A") + " (" + (payload.authorEmail || "N/A") + ")\n" +
                       "Institutional Affiliation: " + (payload.affiliation || "N/A") + "\n" +
                       "Co-Authors: " + (payload.coAuthors || "None declared") + "\n\n" +
                       "STRUCTURED ABSTRACT:\n" + (payload.abstract || "N/A") + "\n\n" +
                       "KEYWORDS (MeSH):\n" + (payload.keywords || "N/A") + "\n\n" +
                       "ETHICAL DECLARATIONS:\n" +
                       "- IAEC / IEC Protocol: " + (payload.iaecProtocol || "Not Applicable") + "\n" +
                       "- Funding Source: " + (payload.funding || "None declared") + "\n" +
                       "- Competing Interests: " + (payload.coi || "None declared") + "\n" +
                       "- Data Availability: " + (payload.dataAvailability || "All data in manuscript") + "\n\n" +
                       "Editor-in-Chief & Publisher: Vivek Sharma\n" +
                       "Editorial Office: " + CONFIG.EDITORIAL_EMAIL + "\n";
    authorSubfolder.createFile("Submission_Manifest_" + subId + ".txt", manifestText, MimeType.PLAIN_TEXT);

    // Save manuscript file if uploaded as base64
    if (payload.base64File && payload.fileName) {
      try {
        let decoded = Utilities.base64Decode(payload.base64File);
        let blob = Utilities.newBlob(decoded, payload.fileType || MimeType.PDF, payload.fileName);
        authorSubfolder.createFile(blob);
      } catch (errFile) {
        authorSubfolder.createFile("File_Upload_Note.txt", "Author provided file URL or attachment could not be decoded directly: " + (payload.fileUrl || "N/A"));
      }
    }

    // 2. Google Sheets Database Logging
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(CONFIG.SUBMISSIONS_SHEET) || ss.insertSheet(CONFIG.SUBMISSIONS_SHEET);
    sheet.appendRow([
      new Date(),
      subId,
      payload.articleType || "Original Research Article",
      payload.title || "Untitled",
      payload.track || "Pharmaceutics",
      payload.authorName || "N/A",
      payload.authorEmail || "N/A",
      payload.affiliation || "N/A",
      payload.coAuthors || "None",
      payload.abstract || "N/A",
      payload.keywords || "N/A",
      folderUrl,
      payload.iaecProtocol || "N/A",
      "Stage 1: Initial Editorial Desk Review",
      1,
      "Pending Initial Scope Check",
      CONFIG.EDITOR_IN_CHIEF
    ]);

    // 3. Automated Academic Confirmation Email from Vivek Sharma
    if (payload.authorEmail) {
      const emailSubject = "[Pharmionex Journal] Manuscript Acknowledgment & Tracking ID: " + subId;
      const emailBody = 
        "<div style='font-family:Arial,sans-serif; max-width:640px; margin:0 auto; color:#1e293b; line-height:1.6;'>" +
        "<div style='background:#1e3a8a; color:#ffffff; padding:20px; border-radius:6px 6px 0 0; text-align:center;'>" +
        "<h2 style='margin:0 0 6px; font-size:20px;'>PHARMIONEX JOURNAL</h2>" +
        "<p style='margin:0; font-size:13px; opacity:0.9;'>International Journal of Pharmaceutical, Biomedical & Clinical Research</p>" +
        "</div>" +
        "<div style='padding:24px; border:1px solid #e2e8f0; border-top:none; background:#ffffff;'>" +
        "<p>Dear <strong>" + (payload.authorName || "Author") + "</strong>,</p>" +
        "<p>Thank you for submitting your manuscript to <strong>Pharmionex Journal</strong> for the upcoming <strong>Inaugural Issue (Volume 1, Issue 1, 2026)</strong>. Your submission has been securely archived in the editorial Google Drive repository.</p>" +
        "<div style='background:#f8fafc; border:1px solid #cbd5e1; border-left:4px solid #1e3a8a; border-radius:4px; padding:16px; margin:20px 0;'>" +
        "<p style='margin:0 0 8px;'><strong>Manuscript Title:</strong> " + (payload.title || "Untitled") + "</p>" +
        "<p style='margin:0 0 8px;'><strong>Article Category:</strong> " + (payload.articleType || "N/A") + "</p>" +
        "<p style='margin:0 0 8px;'><strong>Subject Track:</strong> " + (payload.track || "N/A") + "</p>" +
        "<p style='margin:0 0 8px;'><strong>Assigned Tracking ID:</strong> <span style='font-family:monospace; font-size:16px; font-weight:bold; color:#1e3a8a;'>" + subId + "</span></p>" +
        "<p style='margin:0;'><strong>Initial Status:</strong> Stage 1 — Desk Review & Plagiarism Check (&lt; 10% similarity)</p>" +
        "</div>" +
        "<p>You can track the real-time progress of your manuscript anytime through our online portal:<br>" +
        "<a href='" + CONFIG.WEBSITE_URL + "#track' style='color:#0f766e; font-weight:bold;'>" + CONFIG.WEBSITE_URL + "#track</a></p>" +
        "<p><strong>Next Steps in the Double-Blind Peer Review Lifecycle:</strong></p>" +
        "<ol style='font-size:13px; color:#475569; padding-left:20px;'>" +
        "<li><strong>Initial Editorial Desk Review (Days 1–3):</strong> Verification of scope, compliance with Author Guidelines, and similarity index check.</li>" +
        "<li><strong>Double-Blind Peer Review (Days 4–18):</strong> Dispatched to two independent external reviewers with specialized domain expertise.</li>" +
        "<li><strong>Editorial Decision & Revisions (Days 19–28):</strong> Notification of acceptance, revision request, or decision.</li>" +
        "<li><strong>Advance Online Publication (Volume 1, Issue 1, 2026):</strong> Final formatting and open-access publication with Zero APC.</li>" +
        "</ol>" +
        "<p style='margin-top:24px; font-size:13px; color:#64748b;'>If you need to provide updated files or supplementary data, please reply directly to this email or contact the Editorial Office at <a href='mailto:" + CONFIG.EDITORIAL_EMAIL + "'>" + CONFIG.EDITORIAL_EMAIL + "</a>.</p>" +
        "<hr style='border:none; border-top:1px solid #e2e8f0; margin:20px 0;'>" +
        "<p style='font-size:12px; color:#64748b; margin:0;'>" +
        "With best regards,<br>" +
        "<strong>Vivek Sharma</strong><br>" +
        "Editor-in-Chief & Publisher<br>" +
        "<strong>Pharmionex Journal</strong><br>" +
        "Email: <a href='mailto:" + CONFIG.EDITORIAL_EMAIL + "'>" + CONFIG.EDITORIAL_EMAIL + "</a> | Web: <a href='" + CONFIG.WEBSITE_URL + "'>" + CONFIG.WEBSITE_URL + "</a>" +
        "</p>" +
        "</div>" +
        "</div>";

      MailApp.sendEmail({
        to: payload.authorEmail,
        subject: emailSubject,
        htmlBody: emailBody,
        replyTo: CONFIG.EDITORIAL_EMAIL,
        name: "Pharmionex Journal Editorial Office"
      });
    }

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      trackingId: subId,
      driveFolderUrl: folderUrl,
      message: "Manuscript successfully archived and logged in Google Drive."
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle GET requests for health check or live manuscript status lookup
 */
function doGet(e) {
  const action = (e && e.parameter && e.parameter.action) ? e.parameter.action : "ping";
  
  if (action === "ping") {
    return ContentService.createTextOutput(JSON.stringify({
      status: "online",
      journal: CONFIG.JOURNAL_NAME,
      editor: CONFIG.EDITOR_IN_CHIEF,
      email: CONFIG.EDITORIAL_EMAIL,
      driveFolder: CONFIG.DRIVE_ROOT_FOLDER,
      timestamp: new Date().toISOString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  if (action === "track") {
    const id = e.parameter.trackingId || e.parameter.id;
    if (!id) {
      return ContentService.createTextOutput(JSON.stringify({ found: false, error: "Tracking ID missing" })).setMimeType(ContentService.MimeType.JSON);
    }
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(CONFIG.SUBMISSIONS_SHEET);
    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({ found: false, error: "Submissions sheet not initialized" })).setMimeType(ContentService.MimeType.JSON);
    }
    
    const data = sheet.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (String(data[i][1]).trim().toUpperCase() === String(id).trim().toUpperCase()) {
        return ContentService.createTextOutput(JSON.stringify({
          found: true,
          trackingId: data[i][1],
          articleType: data[i][2],
          title: data[i][3],
          track: data[i][4],
          author: data[i][5],
          submissionDate: Utilities.formatDate(new Date(data[i][0]), Session.getScriptTimeZone(), "MMMM dd, yyyy"),
          status: data[i][13],
          stage: data[i][14] || 1,
          plagiarismScore: data[i][15] || "In Progress",
          assignedEditor: data[i][16] || CONFIG.EDITOR_IN_CHIEF
        })).setMimeType(ContentService.MimeType.JSON);
      }
    }
    return ContentService.createTextOutput(JSON.stringify({ found: false, message: "Tracking ID not found in database" })).setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService.createTextOutput(JSON.stringify({ error: "Invalid action" })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Access or create the root Google Drive folder in pharmioneex.journal@gmail.com
 */
function getOrCreateSubmissionsFolder() {
  const folders = DriveApp.getFoldersByName(CONFIG.DRIVE_ROOT_FOLDER);
  if (folders.hasNext()) {
    return folders.next();
  }
  return DriveApp.createFolder(CONFIG.DRIVE_ROOT_FOLDER);
}

/**
 * Setup and style standard editorial headers in the Google Sheet
 */
function setupSheetHeaders() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let subSheet = ss.getSheetByName(CONFIG.SUBMISSIONS_SHEET) || ss.insertSheet(CONFIG.SUBMISSIONS_SHEET);
  
  const headers = [
    "Timestamp",
    "Tracking ID",
    "Article Category",
    "Manuscript Title",
    "Subject Track",
    "Corresponding Author",
    "Author Email",
    "Affiliation",
    "Co-Authors",
    "Structured Abstract",
    "Keywords (MeSH)",
    "Google Drive Folder Link",
    "Ethics Protocol",
    "Current Status",
    "Stage (1-6)",
    "Plagiarism Similarity (%)",
    "Handling Editor"
  ];
  
  subSheet.getRange(1, 1, 1, headers.length)
    .setValues([headers])
    .setBackground("#1e3a8a")
    .setFontColor("#ffffff")
    .setFontWeight("bold")
    .setHorizontalAlignment("center");
    
  subSheet.setFrozenRows(1);
  subSheet.autoResizeColumns(1, headers.length);
  SpreadsheetApp.getUi().alert("✅ Pharmionex Editorial Google Sheet initialized successfully for " + CONFIG.EDITOR_IN_CHIEF + "!");
}
