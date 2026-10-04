# Pharmionex Journal - Author Portal & Manuscript Submission System

A modern, responsive, zero-dependency web application custom-built for **Pharmionex Journal** (*International Journal of Pharmaceutical & Biomedical Sciences*). It features the official **Pharmionex** vector brand identity, an interactive article builder, integrated scholarly literature search tools, manuscript file upload zones, ethical compliance forms, and a live academic journal preview.

[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-blue.svg)](https://pages.github.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Tech: Vanilla JS](https://img.shields.io/badge/Tech-HTML5%20%7C%20CSS3%20%7C%20ES6-green.svg)]()

---

## 🧬 Pharmionex Brand Identity & Journal Profile

- **Journal Name**: **Pharmionex Journal**
- **Brand Identity**: Features the custom Pharmionex molecular orbital and hexagonal vector logo (embedded in SVG format for high-DPI screens, mobile devices, and print).
- **Short / ISO Title**: *Pharmionex J.*
- **Scope & Focus**: Pharmaceutical formulation, drug delivery systems, analytical chemistry (HPLC, TLC, UV-Vis, chromatography), pharmacovigilance, molecular biotechnology, oncology nutrition, GMP/WHO Schedule M regulatory quality assurance, and clinical research.
- **Identifiers**:
  - **Electronic ISSN (e-ISSN)**: `2835-7191`
  - **Print ISSN (p-ISSN)**: `2835-7183`
  - **Crossref DOI Prefix**: `10.59234/pharmionex`
- **Publishing Model**: Gold Open Access under [Creative Commons Attribution (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/)
- **Publication Cadence**: Monthly (12 issues per volume/year)
- **Peer Review**: Double-Blind Peer Review (rigorous independent review, average 21 days to initial decision)
- **Indexing & Abstracting**: PubMed/MEDLINE, Crossref, Scopus, DOAJ, Web of Science (ESCI), Google Scholar
- **Editorial Office**: `submissions@pharmionex.org` / `editorial@pharmionex.org`

---

## 🌟 Comprehensive Features

### 1. Bibliographic Metadata & Author Hierarchy
- Article metadata fields: Title, Publication Track/Category (Original Research, Comprehensive Review, Short Communication, Methodology, Case Study), Abstract (with live word counter), and Keywords.
- Dynamic author management: Add/remove co-authors, assign affiliations, country, ORCID iD, and toggle the Corresponding Author.

### 2. Interactive Article Builder (IMRAD Structure)
- Structured standard scientific sections:
  - **1. Introduction**
  - **2. Materials & Methods**
  - **3. Results**
  - **4. Discussion**
  - **5. Conclusion**
  - **Custom Sections**: Dynamically add and title new sections.
- Rich-text editing toolbar: Bold, Italic, Underline, Bulleted/Numbered Lists, Table Generator, Formula/Equation formatting, and in-text Reference Citation markers (`[#]`).
- Quick Literature Search button embedded in each section's toolbar for instant citation insertion.

### 3. Integrated Researcher & Literature Search Tools
- **Scholarly Literature Search Engine**: Search indexed academic articles across PubMed, Crossref, arXiv, and DOAJ with database and publication year filters.
- **One-Click In-Text Citation & Bibliography Inserter**: Direct action buttons to insert citations (`<sup>[#]</sup>`) directly into the active editor section and append formatted references to the bibliography.
- **DOI Citation Resolver**: Paste any Digital Object Identifier (DOI) and generate citations formatted in Vancouver, APA 7th, IEEE, Harvard, or MLA 9th.
- **Keywords & MeSH Taxonomy Explorer**: Extract standardized Medical Subject Headings (MeSH) and domain indexing terms from research concepts or abstracts.
- **Manuscript Readability & Scholarly Metrics Analyzer**: Real-time evaluation of Flesch Reading Ease, sentence complexity, academic vocabulary density, and estimated reading time.
- **BibTeX & Bulk Citation Importer**: Automatically parse `@article{...}` or `@book{...}` BibTeX entries into standard journal reference formats.

### 4. Manuscript File Upload Form
- Drag-and-drop & file picker upload zone supporting:
  - **Primary Manuscript**: `.pdf`, `.docx`, `.doc`, `.tex`, `.zip` (up to 50 MB)
  - **Supplementary Files**: Data spreadsheets (`.xlsx`, `.csv`), ZIP archives, high-resolution figures (`.png`, `.jpg`, `.tif`).
- Real-time client-side file validation, size formatting, and file removal.

### 5. Ethics, Disclosures & Compliance
- Standard ICMJE and COPE declarations:
  - Funding and grant disclosures.
  - Conflict of interest (COI) statements.
  - Data availability statements.
  - Mandatory confirmation checkboxes for originality, authorship consensus, and CC BY 4.0 copyright agreement.

### 6. Live Journal Preview, Auto-Save & Submission Receipt
- Real-time academic journal preview with 1-column or 2-column layout toggle.
- Print-to-PDF support with specialized `@media print` styling and branded Pharmionex header.
- Automatic draft saving to browser `localStorage` every 20 seconds.
- JSON draft export and import functionality.
- Formal submission confirmation dialog with unique tracking ID (`PHARMIONEX-YYYY-XXXX`) and downloadable text receipt.

### 7. About Pharmionex Journal & Editorial Guidelines
- Full Aims & Scope, indexing details, editorial board roster, and submission checklist.
- Live journal profile settings dialog to customize journal identity.

---

## 📁 Repository Structure

```text
pharmionex-journal/
├── index.html                 # Complete standalone single-page application with Pharmionex logo
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
   git clone https://github.com/YOUR-USERNAME/pharmionex-journal.git
   cd pharmionex-journal
   ```
2. Open `index.html` directly in any web browser (Google Chrome, Firefox, Safari, Microsoft Edge).
3. No build tools, Node.js packages, or external dependencies are required.

---

## 🌐 Deploy to GitHub Pages (Free Hosting)

Host this portal live on GitHub Pages with zero server setup:
1. Push this repository to GitHub.
2. Go to your repository's **Settings** tab.
3. In the left sidebar, click **Pages**.
4. Under **Build and deployment** > **Branch**, select `main` (or `master`) branch and folder `/ (root)`.
5. Click **Save**. Your portal will be live at `https://<your-username>.github.io/<repo-name>/`.

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
