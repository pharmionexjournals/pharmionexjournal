/** Pharmionex Journal Intake and Editorial Automation
 * Install this script in Apps Script while signed into pharmionex.journal@gmail.com.
 * Setup creates a Google Form, a private Google Sheet, and authorized triggers.
 */
const PX = {
  officeEmail: 'pharmionex.journal@gmail.com',
  title: 'Pharmionex Research Journal — Manuscript Intake',
  statuses: ['Received', 'Completeness check', 'Editor screening', 'Reviewer invitation', 'Under review', 'Revision requested', 'Decision recorded', 'Accepted', 'Rejected', 'Production', 'Published', 'Withdrawn', 'On hold']
};
const HEADERS = {
  Submissions: ['Manuscript ID','Received','Article type','Title','Author names','Affiliations','Corresponding author','Corresponding author email','ORCID iDs','Abstract','Keywords','Ethics approval / exemption','Consent statements','Trial registration','Funding','Conflicts of interest','Author contributions','Data availability','AI use disclosure','Reporting checklist','Suggested reviewers / exclusions','Manuscript / file link','Status','Handling editor','Decision','Revision due','Last status email','Last reminder','Revision reminders sent','Article URL','DOI (verified only)','Internal notes'],
  'Reviewer Pool': ['Reviewer name','Email','Affiliation','Expertise','Conflict notes','Last verified','Status'],
  'Review Queue': ['Manuscript ID','Title','Reviewer name','Reviewer email','Blinded manuscript link','Invitation status','Review due','Last reminder','Reminders sent','Conflict declared','Review received'],
  'Publication Checklist': ['Manuscript ID','Title','Authors / affiliations verified','Final proof approved','References / links checked','Ethics / declarations checked','Rights / licence confirmed','Metadata checked','HTML final','PDF final','Publication date','Article URL','DOI (verified only)','Approved to publish','Notes','Publication status']
};
const FORM_FIELDS = [
  ['Article type','list',['Original research','Review','Systematic review / meta-analysis','Case report','Brief communication','Methodology / technical note','Other'],true],
  ['Manuscript title','text',null,true],['Author names and order','paragraph',null,true],['Author affiliations','paragraph',null,true],
  ['Corresponding author name','text',null,true],['Corresponding author email','text',null,true],['ORCID iDs (name — full ORCID URL)','paragraph',null,false],
  ['Abstract','paragraph',null,true],['Keywords','text',null,true],['Ethics approval / exemption statement','paragraph',null,true],
  ['Consent to participate / publish statement','paragraph',null,true],['Clinical trial registration (or not applicable)','text',null,true],
  ['Funding and funder role (or none)','paragraph',null,true],['Competing interests (or none)','paragraph',null,true],
  ['Author contributions (CRediT roles preferred)','paragraph',null,true],['Data availability statement','paragraph',null,true],
  ['Generative AI use disclosure (or none)','paragraph',null,true],['Reporting guideline and checklist (or not applicable)','text',null,true],
  ['Suggested reviewers and anyone to exclude (with reasons)','paragraph',null,false],
  ['Manuscript / file link','text',null,true],
  ['Author confirmation','checkbox',['All authors approve this submission; it is not under consideration elsewhere; statements are accurate; and the manuscript contains no unnecessary identifiable patient information.'],true]
];

