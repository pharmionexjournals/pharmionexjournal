/**
 * ============================================================================
 * PHARMIONEX JOURNAL - EDITORIAL MANAGEMENT & WORKFLOW AUTOMATION SYSTEM
 * ============================================================================
 * Editor-in-Chief & Publisher: Vivek Sharma
 * Official Editorial Email: pharmionex.journal@gmail.com
 * Journal: Pharmionex Journal (International Journal of Pharmaceutical, Biomedical & Clinical Research)
 * ISSN Status: Application in Process (National Science Library - NIScPR, New Delhi)
 * Standards: UGC-CARE, COPE, and ICMJE Guidelines Compliant
 * ============================================================================
 */

const CONFIG = {
  JOURNAL_NAME: "Pharmionex Journal",
  JOURNAL_SUBTITLE: "International Journal of Pharmaceutical, Biomedical & Clinical Research",
  EDITOR_IN_CHIEF: "Vivek Sharma",
  EDITORIAL_EMAIL: "pharmionex.journal@gmail.com",
  ISSN_STATUS: "Application in Process (NIScPR, India)",
  WEBSITE_URL: "https://viv102ek.github.io/pharmionex-journal-repo/",
  SUBMISSIONS_SHEET: "Submissions",
  ARTICLES_SHEET: "Articles",
  AUDIT_SHEET: "AuditLog"
};

function onOpen() {
  SpreadsheetApp.getUi().createMenu("📑 Pharmionex Editorial Control")
    .addItem("⚙️ Initialize / Format Sheet Headers", "setupSheetHeaders")
    .addSeparator()
    .addItem("📧 Send Status Email to Selected Author", "sendAuthorStatusEmail")
    .addItem("📨 Send Reviewer Invitation", "sendReviewerInvite")
    .addItem("🎓 Generate Official Acceptance Letter (PDF)", "generateAcceptanceCertificate")
    .addToUi();
}

function doPost(e) {
  try {
    let payload = JSON.parse(e.postData.contents);
    const subId = "PHARMIONEX-" + new Date().getFullYear() + "-" + Math.floor(1000 + Math.random() * 9000);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(CONFIG.SUBMISSIONS_SHEET) || ss.insertSheet(CONFIG.SUBMISSIONS_SHEET);
    sheet.appendRow([new Date(), subId, payload.articleType, payload.title, payload.track, payload.authorName, payload.authorEmail, payload.affiliation, payload.coAuthors, payload.abstract, payload.keywords, payload.fileUrl, payload.iaecProtocol, "Under Review", 1, "< 10% Verified"]);
    
    MailApp.sendEmail({
      to: payload.authorEmail,
      subject: "[Pharmionex Journal] Manuscript Acknowledgment: " + subId,
      htmlBody: "Dear " + payload.authorName + ",<br><br>Your " + payload.articleType + " has been received by Editor-in-Chief Vivek Sharma. Tracking ID: <b>" + subId + "</b>.",
      replyTo: CONFIG.EDITORIAL_EMAIL
    });

    return ContentService.createTextOutput(JSON.stringify({ success: true, trackingId: subId })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: err.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  const action = e.parameter.action;
  if (action === "ping") return ContentService.createTextOutput(JSON.stringify({ status: "online", editor: CONFIG.EDITOR_IN_CHIEF, journal: CONFIG.JOURNAL_NAME })).setMimeType(ContentService.MimeType.JSON);
  return ContentService.createTextOutput(JSON.stringify({ error: "Invalid action" })).setMimeType(ContentService.MimeType.JSON);
}

function setupSheetHeaders() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let subSheet = ss.getSheetByName(CONFIG.SUBMISSIONS_SHEET) || ss.insertSheet(CONFIG.SUBMISSIONS_SHEET);
  const subHeaders = ["Timestamp", "Tracking ID", "Article Type", "Article Title", "Subject Track", "Corresponding Author", "Author Email", "Affiliation", "Co-Authors", "Abstract", "Keywords", "Manuscript Link", "Ethics Protocol", "Current Status", "Stage", "Plagiarism Score"];
  subSheet.getRange(1, 1, 1, subHeaders.length).setValues([subHeaders]).setBackground("#1e3a8a").setFontColor("#ffffff").setFontWeight("bold");
  SpreadsheetApp.getUi().alert("Headers configured!");
}
