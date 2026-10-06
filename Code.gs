/**
 * ============================================================================
 * PHARMIONEX JOURNAL - EDITORIAL MANAGEMENT & GOOGLE DRIVE AUTOMATION (v2)
 * ============================================================================
 * Editor-in-Chief & Publisher: Vivek Sharma
 * Official Editorial Email: pharmionex.journal@gmail.com
 * Google Drive Storage: pharmionex.journal@gmail.com
 * Journal: Pharmionex Journal (Intl Journal of Pharmaceutical, Biomedical & Clinical Research)
 * ISSN Status: Application in Process (CSIR-NIScPR, New Delhi, India)
 * Ethics & Governance: COPE and ICMJE recommendations
 *
 * IMPORTANT: This script must be created from the Google Sheet itself
 * (Extensions -> Apps Script). After ANY edit: Deploy -> Manage deployments ->
 * Edit (pencil) -> Version: New version -> Deploy. The /exec URL stays the same.
 * ============================================================================
 */

const CONFIG = {
  JOURNAL_NAME: "Pharmionex Journal",
  JOURNAL_SUBTITLE: "International Journal of Pharmaceutical, Biomedical & Clinical Research",
  EDITOR_IN_CHIEF: "Vivek Sharma",
  EDITORIAL_EMAIL: "pharmionex.journal@gmail.com",
  ISSN_STATUS: "Application in Process (CSIR-NIScPR, New Delhi)",
  WEBSITE_URL: "https://viv102ek.github.io/pharmionex-journal-repo/",
  DRIVE_ROOT_FOLDER: "Pharmionex Journal - Submissions Archive",
  SUBMISSIONS_SHEET: "Submissions",
  ARTICLES_SHEET: "Inaugural_Volume_1",
  AUDIT_SHEET: "AuditLog",
  MAX_TOTAL_FILE_BYTES: 20 * 1024 * 1024,           // all uploaded files combined
  ALLOWED_PRIMARY_EXT: ["pdf", "doc", "docx", "zip", "tex"],
  ALLOWED_SUPP_EXT: ["xlsx", "csv", "zip", "png", "jpg", "jpeg", "tif", "tiff", "pdf", "doc"],
  MAX_SUBMISSIONS_PER_EMAIL_PER_HOUR: 3,
  MAX_SUBMISSIONS_PER_HOUR: 40
};

// Column positions (1-based) in the "Submissions" sheet
const COL = {
  TIMESTAMP: 1, ID: 2, TYPE: 3, TITLE: 4, TRACK: 5, AUTHOR: 6, EMAIL: 7,
  AFFILIATION: 8, COAUTHORS: 9, ABSTRACT: 10, KEYWORDS: 11, FOLDER: 12,
  ETHICS: 13, STATUS: 14, STAGE: 15, PLAGIARISM: 16, EDITOR: 17, DATA: 18,
  REVIEWERS: 19, REMARKS: 20, REVIEWER_COMMENTS: 21, LAST_UPDATED: 22
};

const HEADERS = [
  "Timestamp", "Tracking ID", "Article Category", "Manuscript Title", "Subject Track",
  "Corresponding Author", "Author Email", "Affiliation", "Co-Authors", "Structured Abstract",
  "Keywords (MeSH)", "Google Drive Folder Link", "Ethics Protocol", "Current Status",
  "Stage (1-6)", "Plagiarism Similarity (%)", "Handling Editor", "Data Availability",
  "Reviewers Assigned", "Latest Editor Remarks", "Reviewer Comments / Internal Note", "Last Updated"
];

const STAGE_NAMES = [
  "Submission Received",
  "Scope & Plagiarism Check",
  "Double-Blind Peer Review",
  "Reviewer Revisions",
  "Acceptance Decision",
  "Published in Issue"
];

/* ============================================================================
 * MENU (appears in the Google Sheet)
 * ========================================================================== */
function onOpen() {
  SpreadsheetApp.getUi().createMenu("📑 Pharmionex Editorial Control")
    .addItem("⚙️ Initialize Editorial Sheet Headers", "setupSheetHeaders")
    .addItem("📁 Open/Verify Submissions Drive Folder", "openSubmissionsFolder")
    .addSeparator()
    .addItem("📧 Send Status Email to Selected Author", "sendAuthorStatusEmail")
    .addItem("📨 Send Double-Blind Reviewer Invitation", "sendReviewerInvite")
    .addItem("🎓 Generate Official Acceptance Letter (PDF)", "generateAcceptanceCertificate")
    .addToUi();
}

/* ============================================================================
 * WEB APP: RECEIVE SUBMISSIONS FROM THE WEBSITE
 * ========================================================================== */
