# Publishing an accepted article on the website

Articles show up on the **Articles** tab (and the 3 newest on the Home page) automatically.
The site reads one file: `published-articles.json`. While `"articles": []` is empty, the site
shows "No articles have been published yet". Nothing is invented or pre-filled.

## Before you touch the JSON: from acceptance to PDF
1. Send the author the final accepted version and ask for any last corrections.
2. Typeset the article into the journal's PDF (a Word or LaTeX template with the journal name, volume, issue, article type, authors, affiliations, received/accepted/published dates, licence line CC BY 4.0, and the citation).
3. Send the author the proof and wait for sign-off.
4. Decide on a DOI. Do not show one until it is really registered (for example through Crossref or Zenodo). Until then, leave `doi` out.
5. Keep a copy of the final PDF and the acceptance email in Drive.

## Steps (about 2 minutes per article)
1. Make sure the article is accepted, edited, and approved for release.
2. Copy the final PDF into the `articles/` folder, e.g. `articles/2026-sharma-lipid-carriers.pdf`.
3. Add an entry to `published-articles.json`:

```json
{
  "articles": [
    {
      "id": "2026-sharma-lipid-carriers",
      "title": "Full article title",
      "authors": "A. Author, B. Author, C. Author",
      "type": "Original Research Article",
      "track": "Pharmaceutics & Targeted Drug Delivery",
      "date": "2026-11-15",
      "abstract": "Full abstract text.",
      "keywords": "keyword one; keyword two; keyword three",
      "pdf": "articles/2026-sharma-lipid-carriers.pdf"
    }
  ]
}
```
   - Required: `title`, `authors`, `date` (YYYY-MM-DD). Everything else is optional.
   - `type` / `track` should match the names in the site filters so filtering works.
   - `pdf` must be `articles/...` or an `https://` link. `url` (optional) links to a full-text page.
   - Add `doi` (like `10.xxxx/xxxxx`) **only** after a DOI has really been registered. Never invent one.
   - Add a comma between entries, and keep the JSON valid (check it at jsonlint.com).
4. Commit and push. GitHub Pages updates in about a minute. Refresh the site to see it.

## Notes
- The newest article (by `date`) appears first. Visitors can search by title, author, keyword or abstract.
- Keep only approved, public information in this file. It is public.
- For Google Scholar to index individual articles later, each article needs its own web page with
  citation metadata. Ask for that when you have your first published article.
