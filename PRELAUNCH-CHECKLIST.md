# Pharmionex Journal: pre-launch checklist

Work through this before any public call for papers. Items marked **(you)** cannot be done in code.

## A. Real submission test (you)
1. Copy the latest `google_apps_script/Code.gs` into the Apps Script project.
2. **Deploy > Manage deployments > Edit > New version > Deploy.** Saving the file alone does not update the live web app. Keep the same Web App URL, or update `GOOGLE_APPS_SCRIPT_URL` in `script.js`.
3. Run `setupSheetHeaders` once if the sheet is new.
4. From a **different device or browser**, open the live site and submit a real test article with a real file attached.
5. Confirm all four, and tick them off:
   - [ ] A new author subfolder with the manuscript appears in Google Drive
   - [ ] A new row appears in the Google Sheet with the same Tracking ID
   - [ ] The author confirmation email arrives (check spam too) and its links open `#track` and `#privacy`
   - [ ] On a third device that never submitted, the **Track Article** page finds the Tracking ID
6. In the Sheet, change the Stage (1-6) and Status of the test row, then reload the Track page and confirm it updates.
7. Delete the test row and folder.

## B. Reviewers (you)
- [ ] 4-6 reviewers have said yes in writing (see `REVIEWER-INVITATION.md`)
- [ ] Each has declared no conflict with the first batch of submissions
- [ ] You have a reviewer form or checklist ready to send with the anonymised manuscript

## C. Similarity checking (you)
- [ ] Tool or manual process chosen (see `SIMILARITY-CHECK-PROCESS.md`)
- [ ] You have run it on one test document and know where to record the result

## D. Policy numbers (you)
The site currently says:
- Appeals within **30 days**
- Complaints acknowledged within **7 days**
- First decision target **about 4-6 weeks**; reviewers asked for about **3 weeks**

Keep them only if you can honestly meet them. If not, edit them in `index.html` (Editorial Board & Policies and workflow steps) and `Code.gs` (acknowledgement and reviewer emails).

## E. Credibility (you)
- [ ] 5-8 editorial board members confirmed, with name, affiliation, country, ORCID or Scholar link. Add them on the Editorial Board & Policies page.
- [ ] ISSN application submitted. Add it to the page once issued.
- [ ] A journal email address on your own domain, if you can get one
- [ ] 5-10 invited papers lined up for the first issue (see `SOFT-LAUNCH-INVITATION.md`)

## F. Publishing the first articles (you)
See `PUBLISHING.md`: typeset, assign a DOI only if you really register one, add to `published-articles.json`.

## G. Privacy and terms
- [x] Privacy Policy and Terms of Use pages added to the site
- [ ] Have someone with legal knowledge read them once. They are a sensible starting draft, not legal advice.
