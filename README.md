# Pharmionex Research Journal

Static journal website with a live Google Forms intake, private editorial tracker, and Apps Script email/status automation.

## Live editorial system
- Submission form: https://docs.google.com/forms/d/e/1FAIpQLSfeNhcHdfcFAu_Z3MQY_lX_ju8lZXdai0CCKfW_jMNTN7yV7w/viewform
- Private tracker: available from the journal Google account. Do not publish its link or give access to unauthorized people.
- Editorial contact: pharmionex.journal@gmail.com

Authors use the public Form for manuscript metadata and declarations. For manuscript files, follow the Form instructions and share the restricted Drive folder directly with the journal account. The intake receipt confirms arrival only; editors make all screening, peer-review, ethics and publication decisions. The website does not host submissions or provide a secure manuscript portal.

The Apps Script source and operating instructions are in the private `automation/` folder. Do not run `setupPharmionex()` again on the live project. The existing system handles intake, acknowledgements, status notices, reviewer invitations, and capped reminders. The complete package adds a private editor Dashboard, unique reviewer-report collection, Editorial Cases log, and weekly tracker-only backups; these require the account owner to apply `Code.gs`, run `setupOperationalEnhancements_()`, authorize it, and deploy a new version. Follow `automation/SETUP.txt`. The live status-check web app returns only a general editorial stage and date after verifying the manuscript ID and private receipt code. The published-article list reads only approved release records. Acceptance creates a private production checklist; after the team publishes and verifies an article page and PDF and marks the release Published, the current-issue and archive lists update from approved metadata.

## Author and editorial resources
`downloads/` contains editable plain-text author/editor templates plus browser-readable `.htm` copies. The `.htm` files retain legacy download paths that older site links used; they also include a working link to the editable text file. Test these paths after upload and preserve the `downloads/` folder name and casing. The folder also contains the private go-live/first-publication checklist; completed copies must remain private.

The article template creates metadata-driven BibTeX, RIS, and JSON preparation exports. It refuses to export when the title, authors, or publication date still look like placeholders. The JSON packet is for editorial review and metadata handoff; it does not register a DOI or create a Crossref deposit. Update the citation meta tags and structured JSON-LD to match the final article before removing `noindex`.

The private Publication Checklist is a release gate with YES/NO validations, metadata/date/ORCID/DOI checks, and explicit declarations, references, accessibility, second-person review, and preservation-copy checks. The script rechecks the article when the editor changes any checklist cell. The published-article feed still exposes only records marked Published and Public listing approved = YES.

`publishing-information.html` records publisher, governance, fee, identifier, and preservation status without inventing pending legal details. `automation/SECURITY_RECOVERY_CHECKLIST.txt` is private. It covers owners, account controls, access review, backups, incident response, and restoration. The external preservation-service field stays pending until the journal actually enrols and deposits content.

Never upload the `automation/` folder, completed internal records, reviewer reports, or confidential manuscript files to this public website. Restrict access to the tracker and Drive folders. Avoid unnecessary personal or identifiable patient data, approve and apply a retention schedule, use account security features, and keep private backups. The automatic backup covers the tracker spreadsheet only, not manuscript folders or website files.

## Journal status
The journal is new and does not claim an assigned ISSN/DOI, external indexing, preservation service, or publication track record. Do not fabricate identifiers. DOI registration requires an active registration arrangement. Publisher details, board appointments, frequency, rights, and any policy not formally adopted must be confirmed before being presented as established.

## Website updates and publication
Publish the website files to the configured public website root, preserving the supplied folder and file names. Article HTML pages and PDFs are prepared and published manually. Once a real article has passed the private release checklist and is marked Published and listing-approved, Current Issue and Archives read the approved metadata from the live editorial feed. If the feed is temporarily unavailable, the pages use `published-articles.json`; only add a verified, released article there. Keep that public fallback file free of private editorial data. Each article must have a stable page, verified metadata, references, declarations, article history, and HTML/PDF full text before listing. Only add a DOI after registration is completed.

## Before accepting live submissions
Complete a test from a non-editor account. Confirm the Form is open to intended authors, the receipt and editor alert arrive, the tracker creates the expected row and ID, file access is restricted to the journal account, and status emails work. Remove the test record after verification. Ensure someone monitors the inbox and tracker, and clearly tell authors what is required for Drive access.
