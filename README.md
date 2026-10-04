# Journal Article Builder & Manuscript Submission System

A modern, responsive, zero-dependency web application designed for academic journals, publishers, and scientific conferences. It provides authors with a structured environment to author articles section-by-section and submit complete manuscript packages.

[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-blue.svg)](https://pages.github.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Tech: Vanilla JS](https://img.shields.io/badge/Tech-HTML5%20%7C%20CSS3%20%7C%20ES6-green.svg)]()

---

## 🌟 Core Features

### 1. Bibliographic Metadata & Author Hierarchy
- Article metadata fields: Title, Publication Track/Category (Research, Review, Short Communication, Methodology, Case Study), Abstract, Keywords.
- Dynamic author management: Add/remove co-authors, institutional affiliations, country, ORCID iD, and designation of the Corresponding Author.

### 2. Interactive Article Builder (IMRAD Architecture)
- Built around standard scientific journal sections:
  - **1. Introduction**
  - **2. Materials & Methods**
  - **3. Results**
  - **4. Discussion**
  - **5. Conclusion**
  - **Custom Sections**: Authors can add any number of additional sections.
- Rich-text formatting toolbar: Bold, Italic, Underline, Bulleted/Numbered Lists, Table Generator, Formula/Equation formatting, and Reference Citation markers (`[#]`).
- Integrated bibliography and reference management with automated numbering.

### 3. Manuscript File Upload Form
- Drag-and-drop & file picker upload zone supporting:
  - **Primary Manuscript**: `.pdf`, `.docx`, `.doc`, `.tex`, `.zip` (up to 50 MB)
  - **Supplementary Files**: Data spreadsheets (`.xlsx`, `.csv`), ZIP archives, high-resolution figures (`.png`, `.jpg`, `.tif`).
- Real-time client-side file validation and file removal.

### 4. Ethics, Disclosures & Compliance
- Standard ICMJE/COPE declarations:
  - Funding and grant disclosures.
  - Conflict of interest (COI) statements.
  - Data availability statements.
  - Mandatory confirmation checkboxes for originality, co-author consensus, and CC BY 4.0 copyright agreement.

### 5. Live Journal Preview, Auto-Save & Submission Receipt
- Real-time academic journal preview with 1-column or 2-column layout toggle.
- Print-to-PDF support with specialized `@media print` typography.
- Automatic draft saving to browser `localStorage` every 20 seconds.
- JSON draft export and import functionality.
- Formal submission confirmation dialog with unique tracking ID (`JAST-YYYY-XXXX`) and downloadable text receipt.

---

## 📁 Repository Structure

```text
journal-article-builder/
├── index.html                 # Main standalone single-page application
├── README.md                  # Project documentation & setup instructions
├── LICENSE                    # MIT open-source license
├── .gitignore                 # Standard git ignore definitions
└── .github/
    └── workflows/
        └── pages.yml          # Automated GitHub Pages deployment workflow
```

---

## 🚀 How to Run Locally

1. Clone or download this repository:
   ```bash
   git clone https://github.com/YOUR-USERNAME/journal-article-builder.git
   cd journal-article-builder
   ```
2. Open `index.html` directly in any web browser (Google Chrome, Firefox, Safari, Microsoft Edge).
3. No build tools, Node.js packages, or external CDN dependencies are required.

---

## 🌐 Deploy to GitHub Pages (Free Hosting)

You can host this application live for free on GitHub Pages:
1. Push this repository to GitHub.
2. Go to your repository's **Settings** tab.
3. In the left sidebar, click **Pages**.
4. Under **Build and deployment** > **Branch**, select `main` (or `master`) branch and folder `/ (root)`.
5. Click **Save**. Your portal will be live at `https://<your-username>.github.io/<repo-name>/`.

---

## 🔌 Backend Integration

To connect the submission form to your own backend API (Python Flask/Django, Node.js, Express, PHP, etc.):
1. Open `index.html`.
2. Locate the function `submitArticleToJournal()` in the `<script>` section.
3. Replace the `console.log("Journal Manuscript Submission Payload:", ...)` statement with an HTTP `fetch` request:
   ```javascript
   fetch("/api/submissions", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify(payload)
   })
   .then(res => res.json())
   .then(data => {
     // Handle success
   });
   ```

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