function setupPharmionex() {
  const props = PropertiesService.getScriptProperties();
  if (props.getProperty('PX_SHEET_ID')) throw new Error('Setup already ran. See README; do not rerun to avoid duplicate Form/Sheet creation.');
  const ss = SpreadsheetApp.create('Pharmionex Editorial Office — Private');
  const subs = ss.getSheets()[0]; subs.setName('Submissions');
  Object.keys(HEADERS).forEach(name => {
    const sh = name === 'Submissions' ? subs : ss.insertSheet(name);
    sh.getRange(1,1,1,HEADERS[name].length).setValues([HEADERS[name]]).setFontWeight('bold').setWrap(true);
    sh.setFrozenRows(1); sh.autoResizeColumns(1, HEADERS[name].length);
  });
  const statusCol = HEADERS.Submissions.indexOf('Status') + 1;
  const statusRule = SpreadsheetApp.newDataValidation().requireValueInList(PX.statuses, true).setAllowInvalid(false).build();
  subs.getRange(2,statusCol,1000,1).setDataValidation(statusRule);
  const queue = ss.getSheetByName('Review Queue');
  const qStatus = SpreadsheetApp.newDataValidation().requireValueInList(['Draft','READY','Invitation sent','Accepted','Declined','Review received','Closed'],true).setAllowInvalid(false).build();
  queue.getRange(2,6,1000,1).setDataValidation(qStatus);
  const form = FormApp.create(PX.title);
  form.setDescription('Submit a manuscript to Pharmionex Research Journal. Complete all required declarations. For file access, share the manuscript folder with pharmionex.journal@gmail.com and paste its link. Do not use public link sharing. File links should contain an editable manuscript, a separate title page for blinded review, figures/supplements, and applicable reporting checklist. Do not include unnecessary sensitive or identifiable patient information.');
  FORM_FIELDS.forEach(([label,type,choices,required]) => {
    let item;
    if (type === 'list') item = form.addListItem().setChoiceValues(choices);
    else if (type === 'paragraph') item = form.addParagraphTextItem();
    else if (type === 'checkbox') item = form.addCheckboxItem().setChoiceValues(choices);
    else item = form.addTextItem();
    item.setTitle(label).setRequired(required);
  });
  form.setConfirmationMessage('Thank you. Your submission has been received for an initial completeness check. Receipt does not mean the manuscript has been sent for review or accepted. The editorial office will email you.');
  form.setAcceptingResponses(true);
  props.setProperties({PX_SHEET_ID:ss.getId(), PX_FORM_ID:form.getId()});
  installPharmionexTriggers();
  MailApp.sendEmail(PX.officeEmail,'Pharmionex intake system created','Your intake form and private tracker are ready. Form: '+form.getPublishedUrl()+'\nEditor link: '+ss.getUrl()+'\n\nRestrict the tracker to the editorial team. Test the form with a dummy submission before publishing its link.');
  Logger.log('FORM: '+form.getPublishedUrl()); Logger.log('TRACKER: '+ss.getUrl());
}

function installPharmionexTriggers() {
  const props = PropertiesService.getScriptProperties();
  const formId = props.getProperty('PX_FORM_ID'), sheetId = props.getProperty('PX_SHEET_ID');
  if (!formId || !sheetId) throw new Error('Run setupPharmionex() first.');
  ScriptApp.getProjectTriggers().filter(t => ['onPharmionexSubmission','onPharmionexEdit','sendPharmionexReminders'].includes(t.getHandlerFunction())).forEach(t => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger('onPharmionexSubmission').forForm(FormApp.openById(formId)).onFormSubmit().create();
  ScriptApp.newTrigger('onPharmionexEdit').forSpreadsheet(SpreadsheetApp.openById(sheetId)).onEdit().create();
  ScriptApp.newTrigger('sendPharmionexReminders').timeBased().everyDays(1).atHour(9).create();
}

function onPharmionexSubmission(e) {
  const lock = LockService.getScriptLock(); lock.waitLock(30000);
  try {
    const ss = SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty('PX_SHEET_ID'));
    const sh = ss.getSheetByName('Submissions');
    const answers = {};
    e.response.getItemResponses().forEach(r => answers[r.getItem().getTitle()] = Array.isArray(r.getResponse()) ? r.getResponse().join('; ') : String(r.getResponse() || ''));
    const id = nextManuscriptId_();
    const row = {
      'Manuscript ID':id,'Received':e.response.getTimestamp(),'Article type':answers['Article type'], 'Title':answers['Manuscript title'],
      'Author names':answers['Author names and order'],'Affiliations':answers['Author affiliations'],'Corresponding author':answers['Corresponding author name'],
      'Corresponding author email':answers['Corresponding author email'],'ORCID iDs':answers['ORCID iDs (name — full ORCID URL)'],'Abstract':answers['Abstract'],
      'Keywords':answers['Keywords'],'Ethics approval / exemption':answers['Ethics approval / exemption statement'],'Consent statements':answers['Consent to participate / publish statement'],
      'Trial registration':answers['Clinical trial registration (or not applicable)'],'Funding':answers['Funding and funder role (or none)'],'Conflicts of interest':answers['Competing interests (or none)'],
      'Author contributions':answers['Author contributions (CRediT roles preferred)'],'Data availability':answers['Data availability statement'],'AI use disclosure':answers['Generative AI use disclosure (or none)'],
      'Reporting checklist':answers['Reporting guideline and checklist (or not applicable)'],'Suggested reviewers / exclusions':answers['Suggested reviewers and anyone to exclude (with reasons)'],
      'Manuscript / file link':answers['Manuscript / file link'],'Status':'Received','Last status email':'Received'
    };
    appendObject_(sh, HEADERS.Submissions, row);
    const author = row['Corresponding author email'];
    if (validEmail_(author)) MailApp.sendEmail(author,'Pharmionex submission received — '+id,
      'Dear '+(row['Corresponding author'] || 'Author')+',\n\nWe received “'+row.Title+'” ('+id+') on '+Utilities.formatDate(row.Received,Session.getScriptTimeZone(),'dd MMM yyyy')+'. It will undergo a completeness and editorial screening check. Receipt is not a commitment to peer review or publication.\n\nPlease keep this ID in correspondence.\n\nPharmionex Editorial Office\n'+PX.officeEmail);
    MailApp.sendEmail(PX.officeEmail,'New Pharmionex manuscript — '+id,
      'New submission received.\nID: '+id+'\nTitle: '+row.Title+'\nType: '+row['Article type']+'\nCorresponding author: '+row['Corresponding author']+' ('+author+')\nTracker: '+ss.getUrl()+'\n\nReview file access before proceeding.');
  } finally { lock.releaseLock(); }
}