function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000);
  } catch (lockErr) {
    return json_({ success: false, error: "Server is busy. Please retry in a minute." });
  }

  try {
    if (!e || !e.postData || !e.postData.contents) {
      return json_({ success: false, error: "Empty request." });
    }
    const payload = JSON.parse(e.postData.contents);

    // ---- Validation -------------------------------------------------------
    const authorEmail = clip_(payload.authorEmail, 200).trim();
    const title = clip_(payload.title, 500).trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(authorEmail)) {
      return json_({ success: false, error: "A valid author email is required." });
    }
    if (!title) {
      return json_({ success: false, error: "Manuscript title is required." });
    }

    // ---- Anti-abuse rate limits ------------------------------------------
    if (rateLimited_("rl_email_" + md5_(authorEmail.toLowerCase()), CONFIG.MAX_SUBMISSIONS_PER_EMAIL_PER_HOUR, 3600) ||
        rateLimited_("rl_global", CONFIG.MAX_SUBMISSIONS_PER_HOUR, 3600)) {
      return json_({ success: false, error: "Too many submissions. Please try again later or email the editorial office." });
    }

    const authorName = clip_(payload.authorName, 200) || "Author";
    const articleType = clip_(payload.articleType, 100) || "Original Research Article";
    const track = clip_(payload.track, 100) || "Pharmaceutics";
    const affiliation = clip_(payload.affiliation, 400) || "N/A";
    const coAuthors = clip_(payload.coAuthors, 1000) || "None declared";
    const abstract = clip_(payload.abstract, 8000) || "N/A";
    const keywords = clip_(payload.keywords, 500) || "N/A";
    const iaec = clip_(payload.iaecProtocol, 200) || "Not Applicable";
    const funding = clip_(payload.funding, 1000) || "None declared";
    const coi = clip_(payload.coi, 1000) || "None declared";
    const dataAvail = clip_(payload.dataAvailability, 1500) || "All data in manuscript";

    const sheet = getSubmissionsSheet_();

    // ---- Tracking ID (use the website's ID so receipt, email and sheet agree)
    let subId = String(payload.trackingId || "").trim().toUpperCase();
    const validFormat = /^PHARMIONEX-\d{4}-[A-Z0-9]{4,8}$/.test(subId);
    if (validFormat) {
      const existingRow = findRowById_(sheet, subId);
      if (existingRow) {
        const sameEmail = String(sheet.getRange(existingRow, COL.EMAIL).getValue()).toLowerCase() === authorEmail.toLowerCase();
        if (sameEmail) {
          // Duplicate delivery of the same submission (e.g. a retry) - do nothing twice.
          return json_({
            success: true, duplicate: true, trackingId: subId,
            driveFolderUrl: String(sheet.getRange(existingRow, COL.FOLDER).getValue()),
            message: "Submission was already recorded."
          });
        }
        subId = newTrackingId_(sheet);
      }
    } else {
      subId = newTrackingId_(sheet);
    }

    const warnings = [];

    // ---- 1. Google Drive: folder, manifest, files -------------------------
    let folderUrl = "Drive error - see AuditLog";
    try {
      const root = getOrCreateSubmissionsFolder();
      const authorFolder = root.createFolder(subId + " - " + safeName_(authorName) + " - " + safeName_(articleType));
      folderUrl = authorFolder.getUrl();

      const manifest =
        "=====================================================\n" +
        "PHARMIONEX JOURNAL - OFFICIAL SUBMISSION MANIFEST\n" +
        "=====================================================\n" +
        "Tracking ID: " + subId + "\n" +
        "Timestamp: " + new Date().toISOString() + "\n" +
        "Article Category: " + articleType + "\n" +
        "Subject Track: " + track + "\n" +
        "Manuscript Title: " + title + "\n" +
        "Corresponding Author: " + authorName + " (" + authorEmail + ")\n" +
        "Institutional Affiliation: " + affiliation + "\n" +
        "Co-Authors: " + coAuthors + "\n\n" +
        "STRUCTURED ABSTRACT:\n" + abstract + "\n\n" +
        "KEYWORDS (MeSH):\n" + keywords + "\n\n" +
        "ETHICAL DECLARATIONS:\n" +
        "- IAEC / IEC Protocol: " + iaec + "\n" +
        "- Funding Source: " + funding + "\n" +
        "- Competing Interests: " + coi + "\n" +
        "- Data Availability: " + dataAvail + "\n\n" +
        "Editor-in-Chief & Publisher: " + CONFIG.EDITOR_IN_CHIEF + "\n" +
        "Editorial Office: " + CONFIG.EDITORIAL_EMAIL + "\n";
      authorFolder.createFile("Submission_Manifest_" + subId + ".txt", manifest, MimeType.PLAIN_TEXT);

      let usedBytes = 0;
      // Primary manuscript file
      if (payload.base64File && payload.fileName) {
        const r = saveUploadedFile_(authorFolder, payload.fileName, payload.fileType, payload.base64File,
                                    CONFIG.ALLOWED_PRIMARY_EXT, CONFIG.MAX_TOTAL_FILE_BYTES - usedBytes, "");
        if (r.ok) usedBytes += r.bytes; else warnings.push("Manuscript file not saved: " + r.reason);
      }
      // Supplementary files
      if (Array.isArray(payload.supplementary)) {
        payload.supplementary.slice(0, 10).forEach(function (f) {
          if (!f || !f.base64File || !f.fileName) return;
          const r = saveUploadedFile_(authorFolder, f.fileName, f.fileType, f.base64File,
                                      CONFIG.ALLOWED_SUPP_EXT, CONFIG.MAX_TOTAL_FILE_BYTES - usedBytes, "Supp_");
          if (r.ok) usedBytes += r.bytes; else warnings.push("Supplementary file not saved: " + r.reason);
        });
      }
      if (Array.isArray(payload.fileNotes) && payload.fileNotes.length) {
        authorFolder.createFile("File_Upload_Note.txt",
          "Notes from the submission portal:\n- " + payload.fileNotes.map(function (n) { return clip_(n, 300); }).join("\n- "),
          MimeType.PLAIN_TEXT);
        warnings.push("Some files were not transmitted (see File_Upload_Note.txt in the Drive folder).");
      }
    } catch (driveErr) {
      warnings.push("Drive: " + driveErr);
      logAudit_("DRIVE_ERROR", subId, String(driveErr));
    }

    // ---- 2. Google Sheet (the main record) --------------------------------
    sheet.appendRow([
      new Date(), subId, articleType, title, track, authorName, authorEmail, affiliation,
      coAuthors, abstract, keywords, folderUrl, iaec,
      "Stage 1: Initial Editorial Desk Review", "1 — Submission Received", "Pending", CONFIG.EDITOR_IN_CHIEF, dataAvail,
      "Pending Scope Review",
      "Manuscript formally received. Initial editorial desk review and similarity screening are in progress.",
      "Awaiting initial editorial evaluation.",
      new Date()
    ]);
    logAudit_("SUBMISSION_RECEIVED", subId, title);

    // ---- 3. Emails (author acknowledgment + notice to the editorial office) -
    let emailSent = false;
    try {
      if (MailApp.getRemainingDailyQuota() >= 2) {
        MailApp.sendEmail({
          to: authorEmail,
          subject: "[Pharmionex Journal] Manuscript Acknowledgment & Tracking ID: " + subId,
          htmlBody: buildAckEmail_(authorName, title, articleType, track, subId),
          replyTo: CONFIG.EDITORIAL_EMAIL,
          name: "Pharmionex Journal Editorial Office"
        });
        MailApp.sendEmail({
          to: CONFIG.EDITORIAL_EMAIL,
          subject: "[New Submission] " + subId + " - " + title.substring(0, 80),
          htmlBody: "<p>A new manuscript was received.</p><p><b>ID:</b> " + esc_(subId) +
                    "<br><b>Title:</b> " + esc_(title) + "<br><b>Author:</b> " + esc_(authorName) +
                    " (" + esc_(authorEmail) + ")<br><b>Category:</b> " + esc_(articleType) +
                    "<br><b>Drive folder:</b> " + esc_(folderUrl) + "</p>",
          name: "Pharmionex Submission Bot"
        });
        emailSent = true;
      } else {
        warnings.push("Daily email quota reached - acknowledgment email was NOT sent.");
      }
    } catch (mailErr) {
      warnings.push("Email: " + mailErr);
      logAudit_("EMAIL_ERROR", subId, String(mailErr));
    }

    return json_({
      success: true,
      trackingId: subId,
      driveFolderUrl: folderUrl,
      emailSent: emailSent,
      warnings: warnings,
      message: "Manuscript successfully logged in the editorial database."
    });

  } catch (err) {
    try { logAudit_("DOPOST_ERROR", "", String(err)); } catch (ignore) {}
    return json_({ success: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/* ============================================================================
 * WEB APP: HEALTH CHECK + LIVE TRACKING LOOKUP
 * ========================================================================== */
function doGet(e) {
  const action = (e && e.parameter && e.parameter.action) ? e.parameter.action : "ping";

  if (action === "ping") {
    return json_({
      status: "online",
      journal: CONFIG.JOURNAL_NAME,
      editor: CONFIG.EDITOR_IN_CHIEF,
      email: CONFIG.EDITORIAL_EMAIL,
      driveFolder: CONFIG.DRIVE_ROOT_FOLDER,
      timestamp: new Date().toISOString()
    });
  }

  if (action === "track") {
    const id = String(e.parameter.trackingId || e.parameter.id || "").trim();
    if (!id) return json_({ found: false, error: "Tracking ID missing" });

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.SUBMISSIONS_SHEET);
    if (!sheet) return json_({ found: false, error: "Submissions sheet not initialized" });

    const row = findRowById_(sheet, id);
    if (!row) return json_({ found: false, message: "Tracking ID not found in database" });

    return json_(getPublicTrackingRecord_(sheet, row));
  }

  return json_({ error: "Invalid action" });
}

/* ============================================================================
 * DRIVE + SHEET SETUP
 * ========================================================================== */
function getOrCreateSubmissionsFolder() {
  const folders = DriveApp.getFoldersByName(CONFIG.DRIVE_ROOT_FOLDER);
  if (folders.hasNext()) return folders.next();
  return DriveApp.createFolder(CONFIG.DRIVE_ROOT_FOLDER);
}

function openSubmissionsFolder() {
  const folder = getOrCreateSubmissionsFolder();
  const html = HtmlService.createHtmlOutput(
    '<p style="font-family:Arial">Folder is ready:<br><a href="' + folder.getUrl() +
    '" target="_blank">' + esc_(folder.getName()) + '</a></p>').setWidth(380).setHeight(110);
  SpreadsheetApp.getUi().showModalDialog(html, "Submissions Drive Folder");
}

function setupSheetHeaders() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const subSheet = ss.getSheetByName(CONFIG.SUBMISSIONS_SHEET) || ss.insertSheet(CONFIG.SUBMISSIONS_SHEET);

  subSheet.getRange(1, 1, 1, HEADERS.length)
    .setValues([HEADERS])
    .setBackground("#1e3a8a")
    .setFontColor("#ffffff")
    .setFontWeight("bold")
    .setHorizontalAlignment("center");
  subSheet.setFrozenRows(1);
  subSheet.autoResizeColumns(1, HEADERS.length);

  // Editorial control: change ONLY the Stage dropdown (column O).
  // The Current Status column is then updated automatically by onEdit(e).
  const stageOptions = [
    "1 — Submission Received",
    "2 — Scope & Plagiarism Check",
    "3 — Double-Blind Peer Review",
    "4 — Reviewer Revisions",
    "5 — Acceptance Decision",
    "6 — Published in Issue"
  ];
  // Normalize existing numeric stages so the dropdown works immediately.
  const existingRows = Math.max(subSheet.getLastRow() - 1, 0);
  if (existingRows > 0) {
    const stageRange = subSheet.getRange(2, COL.STAGE, existingRows, 1);
    const stageValues = stageRange.getValues().map(function(r) {
      const n = parseStage_(r[0]) || 1;
      return [stageOptions[n - 1]];
    });
    stageRange.setValues(stageValues);
  }
  const stageRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(stageOptions, true)
    .setAllowInvalid(false)
    .build();
  subSheet.getRange(2, COL.STAGE, Math.max(subSheet.getMaxRows() - 1, 1), 1).setDataValidation(stageRule);
  subSheet.getRange(1, COL.STAGE).setNote("EDITOR CONTROL: Select a stage from the dropdown. The public tracking page updates from this sheet automatically.");
  subSheet.getRange(1, COL.STATUS).setNote("Automatically synchronized from the Stage dropdown. You normally do not need to edit this cell manually.");
  subSheet.getRange(1, COL.LAST_UPDATED).setNote("Automatically updated whenever an editorial field is changed.");

  const audit = ss.getSheetByName(CONFIG.AUDIT_SHEET) || ss.insertSheet(CONFIG.AUDIT_SHEET);
  if (audit.getLastRow() === 0) {
    audit.getRange(1, 1, 1, 4).setValues([["Timestamp", "Action", "Tracking ID", "Details"]])
      .setBackground("#334155").setFontColor("#ffffff").setFontWeight("bold");
    audit.setFrozenRows(1);
  }

  getOrCreateSubmissionsFolder();

  try {
    SpreadsheetApp.getUi().alert("✅ Editorial sheet ready. To update an article, open the Submissions sheet and change the Stage dropdown in column O. The public Track Article page will use the new value.");
  } catch (uiErr) {
    Logger.log("Editorial sheet initialized.");
  }
}

/**
 * Spreadsheet-only editorial control. No editor panel or token is exposed on the website.
 * Change the Stage dropdown in column O; the public tracking record follows it.
 */
function onEdit(e) {
  if (!e || !e.range) return;
  const sheet = e.range.getSheet();
  if (sheet.getName() !== CONFIG.SUBMISSIONS_SHEET || e.range.getRow() < 2) return;

  const row = e.range.getRow();
  const col = e.range.getColumn();
  const watched = [COL.STATUS, COL.STAGE, COL.PLAGIARISM, COL.EDITOR, COL.REVIEWERS, COL.REMARKS, COL.REVIEWER_COMMENTS];
  if (watched.indexOf(col) === -1) return;

  const trackingId = String(sheet.getRange(row, COL.ID).getValue() || "").trim().toUpperCase();
  if (!trackingId) return;

  // Stage is the primary control. A stage selection automatically supplies the public status.
  if (col === COL.STAGE) {
    const parsed = parseStage_(e.value);
    if (parsed) {
      sheet.getRange(row, COL.STAGE).setValue(stageLabel_(parsed));
      sheet.getRange(row, COL.STATUS).setValue(stageStatus_(parsed));
    }
  }

  sheet.getRange(row, COL.LAST_UPDATED).setValue(new Date());

  const stage = parseInt(sheet.getRange(row, COL.STAGE).getValue(), 10) || 1;
  const status = String(sheet.getRange(row, COL.STATUS).getValue() || stageStatus_(stage));
  const details = JSON.stringify({stage: stage, status: status, editor: String(sheet.getRange(row, COL.EDITOR).getValue() || CONFIG.EDITOR_IN_CHIEF)});
  logAudit_("STATUS_UPDATED", trackingId, details);
}

function parseStage_(value) {
  const m = String(value || "").match(/^[1-6]/);
  return m ? Number(m[0]) : null;
}

function stageLabel_(stage) {
  const labels = {
    1: "1 — Submission Received",
    2: "2 — Scope & Plagiarism Check",
    3: "3 — Double-Blind Peer Review",
    4: "4 — Reviewer Revisions",
    5: "5 — Acceptance Decision",
    6: "6 — Published in Issue"
  };
  return labels[Number(stage)] || labels[1];
}

function stageStatus_(stage) {
  const statuses = {
    1: "Stage 1: Initial Editorial Desk Review",
    2: "Stage 2: Scope & Plagiarism Check",
    3: "Stage 3: Double-Blind Peer Review",
    4: "Stage 4: Reviewer Revisions",
    5: "Stage 5: Acceptance Decision",
    6: "Stage 6: Published in Issue"
  };
  return statuses[Number(stage)] || statuses[1];
}


/* ============================================================================
 * MENU ACTIONS
 * ========================================================================== */

/** Email the selected author their current manuscript status. */
function sendAuthorStatusEmail() {
  const ui = SpreadsheetApp.getUi();
  try {
    const s = getSelectedSubmission_();
    const r = ui.prompt("Status email to " + s.author + " (" + s.email + ")",
      "Optional personal message from the Editor-in-Chief (leave blank to send the status only):",
      ui.ButtonSet.OK_CANCEL);
    if (r.getSelectedButton() !== ui.Button.OK) return;
    const note = r.getResponseText().trim();

    const stageIdx = Math.min(6, Math.max(1, parseInt(s.stage, 10) || 1));
    const body = emailShell_(
      "<p>Dear <strong>" + esc_(s.author) + "</strong>,</p>" +
      "<p>This is an update on your manuscript submitted to <strong>" + esc_(CONFIG.JOURNAL_NAME) + "</strong>.</p>" +
      infoBox_([
        ["Manuscript Title", s.title],
        ["Tracking ID", s.id],
        ["Current Stage", stageIdx + " of 6 - " + STAGE_NAMES[stageIdx - 1]],
        ["Status", s.status]
      ]) +
      (note ? "<p style='background:#f8fafc;border-left:4px solid #0f766e;padding:12px;'><em>" + esc_(note).replace(/\n/g, "<br>") + "</em></p>" : "") +
      "<p>You can follow progress at any time: <a href='" + CONFIG.WEBSITE_URL + "#track'>" + CONFIG.WEBSITE_URL + "#track</a></p>");

    sendMail_(s.email, "[Pharmionex Journal] Status Update - " + s.id, body);
    logAudit_("STATUS_EMAIL", s.id, "Sent to " + s.email);
    ui.alert("✅ Status email sent to " + s.email);
  } catch (err) {
    ui.alert("⚠️ " + err.message);
  }
}

/** Invite an external reviewer (double-blind: no author details are sent). */
function sendReviewerInvite() {
  const ui = SpreadsheetApp.getUi();
  try {
    const s = getSelectedSubmission_();

    const r1 = ui.prompt("Reviewer invitation for " + s.id, "Reviewer's EMAIL address:", ui.ButtonSet.OK_CANCEL);
    if (r1.getSelectedButton() !== ui.Button.OK) return;
    const reviewerEmail = r1.getResponseText().trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(reviewerEmail)) throw new Error("That is not a valid email address.");

    const r2 = ui.prompt("Reviewer invitation", "Reviewer's NAME (e.g. Dr. A. Kumar):", ui.ButtonSet.OK_CANCEL);
    if (r2.getSelectedButton() !== ui.Button.OK) return;
    const reviewerName = r2.getResponseText().trim() || "Colleague";

    const ok = ui.alert("Confirm double-blind invitation",
      "The email will contain ONLY the title, article type, subject track, abstract and keywords - no author name, email or affiliation.\n\n" +
      "Please make sure the abstract itself does not name the authors or institution.\n\nSend to " + reviewerEmail + "?",
      ui.ButtonSet.YES_NO);
    if (ok !== ui.Button.YES) return;

    const body = emailShell_(
      "<p>Dear <strong>" + esc_(reviewerName) + "</strong>,</p>" +
      "<p>On behalf of <strong>" + esc_(CONFIG.JOURNAL_NAME) + "</strong>, I would be grateful if you would review the following manuscript under our <strong>double-blind</strong> peer review policy.</p>" +
      infoBox_([
        ["Reference", s.id],
        ["Title", s.title],
        ["Article Type", s.type],
        ["Subject Track", s.track],
        ["Keywords", s.keywords]
      ]) +
      "<p><strong>Abstract</strong></p><p style='font-size:13px;color:#334155;'>" + esc_(s.abstract).replace(/\n/g, "<br>") + "</p>" +
      "<p>We would be grateful for your review within about <strong>3 weeks</strong> of accepting; please tell us if you need more time. Please reply to this email with <strong>ACCEPT</strong> or <strong>DECLINE</strong>. " +
      "If you accept, the full anonymized manuscript and review form will be sent to you. Please decline if you have any competing interest with the work or its likely authors, " +
      "and treat all material as strictly confidential (COPE guidelines).</p>");

    sendMail_(reviewerEmail, "[Pharmionex Journal] Invitation to Review - " + s.id, body);
    logAudit_("REVIEWER_INVITED", s.id, reviewerName + " <" + reviewerEmail + ">");
    ui.alert("✅ Reviewer invitation sent to " + reviewerEmail + ".\nLogged in the AuditLog sheet.");
  } catch (err) {
    ui.alert("⚠️ " + err.message);
  }
}

