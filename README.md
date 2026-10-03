# Pharmionex Research Journal

Static journal website with a live Google Forms intake, private editorial tracker, and Apps Script email/status automation.

## Live editorial system
- Submission form: https://docs.google.com/forms/d/e/1FAIpQLSfeNhcHdfcFAu_Z3MQY_lX_ju8lZXdai0CCKfW_jMNTN7yV7w/viewform
- Private tracker: available from the journal Google account. Do not publish its link or give access to unauthorized people.
- Editorial contact: pharmionex.journal@gmail.com

Authors use the public Form for manuscript metadata and declarations. For manuscript files, follow the Form instructions and share the restricted Drive folder directly with the journal account. The intake receipt confirms arrival only; editors make all screening, peer-review, ethics and publication decisions. The website does not host submissions or provide a secure manuscript portal.

The Apps Script project is in `automation/Code.gs`; `automation/SETUP.txt` describes the already-installed system and operating procedures. Do not run `setupPharmionex()` again on the live project. It has already created the live Form, private tracker, and triggers. The script handles intake records, email acknowledgements and alerts, selected status messages, reviewer invitations, and limited reminders. It does not make scholarly decisions or publish articles to the static site.

## Author and editorial resources
`downloads/` contains the manuscript template, submission checklist, cover-letter template, reviewer invitation, revision response, blank tracker template, and private go-live/first-publication checklist. Public pages cover author requirements, reporting checklists, peer review, reviewer instructions, ethics and publication policies, editorial workflow, article metadata, and journal status.

Never upload completed internal records, reviewer reports, or confidential manuscript files to this public website. Restrict access to the tracker and Drive folders. Avoid unnecessary personal or identifiable patient data, set a retention schedule, use account security features, and keep periodic private backups.

## Journal status
The journal is new and does not claim an assigned ISSN/DOI, external indexing, preservation service, or publication track record. Do not fabricate identifiers. DOI registration requires an active registration arrangement. Publisher details, board appointments, frequency, rights, and any policy not formally adopted must be confirmed before being presented as established.

## Hosting and publication
Publish the site files from the repository root on the existing GitHub Pages setup. This site is static; article pages and PDFs must be prepared and published manually. Each article should have a stable page, verified metadata, references, declarations, article history, and a PDF/HTML full text before release. Only add a DOI after registration is real and completed.

## Before accepting live submissions
Complete a test from a non-editor account. Confirm the Form is open to intended authors, the receipt and editor alert arrive, the tracker creates the expected row and ID, file access is restricted to the journal account, and status emails work. Remove the test record after verification. Ensure someone monitors the inbox and tracker, and clearly tell authors what is required for Drive access.