function onPharmionexEdit(e) {
  if (!e || !e.range || e.range.getRow() < 2) return;
  const sh=e.range.getSheet(), rowNum=e.range.getRow(), headers=HEADERS[sh.getName()];
  if (!headers) return;
  const colName=headers[e.range.getColumn()-1];
  if (sh.getName()==='Submissions' && colName==='Status') sendStatusUpdate_(sh,rowNum);
  if (sh.getName()==='Review Queue' && colName==='Invitation status' && e.value==='READY') sendReviewerInvitation_(sh,rowNum);
  if (sh.getName()==='Publication Checklist' && colName==='Approved to publish' && String(e.value).toUpperCase()==='YES') checkPublicationReady_(sh,rowNum);
}

function sendStatusUpdate_(sh,rowNum) {
  const row=readRow_(sh,rowNum,HEADERS.Submissions), status=row.Status, email=row['Corresponding author email'];
  if (!validEmail_(email) || !status) return;
  const sentCol=HEADERS.Submissions.indexOf('Last status email')+1;
  if (String(sh.getRange(rowNum,sentCol).getValue())===String(status)) return;
  const decisionNote = status==='Decision recorded' ? '\nThe handling editor will send the formal decision and reviewer comments separately.' : '';
  const body='Dear '+(row['Corresponding author']||'Author')+',\n\nThe status of manuscript '+row['Manuscript ID']+' (“'+row.Title+'”) has been updated to: '+status+'.'+decisionNote+'\n\nFor correspondence, include the manuscript ID.\n\nPharmionex Editorial Office\n'+PX.officeEmail;
  MailApp.sendEmail(email,'Pharmionex status update — '+row['Manuscript ID'],body);
  sh.getRange(rowNum,sentCol).setValue(status);
}

function sendReviewerInvitation_(sh,rowNum) {
  const row=readRow_(sh,rowNum,HEADERS['Review Queue']);
  if (!validEmail_(row['Reviewer email']) || !row['Manuscript ID'] || !row['Blinded manuscript link']) {
    sh.getRange(rowNum,6).setValue('Draft — missing email, manuscript ID, or file link'); return;
  }
  const due=row['Review due'] ? Utilities.formatDate(new Date(row['Review due']),Session.getScriptTimeZone(),'dd MMM yyyy') : '[insert review due date]';
  const body='Dear '+(row['Reviewer name']||'Colleague')+',\n\nWould you be available to review manuscript '+row['Manuscript ID']+' (“'+row.Title+'”) for Pharmionex Research Journal? Please reply to this message to accept or decline. If you accept, please return your review by '+due+'.\n\nThe manuscript and review are confidential. Please disclose any competing interest and decline if you cannot provide an impartial assessment. Do not share, upload to third-party tools, or use the manuscript for any purpose beyond this review. Do not contact the authors directly.\n\nBlinded manuscript: '+row['Blinded manuscript link']+'\n\nPharmionex Editorial Office\n'+PX.officeEmail;
  MailApp.sendEmail(row['Reviewer email'],'Review invitation — Pharmionex manuscript '+row['Manuscript ID'],body);
  sh.getRange(rowNum,6).setValue('Invitation sent');
}