/** Create a PDF acceptance letter, save it in the submission's Drive folder, optionally email it. */
function generateAcceptanceCertificate() {
  const ui = SpreadsheetApp.getUi();
  try {
    const s = getSelectedSubmission_();
    const ok = ui.alert("Issue acceptance letter?",
      "This formally records \"" + s.title + "\" (" + s.id + ") as ACCEPTED and sets its stage to 5.\n\nContinue?",
      ui.ButtonSet.YES_NO);
    if (ok !== ui.Button.YES) return;

    const tz = Session.getScriptTimeZone();
    const dateStr = Utilities.formatDate(new Date(), tz, "MMMM dd, yyyy");
    const html =
      "<html><body style='font-family:Georgia,serif;color:#1e293b;padding:40px;line-height:1.6;'>" +
      "<div style='text-align:center;border-bottom:3px solid #1e3a8a;padding-bottom:14px;margin-bottom:28px;'>" +
      "<div style='font-size:26px;font-weight:bold;color:#1e3a8a;'>PHARMIONEX JOURNAL</div>" +
      "<div style='font-size:12px;'>" + esc_(CONFIG.JOURNAL_SUBTITLE) + "</div>" +
      "<div style='font-size:11px;color:#64748b;'>ISSN Status: " + esc_(CONFIG.ISSN_STATUS) + "</div></div>" +
      "<p style='text-align:right;'>Date: " + dateStr + "<br>Ref: " + esc_(s.id) + "</p>" +
      "<p>To,<br><strong>" + esc_(s.author) + "</strong><br>" + esc_(s.affiliation) + "</p>" +
      "<p><strong>Subject: Letter of Acceptance for Publication</strong></p>" +
      "<p>Dear " + esc_(s.author) + ",</p>" +
      "<p>We are pleased to inform you that your manuscript entitled</p>" +
      "<p style='text-align:center;font-size:16px;'><strong>\"" + esc_(s.title) + "\"</strong></p>" +
      "<p>(" + esc_(s.type) + ", Subject Track: " + esc_(s.track) + ") has been <strong>accepted for publication</strong> in " +
      "<strong>" + esc_(CONFIG.JOURNAL_NAME) + "</strong>, Volume 1, Issue 1 (2026), following double-blind peer review and editorial evaluation.</p>" +
      "<p>The article will be published open access with no article processing charge. Further instructions regarding galley proofs will follow from the editorial office.</p>" +
      "<p>Congratulations, and thank you for choosing " + esc_(CONFIG.JOURNAL_NAME) + ".</p>" +
      "<p style='margin-top:48px;'>With best regards,<br><br><strong>" + esc_(CONFIG.EDITOR_IN_CHIEF) + "</strong><br>Editor-in-Chief & Publisher<br>" +
      esc_(CONFIG.JOURNAL_NAME) + "<br>" + esc_(CONFIG.EDITORIAL_EMAIL) + "</p>" +
      "</body></html>";

    const pdf = Utilities.newBlob(html, "text/html", "x.html").getAs("application/pdf")
      .setName("Acceptance_Letter_" + s.id + ".pdf");

    let folder;
    const m = String(s.folderUrl).match(/folders\/([a-zA-Z0-9_-]+)/);
    try { folder = m ? DriveApp.getFolderById(m[1]) : getOrCreateSubmissionsFolder(); }
    catch (fe) { folder = getOrCreateSubmissionsFolder(); }
    const file = folder.createFile(pdf);

    s.sheet.getRange(s.row, COL.STATUS).setValue("Accepted - letter issued " + dateStr);
    s.sheet.getRange(s.row, COL.STAGE).setValue(5);
    logAudit_("ACCEPTANCE_LETTER", s.id, file.getUrl());

    const mail = ui.alert("Letter saved to Drive",
      "Email the PDF to " + s.email + " now?", ui.ButtonSet.YES_NO);
    if (mail === ui.Button.YES) {
      MailApp.sendEmail({
        to: s.email,
        subject: "[Pharmionex Journal] Letter of Acceptance - " + s.id,
        htmlBody: emailShell_("<p>Dear <strong>" + esc_(s.author) + "</strong>,</p><p>Congratulations! Please find attached the official letter of acceptance for your manuscript <strong>" + esc_(s.title) + "</strong>.</p>"),
        attachments: [file.getAs(MimeType.PDF)],
        replyTo: CONFIG.EDITORIAL_EMAIL,
        name: "Pharmionex Journal Editorial Office"
      });
      logAudit_("ACCEPTANCE_EMAILED", s.id, s.email);
    }
    ui.alert("✅ Done.\n" + file.getUrl());
  } catch (err) {
    ui.alert("⚠️ " + err.message);
  }
}

