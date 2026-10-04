# Pharmionex Journal - Author Portal & Modern Web System

A modern, responsive web application custom-built for **Pharmionex Journal** (*International Journal of Pharmaceutical, Biomedical & Clinical Research*). Engineered according to UGC-CARE criteria, COPE integrity protocols, and modern 2026 web application design patterns.

[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-blue.svg)](https://pages.github.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![UGC-CARE Compliant](https://img.shields.io/badge/Standards-UGC--CARE%20%7C%20COPE-gold.svg)]()
[![Tech: Modular Web](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20ES6%20JS-green.svg)]()

---

## 🌐 Modern Web Architecture & Navigation Flow

1. **Sticky Glassmorphic Header**:
   - High-performance frosted-glass header (`backdrop-filter: blur(12px)`) with Pharmionex molecular vector SVG branding.
   - Global navigation routing between **Journal Home**, **Author Submission Portal**, **Current Issue**, and **UGC & Ethics Standards**.
   - Mobile-responsive sliding navigation drawer for seamless smartphone and tablet browsing.

2. **Step-by-Step Submission Wizard & Stepper**:
   - Modern 7-step progressive wizard featuring visual completion checkmarks, previous/next navigation, and auto-save indicators.
   - Replaces cumbersome long forms with a focused, milestone-driven authoring experience.

3. **Modern Toast Notification System**:
   - Replaces disruptive browser `alert()` dialogs with sleek, non-blocking sliding toast notifications for save events, citation insertions, and validation feedback.

---

## 🏛️ UGC-CARE & Pharmaceutical Journal Standards

Pharmionex Journal integrates compliance criteria matching top-tier pharmacy journals and UGC-CARE guidelines:

- **Identifiers**:
  - **Online ISSN (e-ISSN)**: `2835-7191`
  - **Print ISSN (p-ISSN)**: `2835-7183`
  - **CrossRef Registered DOI Prefix**: `10.59234/pharmionex`
- **UGC-CARE Group Reference**: Chemical & Pharmaceutical Sciences
- **Anti-Plagiarism Screening**: Integrated Turnitin / iThenticate policy enforcing a mandatory **&lt; 10% similarity index threshold** prior to peer review.
- **Statutory Ethics Compliance**:
  - **IAEC Protocol Field**: Mandatory approval number for in-vivo preclinical animal pharmacology.
  - **CTRI Registration Field**: Clinical Trial Registry of India verification for prospective human trials.
- **Pharmaceutical-Specific Builder Templates**:
  - **Formulation Composition Table**: Automated tables for active ingredients, binders, disintegrants, glidants, and lubricants.
  - **HPLC Method Validation Table**: Chromatographic parameters according to **ICH Q2(R1)** (theoretical plates, tailing factor, linearity, % RSD).
  - **Accelerated Stability Table**: Storage tracking under **ICH Q1A** protocols (40°C ± 2°C / 75% RH ± 5% RH).
- **Publishing & Archiving**:
  - Gold Open Access under [Creative Commons Attribution (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/).
  - Double-Blind Peer Review (21-day average editorial turnaround).
  - Indexed in PubMed/MEDLINE, Crossref, DOAJ, Scopus, and Google Scholar.

---

## 📁 Repository Structure

```text
pharmionex-journal/
├── index.html                 # Clean semantic HTML markup with header, views & wizard
├── style.css                  # Modern CSS design system (glassmorphism, typography, layouts)
├── script.js                  # Reactive state management, wizard navigation, and literature search
├── README.md                  # Comprehensive documentation & setup instructions
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
2. Double-click `index.html` to open it in any modern browser (Google Chrome, Firefox, Safari, Microsoft Edge).
3. Requires no build process, Node.js packages, or external server.

---

## 🌐 Deploy to GitHub Pages (Free Hosting)

Host this portal live on GitHub Pages:
1. Push this repository to GitHub.
2. In your repository, go to **Settings** > **Pages** (in the left sidebar).
3. Under **Build and deployment** > **Branch**, select `main` (or `master`) branch and folder `/ (root)`.
4. Click **Save**. Your site will be published at `https://<your-username>.github.io/<repo-name>/`.

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