function sendPharmionexReminders() {
  const ss=SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty('PX_SHEET_ID'));
  const today=new Date(); today.setHours(0,0,0,0);
  const q=ss.getSheetByName('Review Queue');
  if(q.getLastRow()>1) {
    const rows=q.getRange(2,1,q.getLastRow()-1,HEADERS['Review Queue'].length).getValues();
    rows.forEach((v,i)=>{
      const rowNum=i+2, status=v[5], due=v[6], last=v[7], count=Number(v[8]||0), email=v[3];
      if (!validEmail_(email) || !(status==='Invitation sent'||status==='Accepted') || !(due instanceof Date)) return;
      const days=(today-new Date(due.getFullYear(),due.getMonth(),due.getDate()))/86400000;
      const daysSince=last instanceof Date ? (today-new Date(last.getFullYear(),last.getMonth(),last.getDate()))/86400000 : 99;
      if(days>=0 && daysSince>=4 && count<2) {
        MailApp.sendEmail(email,'Review reminder — Pharmionex manuscript '+v[0],'Dear '+(v[2]||'Reviewer')+',\n\nA reminder that the review of manuscript '+v[0]+' (“'+v[1]+'”) was due on '+Utilities.formatDate(due,Session.getScriptTimeZone(),'dd MMM yyyy')+'. Please reply to confirm whether you can complete it, or let us know if you need to decline or request an extension.\n\nPharmionex Editorial Office\n'+PX.officeEmail);
        q.getRange(rowNum,8).setValue(today); q.getRange(rowNum,9).setValue(count+1);
      }
    });
  }
  const s=ss.getSheetByName('Submissions');
  if(s.getLastRow()>1) {
    const rows=s.getRange(2,1,s.getLastRow()-1,HEADERS.Submissions.length).getValues();
    rows.forEach((v,i)=>{
      const rowNum=i+2, status=v[HEADERS.Submissions.indexOf('Status')], due=v[HEADERS.Submissions.indexOf('Revision due')], email=v[HEADERS.Submissions.indexOf('Corresponding author email')], last=v[HEADERS.Submissions.indexOf('Last reminder')], count=Number(v[HEADERS.Submissions.indexOf('Revision reminders sent')]||0);
      if(status!=='Revision requested'||!validEmail_(email)||!(due instanceof Date)) return;
      const days=(new Date(due.getFullYear(),due.getMonth(),due.getDate())-today)/86400000;
      const daysSince=last instanceof Date ? (today-new Date(last.getFullYear(),last.getMonth(),last.getDate()))/86400000 : 99;
      if(days>=0&&days<=3&&daysSince>=4&&count<2) {
        MailApp.sendEmail(email,'Revision deadline reminder — Pharmionex manuscript '+v[0],'Dear '+(v[6]||'Author')+',\n\nA reminder that the revision for manuscript '+v[0]+' (“'+v[3]+'”) is due on '+Utilities.formatDate(due,Session.getScriptTimeZone(),'dd MMM yyyy')+'. Please contact the editorial office if you need to discuss the deadline.\n\nPharmionex Editorial Office\n'+PX.officeEmail);
        s.getRange(rowNum,HEADERS.Submissions.indexOf('Last reminder')+1).setValue(today); s.getRange(rowNum,HEADERS.Submissions.indexOf('Revision reminders sent')+1).setValue(count+1);
      }
    });
  }
}

function checkPublicationReady_(sh,rowNum) {
  const row=readRow_(sh,rowNum,HEADERS['Publication Checklist']);
  const required=['Authors / affiliations verified','Final proof approved','References / links checked','Ethics / declarations checked','Rights / licence confirmed','Metadata checked','HTML final','PDF final'];
  const missing=required.filter(k=>String(row[k]).toUpperCase()!=='YES');
  const statusCol=HEADERS['Publication Checklist'].indexOf('Publication status')+1;
  if(missing.length || !row['Article URL'] || !row['Publication date']) {
    sh.getRange(rowNum,statusCol).setValue('Not ready — complete checklist, date, and article URL'); return;
  }
  sh.getRange(rowNum,statusCol).setValue('Ready for manual release');
  MailApp.sendEmail(PX.officeEmail,'Article ready for release — '+row['Manuscript ID'],
    'The production checklist is complete for '+row['Manuscript ID']+' (“'+row.Title+'”). The article page and PDF still need to be published to the journal website.\n\nArticle URL: '+row['Article URL']+'\n\nThis script does not publish to GitHub Pages or register DOIs automatically.');
}

function nextManuscriptId_() {
  const props=PropertiesService.getScriptProperties(), year=String(new Date().getFullYear()), key='PX_SEQ_'+year;
  const n=Number(props.getProperty(key)||0)+1; props.setProperty(key,String(n));
  return 'PX-'+year+'-'+String(n).padStart(4,'0');
}
function appendObject_(sh,headers,obj) { sh.appendRow(headers.map(h=>obj[h]===undefined?'':obj[h])); }
function readRow_(sh,rowNum,headers) { const vals=sh.getRange(rowNum,1,1,headers.length).getValues()[0], out={}; headers.forEach((h,i)=>out[h]=vals[i]); return out; }
function validEmail_(s) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(s||'')); }