/* ============================================================================
 * HELPERS
 * ========================================================================== */
function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function esc_(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function clip_(s, max) {
  return String(s == null ? "" : s).substring(0, max);
}

function safeName_(s) {
  return String(s || "").replace(/[\\\/:*?"<>|\r\n]/g, "_").trim().substring(0, 80) || "Unnamed";
}

function md5_(s) {
  return Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, s)
    .map(function (b) { return ("0" + (b < 0 ? b + 256 : b).toString(16)).slice(-2); }).join("");
}

/** Returns true when the counter for `key` has hit `max` within `seconds`. */
function rateLimited_(key, max, seconds) {
  const cache = CacheService.getScriptCache();
  const n = parseInt(cache.get(key) || "0", 10);
  if (n >= max) return true;
  cache.put(key, String(n + 1), seconds);
  return false;
}

function getSubmissionsSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(CONFIG.SUBMISSIONS_SHEET);
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SUBMISSIONS_SHEET);
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  }
  return sheet;
}

/** Row number (>=2) of a tracking ID, or 0 if absent. Case-insensitive. */
function findRowById_(sheet, id) {
  const last = sheet.getLastRow();
  if (last < 2) return 0;
  const ids = sheet.getRange(2, COL.ID, last - 1, 1).getValues();
  const want = String(id).trim().toUpperCase();
  for (let i = 0; i < ids.length; i++) {
    if (String(ids[i][0]).trim().toUpperCase() === want) return i + 2;
  }
  return 0;
}

