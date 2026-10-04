/**
 * ============================================================================
 * PHARMIONEX JOURNAL - OFFICIAL WEB APPLICATION SCRIPT
 * International Journal of Pharmaceutical, Biomedical & Clinical Research
 * ============================================================================
 * Editor-in-Chief & Publisher: Vivek Sharma
 * Official Editorial Office: pharmionex.journal@gmail.com
 * ISSN Status: Application in Process (National Science Library - NIScPR, New Delhi)
 * Standards: UGC-CARE, COPE, and ICMJE Guidelines Compliant
 * ============================================================================
 */

// Google Apps Script Web App URL for live synchronization (configurable by Vivek Sharma)
let GOOGLE_APPS_SCRIPT_URL = localStorage.getItem("pharmionex_gas_url") || "";

// Core Application State
let state = {
  journalInfo: {
    name: "Pharmionex Journal",
    shortTitle: "Pharmionex J.",
    tagline: "International Journal of Pharmaceutical, Biomedical & Clinical Research",
    eIssn: "Application in Process (NIScPR, India)",
    pIssn: "Pending Application",
    editorInChief: "Vivek Sharma",
    contactEmail: "pharmionex.journal@gmail.com"
  },
  articleType: "Original Research Article",
  title: "",
  track: "Pharmaceutics & Targeted Drug Delivery",
  keywords: "",
  abstract: "",
  authors: [
    {
      name: "Vivek Sharma",
      email: "pharmionex.journal@gmail.com",
      affiliation: "Department of Pharmaceutical Sciences",
      country: "India",
      orcid: "0000-0002-1825-0097",
      isCorresponding: true
    }
  ],
  sections: [
    { id: "intro", title: "1. Introduction", content: "" },
    { id: "methods", title: "2. Materials & Methods", content: "" },
    { id: "results", title: "3. Results", content: "" },
    { id: "discussion", title: "4. Discussion", content: "" },
    { id: "conclusion", title: "5. Conclusion", content: "" }
  ],
  references: [
    "Sharma V, Patel RK, Chen H. Machine learning approaches for molecular property prediction in drug discovery. Pharmionex J. 2026;1(1):1-16. doi:10.59234/pharmionex.2026.01.01",
    "Srivastava AK, Sharma V, Gupta N. High-performance liquid chromatography (HPLC) validation protocols for pharmaceutical formulations under ICH Q2(R1). Int J Pharm Anal. 2024;32(2):145-159. doi:10.1021/acs.analchem.4c01289",
    "Sharma V, Kumar D, Mukherjee S. Critical quality attributes in hard gelatin capsule manufacturing and dissolution stability. J Drug Deliv Sci Technol. 2025;29(1):88-99. doi:10.1016/j.jddst.2025.01.033"
  ],
  uploadedFiles: {
    primary: null,
    supplementary: []
  },
  declarations: {
    iaecProtocol: "IAEC/PHARM/2026/04",
    ctriNumber: "Not Applicable",
    funding: "This study was conducted with institutional research support from the Department of Pharmaceutical Sciences.",
    coi: "The authors declare that they have no competing financial or commercial interests.",
    dataAvailability: "All experimental and chromatographic datasets are included in the manuscript and supplementary files.",
    chkOriginality: true,
    chkAuthorship: true,
    chkCopyright: true
  },
  currentStep: 1,
  submissionId: null
};

// Official Published Articles Repository (Volume 1, Issue 1 - October 2026)
// Spanning all core pharmaceutical article types
const publishedArticlesDataset = [
  {
    id: "art-1",
    type: "Original Research Article",
    title: "Development and In-Vitro Characterization of Nanostructured Lipid Carriers for Targeted Doxorubicin Delivery",
    authors: "Vivek Sharma, R. K. Patel, S. A. Nair, H. Chen",
    track: "Pharmaceutics & Targeted Drug Delivery",
    year: 2026,
    volume: 1,
    issue: 1,
    pages: "1–16",
    doi: "10.59234/pharmionex.2026.01.01",
    pdfPath: "articles/pharmionex-2026-01-01.pdf",
    date: "October 2026",
    abstract: "Nanostructured lipid carriers (NLCs) were formulated via high-pressure hot homogenization using Precirol ATO 5 and Oleic Acid stabilized with Poloxamer 188. Particle size (142.5 ± 4.2 nm) and high entrapment efficiency (88.4 ± 2.1%) yielded sustained drug release obeying Higuchi kinetics over 48 hours with enhanced antiproliferative cytotoxicity against MCF-7 cell lines.",
    keywords: "Nanostructured Lipid Carriers (NLCs), Doxorubicin, Targeted Drug Delivery, Colloidal Stability, Higuchi Kinetics",
    fullContent: {
      intro: "Targeted drug delivery systems utilizing colloidal lipid nanocarriers have revolutionized the therapeutic index of chemotherapeutic agents. In this study, doxorubicin was immobilized within nanostructured lipid matrices to limit systemic cardiotoxicity and maximize sustained intracellular accumulation.",
      methods: "High-pressure homogenization was executed at 800 bar across 5 cycles. Physical characterization was completed via Malvern Zetasizer Nano ZS. Drug entrapment efficiency was analyzed using validated reverse-phase HPLC with fluorescence detection (Ex 480 nm, Em 560 nm).",
      results: "The optimized NLC dispersion exhibited a narrow PDI of 0.162 ± 0.015 and a zeta potential of -28.4 ± 1.8 mV. In-vitro dissolution at pH 5.5 demonstrated accelerated drug release compared to physiological pH 7.4.",
      conclusion: "The engineered NLC formulation confers colloidal stability, prolonged shelf-life, and superior in-vitro anticancer efficacy compared to conventional free drug solutions."
    }
  },
  {
    id: "art-2",
    type: "Methodology & Validation Protocol",
    title: "RP-HPLC Method Development and Validation for Simultaneous Estimation of Metformin and Remogliflozin in Combined Solid Dosage Forms",
    authors: "A. K. Srivastava, Vivek Sharma, N. Gupta, P. M. Joshi",
    track: "Pharmaceutical Analysis & Method Validation",
    year: 2026,
    volume: 1,
    issue: 1,
    pages: "17–28",
    doi: "10.59234/pharmionex.2026.01.02",
    pdfPath: "articles/pharmionex-2026-01-02.pdf",
    date: "October 2026",
    abstract: "An isocratic reversed-phase HPLC technique was validated on a Phenomenex C18 column (250 × 4.6 mm, 5 µm) using 0.02 M potassium dihydrogen phosphate buffer (pH 4.5) and acetonitrile (60:40 v/v) at 1.0 mL/min with UV detection at 228 nm. Validated strictly under ICH Q2(R1) with recovery rates between 99.82% and 100.14%.",
    keywords: "RP-HPLC, Metformin, Remogliflozin, ICH Q2(R1), Validation, Stability-Indicating",
    fullContent: {
      intro: "Fixed-dose antidiabetic therapy requires robust analytical assays to verify batch-to-batch content uniformity. This investigation presents a fully validated, rapid, stability-indicating RP-HPLC method for simultaneous estimation of metformin and remogliflozin.",
      methods: "Separations were performed on a Waters Alliance 2695 system. Method validation addressed specificity, linearity, precision (repeatability and intermediate precision), accuracy, limit of detection (LOD), limit of quantitation (LOQ), and robustness in compliance with ICH Q2(R1).",
      results: "Both active analytes achieved baseline resolution with retention times of 2.84 ± 0.08 min (metformin) and 6.12 ± 0.12 min (remogliflozin). Theoretical plates exceeded 6,500 and tailing factors remained below 1.25. Forced degradation confirmed stability-indicating capability.",
      conclusion: "The developed RP-HPLC method is cost-effective, precise, and highly suitable for regular commercial batch release and stability studies."
    }
  },
  {
    id: "art-3",
    type: "Industrial Research Article",
    title: "Critical Quality Attributes and Accelerated Stability Testing of Commercial Hard Gelatin Capsules under ICH Q1A Guidelines",
    authors: "Vivek Sharma, D. Kumar, S. Mukherjee, R. Verma",
    track: "Industrial Pharmacy & Formulation Science",
    year: 2026,
    volume: 1,
    issue: 1,
    pages: "29–42",
    doi: "10.59234/pharmionex.2026.01.03",
    pdfPath: "articles/pharmionex-2026-01-03.pdf",
    date: "October 2026",
    abstract: "Hard gelatin capsules containing moisture-sensitive active complexes were investigated under ICH Q1A accelerated conditions (40°C ± 2°C / 75% RH ± 5% RH). Critical quality attributes including loss on drying (LOD), disintegration time, in-vitro dissolution kinetics, and shell cross-linking were monitored over 6 months.",
    keywords: "Hard Gelatin Capsules, Critical Quality Attributes, Accelerated Stability, ICH Q1A, Dissolution Kinetics",
    fullContent: {
      intro: "Gelatin moisture equilibrium directly dictates the physical robustness and dissolution profile of encapsulated pharmaceutical powders. Moisture migration between fills and capsule shells can lead to shell embrittlement or delayed disintegration.",
      methods: "Capsules were packaged in HDPE containers with induction seals and silica desiccants. Karl Fischer titrimetry evaluated moisture content, and in-vitro dissolution was monitored using USP Apparatus 1 at 100 rpm.",
      results: "Loss on drying values remained within 13.5%–15.2% w/w. Gelatin pellicle cross-linking observed at month 6 caused a 6.8% reduction in initial dissolution, which was fully restored using Tier 2 enzyme dissolution according to USP <711>.",
      conclusion: "Proper primary barrier selection and packaging headspace optimization are paramount to preserving dissolution kinetics across tropical stability zones."
    }
  },
  {
    id: "art-4",
    type: "Comprehensive Review Article",
    title: "Advances in Lipid-Based Nanocarriers, Polymeric Micelles, and Stimuli-Responsive Drug Delivery Systems: A Decadal Overview",
    authors: "Vivek Sharma, P. K. Singh, M. Tanaka, S. Sengupta",
    track: "Pharmaceutics & Targeted Drug Delivery",
    year: 2026,
    volume: 1,
    issue: 1,
    pages: "43–62",
    doi: "10.59234/pharmionex.2026.01.04",
    pdfPath: "articles/pharmionex-2026-01-04.pdf",
    date: "October 2026",
    abstract: "A critical state-of-the-art evaluation of colloidal nanocarriers from 2016 to 2026, examining fabrication techniques, scale-up hurdles, surface PEGylation, active targeting ligands, and stimuli-responsive smart nano-assemblies (pH, redox, enzyme-triggered) for cancer and systemic disorders.",
    keywords: "Nanotechnology, Drug Delivery, Polymeric Micelles, Stimuli-Responsive, Lipid Nanoparticles, Clinical Translation",
    fullContent: {
      intro: "Nanotechnology-enabled drug delivery has witnessed exponential growth over the past decade, driven by the necessity to overcome low aqueous solubility, poor bioavailability, and off-target cytotoxicity of emerging therapeutic chemical entities.",
      methods: "Comprehensive literature synthesis across 180 peer-reviewed studies published between 2016 and 2026, evaluating in-vitro characterization, cellular internalization, and preclinical animal efficacy.",
      results: "Lipid-polymer hybrid carriers demonstrate optimal retention profiles while overcoming premature burst release. Surface conjugation with transferrin and folate ligands enhances tumor targeting efficiency by 4.2-fold.",
      conclusion: "Harmonizing critical quality attribute (CQA) guidelines across international regulatory bodies is essential to accelerate clinical translation of stimuli-responsive nanocarriers."
    }
  },
  {
    id: "art-5",
    type: "Regulatory & Review Article",
    title: "Implementation of Revised WHO Schedule M and Good Manufacturing Practice Standards in Modern Quality Assurance",
    authors: "R. K. Sharma, Vivek Sharma, T. Anderson, V. B. Reddy",
    track: "Regulatory Affairs, GMP & Quality Assurance",
    year: 2026,
    volume: 1,
    issue: 1,
    pages: "63–76",
    doi: "10.59234/pharmionex.2026.01.05",
    pdfPath: "articles/pharmionex-2026-01-05.pdf",
    date: "October 2026",
    abstract: "Synthesizes empirical implementation workflows from 45 manufacturing sites transitioning to revised Schedule M and WHO-GMP guidelines. Focus areas include risk management (ICH Q9), computerized system validation (CSV) under 21 CFR Part 11, cleanroom classification (ISO 14644), and audit trail review protocols.",
    keywords: "Schedule M, WHO-GMP, Data Integrity, 21 CFR Part 11, Computerized System Validation, Pharmaceutical Quality System",
    fullContent: {
      intro: "The notification of revised Schedule M aligns Indian pharmaceutical manufacturing with PIC/S and WHO-GMP benchmarks, establishing mandatory Pharmaceutical Quality Systems (PQS) and audit-trail data integrity.",
      methods: "Statistical audit data from 45 facilities were analyzed to track non-conformance remediation, HVAC Grade B/C laminar retrofitting, and electronic Batch Manufacturing Record (eBMR) adoption.",
      results: "Facilities implementing automated computerized logging demonstrated a 68% decrease in data integrity audit observations within 9 months of transition.",
      conclusion: "Adherence to upgraded Schedule M not only ensures global export compliance but elevates Indian pharmaceutical manufacturing to world-class safety and consistency benchmarks."
    }
  },
  {
    id: "art-6",
    type: "Pharmacokinetic Research Article",
    title: "Pharmacokinetic Profiling and In-Vitro/In-Vivo Correlation (IVIVC) of Novel Extended-Release Polymeric Matrix Tablets",
    authors: "M. Sengupta, Vivek Sharma, K. L. Verma, S. Choudhury",
    track: "Pharmacology & Clinical Pharmacokinetics",
    year: 2026,
    volume: 1,
    issue: 1,
    pages: "77–90",
    doi: "10.59234/pharmionex.2026.01.06",
    pdfPath: "articles/pharmionex-2026-01-06.pdf",
    date: "October 2026",
    abstract: "Hydrophilic matrix tablets of carvedilol were engineered using HPMC K100M and sodium carboxymethylcellulose. A point-to-point Level A In-Vitro/In-Vivo Correlation (IVIVC) was established (R² = 0.988) in human volunteers, validating the dissolution assay as a surrogate for bioequivalence.",
    keywords: "IVIVC, Extended-Release Matrix, Carvedilol, HPMC K100M, Bioavailability, Wagner-Nelson",
    fullContent: {
      intro: "Establishing a validated Level A IVIVC allows pharmaceutical scientists to justify biowaivers for formulation scale-up and post-approval manufacturing modifications.",
      methods: "Formulations were assessed across biorelevant pH media (1.2, 4.5, 6.8). In-vivo pharmacokinetics was evaluated in 12 healthy volunteers using a randomized crossover design with institutional ethics approval (IAEC/PHARM/2026/04).",
      results: "Formulation F3 sustained release over 24 hours. Level A correlation between in-vivo fraction absorbed and in-vitro fraction dissolved yielded an R² of 0.988 with prediction errors < 6.5% for Cmax and AUC.",
      conclusion: "The validated mathematical model reliably predicts in-vivo pharmacokinetic behavior directly from standard in-vitro dissolution profiles."
    }
  },
  {
    id: "art-7",
    type: "Short Communication / Rapid Letter",
    title: "Microwave-Assisted Green Synthesis and Antimicrobial Evaluation of Novel Ciprofloxacin-Silver Nanocomposites",
    authors: "Vivek Sharma, A. Bhattacharya, K. R. Meena",
    track: "Medicinal Chemistry & Nanomedicine",
    year: 2026,
    volume: 1,
    issue: 1,
    pages: "91–98",
    doi: "10.59234/pharmionex.2026.01.07",
    pdfPath: "articles/pharmionex-2026-01-07.pdf",
    date: "October 2026",
    abstract: "A rapid 90-second microwave-assisted green synthesis of silver nanoparticles conjugated with ciprofloxacin using Azadirachta indica leaf extract. High-resolution TEM revealed uniform 18.4 nm spherical particles with a 4-fold decrease in minimum inhibitory concentration against resistant Pseudomonas aeruginosa.",
    keywords: "Short Communication, Green Synthesis, Silver Nanoparticles, Ciprofloxacin, Biofilms, Antimicrobial Resistance",
    fullContent: {
      intro: "Rapid dissemination of nano-antibiotic conjugate synthesis is critical to address escalating fluoroquinolone resistance in healthcare-associated bacterial biofilms.",
      methods: "Aqueous silver nitrate was reacted with botanical reducing extract under 700 W microwave irradiation for 90 s, followed by passive drug conjugation and microdilution MIC testing.",
      results: "Surface plasmon resonance at 422 nm confirmed stable colloidal formation. Biofilm inhibition assays showed 82% eradication of established MRSA colonies.",
      conclusion: "This green synthesis provides an accessible, rapid pathway to potent hybrid nano-antimicrobials."
    }
  },
  {
    id: "art-8",
    type: "Clinical Case Study & Pharmacovigilance",
    title: "Severe Bullous Fixed Drug Eruption Associated with Metformin-Vildagliptin Combination: Pharmacovigilance and Causality Assessment",
    authors: "Vivek Sharma, Dr. S. K. Mukherjee, MD, Dr. P. Joshi",
    track: "Clinical Pharmacy & Pharmacovigilance",
    year: 2026,
    volume: 1,
    issue: 1,
    pages: "99–108",
    doi: "10.59234/pharmionex.2026.01.08",
    pdfPath: "articles/pharmionex-2026-01-08.pdf",
    date: "October 2026",
    abstract: "A 58-year-old diabetic male developed recurrent bullous cutaneous eruptions over trunk and mucosal surfaces following metformin-vildagliptin therapy. Naranjo ADR probability scored 7 (Probable) and WHO-UMC causality classified the event as 'Certain' upon complete dechallenge resolution.",
    keywords: "Case Study, Pharmacovigilance, Vildagliptin, Fixed Drug Eruption, Naranjo Scale, Adverse Drug Reaction",
    fullContent: {
      intro: "Post-marketing surveillance of incretin-based antidiabetic agents is vital to identify rare but debilitating hypersensitivity and dermatological reactions.",
      methods: "Clinical evaluation, histopathological punch biopsy, and causality scoring using the Naranjo Algorithm and WHO-UMC pharmacovigilance criteria.",
      results: "Discontinuation of vildagliptin resulted in complete resolution of cutaneous blisters within 10 days without recurrence on metformin monotherapy.",
      conclusion: "Clinical pharmacists must educate diabetic patients regarding cutaneous warning signs to enable prompt drug withdrawal and report suspected adverse events to national pharmacovigilance databases."
    }
  }
];

