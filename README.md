# 🔬 Pharmionex Journal - Web Portal & Editorial Automation System
*International Journal of Pharmaceutical, Biomedical & Clinical Research*

[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-blue.svg)](https://creativecommons.org/licenses/by/4.0/)
[![UGC-CARE Compliant](https://img.shields.io/badge/Standards-UGC--CARE%20%7C%20COPE-gold.svg)]()
[![Peer Review](https://img.shields.io/badge/Review-Double--Blind%20Peer%20Review-green.svg)]()
[![ISSN Status](https://img.shields.io/badge/ISSN-Application%20in%20Process%20(NIScPR)-orange.svg)]()
[![Open Access](https://img.shields.io/badge/Model-Diamond%20Open%20Access%20(No%20APC)-brightgreen.svg)]()

---

## 🏛️ Official Journal Governance & Metadata
- **Editor-in-Chief & Publisher**: Vivek Sharma
- **Affiliation**: Department of Pharmaceutical Sciences, India
- **Official Editorial Contact**: `pharmionex.journal@gmail.com`
- **Publication Frequency**: Bi-Monthly (6 regular issues per year)
- **ISSN Status**: Application in Process with the **National Science Library (CSIR-NIScPR)**, New Delhi, India
- **Publishing Model**: Diamond / Platinum Open Access (**100% Free / Zero APC for all authors**)
- **Copyright & Licensing**: Creative Commons Attribution 4.0 International (CC BY 4.0) — Authors retain unrestricted copyright.
- **Anti-Plagiarism Tolerance**: Strict Similarity Index < 10% (Turnitin / iThenticate screening)

---

## 📑 Comprehensive Article Categories Supported

Pharmionex Journal provides complete operational support for all scholarly pharmaceutical manuscript types:

1. **Original Research Articles**: Full-length empirical studies (4,000–7,000 words) with structured IMRAD sections, empirical tables, and statistical validation.
2. **Comprehensive Review Articles**: Critical, state-of-the-art syntheses (6,000–12,000 words, 80+ citations) evaluating decadal technological breakthroughs and therapeutic advances.
3. **Short Communications / Rapid Letters**: High-impact preliminary discoveries and rapid communications (2,000–3,500 words, up to 3 figures/tables).
4. **Methodology & Validation Protocols**: Detailed, step-by-step Standard Operating Procedures (SOPs) for chromatographic (RP-HPLC, LC-MS) and laboratory methods strictly adhering to ICH Q2(R1) validation benchmarks.
5. **Industrial & Regulatory Articles**: Formulation science, commercial capsule/tablet manufacturing, WHO Schedule M compliance, and 21 CFR Part 11 computerized validation.
6. **Pharmacokinetic Research Articles**: In-Vitro/In-Vivo Correlation (IVIVC), Level A deconvolution modeling, and human bioequivalence studies.
7. **Clinical Case Studies & Pharmacovigilance Reports**: Rare adverse drug reactions (ADRs) with Naranjo causality scoring and WHO-UMC causality assessments.
8. **Systematic Reviews & Meta-Analyses**: Evidence-based syntheses conducted in strict compliance with PRISMA 2020 reporting standards.

---

## 🔬 Broad Pharmaceutical Scope (9 Core Disciplines)

1. **Pharmaceutics & Biopharmaceutics**: Preformulation, modified-release systems, dissolution kinetics, and oral bioavailability.
2. **Targeted Drug Delivery & Nanomedicine**: NLCs, SLNs, liposomes, polymeric micelles, dendrimers, and stimuli-responsive nanocarriers.
3. **Pharmaceutical Analysis & Quality Assurance**: Stability-indicating HPLC, UPLC, GC, LC-MS/MS, capillary electrophoresis, and ICH Q2 validation.
4. **Industrial Pharmacy & cGMP**: Solid dosage forms, hard gelatin capsules, WHO Schedule M implementation, cleanrooms, and risk management (ICH Q9).
5. **Pharmacology & Toxicology**: Pharmacodynamics, in-vivo disease models (IAEC approved), toxicokinetics, and safety pharmacology.
6. **Pharmacokinetics & IVIVC**: Level A point-to-point correlation, bioavailability, bioequivalence, and Wagner-Nelson deconvolution.
7. **Medicinal Chemistry & Drug Discovery**: Computer-aided drug design (CADD), molecular docking, QSAR, and novel synthetic heterocycles.
8. **Pharmacognosy & Phytomedicine**: Botanical standardization, bioactive marker isolation, chromatographic fingerprinting, and natural therapeutics.
9. **Clinical Pharmacy & Pharmacovigilance**: ADR reporting, therapeutic drug monitoring (TDM), drug-drug interactions, and hospital pharmacy practice.

---

## 🚀 Key Web Application Features

### 1. 📚 Public Article Repository & Multi-Criteria Search Toolbar
- **Advanced Search Toolbar**: Search by title, author name, keyword, DOI, or abstract text.
- **Multi-Factor Filtering**: Filter dynamically by **Article Type**, **Subject Track**, and **Issue**, or click interactive topic chips.
- **Instant Academic Downloads**: Direct 1-click download of official, publication-formatted academic PDF papers for all 8 published articles in Volume 1, Issue 1.
- **In-Browser Full Text Reader**: Read complete methodology, tables, figures, and conclusions directly in a rich modal.
- **Citation Tools**: Copy formatted Vancouver, APA, or Harvard citations.

### 2. 🔍 Real-Time Manuscript Tracking Portal
- Self-service tracking portal for authors to monitor editorial progress using their Tracking ID (e.g. `PHARMIONEX-2026-4109`).
- **6-Stage Visual Progress Stepper**:
  1. 📝 *Submission Received & Formally Acknowledged*
  2. 🔍 *Editorial Scope & Anti-Plagiarism Screening (<10% threshold)*
  3. 👥 *Double-Blind Peer Review (2 Independent Reviewers)*
  4. ✍️ *Author Revisions (Minor / Major)*
  5. ⚖️ *Editorial Acceptance Decision by Vivek Sharma*
  6. 📚 *Copyediting, Galley Proof & Publication in Issue*
- Live milestone dates, Turnitin similarity score, and remarks directly from Editor Vivek Sharma.
- 1-click download of official **Status Summary Reports (.txt)**.

### 3. ✍️ Dynamic 7-Step Author Submission Wizard
- Step 1: Article Type selector (automatically customizes word count guidelines and abstract formatting), Title, Track, Keywords, Abstract.
- Step 2: Contributing Authors (defaulting to Vivek Sharma with ORCID and affiliation manager).
- Step 3: Interactive Article Builder with a **"Load Sections for Article Type"** button that reconfigures the editor for Research, Review, Protocol, or Case Study.
- Step 4: References & Literature Search.
- Step 5: Manuscript File Upload (PDF, Word DOCX, LaTeX, and supplementary datasets).
- Step 6: Ethics & Declarations (IAEC protocol number, CTRI trial ID, COPE compliance, funding statement, no conflict of interest, copyright CC BY 4.0).
- Step 7: Formatted Academic Layout Preview & Formal Submission to Journal (with direct "Track This Manuscript Now" button).

### 4. 📖 Comprehensive Instructions for Authors (`view-guidelines`)
- Dedicated author guidelines view covering article specifications, manuscript formatting, high-res figure standards (300 DPI TIFF/PNG), Vancouver citation rules, Diamond Open Access policy, and an 8-point pre-submission verification checklist.

### 5. ⚡ Google Apps Script Backend & Editorial Automation
- Complete backend automation engine in `google_apps_script/Code.gs` for Vivek Sharma:
  - **`doPost(e)` Webhook**: Receives submissions of any article type, logs to Google Sheets, creates tracking IDs, and sends automated acknowledgment emails.
  - **`doGet(e)` API**: Feeds live real-time manuscript status to the website's tracking portal.
  - **Automated Email Triggers**:
    - Automatic submission receipt to the author.
    - New manuscript notification alert to `pharmionex.journal@gmail.com`.
    - 1-click status update emails to authors when the editor updates the Google Sheet.
    - Automated Reviewer Invitation emails with blinded abstracts.
  - **Acceptance Letter Generator**: Automatically produces an official formatted Google Doc / PDF Acceptance Certificate.

---

## 📂 Repository Directory Layout
```
├── index.html                 # Main single-page journal web application
├── style.css                  # Modern responsive styling & visual stepper layout
├── script.js                  # Frontend state, search toolbar, tracking & GAS API integration
├── articles/                  # Official publication-ready PDF articles (Volume 1, Issue 1)
│   ├── pharmionex-2026-01-01.pdf   # Original Research (Nanostructured Lipid Carriers)
│   ├── pharmionex-2026-01-02.pdf   # Methodology Protocol (RP-HPLC Validation under ICH Q2)
│   ├── pharmionex-2026-01-03.pdf   # Industrial Research (Hard Gelatin Capsule Stability)
│   ├── pharmionex-2026-01-04.pdf   # Comprehensive Review (Advances in Nanocarriers)
│   ├── pharmionex-2026-01-05.pdf   # Regulatory & Review (WHO Schedule M Compliance)
│   ├── pharmionex-2026-01-06.pdf   # Pharmacokinetic Research (Level A IVIVC)
│   ├── pharmionex-2026-01-07.pdf   # Short Communication (Green Synthesis Nanocomposites)
│   └── pharmionex-2026-01-08.pdf   # Clinical Case Study (ADR & Pharmacovigilance)
├── google_apps_script/        # Full Google Apps Script automation suite
│   ├── Code.gs                # Complete backend automation code for Google Sheets & Gmail
│   └── README.md              # Step-by-step deployment guide for Vivek Sharma
└── .github/workflows/pages.yml# Automated GitHub Pages static deployment
```