/** Unguessable ID: PHARMIONEX-2026-K7QX4M (avoids look-alike characters). */
function newTrackingId_(sheet) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let id;
  do {
    let suffix = "";
    for (let i = 0; i < 6; i++) suffix += chars.charAt(Math.floor(Math.random() * chars.length));
    id = "PHARMIONEX-" + new Date().getFullYear() + "-" + suffix;
  } while (findRowById_(sheet, id));
  return id;
}

function saveUploadedFile_(folder, rawName, rawType, base64, allowedExt, bytesLeft, prefix) {
  try {
    const name = safeName_(rawName);
    const ext = (name.split(".").pop() || "").toLowerCase();
    if (allowedExt.indexOf(ext) === -1) return { ok: false, reason: name + " (file type ." + ext + " not allowed)" };
    const decoded = Utilities.base64Decode(base64);
    if (decoded.length > bytesLeft) return { ok: false, reason: name + " (size limit exceeded)" };
    const blob = Utilities.newBlob(decoded, rawType || MimeType.PDF, prefix + name);
    folder.createFile(blob);
    return { ok: true, bytes: decoded.length };
  } catch (err) {
    return { ok: false, reason: String(rawName) + " (could not be decoded)" };
  }
}

function logAudit_(action, trackingId, details) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let audit = ss.getSheetByName(CONFIG.AUDIT_SHEET);
  if (!audit) {
    audit = ss.insertSheet(CONFIG.AUDIT_SHEET);
    audit.getRange(1, 1, 1, 4).setValues([["Timestamp", "Action", "Tracking ID", "Details"]]);
  }
  audit.appendRow([new Date(), action, trackingId || "", clip_(details, 1000)]);
}