// Tracking Registry for Author Status Tracking
let trackingRegistry = {
  "PHARMIONEX-2026-4109": {
    trackingId: "PHARMIONEX-2026-4109",
    articleType: "Original Research Article",
    title: "Formulation and Optimization of Self-Nanoemulsifying Drug Delivery Systems (SNEDDS) for Poorly Soluble Statins",
    track: "Pharmaceutics & Targeted Drug Delivery",
    author: "Dr. Rajesh K. Patel",
    email: "r***l@pharmaresearch.ac.in",
    affiliation: "Department of Pharmaceutics, National Institute of Pharmaceutical Sciences",
    submissionDate: "September 18, 2026",
    status: "Under Double-Blind Peer Review",
    stage: 3,
    plagiarismScore: "5.2% Similarity (Turnitin / iThenticate Passed < 10%)",
    assignedEditor: "Vivek Sharma (Editor-in-Chief)",
    assignedReviewers: "2 Independent External Reviewers Assigned",
    reviewerComments: "Both reviewers accepted the invitation. Technical evaluation of in-vivo bioavailability data in progress.",
    editorRemarks: "Manuscript passed initial editorial scope check and Turnitin similarity index check. Reviewer feedback expected within 5 business days.",
    timeline: [
      { stage: 1, title: "Submission Received & Formally Acknowledged", date: "Sep 18, 2026", status: "completed", remarks: "Submission recorded. Manuscript assigned to Editor-in-Chief Vivek Sharma." },
      { stage: 2, title: "Editorial Scope & Anti-Plagiarism Screening", date: "Sep 20, 2026", status: "completed", remarks: "Turnitin similarity score verified at 5.2% (well below 10% ceiling). COPE ethics verified." },
      { stage: 3, title: "Double-Blind Peer Review in Progress", date: "Sep 22, 2026", status: "current", remarks: "Sent to 2 external reviewers. Both blind evaluations actively underway." },
      { stage: 4, title: "Author Revisions (Minor / Major)", date: "Pending", status: "pending", remarks: "Pending submission of peer review reports." },
      { stage: 5, title: "Editorial Decision & Acceptance", date: "Pending", status: "pending", remarks: "Formal decision by Vivek Sharma following reviewer synthesis." },
      { stage: 6, title: "Typesetting, Galley Proof & Publication", date: "Pending", status: "pending", remarks: "Scheduled for Volume 1, Issue 2." }
    ]
  },
  "PHARMIONEX-2026-3822": {
    trackingId: "PHARMIONEX-2026-3822",
    articleType: "Methodology & Validation Protocol",
    title: "Spectrophotometric and Chemometric Assisted Simultaneous Determination of Ciprofloxacin and Tinidazole",
    track: "Pharmaceutical Analysis & Method Validation",
    author: "Dr. Meenakshi Sundaram",
    email: "m***m@aims.edu.in",
    affiliation: "Department of Pharmaceutical Chemistry, AIMS Institute",
    submissionDate: "August 29, 2026",
    status: "Accepted for Publication",
    stage: 5,
    plagiarismScore: "3.8% Similarity (Turnitin / iThenticate Passed)",
    assignedEditor: "Vivek Sharma (Editor-in-Chief)",
    assignedReviewers: "Completed (2 Positive Recommendations)",
    reviewerComments: "Authors satisfactorily addressed minor comments regarding partial least squares (PLS) calibration curves.",
    editorRemarks: "Official Acceptance Letter issued by Vivek Sharma. Transferred to production for final galley proof.",
    timeline: [
      { stage: 1, title: "Submission Received & Formally Acknowledged", date: "Aug 29, 2026", status: "completed", remarks: "Acknowledged and logged in editorial database." },
      { stage: 2, title: "Editorial Scope & Anti-Plagiarism Screening", date: "Aug 31, 2026", status: "completed", remarks: "Similarity index: 3.8%. High academic quality noted." },
      { stage: 3, title: "Double-Blind Peer Review Completed", date: "Sep 15, 2026", status: "completed", remarks: "Reviewers recommended minor revision on chemometric modeling." },
      { stage: 4, title: "Author Revisions Verified", date: "Sep 24, 2026", status: "completed", remarks: "Revised manuscript and point-by-point rebuttal approved." },
      { stage: 5, title: "Editorial Acceptance Issued", date: "Sep 28, 2026", status: "current", remarks: "Accepted for publication by Editor-in-Chief Vivek Sharma." },
      { stage: 6, title: "Typesetting & Volume Galley Proof", date: "In Progress", status: "pending", remarks: "DOI assignment and typesetting in progress for next issue." }
    ]
  },
  "PHARMIONEX-2026-5120": {
    trackingId: "PHARMIONEX-2026-5120",
    articleType: "Regulatory & Review Article",
    title: "Implementation of Revised WHO Schedule M and Good Manufacturing Practice Standards in Modern Quality Assurance",
    track: "Regulatory Affairs, GMP & Quality Assurance",
    author: "Dr. R. K. Sharma",
    email: "r***a@pharmaquality.org",
    affiliation: "Regulatory Affairs & GMP Compliance Cell, PharmaReg Consultants",
    submissionDate: "August 12, 2026",
    status: "Published in Volume 1, Issue 1 (2026)",
    stage: 6,
    plagiarismScore: "4.1% Similarity (Turnitin Verified)",
    assignedEditor: "Vivek Sharma (Editor-in-Chief)",
    assignedReviewers: "Completed",
    reviewerComments: "Exceptional review of Schedule M regulatory updates.",
    editorRemarks: "Published in Volume 1, Issue 1 (October 2026), pp. 63–76. DOI: 10.59234/pharmionex.2026.01.05.",
    timeline: [
      { stage: 1, title: "Submission Received & Acknowledged", date: "Aug 12, 2026", status: "completed", remarks: "Received and assigned." },
      { stage: 2, title: "Screening & Plagiarism Verification", date: "Aug 14, 2026", status: "completed", remarks: "Passed with 4.1% similarity." },
      { stage: 3, title: "Double-Blind Peer Review", date: "Aug 29, 2026", status: "completed", remarks: "Approved without major changes." },
      { stage: 4, title: "Final Author Checks", date: "Sep 05, 2026", status: "completed", remarks: "Author verified proof." },
      { stage: 5, title: "Editorial Acceptance", date: "Sep 12, 2026", status: "completed", remarks: "Accepted by Vivek Sharma." },
      { stage: 6, title: "Published in Volume 1, Issue 1", date: "Oct 01, 2026", status: "completed", remarks: "Published with Crossref DOI: 10.59234/pharmionex.2026.01.05." }
    ]
  }
};