function getSelectedSubmission_() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  if (sheet.getName() !== CONFIG.SUBMISSIONS_SHEET) {
    throw new Error('Open the "' + CONFIG.SUBMISSIONS_SHEET + '" tab and click on a submission row first.');
  }
  const row = sheet.getActiveRange().getRow();
  if (row < 2) throw new Error("Click on a submission row (not the header row) first.");
  const v = sheet.getRange(row, 1, 1, HEADERS.length).getValues()[0];
  if (!v[COL.ID - 1]) throw new Error("The selected row is empty.");
  return {
    sheet: sheet, row: row,
    id: v[COL.ID - 1], type: v[COL.TYPE - 1], title: v[COL.TITLE - 1], track: v[COL.TRACK - 1],
    author: v[COL.AUTHOR - 1], email: v[COL.EMAIL - 1], affiliation: v[COL.AFFILIATION - 1],
    abstract: v[COL.ABSTRACT - 1], keywords: v[COL.KEYWORDS - 1], folderUrl: v[COL.FOLDER - 1],
    status: v[COL.STATUS - 1], stage: v[COL.STAGE - 1],
    assignedReviewers: v[COL.REVIEWERS - 1], editorRemarks: v[COL.REMARKS - 1], reviewerComments: v[COL.REVIEWER_COMMENTS - 1]
  };
}

function sendMail_(to, subject, htmlBody) {
  if (MailApp.getRemainingDailyQuota() < 1) throw new Error("Daily email quota reached. Try again tomorrow.");
  MailApp.sendEmail({
    to: to, subject: subject, htmlBody: htmlBody,
    replyTo: CONFIG.EDITORIAL_EMAIL, name: "Pharmionex Journal Editorial Office"
  });
}

function infoBox_(rows) {
  let h = "<div style='background:#f8fafc;border:1px solid #cbd5e1;border-left:4px solid #1e3a8a;border-radius:4px;padding:16px;margin:20px 0;'>";
  rows.forEach(function (r) {
    h += "<p style='margin:0 0 8px;'><strong>" + esc_(r[0]) + ":</strong> " + esc_(r[1]) + "</p>";
  });
  return h + "</div>";
}

function emailShell_(innerHtml) {
  return "<div style='font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#1e293b;line-height:1.6;'>" +
    "<div style='background:#1e3a8a;color:#ffffff;padding:20px;border-radius:6px 6px 0 0;text-align:center;'>" +
    "<h2 style='margin:0 0 6px;font-size:20px;'>PHARMIONEX JOURNAL</h2>" +
    "<p style='margin:0;font-size:13px;opacity:0.9;'>" + esc_(CONFIG.JOURNAL_SUBTITLE) + "</p></div>" +
    "<div style='padding:24px;border:1px solid #e2e8f0;border-top:none;background:#ffffff;'>" + innerHtml +
    "<hr style='border:none;border-top:1px solid #e2e8f0;margin:20px 0;'>" +
    "<p style='font-size:12px;color:#64748b;margin:0;'>With best regards,<br><strong>" + esc_(CONFIG.EDITOR_IN_CHIEF) +
    "</strong><br>Editor-in-Chief & Publisher<br><strong>" + esc_(CONFIG.JOURNAL_NAME) + "</strong><br>Email: <a href='mailto:" +
    CONFIG.EDITORIAL_EMAIL + "'>" + CONFIG.EDITORIAL_EMAIL + "</a> | Web: <a href='" + CONFIG.WEBSITE_URL + "'>" + CONFIG.WEBSITE_URL + "</a></p>" +
    "</div></div>";
}