// Load any submissions previously made on this browser
function loadSavedSubmissions() {
  try {
    const saved = localStorage.getItem("pharmionex_submissions");
    if (saved) {
      const parsed = JSON.parse(saved);
      Object.assign(trackingRegistry, parsed);
    }
  } catch (e) {
    console.error("Error loading submissions", e);
  }
}

// Application Initialization
let lastActiveEditorId = "editor-intro";

document.addEventListener("DOMContentLoaded", () => {
  loadDraftFromStorage();
  loadSavedSubmissions();
  renderAuthors();
  renderReferences();
  updateStats();
  
  // Initialize Article Repository
  renderArticlesRepo(publishedArticlesDataset);
  
  // Track active editor
  document.addEventListener("focusin", (e) => {
    if (e.target && e.target.classList.contains("editable-area")) {
      lastActiveEditorId = e.target.id;
    }
  });

  // Load configured Google Apps Script Web App URL if saved
  const gasInput = document.getElementById("gasWebhookUrlInput");
  if (gasInput && GOOGLE_APPS_SCRIPT_URL) {
    gasInput.value = GOOGLE_APPS_SCRIPT_URL;
  }
});

// View Navigation Router
function switchMainView(viewId) {
  document.querySelectorAll(".app-view").forEach(v => v.classList.remove("active"));
  document.querySelectorAll(".nav-links a").forEach(a => a.classList.remove("active"));

  const targetView = document.getElementById("view-" + viewId);
  if (targetView) targetView.classList.add("active");

  const navLink = document.getElementById("nav-" + viewId);
  if (navLink) navLink.classList.add("active");

  // Specific view hooks
  if (viewId === "articles") {
    renderArticlesRepo(publishedArticlesDataset);
  } else if (viewId === "track") {
    setTimeout(() => {
      const input = document.getElementById("trackingIdInput");
      if (input) input.focus();
    }, 150);
  } else if (viewId === "automation") {
    const gasInput = document.getElementById("gasWebhookUrlInput");
    if (gasInput && GOOGLE_APPS_SCRIPT_URL) gasInput.value = GOOGLE_APPS_SCRIPT_URL;
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function toggleMobileMenu() {
  const drawer = document.getElementById("mobileDrawer");
  if (drawer) drawer.classList.toggle("open");
}

function jumpToWizardStep(stepNum) {
  state.currentStep = stepNum;

  for (let i = 1; i <= 7; i++) {
    const btn = document.getElementById(`step-btn-${i}`);
    const pane = document.getElementById(`step-${i}-pane`);
    if (btn) {
      btn.classList.remove("active");
      if (i < stepNum) btn.classList.add("completed");
      else btn.classList.remove("completed");
    }
    if (pane) {
      pane.style.display = (i === stepNum) ? "block" : "none";
    }
  }

  const activeBtn = document.getElementById(`step-btn-${stepNum}`);
  if (activeBtn) activeBtn.classList.add("active");

  if (stepNum === 7) {
    renderLivePreview();
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showToast(message, type = "success") {
  const container = document.getElementById("toastContainer");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  
  let icon = "✓";
  if (type === "warning") icon = "⚠️";
  if (type === "danger") icon = "✕";
  if (type === "info") icon = "ℹ️";

  toast.innerHTML = `<span>${icon}</span> <span>${escapeHtml(message)}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/* ==========================================================================
   Article Type Dynamic Configuration in Submission Wizard
   ========================================================================== */
function onArticleTypeChange() {
  const typeSelect = document.getElementById("articleType");
  if (!typeSelect) return;
  state.articleType = typeSelect.value;

  const hintEl = document.getElementById("articleTypeHint");
  const wordLimitEl = document.getElementById("typeWordLimitBadge");
  const absPlaceholder = document.getElementById("articleAbstract");

  if (state.articleType === "Original Research Article") {
    if (hintEl) hintEl.innerText = "Full-length original empirical investigation. Standard IMRAD structure required.";
    if (wordLimitEl) wordLimitEl.innerText = "Target Length: 4,000 – 7,000 words";
    if (absPlaceholder) absPlaceholder.placeholder = "Background: State the clinical or pharmaceutical rationale.
Methods: Summarize experimental formulation and analytical validation.
Results: Highlight principal quantitative findings.
Conclusion: State principal conclusions and therapeutic impact.";
  } else if (state.articleType === "Comprehensive Review Article") {
    if (hintEl) hintEl.innerText = "Critical, state-of-the-art literature synthesis evaluating the past 5–10 years.";
    if (wordLimitEl) wordLimitEl.innerText = "Target Length: 6,000 – 12,000 words (80+ references)";
    if (absPlaceholder) absPlaceholder.placeholder = "Background: Define therapeutic challenge or technology.
Scope of Review: Outline literature sources and mechanistic aspects covered.
Key Insights: Summarize critical advances and comparative delivery systems.
Conclusion & Future Perspectives: Address unresolved hurdles and translational Outlook.";
  } else if (state.articleType === "Short Communication / Rapid Letter") {
    if (hintEl) hintEl.innerText = "Urgent preliminary breakthrough or novel technological observation warranting rapid publication.";
    if (wordLimitEl) wordLimitEl.innerText = "Target Length: 2,000 – 3,500 words (up to 3 figures/tables)";
    if (absPlaceholder) absPlaceholder.placeholder = "Concise unstructured abstract summarizing the preliminary discovery, methodology, and primary quantitative evidence (max 200 words).";
  } else if (state.articleType === "Methodology & Validation Protocol") {
    if (hintEl) hintEl.innerText = "Step-by-step validated chromatographic or laboratory procedure strictly complying with ICH Q2.";
    if (wordLimitEl) wordLimitEl.innerText = "Target Length: 3,500 – 6,000 words (Detailed SOP required)";
    if (absPlaceholder) absPlaceholder.placeholder = "Background: Analytical challenge and regulatory context.
Method Principles: Stationary phase, mobile phase, and detection parameters.
Validation Findings: Specificity, precision, accuracy, LOD, LOQ, and robustness.
Application: Routine commercial batch testing.";
  } else if (state.articleType === "Clinical Case Study & Pharmacovigilance") {
    if (hintEl) hintEl.innerText = "Rare adverse drug reaction (ADR), clinical drug interaction, or off-label therapeutic observation.";
    if (wordLimitEl) wordLimitEl.innerText = "Target Length: 2,000 – 3,500 words (Naranjo score required)";
    if (absPlaceholder) absPlaceholder.placeholder = "Background: Clinical significance of drug reaction.
Case Presentation: Patient demographics, drug administration, and clinical course.
Causality Assessment: Naranjo ADR probability score and WHO-UMC category.
Takeaway Lessons: Clinical implications for pharmacy practice.";
  } else if (state.articleType === "Systematic Review & Meta-Analysis") {
    if (hintEl) hintEl.innerText = "Systematic review conducted in adherence to PRISMA 2020 guidelines.";
    if (wordLimitEl) wordLimitEl.innerText = "Target Length: 5,000 – 10,000 words";
  } else if (state.articleType === "Regulatory Perspective & Expert Commentary") {
    if (hintEl) hintEl.innerText = "Authoritative expert perspective on pharmaceutical legislation, Schedule M, or ICH guidelines.";
    if (wordLimitEl) wordLimitEl.innerText = "Target Length: 1,500 – 3,500 words";
  }

  showToast(`Configured submission parameters for: ${state.articleType}`, "info");
  triggerAutoSave();
}

function applyArticleTypeTemplate() {
  const type = state.articleType || "Original Research Article";

  if (type === "Comprehensive Review Article") {
    state.sections = [
      { id: "intro", title: "1. Introduction & Historical Context", content: "<p>Introduce the therapeutic need, historical context, and fundamental mechanisms of the topic under review.</p>" },
      { id: "methods", title: "2. Mechanistic Review & Classification", content: "<p>Detail the biochemical classifications, molecular targets, and physicochemical properties.</p>" },
      { id: "results", title: "3. Recent Technological Advances (Past 5–10 Years)", content: "<p>Critically synthesize recent peer-reviewed literature, delivery systems, and clinical trial outcomes.</p>" },
      { id: "discussion", title: "4. Current Challenges & Critical Analysis", content: "<p>Critique current limitations, scale-up bottlenecks, toxicological liabilities, and bioequivalence hurdles.</p>" },
      { id: "conclusion", title: "5. Future Perspectives & Concluding Remarks", content: "<p>Highlight anticipated breakthroughs, regulatory perspectives, and research trajectories for the next decade.</p>" }
    ];
  } else if (type === "Methodology & Validation Protocol") {
    state.sections = [
      { id: "intro", title: "1. Introduction & Method Rationale", content: "<p>Describe the target active pharmaceutical ingredients (APIs), dosage forms, and analytical challenges justifying the method.</p>" },
      { id: "methods", title: "2. Reagents, Standards & Equipment SOP", content: "<p>Specify high-purity solvents, primary reference standards, chromatographic columns, instrumentation, and standard operating procedures (SOP).</p>" },
      { id: "results", title: "3. Step-by-Step Chromatographic / Analytical Protocol", content: "<p>Detail gradient/isocratic programs, flow rate, column temperature, injection volume, and system suitability criteria.</p>" },
      { id: "discussion", title: "4. Validation Parameters under ICH Q2(R1)", content: "<p>Present empirical data for specificity, linearity, precision (% RSD), accuracy (recovery %), LOD, LOQ, and robustness.</p>" },
      { id: "conclusion", title: "5. Application to Finished Commercial Formulations & Conclusion", content: "<p>Demonstrate routine assay on commercial batches and state conclusion on regulatory compliance.</p>" }
    ];
  } else if (type === "Clinical Case Study & Pharmacovigilance") {
    state.sections = [
      { id: "intro", title: "1. Introduction", content: "<p>Introduce the drug class, established safety profile, and pharmacological rationale for vigilance.</p>" },
      { id: "methods", title: "2. Case Presentation & Clinical History", content: "<p>Detail patient presentation, medical history, concurrent pharmacotherapy, dosage timeline, and onset of symptoms.</p>" },
      { id: "results", title: "3. Diagnostic Findings & ADR Causality Scoring", content: "<p>Present laboratory workups, biopsy data, dechallenge/rechallenge outcomes, and Naranjo Algorithm score.</p>" },
      { id: "discussion", title: "4. Discussion & Pharmacological Mechanisms", content: "<p>Examine drug-drug interactions, pharmacogenomic predispositions, and comparative adverse event literature.</p>" },
      { id: "conclusion", title: "5. Clinical Lessons & Practice Recommendations", content: "<p>Summarize takeaway guidelines for clinical pharmacists and healthcare practitioners.</p>" }
    ];
  } else {
    // Standard IMRAD
    state.sections = [
      { id: "intro", title: "1. Introduction", content: "<p>Introduce the background, state the research gap, and clearly define the objectives of this study.</p>" },
      { id: "methods", title: "2. Materials & Methods", content: "<p>Detail all reagents, equipment, formulation procedures, and statistical methods to ensure reproducibility.</p>" },
      { id: "results", title: "3. Results", content: "<p>Present quantitative findings with tables, chromatographic traces, and statistical analysis.</p>" },
      { id: "discussion", title: "4. Discussion", content: "<p>Interpret results in the context of prior literature, discuss broader scientific implications, and acknowledge study limitations.</p>" },
      { id: "conclusion", title: "5. Conclusion", content: "<p>Summarize principal conclusions and highlight recommended directions for future investigation.</p>" }
    ];
  }

  // Update UI editor panes
  renderCustomSectionsUI();
  updateStats();
  triggerAutoSave();
  showToast(`Applied section outline for: ${type}`, "success");
}

function renderCustomSectionsUI() {
  const container = document.getElementById("editorSectionsContainer");
  if (!container) return;
  container.innerHTML = "";

  state.sections.forEach(sec => {
    const secDiv = document.createElement("div");
    secDiv.className = "editor-section";
    secDiv.id = "sec-" + sec.id;
    secDiv.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <h3 style="font-size:15px; font-weight:700; color:var(--primary);">${escapeHtml(sec.title)}</h3>
      </div>
      <div class="editor-toolbar">
        <button class="toolbar-btn" type="button" onclick="formatDoc('bold')">B</button>
        <button class="toolbar-btn" type="button" onclick="formatDoc('italic')">I</button>
        <button class="toolbar-btn" type="button" onclick="insertTableAtSelection()">📊 Table</button>
        <button class="toolbar-btn" type="button" onclick="insertFormula()">∑ Formula</button>
        <button class="toolbar-btn" type="button" onclick="insertCitationPrompt()">[#] Cite</button>
      </div>
      <div class="editable-area" contenteditable="true" id="editor-${sec.id}" oninput="updateStats()">
        ${sec.content || "<p>Compose section content here...</p>"}
      </div>
    `;
    container.appendChild(secDiv);
  });
}

/* ==========================================================================
   Article Repository, Public Search Toolbar & Download System
   ========================================================================== */
function renderArticlesRepo(articles) {
  const container = document.getElementById("articleRepoList");
  const countBanner = document.getElementById("articleCountBanner");
  if (!container) return;

  container.innerHTML = "";

  if (countBanner) {
    countBanner.innerHTML = `Showing <strong>${articles.length}</strong> peer-reviewed articles across all pharmaceutical categories in <strong>Volume 1, Issue 1 (October 2026)</strong>`;
  }

  if (articles.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:48px 20px; background:var(--surface); border:1px dashed var(--border-color); border-radius:var(--radius);">
        <div style="font-size:36px; margin-bottom:12px;">🔍</div>
        <h3 style="font-size:18px; color:var(--text-main); margin-bottom:6px;">No articles match your search criteria</h3>
        <p style="font-size:13px; color:var(--text-muted); margin-bottom:16px;">Try adjusting your keywords, selecting a different article type or subject track, or clearing filters.</p>
        <button type="button" class="btn btn-outline btn-sm" onclick="resetArticleFilters()">Reset Search Filters</button>
      </div>
    `;
    return;
  }

  articles.forEach(art => {
    const card = document.createElement("div");
    card.className = "article-repo-card";
    card.innerHTML = `
      <div class="article-badges-row">
        <span class="badge-track" style="background:#e0e7ff; color:#3730a3;">${escapeHtml(art.type)}</span>
        <span class="badge-track">${escapeHtml(art.track)}</span>
        <span class="badge-open-access">🔓 Open Access (CC BY 4.0)</span>
        <span class="badge-doi">DOI: <a href="https://doi.org/${art.doi}" target="_blank" style="color:var(--accent); text-decoration:none;">${art.doi}</a></span>
      </div>

      <h3 class="article-title-link" onclick="openFullTextModal('${art.id}')">
        ${escapeHtml(art.title)}
      </h3>

      <div class="article-authors-text">
        ${escapeHtml(art.authors)}
      </div>

      <div class="article-citation-info">
        <em>Pharmionex Journal</em> • Vol. ${art.volume}, Iss. ${art.issue} (${art.year}), pp. ${art.pages} • Published under Creative Commons Attribution 4.0
      </div>

      <div class="article-abstract-text">
        <strong>Abstract:</strong> ${escapeHtml(art.abstract)}
      </div>

      <div style="font-size:12px; color:var(--text-muted); margin-bottom:14px;">
        <strong>Keywords:</strong> ${escapeHtml(art.keywords)}
      </div>

      <div class="article-actions-bar">
        <button type="button" class="btn btn-primary btn-sm" onclick="downloadArticlePDF('${art.id}')" title="Download Official Academic PDF">
          📥 Download PDF
        </button>
        <button type="button" class="btn btn-outline btn-sm" onclick="openFullTextModal('${art.id}')" title="Read Full Text Online">
          📄 Read Full Text
        </button>
        <button type="button" class="btn btn-outline btn-sm" onclick="copyArticleCitation('${art.id}')" title="Copy Formatted Citation">
          📋 Cite Article
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

function filterArticles() {
  const query = (document.getElementById("articleRepoSearchInput")?.value || "").toLowerCase().trim();
  const track = document.getElementById("articleFilterTrack")?.value || "ALL";
  const articleType = document.getElementById("articleFilterType")?.value || "ALL";
  const sortBy = document.getElementById("articleSortBy")?.value || "NEWEST";

  let filtered = publishedArticlesDataset.filter(art => {
    const matchesQuery = !query || 
      art.title.toLowerCase().includes(query) ||
      art.authors.toLowerCase().includes(query) ||
      art.abstract.toLowerCase().includes(query) ||
      art.keywords.toLowerCase().includes(query) ||
      art.doi.toLowerCase().includes(query) ||
      art.type.toLowerCase().includes(query);

    const matchesTrack = (track === "ALL") || (art.track === track);
    const matchesType = (articleType === "ALL") || (art.type === articleType);
    return matchesQuery && matchesTrack && matchesType;
  });

  if (sortBy === "TITLE") {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    // Default newest
    filtered.sort((a, b) => b.id.localeCompare(a.id));
  }

  renderArticlesRepo(filtered);
}

function resetArticleFilters() {
  if (document.getElementById("articleRepoSearchInput")) document.getElementById("articleRepoSearchInput").value = "";
  if (document.getElementById("articleFilterTrack")) document.getElementById("articleFilterTrack").value = "ALL";
  if (document.getElementById("articleFilterType")) document.getElementById("articleFilterType").value = "ALL";
  if (document.getElementById("articleSortBy")) document.getElementById("articleSortBy").value = "NEWEST";
  document.querySelectorAll(".repo-chip").forEach(c => c.classList.remove("active"));
  renderArticlesRepo(publishedArticlesDataset);
}

function quickFilterChip(topic) {
  const input = document.getElementById("articleRepoSearchInput");
  if (input) {
    input.value = topic;
    filterArticles();
  }
}

function downloadArticlePDF(articleId) {
  const art = publishedArticlesDataset.find(a => a.id === articleId);
  if (!art) {
    showToast("Article not found", "danger");
    return;
  }

  const a = document.createElement("a");
  a.href = art.pdfPath;
  a.download = `${art.id}-${art.title.slice(0, 30).toLowerCase().replace(/[^a-z0-9]+/g, '-')}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  showToast(`Downloading official PDF for "${art.title.slice(0, 40)}..."`, "success");
}

function openFullTextModal(articleId) {
  const art = publishedArticlesDataset.find(a => a.id === articleId);
  if (!art) return;

  const modal = document.getElementById("fullTextModal");
  const titleEl = document.getElementById("ftModalTitle");
  const metaEl = document.getElementById("ftModalMeta");
  const bodyEl = document.getElementById("ftModalBody");

  if (titleEl) titleEl.innerText = art.title;
  if (metaEl) {
    metaEl.innerHTML = `
      <div style="font-size:13px; color:var(--primary); font-weight:bold; margin-bottom:4px;">${escapeHtml(art.authors)}</div>
      <div style="font-size:12px; color:var(--text-muted);">
        <span class="badge-track" style="background:#e0e7ff; color:#3730a3; margin-right:6px;">${escapeHtml(art.type)}</span>
        <em>Pharmionex Journal</em> • Vol. ${art.volume}, Iss. ${art.issue} (${art.year}), pp. ${art.pages} • DOI: 
        <a href="https://doi.org/${art.doi}" target="_blank" style="color:var(--accent);">${art.doi}</a> • Open Access (CC BY 4.0)
      </div>
    `;
  }
  if (bodyEl) {
    bodyEl.innerHTML = `
      <div style="background:var(--surface-muted); padding:16px; border-radius:var(--radius-sm); border-left:4px solid var(--primary); margin-bottom:20px;">
        <h4 style="color:var(--primary); margin-bottom:6px; font-size:14px;">ABSTRACT</h4>
        <p style="font-size:13px; line-height:1.6; color:#334155;">${escapeHtml(art.abstract)}</p>
        <p style="font-size:12px; color:var(--text-muted); margin-top:8px;"><strong>Keywords:</strong> ${escapeHtml(art.keywords)}</p>
      </div>

      <h3 style="color:var(--primary); font-size:16px; margin:16px 0 8px;">1. Scientific Background & Rationale</h3>
      <p style="font-size:13px; line-height:1.7; margin-bottom:14px;">${escapeHtml(art.fullContent.intro)}</p>

      <h3 style="color:var(--primary); font-size:16px; margin:16px 0 8px;">2. Materials and Methodological Strategy</h3>
      <p style="font-size:13px; line-height:1.7; margin-bottom:14px;">${escapeHtml(art.fullContent.methods)}</p>

      <h3 style="color:var(--primary); font-size:16px; margin:16px 0 8px;">3. Quantitative Findings & Critical Discussion</h3>
      <p style="font-size:13px; line-height:1.7; margin-bottom:14px;">${escapeHtml(art.fullContent.results)}</p>

      <div style="background:#ffffff; border:1px solid var(--border-color); border-radius:6px; padding:12px; margin:16px 0; overflow-x:auto;">
        <table style="width:100%; border-collapse:collapse; font-size:12px;">
          <thead>
            <tr style="background:var(--surface-muted); border-bottom:2px solid var(--border-color);">
              <th style="padding:8px; text-align:left;">Quality Attribute / Assay Metric</th>
              <th style="padding:8px; text-align:center;">Measured Value</th>
              <th style="padding:8px; text-align:center;">ICH / Pharmacopoeial Limit</th>
              <th style="padding:8px; text-align:center;">Verification Status</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom:1px solid var(--border-light);">
              <td style="padding:8px;">Content Uniformity / Drug Assay</td>
              <td style="padding:8px; text-align:center;">99.82 ± 0.45%</td>
              <td style="padding:8px; text-align:center;">98.0% – 102.0%</td>
              <td style="padding:8px; text-align:center; color:var(--success); font-weight:bold;">Complies</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border-light);">
              <td style="padding:8px;">Intermediate Precision (% RSD)</td>
              <td style="padding:8px; text-align:center;">0.82%</td>
              <td style="padding:8px; text-align:center;">&lt; 2.0%</td>
              <td style="padding:8px; text-align:center; color:var(--success); font-weight:bold;">Complies</td>
            </tr>
            <tr>
              <td style="padding:8px;">Regression Linearity (r²)</td>
              <td style="padding:8px; text-align:center;">0.9998</td>
              <td style="padding:8px; text-align:center;">≥ 0.9990</td>
              <td style="padding:8px; text-align:center; color:var(--success); font-weight:bold;">Complies</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 style="color:var(--primary); font-size:16px; margin:16px 0 8px;">4. Translational Conclusion</h3>
      <p style="font-size:13px; line-height:1.7; margin-bottom:14px;">${escapeHtml(art.fullContent.conclusion)}</p>

      <div style="border-top:1px solid var(--border-light); padding-top:14px; margin-top:20px; font-size:12px; color:var(--text-muted);">
        <strong>Editor-in-Chief & Publisher:</strong> Vivek Sharma (pharmionex.journal@gmail.com)<br/>
        <strong>Publication:</strong> Pharmionex Scientific Publications • Open Access under CC BY 4.0
      </div>
    `;
  }

  const dlBtn = document.getElementById("ftModalDownloadBtn");
  if (dlBtn) {
    dlBtn.onclick = () => downloadArticlePDF(articleId);
  }

  if (modal) modal.classList.add("active");
}

function closeFullTextModal() {
  const modal = document.getElementById("fullTextModal");
  if (modal) modal.classList.remove("active");
}

function copyArticleCitation(articleId) {
  const art = publishedArticlesDataset.find(a => a.id === articleId);
  if (!art) return;

  const citation = `${art.authors}. ${art.title}. Pharmionex J. ${art.year};${art.volume}(${art.issue}):${art.pages}. doi:${art.doi}`;
  navigator.clipboard.writeText(citation).then(() => {
    showToast("Formatted citation copied to clipboard!", "success");
  }).catch(() => {
    copyCitationDirect(citation);
  });
}

/* ==========================================================================
   Public Manuscript Tracking System
   ========================================================================== */
function executeTrackArticle(targetId = null) {
  const input = document.getElementById("trackingIdInput");
  const rawId = (targetId || (input ? input.value : "")).trim();

  if (!rawId) {
    showToast("Please enter a Manuscript Tracking ID", "warning");
    return;
  }

  const normalizedId = rawId.toUpperCase();
  const resultContainer = document.getElementById("trackingResultContainer");
  if (!resultContainer) return;

  resultContainer.innerHTML = `
    <div style="text-align:center; padding:40px 20px;">
      <div class="indicator-dot" style="width:16px; height:16px; margin:0 auto 12px; background:var(--accent);"></div>
      <p style="font-size:14px; color:var(--text-muted);">Querying Pharmionex Journal tracking database for <strong>${escapeHtml(normalizedId)}</strong>...</p>
    </div>
  `;

  // If Vivek Sharma has configured Google Apps Script Web App URL, query it first
  if (GOOGLE_APPS_SCRIPT_URL) {
    const fetchUrl = `${GOOGLE_APPS_SCRIPT_URL}?action=track&id=${encodeURIComponent(normalizedId)}`;
    fetch(fetchUrl)
      .then(res => res.json())
      .then(data => {
        if (data && data.found) {
          renderTrackResult(data, true);
        } else {
          fallbackLocalTracking(normalizedId);
        }
      })
      .catch(err => {
        console.warn("GAS tracking query failed, checking local registry:", err);
        fallbackLocalTracking(normalizedId);
      });
  } else {
    fallbackLocalTracking(normalizedId);
  }
}

function fallbackLocalTracking(id) {
  const record = trackingRegistry[id];
  if (record) {
    renderTrackResult(record, false);
  } else {
    const resultContainer = document.getElementById("trackingResultContainer");
    resultContainer.innerHTML = `
      <div style="text-align:center; padding:48px 20px; background:var(--surface); border:1px solid #fecaca; border-radius:var(--radius); margin-top:16px;">
        <div style="font-size:40px; margin-bottom:12px;">⚠️</div>
        <h3 style="font-size:18px; color:var(--danger); margin-bottom:6px;">Tracking ID Not Found: ${escapeHtml(id)}</h3>
        <p style="font-size:13px; color:var(--text-muted); max-width:540px; margin:0 auto 16px;">
          Please verify the Tracking ID format (e.g., <code>PHARMIONEX-2026-4109</code>). Tracking IDs are case-insensitive and assigned automatically upon submission acknowledgment.
        </p>
        <div style="display:flex; justify-content:center; gap:8px;">
          <button type="button" class="btn btn-outline btn-sm" onclick="quickTrackSample('PHARMIONEX-2026-4109')">Try Sample ID: PHARMIONEX-2026-4109</button>
          <a href="mailto:pharmionex.journal@gmail.com?subject=Tracking%20Query:%20${escapeHtml(id)}" class="btn btn-primary btn-sm">Contact Editorial Office</a>
        </div>
      </div>
    `;
    showToast(`No record found for ${id}`, "danger");
  }
}

function quickTrackSample(id) {
  const input = document.getElementById("trackingIdInput");
  if (input) input.value = id;
  executeTrackArticle(id);
}

function renderTrackResult(data, isLiveFromGas = false) {
  const container = document.getElementById("trackingResultContainer");
  if (!container) return;

  const currentStage = parseInt(data.stage) || 2;
  const stageTitles = [
    "1. Submission Received",
    "2. Scope & Plagiarism Check",
    "3. Double-Blind Peer Review",
    "4. Reviewer Revisions",
    "5. Acceptance Decision",
    "6. Published in Issue"
  ];

  const progressPercent = Math.min(100, Math.round(((currentStage - 1) / 5) * 100));

  let stepsHtml = "";
  for (let s = 1; s <= 6; s++) {
    let nodeClass = "stepper-stage-node";
    let icon = s;
    if (s < currentStage) {
      nodeClass += " completed";
      icon = "✓";
    } else if (s === currentStage) {
      nodeClass += " current";
      icon = "⏳";
    }

    stepsHtml += `
      <div class="${nodeClass}">
        <div class="stepper-stage-circle">${icon}</div>
        <div class="stepper-stage-name">${stageTitles[s-1]}</div>
      </div>
    `;
  }

  let timelineItemsHtml = "";
  if (data.timeline && data.timeline.length > 0) {
    data.timeline.forEach(item => {
      timelineItemsHtml += `
        <div class="timeline-item">
          <div class="timeline-dot" style="background:${item.status === 'completed' ? 'var(--success)' : (item.status === 'current' ? 'var(--accent)' : '#94a3b8')};"></div>
          <div style="flex:1;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <strong>${escapeHtml(item.title)}</strong>
              <span style="font-size:11px; color:var(--text-muted); font-weight:600;">${escapeHtml(item.date)}</span>
            </div>
            <p style="font-size:12px; color:#475569; margin-top:3px;">${escapeHtml(item.remarks)}</p>
          </div>
        </div>
      `;
    });
  }

  container.innerHTML = `
    <div class="track-result-panel">
      <div class="track-header-row">
        <div>
          <div style="font-size:12px; text-transform:uppercase; letter-spacing:0.5px; font-weight:700; color:var(--accent); margin-bottom:4px;">
            ${isLiveFromGas ? '🟢 Live Cloud Synchronization (Google Sheet)' : '⚡ Active Editorial Record'}
          </div>
          <h2 style="font-size:20px; font-weight:700; color:var(--text-main); margin-bottom:4px;">
            ${escapeHtml(data.title)}
          </h2>
          <div style="font-size:13px; color:var(--text-muted);">
            Tracking ID: <strong style="font-family:monospace; color:var(--primary);">${escapeHtml(data.trackingId)}</strong> • 
            Article Type: <strong>${escapeHtml(data.articleType || 'Original Research Article')}</strong> • 
            Track: <strong>${escapeHtml(data.track)}</strong> • 
            Submitted: <strong>${escapeHtml(data.submissionDate)}</strong>
          </div>
        </div>
        <div style="text-align:right;">
          <span class="stat-pill" style="font-size:13px; font-weight:700; background:var(--primary-light); color:var(--primary); padding:6px 14px; border-radius:20px;">
            Status: ${escapeHtml(data.status)}
          </span>
        </div>
      </div>

      <!-- 6-Stage Progress Stepper -->
      <div class="stepper-container">
        <div class="stepper-progress-bar">
          <div class="stepper-progress-fill" style="width: ${progressPercent}%;"></div>
        </div>
        <div class="stepper-steps-wrapper">
          ${stepsHtml}
        </div>
      </div>

      <!-- Metadata & Peer Review Grid -->
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:16px; margin:24px 0;">
        <div style="background:var(--surface-muted); padding:16px; border-radius:var(--radius-sm); border-left:3px solid var(--primary);">
          <strong style="font-size:13px; color:var(--primary);">Authorship & Submission Details</strong>
          <div style="font-size:12px; margin-top:8px; line-height:1.7;">
            <div><strong>Corresponding Author:</strong> ${escapeHtml(data.author)}</div>
            <div><strong>Registered Email:</strong> ${escapeHtml(data.email || 'Author on file')}</div>
            <div><strong>Affiliation:</strong> ${escapeHtml(data.affiliation || 'University Department')}</div>
          </div>
        </div>

        <div style="background:var(--surface-muted); padding:16px; border-radius:var(--radius-sm); border-left:3px solid var(--secondary);">
          <strong style="font-size:13px; color:var(--secondary);">Editorial Governance</strong>
          <div style="font-size:12px; margin-top:8px; line-height:1.7;">
            <div><strong>Editor-in-Chief:</strong> Vivek Sharma</div>
            <div><strong>Editorial Contact:</strong> <a href="mailto:pharmionex.journal@gmail.com" style="color:var(--accent);">pharmionex.journal@gmail.com</a></div>
            <div><strong>Plagiarism Audit:</strong> ${escapeHtml(data.plagiarismScore || '< 10% Verified')}</div>
            <div><strong>Reviewers Assigned:</strong> ${escapeHtml(data.assignedReviewers || '2 External Reviewers')}</div>
          </div>
        </div>
      </div>

      <!-- Editorial Notes & Action Log -->
      <div class="timeline-log-card">
        <h4 style="font-size:14px; font-weight:700; color:var(--primary); margin-bottom:8px;">
          📅 Editorial Milestones & Decision Log
        </h4>
        <div style="margin-bottom:12px; padding:10px; background:#ffffff; border-radius:4px; font-size:13px; border:1px solid var(--border-light);">
          <strong>Latest Remarks from Editor Vivek Sharma:</strong>
          <p style="margin-top:4px; color:#334155; font-style:italic;">"${escapeHtml(data.editorRemarks || 'Manuscript under active double-blind peer review.')}"</p>
        </div>
        ${timelineItemsHtml}
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-top:24px; padding-top:18px; border-top:1px solid var(--border-light);">
        <div style="font-size:12px; color:var(--text-muted);">
          ISSN Status: <strong>Application in Process (NIScPR, India)</strong> • UGC-CARE & COPE Aligned
        </div>
        <div style="display:flex; gap:8px;">
          <button type="button" class="btn btn-outline btn-sm" onclick="downloadStatusReport('${escapeHtml(data.trackingId)}')">
            📄 Download Official Status Summary
          </button>
          <a href="mailto:pharmionex.journal@gmail.com?subject=Inquiry:%20Manuscript%20${escapeHtml(data.trackingId)}" class="btn btn-primary btn-sm">
            ✉️ Email Editorial Office
          </a>
        </div>
      </div>
    </div>
  `;
}

function downloadStatusReport(trackingId) {
  const item = trackingRegistry[trackingId];
  if (!item) {
    showToast("Unable to download report: record not found", "danger");
    return;
  }

  const reportText = `PHARMIONEX JOURNAL - OFFICIAL EDITORIAL STATUS REPORT
================================================================================
Journal: Pharmionex Journal (Intl J of Pharmaceutical, Biomedical & Clinical Res)
ISSN: Application in Process (National Science Library - NIScPR, New Delhi)
Editor-in-Chief: Vivek Sharma (pharmionex.journal@gmail.com)
Date of Report: ${new Date().toLocaleString()}
================================================================================
MANUSCRIPT DETAILS:
Tracking ID: ${item.trackingId}
Article Type: ${item.articleType || 'Original Research Article'}
Article Title: ${item.title}
Subject Track: ${item.track}
Corresponding Author: ${item.author} (${item.email})
Affiliation: ${item.affiliation}
Submission Date: ${item.submissionDate}

EDITORIAL STATUS:
Current Stage: Stage ${item.stage} of 6 (${item.status})
Assigned Editor: Vivek Sharma
Similarity Index: ${item.plagiarismScore}
Reviewers: ${item.assignedReviewers}
Editor Remarks: ${item.editorRemarks}

TIMELINE MILESTONES:
${(item.timeline || []).map(t => `- [${t.date}] ${t.title}: ${t.remarks}`).join('\n')}
================================================================================
This official status summary is issued by Pharmionex Scientific Publications.
For inquiries, contact Editor-in-Chief Vivek Sharma at: pharmionex.journal@gmail.com
================================================================================`;

  const blob = new Blob([reportText], { type: "text/plain;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `Pharmionex-Status-Report-${trackingId}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  showToast(`Status report downloaded for ${trackingId}`, "success");
}

/* ==========================================================================
   Google Apps Script Automation & Webhook Controls for Vivek Sharma
   ========================================================================== */
function saveGasUrl() {
  const input = document.getElementById("gasWebhookUrlInput");
  if (!input) return;
  const url = input.value.trim();
  GOOGLE_APPS_SCRIPT_URL = url;
  localStorage.setItem("pharmionex_gas_url", url);
  showToast("Google Apps Script URL saved successfully!", "success");
}

function testGasConnection() {
  const input = document.getElementById("gasWebhookUrlInput");
  const url = (input ? input.value : GOOGLE_APPS_SCRIPT_URL).trim();

  if (!url) {
    showToast("Please paste your Google Apps Script Web App URL first", "warning");
    return;
  }

  showToast("Testing Google Apps Script Web App connection...", "info");
  const testUrl = `${url}?action=ping`;

  fetch(testUrl)
    .then(res => res.json())
    .then(data => {
      if (data && data.status === "online") {
        showToast(`Connected! Editor: ${data.editor}, Journal: ${data.journal}`, "success");
        const statusEl = document.getElementById("gasStatusBadge");
        if (statusEl) {
          statusEl.innerHTML = `<span style="color:var(--success); font-weight:bold;">🟢 Connected to Google Sheets API (${data.editor})</span>`;
        }
      } else {
        showToast("Connected, but unexpected response format received.", "warning");
      }
    })
    .catch(err => {
      showToast("Could not connect to Apps Script. Ensure Web App is deployed with 'Who has access: Anyone'.", "danger");
      console.error("GAS connection error:", err);
    });
}

function copyGasCode() {
  const codeEl = document.getElementById("gasCodeSnippet");
  if (!codeEl) return;
  navigator.clipboard.writeText(codeEl.innerText).then(() => {
    showToast("Google Apps Script Code.gs copied to clipboard!", "success");
  }).catch(() => {
    copyCitationDirect(codeEl.innerText);
  });
}

/* ==========================================================================
   Author Submission Wizard & Form Handlers
   ========================================================================== */
function renderAuthors() {
  const container = document.getElementById("authorsContainer");
  if (!container) return;
  container.innerHTML = "";

  state.authors.forEach((author, index) => {
    const row = document.createElement("div");
    row.className = "author-item";
    row.innerHTML = `
      <div class="author-grid">
        <div>
          <label>Full Name</label>
          <input type="text" value="${escapeHtml(author.name)}" placeholder="e.g. Vivek Sharma" oninput="updateAuthor(${index}, 'name', this.value)">
        </div>
        <div>
          <label>Email Address</label>
          <input type="email" value="${escapeHtml(author.email)}" placeholder="pharmionex.journal@gmail.com" oninput="updateAuthor(${index}, 'email', this.value)">
        </div>
        <div>
          <label>Affiliation / University</label>
          <input type="text" value="${escapeHtml(author.affiliation)}" placeholder="Department of Pharmaceutical Sciences" oninput="updateAuthor(${index}, 'affiliation', this.value)">
        </div>
        <div>
          <label>ORCID iD</label>
          <input type="text" value="${escapeHtml(author.orcid || '')}" placeholder="0000-0002-1825-0097" oninput="updateAuthor(${index}, 'orcid', this.value)">
        </div>
      </div>
      <div class="author-actions">
        <label style="display:flex; align-items:center; gap:6px; cursor:pointer;">
          <input type="radio" name="correspondingAuthor" ${author.isCorresponding ? 'checked' : ''} onchange="setCorrespondingAuthor(${index})">
          <span><strong>Corresponding Author</strong></span>
        </label>
        <div>
          ${state.authors.length > 1 ? `<button type="button" class="btn btn-danger btn-sm" onclick="removeAuthor(${index})">Remove Author</button>` : ''}
        </div>
      </div>
    `;
    container.appendChild(row);
  });

  const countBadge = document.getElementById("authorCountBadge");
  if (countBadge) countBadge.innerText = state.authors.length;
}

function addAuthorRow() {
  state.authors.push({
    name: "",
    email: "",
    affiliation: "",
    country: "India",
    orcid: "",
    isCorresponding: false
  });
  renderAuthors();
  triggerAutoSave();
}

function removeAuthor(index) {
  if (state.authors.length <= 1) return;
  const wasCorr = state.authors[index].isCorresponding;
  state.authors.splice(index, 1);
  if (wasCorr) state.authors[0].isCorresponding = true;
  renderAuthors();
  triggerAutoSave();
}

function updateAuthor(index, field, value) {
  state.authors[index][field] = value;
  triggerAutoSave();
}

function setCorrespondingAuthor(index) {
  state.authors.forEach((a, i) => {
    a.isCorresponding = (i === index);
  });
  renderAuthors();
  triggerAutoSave();
}

function formatDoc(cmd, val = null) {
  document.execCommand(cmd, false, val);
  const active = document.getElementById(lastActiveEditorId);
  if (active) active.focus();
  updateStats();
}

function insertTableAtSelection() {
  const html = `
    <table style="width:100%; border-collapse:collapse; margin:14px 0; font-size:13px;">
      <thead>
        <tr style="background:#f1f5f9; border-bottom:2px solid #cbd5e1;">
          <th style="border:1px solid #cbd5e1; padding:8px; text-align:left;">Sample / Batch ID</th>
          <th style="border:1px solid #cbd5e1; padding:8px; text-align:center;">Assay (%)</th>
          <th style="border:1px solid #cbd5e1; padding:8px; text-align:center;">Retention Time (min)</th>
          <th style="border:1px solid #cbd5e1; padding:8px; text-align:center;">% RSD</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border:1px solid #cbd5e1; padding:8px;">Batch-01</td>
          <td style="border:1px solid #cbd5e1; padding:8px; text-align:center;">99.82</td>
          <td style="border:1px solid #cbd5e1; padding:8px; text-align:center;">3.45</td>
          <td style="border:1px solid #cbd5e1; padding:8px; text-align:center;">0.42</td>
        </tr>
        <tr>
          <td style="border:1px solid #cbd5e1; padding:8px;">Batch-02</td>
          <td style="border:1px solid #cbd5e1; padding:8px; text-align:center;">100.14</td>
          <td style="border:1px solid #cbd5e1; padding:8px; text-align:center;">3.44</td>
          <td style="border:1px solid #cbd5e1; padding:8px; text-align:center;">0.38</td>
        </tr>
      </tbody>
    </table><p></p>
  `;
  document.execCommand("insertHTML", false, html);
  updateStats();
}

function insertFormula() {
  const f = prompt("Enter standard formula or notation (e.g. C_max = (Dose * F) / V_d):", "C_max = (Dose * F) / V_d");
  if (f) {
    const html = `<span style="font-family:serif; font-style:italic; background:#f1f5f9; padding:2px 8px; border-radius:4px; border:1px solid #cbd5e1;">${escapeHtml(f)}</span>&nbsp;`;
    document.execCommand("insertHTML", false, html);
    updateStats();
  }
}

function insertCitationPrompt() {
  const num = prompt("Enter reference citation index number (e.g. 1 or 2,3):", (state.references.length || 1).toString());
  if (num) {
    const html = `<sup><a href="#ref-${num}" style="color:#2563eb; text-decoration:none; font-weight:bold;">[${escapeHtml(num)}]</a></sup>&nbsp;`;
    document.execCommand("insertHTML", false, html);
    updateStats();
  }
}

function insertPharmaTemplate(type) {
  let content = "";
  if (type === "chromatography") {
    content = `
      <p><strong>Chromatographic Conditions:</strong> High-performance liquid chromatography was performed using an isocratic C18 stationary phase (250 × 4.6 mm, 5 µm particle size). Mobile phase: Acetonitrile:Phosphate Buffer (pH 4.5) (60:40 v/v), flow rate: 1.0 mL/min, detection wavelength: 228 nm, injection volume: 10 µL, ambient column temperature.</p>
    `;
  } else if (type === "dissolution") {
    content = `
      <p><strong>In-Vitro Dissolution Methodology:</strong> Dissolution testing was executed using USP Apparatus 1 (Basket Method) at 100 rpm in 900 mL of simulated gastric fluid (pH 1.2) maintained at 37°C ± 0.5°C. Samples (5 mL) were withdrawn at 5, 10, 15, 30, 45, and 60 minutes with automated sink replacement and quantified by UV spectrophotometry.</p>
    `;
  } else if (type === "synthesis") {
    content = `
      <p><strong>Lipid Nanocarrier Homogenization Protocol:</strong> Solid lipid (Precirol ATO 5) and liquid lipid (Oleic acid) were melted at 75°C. Active ingredient was dissolved in lipid phase. The aqueous surfactant solution (Poloxamer 188) was preheated to 75°C, added dropwise under high-shear homogenization (12,000 rpm, 10 min), followed by 5 cycles of high-pressure homogenization at 800 bar.</p>
    `;
  } else if (type === "stability") {
    content = `
      <p><strong>ICH Q1A Accelerated Stability Testing:</strong> Packaged dosage forms were placed in stability chambers maintained at 40°C ± 2°C and 75% RH ± 5% RH for 6 months. Quality attributes evaluated at 0, 1, 2, 3, and 6-month intervals included physical appearance, assay content, degradation impurities, and dissolution profile.</p>
    `;
  }

  document.execCommand("insertHTML", false, content);
  updateStats();
  showToast("Pharmacological template inserted", "info");
}

function insertCustomSection() {
  const title = prompt("Enter Title for Custom Manuscript Section:", "Additional Methodology & Protocols");
  if (!title) return;

  const id = "custom_" + Date.now();
  state.sections.push({ id: id, title: title, content: "" });

  const container = document.getElementById("customSectionsContainer");
  if (!container) return;
  const secDiv = document.createElement("div");
  secDiv.className = "editor-section";
  secDiv.id = "sec-" + id;
  secDiv.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
      <h3 style="font-size:15px; font-weight:700; color:var(--primary);">${escapeHtml(title)}</h3>
      <button type="button" class="btn btn-danger btn-sm" onclick="removeSection('${id}')">Delete Section</button>
    </div>
    <div class="editor-toolbar">
      <button class="toolbar-btn" type="button" onclick="formatDoc('bold')">B</button>
      <button class="toolbar-btn" type="button" onclick="formatDoc('italic')">I</button>
      <button class="toolbar-btn" type="button" onclick="insertCitationPrompt()">[#] Cite</button>
    </div>
    <div class="editable-area" contenteditable="true" id="editor-${id}" oninput="updateStats()">
      <p>Compose custom research section content here...</p>
    </div>
  `;
  container.appendChild(secDiv);
  updateStats();
  showToast("Custom section created", "success");
}

function removeSection(id) {
  state.sections = state.sections.filter(s => s.id !== id);
  const el = document.getElementById("sec-" + id);
  if (el) el.remove();
  updateStats();
  triggerAutoSave();
}

function renderReferences() {
  const container = document.getElementById("referencesList");
  if (!container) return;
  container.innerHTML = "";

  state.references.forEach((ref, idx) => {
    const li = document.createElement("div");
    li.className = "ref-item";
    li.style = "display:flex; justify-content:space-between; align-items:flex-start; gap:10px; margin-bottom:8px; font-size:13px; padding:6px 0; border-bottom:1px solid #e2e8f0;";
    li.innerHTML = `
      <div><strong>[${idx + 1}]</strong> ${escapeHtml(ref)}</div>
      <button type="button" class="btn btn-danger btn-sm" onclick="deleteReference(${idx})">✕</button>
    `;
    container.appendChild(li);
  });

  const refBadge = document.getElementById("refCountBadge");
  if (refBadge) refBadge.innerText = state.references.length;
}

function addReferencePrompt() {
  const ref = prompt("Enter Reference in Vancouver or APA format (e.g. Sharma V, et al. Pharmionex J. 2026;1(1):1-16):");
  if (ref && ref.trim()) {
    state.references.push(ref.trim());
    renderReferences();
    updateStats();
    triggerAutoSave();
    showToast("Reference added to bibliography", "success");
  }
}

function deleteReference(idx) {
  state.references.splice(idx, 1);
  renderReferences();
  updateStats();
  triggerAutoSave();
}

function copyCitationDirect(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast("Citation copied to clipboard!", "success");
  });
}

function handleFileUpload(e, type) {
  const files = e.target.files;
  if (!files || files.length === 0) return;

  if (type === "primary") {
    const f = files[0];
    state.uploadedFiles.primary = { name: f.name, size: f.size };
    const pList = document.getElementById("primaryFileList");
    if (pList) {
      pList.innerHTML = `
        <div class="file-card">
          <div><strong>📄 ${escapeHtml(f.name)}</strong> (${formatBytes(f.size)})</div>
          <button type="button" class="btn btn-danger btn-sm" onclick="removePrimaryFile()">Remove</button>
        </div>
      `;
    }
    showToast("Primary manuscript file loaded", "success");
  } else {
    Array.from(files).forEach(f => {
      state.uploadedFiles.supplementary.push({ name: f.name, size: f.size });
    });
    renderSuppFiles();
    showToast(`${files.length} supplementary file(s) attached`, "success");
  }
  triggerAutoSave();
}

function removePrimaryFile() {
  state.uploadedFiles.primary = null;
  const input = document.getElementById("manuscriptFileInput");
  if (input) input.value = "";
  const pList = document.getElementById("primaryFileList");
  if (pList) pList.innerHTML = "";
  triggerAutoSave();
}

function renderSuppFiles() {
  const list = document.getElementById("suppFileList");
  if (!list) return;
  list.innerHTML = "";
  state.uploadedFiles.supplementary.forEach((f, idx) => {
    const d = document.createElement("div");
    d.className = "file-card";
    d.innerHTML = `
      <div><strong>📦 ${escapeHtml(f.name)}</strong> (${formatBytes(f.size)})</div>
      <button type="button" class="btn btn-danger btn-sm" onclick="removeSuppFile(${idx})">Remove</button>
    `;
    list.appendChild(d);
  });
}

function removeSuppFile(idx) {
  state.uploadedFiles.supplementary.splice(idx, 1);
  renderSuppFiles();
  triggerAutoSave();
}

function updateStats() {
  const typeSelect = document.getElementById("articleType");
  if (typeSelect) state.articleType = typeSelect.value;
  state.title = document.getElementById("articleTitle") ? document.getElementById("articleTitle").value : "";
  state.keywords = document.getElementById("articleKeywords") ? document.getElementById("articleKeywords").value : "";
  state.abstract = document.getElementById("articleAbstract") ? document.getElementById("articleAbstract").value : "";
  state.track = document.getElementById("articleTrack") ? document.getElementById("articleTrack").value : "Pharmaceutics & Targeted Drug Delivery";

  let allText = state.title + " " + state.abstract + " ";
  const absWords = state.abstract.trim() ? state.abstract.trim().split(/\s+/).length : 0;
  if (document.getElementById("abstractWordCount")) {
    document.getElementById("abstractWordCount").innerText = absWords;
  }

  state.sections.forEach(sec => {
    const el = document.getElementById("editor-" + sec.id);
    if (el) {
      sec.content = el.innerHTML;
      allText += el.innerText + " ";
    }
  });

  const words = allText.trim() ? allText.trim().split(/\s+/).length : 0;
  const chars = allText.length;

  if (document.getElementById("totalWordCount")) document.getElementById("totalWordCount").innerText = words;
  if (document.getElementById("totalCharCount")) document.getElementById("totalCharCount").innerText = chars;
  triggerAutoSave();
}

function renderLivePreview() {
  updateStats();

  if (document.getElementById("pvTitle")) document.getElementById("pvTitle").innerText = state.title || "Untitled Manuscript";
  if (document.getElementById("pvArticleType")) document.getElementById("pvArticleType").innerText = state.articleType || "Original Research Article";
  const authorsFormatted = state.authors.filter(a => a.name.trim()).map(a => `${a.name}${a.isCorresponding ? ' *' : ''}`).join(", ");
  if (document.getElementById("pvAuthors")) document.getElementById("pvAuthors").innerText = authorsFormatted || "No authors listed";

  const affils = state.authors.filter(a => a.affiliation.trim()).map(a => `${a.name}: ${a.affiliation}`).join(" | ");
  if (document.getElementById("pvAffiliations")) document.getElementById("pvAffiliations").innerText = affils || "Affiliation not specified";

  if (document.getElementById("pvAbstract")) document.getElementById("pvAbstract").innerText = state.abstract || "No abstract text provided.";
  if (document.getElementById("pvKeywords")) document.getElementById("pvKeywords").innerHTML = `<strong>Keywords:</strong> ${escapeHtml(state.keywords || "None")}`;

  const pvBody = document.getElementById("pvBody");
  if (pvBody) {
    pvBody.innerHTML = "";
    state.sections.forEach(sec => {
      const h = document.createElement("h2");
      h.className = "preview-section-title";
      h.innerText = sec.title;
      const b = document.createElement("div");
      b.innerHTML = sec.content || "<p>No content provided in this section.</p>";
      pvBody.appendChild(h);
      pvBody.appendChild(b);
    });
  }

  const pvRef = document.getElementById("pvReferences");
  if (pvRef) {
    pvRef.innerHTML = "";
    state.references.forEach(r => {
      const li = document.createElement("li");
      li.innerText = r;
      pvRef.appendChild(li);
    });
  }
}

function toggleColumns() {
  const pvCols = document.getElementById("pvColumns");
  if (pvCols) pvCols.classList.toggle("single-col");
}

/* ==========================================================================
   Submit Article to Journal (Integration with Tracking & Google Apps Script)
   ========================================================================== */
function submitArticleToJournal() {
  updateStats();

  if (!state.title.trim()) {
    showToast("Please provide an Article Title before submitting", "danger");
    jumpToWizardStep(1);
    return;
  }
  if (!state.abstract.trim()) {
    showToast("Please provide an Abstract before submitting", "danger");
    jumpToWizardStep(1);
    return;
  }

  const chkOrig = document.getElementById("chkOriginality")?.checked;
  const chkAuth = document.getElementById("chkAuthorship")?.checked;
  const chkCopy = document.getElementById("chkCopyright")?.checked;
  if (!chkOrig || !chkAuth || !chkCopy) {
    showToast("Please accept all required ethics and plagiarism checkboxes", "danger");
    jumpToWizardStep(6);
    return;
  }

  const year = new Date().getFullYear();
  const rand = Math.floor(1000 + Math.random() * 9000);
  const subId = `PHARMIONEX-${year}-${rand}`;
  state.submissionId = subId;

  const dateStr = new Date().toLocaleDateString();
  const authorName = state.authors[0]?.name || "Contributing Author";
  const authorEmail = state.authors[0]?.email || "pharmionex.journal@gmail.com";
  const affiliation = state.authors[0]?.affiliation || "Academic Institution";

  // Create submission record for live tracking
  const newSubmissionRecord = {
    trackingId: subId,
    articleType: state.articleType,
    title: state.title,
    track: state.track,
    author: authorName,
    email: authorEmail,
    affiliation: affiliation,
    submissionDate: dateStr,
    status: "Under Initial Editorial Screening",
    stage: 1,
    plagiarismScore: "Queued for Turnitin Plagiarism Check (< 10%)",
    assignedEditor: "Vivek Sharma (Editor-in-Chief)",
    assignedReviewers: "Pending Scope Review",
    reviewerComments: "Awaiting initial editorial evaluation.",
    editorRemarks: `Manuscript (${state.articleType}) formally received and assigned to Vivek Sharma. Turnitin similarity screening and formatting review in progress.`,
    timeline: [
      { stage: 1, title: "Submission Received & Acknowledged", date: dateStr, status: "current", remarks: `Formal acknowledgment generated for ${state.articleType}. Tracking ID assigned.` },
      { stage: 2, title: "Initial Scope & Plagiarism Check (< 10%)", date: "In Progress", status: "pending", remarks: "Turnitin anti-plagiarism screening underway." },
      { stage: 3, title: "Double-Blind Peer Review", date: "Scheduled", status: "pending", remarks: "Will be assigned to two independent external reviewers." },
      { stage: 4, title: "Author Revisions (if required)", date: "Pending", status: "pending", remarks: "Subject to reviewer assessment." },
      { stage: 5, title: "Editorial Acceptance Decision", date: "Pending", status: "pending", remarks: "Decision by Editor-in-Chief Vivek Sharma." },
      { stage: 6, title: "Typesetting, Galley Proof & Publication", date: "Pending", status: "pending", remarks: "Scheduled for next monthly issue." }
    ]
  };

  // Register in local tracking pool
  trackingRegistry[subId] = newSubmissionRecord;
  try {
    const saved = JSON.parse(localStorage.getItem("pharmionex_submissions") || "{}");
    saved[subId] = newSubmissionRecord;
    localStorage.setItem("pharmionex_submissions", JSON.stringify(saved));
  } catch (e) {
    console.warn("Could not save to localStorage", e);
  }

  // If Google Apps Script Web App is configured, asynchronously send submission
  if (GOOGLE_APPS_SCRIPT_URL) {
    const payload = {
      title: state.title,
      articleType: state.articleType,
      track: state.track,
      abstract: state.abstract,
      keywords: state.keywords,
      authorName: authorName,
      authorEmail: authorEmail,
      affiliation: affiliation,
      coAuthors: state.authors.slice(1).map(a => a.name).join(", "),
      iaecProtocol: document.getElementById("iaecProtocol")?.value || "Not Applicable",
      funding: document.getElementById("fundingStatement")?.value || "Institutional Research Support",
      coi: document.getElementById("coiStatement")?.value || "None declared",
      fileUrl: state.uploadedFiles.primary?.name || "Uploaded via Portal"
    };

    fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }).then(() => {
      console.log("Submission pushed to Google Sheet via Apps Script Web App");
    }).catch(err => console.warn("Google Apps Script sync warning:", err));
  }

  // Display Official Receipt
  const receiptHTML = `
    <strong>Manuscript Tracking ID:</strong> <span style="color:var(--primary); font-size:14px; font-weight:bold;">${subId}</span><br>
    <strong>Journal:</strong> Pharmionex Journal (Intl J of Pharmaceutical, Biomedical & Clinical Research)<br>
    <strong>ISSN Status:</strong> Application in Process (NIScPR, India)<br>
    <strong>Editor-in-Chief:</strong> Vivek Sharma (pharmionex.journal@gmail.com)<br>
    <strong>Article Type:</strong> ${escapeHtml(state.articleType)}<br>
    <strong>Title:</strong> ${escapeHtml(state.title)}<br>
    <strong>Subject Track:</strong> ${escapeHtml(state.track)}<br>
    <strong>Corresponding Author:</strong> ${escapeHtml(authorName)} (${escapeHtml(authorEmail)})<br>
    <strong>Ethics / Protocol:</strong> ${escapeHtml(document.getElementById('iaecProtocol')?.value || 'Not Applicable')}<br>
    <strong>Plagiarism Audit:</strong> Queued for Turnitin / iThenticate (&lt; 10% similarity check)<br>
    <strong>Submission Date:</strong> ${new Date().toLocaleString()}<br>
    <strong>Current Status:</strong> Under Initial Editorial & Plagiarism Screening
  `;

  const receiptEl = document.getElementById("submissionReceipt");
  if (receiptEl) receiptEl.innerHTML = receiptHTML;

  const modal = document.getElementById("submissionModal");
  if (modal) modal.classList.add("active");

  showToast("Manuscript successfully submitted!", "success");
}

function trackSubmittedManuscript(subId) {
  closeModal();
  switchMainView("track");
  const input = document.getElementById("trackingIdInput");
  if (input) input.value = subId;
  executeTrackArticle(subId);
}

function closeModal() {
  const modal = document.getElementById("submissionModal");
  if (modal) modal.classList.remove("active");
}

function downloadSubmissionReceipt() {
  const text = `PHARMIONEX JOURNAL - OFFICIAL SUBMISSION RECEIPT
============================================================
Manuscript Tracking ID: ${state.submissionId}
Journal: Pharmionex Journal
ISSN: Application in Process (National Science Library - NIScPR, India)
Editor-in-Chief: Vivek Sharma (pharmionex.journal@gmail.com)
Article Type: ${state.articleType}
Title: ${state.title}
Subject Track: ${state.track}
Authors: ${state.authors.map(a => a.name).join(", ")}
Date: ${new Date().toLocaleString()}
Turnitin Plagiarism Policy: < 10% Similarity Screening Required
Initial Status: Acknowledged & Assigned to Vivek Sharma
============================================================`;
  const blob = new Blob([text], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `Submission-Receipt-${state.submissionId}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// Auto-save logic
let saveTimeout = null;
function triggerAutoSave() {
  const dot = document.getElementById("saveDot");
  const status = document.getElementById("saveStatus");
  if (dot) dot.style.background = "#eab308";
  if (status) status.innerText = "Saving draft...";

  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    saveDraftToStorage();
    if (dot) dot.style.background = "#16a34a";
    if (status) status.innerText = "Draft auto-saved at " + new Date().toLocaleTimeString();
  }, 800);
}

function saveDraftManual() {
  updateStats();
  saveDraftToStorage();
  showToast("Draft saved successfully to browser storage!", "success");
}

function saveDraftToStorage() {
  state.declarations.iaecProtocol = document.getElementById("iaecProtocol") ? document.getElementById("iaecProtocol").value : "";
  state.declarations.ctriNumber = document.getElementById("ctriNumber") ? document.getElementById("ctriNumber").value : "";
  state.declarations.funding = document.getElementById("fundingStatement") ? document.getElementById("fundingStatement").value : "";
  state.declarations.coi = document.getElementById("coiStatement") ? document.getElementById("coiStatement").value : "";
  state.declarations.dataAvailability = document.getElementById("dataAvailability") ? document.getElementById("dataAvailability").value : "";

  localStorage.setItem("pharmionex_draft", JSON.stringify(state));
}

function loadDraftFromStorage() {
  const saved = localStorage.getItem("pharmionex_draft");
  if (!saved) return;
  try {
    const parsed = JSON.parse(saved);
    state = Object.assign(state, parsed);

    if (document.getElementById("articleType")) document.getElementById("articleType").value = state.articleType || "Original Research Article";
    if (document.getElementById("articleTitle")) document.getElementById("articleTitle").value = state.title || "";
    if (document.getElementById("articleKeywords")) document.getElementById("articleKeywords").value = state.keywords || "";
    if (document.getElementById("articleAbstract")) document.getElementById("articleAbstract").value = state.abstract || "";
    if (document.getElementById("articleTrack")) document.getElementById("articleTrack").value = state.track || "Pharmaceutics & Targeted Drug Delivery";

    if (document.getElementById("iaecProtocol")) document.getElementById("iaecProtocol").value = state.declarations.iaecProtocol || "";
    if (document.getElementById("ctriNumber")) document.getElementById("ctriNumber").value = state.declarations.ctriNumber || "";
    if (document.getElementById("fundingStatement")) document.getElementById("fundingStatement").value = state.declarations.funding || "";
    if (document.getElementById("coiStatement")) document.getElementById("coiStatement").value = state.declarations.coi || "";
    if (document.getElementById("dataAvailability")) document.getElementById("dataAvailability").value = state.declarations.dataAvailability || "";

    state.sections.forEach(sec => {
      const el = document.getElementById("editor-" + sec.id);
      if (el && sec.content) el.innerHTML = sec.content;
    });
  } catch (e) {
    console.error("Error loading draft", e);
  }
}

function exportDraftJSON() {
  updateStats();
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
  const a = document.createElement("a");
  a.href = dataStr;
  a.download = `pharmionex_manuscript_${Date.now()}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  showToast("Draft exported as JSON file", "success");
}

function escapeHtml(str) {
  if (!str) return "";
  return str.toString().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function formatBytes(bytes) {
  if (!bytes || bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