function buildAckEmail_(authorName, title, articleType, track, subId) {
  return emailShell_(
    "<p>Dear <strong>" + esc_(authorName) + "</strong>,</p>" +
    "<p>Thank you for submitting your manuscript to <strong>Pharmionex Journal</strong> for the upcoming <strong>Inaugural Issue (Volume 1, Issue 1, 2026)</strong>. Your submission has been received and archived in the editorial repository.</p>" +
    "<div style='background:#f8fafc;border:1px solid #cbd5e1;border-left:4px solid #1e3a8a;border-radius:4px;padding:16px;margin:20px 0;'>" +
    "<p style='margin:0 0 8px;'><strong>Manuscript Title:</strong> " + esc_(title) + "</p>" +
    "<p style='margin:0 0 8px;'><strong>Article Category:</strong> " + esc_(articleType) + "</p>" +
    "<p style='margin:0 0 8px;'><strong>Subject Track:</strong> " + esc_(track) + "</p>" +
    "<p style='margin:0 0 8px;'><strong>Assigned Tracking ID:</strong> <span style='font-family:monospace;font-size:16px;font-weight:bold;color:#1e3a8a;'>" + esc_(subId) + "</span></p>" +
    "<p style='margin:0;'><strong>Initial Status:</strong> Stage 1 - Desk Review &amp; Plagiarism Check (&lt; 10% similarity)</p></div>" +
    "<p>You can track the progress of your manuscript at any time through our online portal:<br>" +
    "<a href='" + CONFIG.WEBSITE_URL + "#track' style='color:#0f766e;font-weight:bold;'>" + CONFIG.WEBSITE_URL + "#track</a></p>" +
    "<p><strong>Next steps in the double-blind peer review lifecycle:</strong></p>" +
    "<ol style='font-size:13px;color:#475569;padding-left:20px;'>" +
    "<li><strong>Initial Editorial Desk Review (target: about 1 week):</strong> scope, Author Guidelines compliance and similarity check.</li>" +
    "<li><strong>Double-Blind Peer Review (target: about 3 weeks):</strong> two independent external reviewers.</li>" +
    "<li><strong>Editorial Decision &amp; Revisions:</strong> acceptance, revision request or rejection. We aim to give a first decision within about 4-6 weeks, but this is a target and may take longer.</li>" +
    "<li><strong>Publication:</strong> accepted articles are planned for the inaugural issue (Volume 1, Issue 1), open access with zero APC.</li></ol>" +
    "<p style='margin-top:24px;font-size:12px;color:#64748b;'>This email confirms receipt only. It is not a decision on your manuscript. How we handle your data is explained in our <a href='" + CONFIG.WEBSITE_URL + "#privacy'>Privacy Policy</a>.</p>" +
    "<p style='margin-top:12px;font-size:13px;color:#64748b;'>To provide updated files or supplementary data, reply to this email or write to <a href='mailto:" +
    CONFIG.EDITORIAL_EMAIL + "'>" + CONFIG.EDITORIAL_EMAIL + "</a>.</p>");
}
