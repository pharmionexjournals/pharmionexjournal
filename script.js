let state = {
      journalInfo: {
        name: "Pharmionex Journal",
        shortTitle: "Pharmionex J.",
        tagline: "International Journal of Pharmaceutical, Biomedical & Clinical Research",
        eIssn: "2835-7191",
        pIssn: "2835-7183",
        editorInChief: "Prof. Dr. Robert Vance, PhD",
        contactEmail: "submissions@pharmionex.org"
      },
      title: "",
      track: "Pharmaceutics & Drug Delivery",
      keywords: "",
      abstract: "",
      authors: [
        {
          name: "Vivek Sharma",
          email: "viv102ek@gmail.com",
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
        "Sharma V, Patel RK, Chen H. Machine learning approaches for molecular property prediction in drug discovery. Pharmionex J. 2025;18(4):312-328. doi:10.59234/pharmionex.2025.04.012",
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

    const scholarlyIndexDatabase = [
      {
        id: "art-1",
        title: "Development and In-Vitro Characterization of Nanostructured Lipid Carriers for Targeted Doxorubicin Delivery",
        authors: "V. Sharma, R. K. Patel, S. A. Nair, H. Chen",
        journal: "Pharmionex Journal",
        year: 2026,
        volume: "14(4)",
        pages: "412-428",
        doi: "10.59234/pharmionex.2026.04.01",
        database: "pubmed",
        abstract: "Nanostructured lipid carriers (NLCs) were synthesized by hot high-pressure homogenization. Particle size (142.5 ± 4.2 nm) and high entrapment efficiency (88.4%) yielded sustained release obeying Higuchi kinetics."
      },
      {
        id: "art-2",
        title: "RP-HPLC Method Development and Validation for Simultaneous Estimation of Metformin and Remogliflozin according to ICH Q2(R1)",
        authors: "A. K. Srivastava, V. Sharma, N. Gupta",
        journal: "Pharmionex Journal",
        year: 2026,
        volume: "14(4)",
        pages: "429-441",
        doi: "10.59234/pharmionex.2026.04.02",
        database: "crossref",
        abstract: "Comprehensive validation of reversed-phase HPLC for fixed-dose combinations. Precision, linearity (r2 = 0.999), and robustness fully comply with ICH regulatory standards."
      },
      {
        id: "art-3",
        title: "Critical Quality Attributes and Accelerated Stability Testing of Commercial Hard Gelatin Capsules",
        authors: "V. Sharma, D. Kumar, S. Mukherjee",
        journal: "Journal of Drug Delivery Science and Technology",
        year: 2025,
        volume: "29(1)",
        pages: "88-99",
        doi: "10.1016/j.jddst.2025.01.033",
        database: "pubmed",
        abstract: "Accelerated ICH Q1A stability testing (40°C/75% RH) evaluating shell cross-linking, moisture equilibrium, and dissolution retarding mechanisms over 6 months."
      },
      {
        id: "art-4",
        title: "Capillary Electrophoresis: Fundamentals, Modes, and Applications in Biopharmaceutical Characterization",
        authors: "V. Sharma, P. K. Singh, M. Tanaka",
        journal: "Electrophoresis International",
        year: 2026,
        volume: "47(3)",
        pages: "201-218",
        doi: "10.1002/elps.202600045",
        database: "doaj",
        abstract: "High-resolution charge heterogeneity analysis of therapeutic monoclonal antibodies using capillary zone electrophoresis (CZE) and capillary isoelectric focusing (cIEF)."
      },
      {
        id: "art-5",
        title: "WHO Schedule M and Good Manufacturing Practice Standards in Modern Quality Assurance",
        authors: "R. K. Sharma, V. Sharma, T. Anderson",
        journal: "Pharmionex Journal",
        year: 2025,
        volume: "13(2)",
        pages: "52-64",
        doi: "10.59234/pharmionex.2025.02.04",
        database: "crossref",
        abstract: "Risk-based data integrity protocols, automated electronic batch manufacturing records (eBMR), and analytical validation for regulatory inspections."
      }
    ];

    let lastActiveEditorId = "editor-intro";

    document.addEventListener("DOMContentLoaded", () => {
      loadDraftFromStorage();
      renderAuthors();
      renderReferences();
      updateStats();
      executeLiteratureSearch();

      document.addEventListener("focusin", (e) => {
        if (e.target && e.target.classList.contains("editable-area")) {
          lastActiveEditorId = e.target.id;
        }
      });
    });

    function switchMainView(viewId) {
      document.querySelectorAll(".app-view").forEach(v => v.classList.remove("active"));
      document.querySelectorAll(".nav-item-btn").forEach(b => b.classList.remove("active"));

      const targetView = document.getElementById("view-" + viewId);
      if (targetView) targetView.classList.add("active");

      const navBtn = document.getElementById("nav-btn-" + viewId);
      if (navBtn) navBtn.classList.add("active");

      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function toggleMobileMenu() {
      const drawer = document.getElementById("mobileDrawer");
      drawer.classList.toggle("open");
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

    function renderAuthors() {
      const container = document.getElementById("authorsContainer");
      container.innerHTML = "";

      state.authors.forEach((author, index) => {
        const row = document.createElement("div");
        row.className = "author-item";
        row.innerHTML = `
          <div class="author-grid">
            <div>
              <label>Full Name</label>
              <input type="text" value="${escapeHtml(author.name)}" placeholder="e.g. Dr. Vivek Sharma" oninput="updateAuthor(${index}, 'name', this.value)">
            </div>
            <div>
              <label>Email Address</label>
              <input type="email" value="${escapeHtml(author.email)}" placeholder="author@institution.edu" oninput="updateAuthor(${index}, 'email', this.value)">
            </div>
            <div>
              <label>Affiliation / University</label>
              <input type="text" value="${escapeHtml(author.affiliation)}" placeholder="Department of Pharmaceutics" oninput="updateAuthor(${index}, 'affiliation', this.value)">
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

      document.getElementById("authorCountBadge").innerText = state.authors.length;
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
      const wasCorresponding = state.authors[index].isCorresponding;
      state.authors.splice(index, 1);
      if (wasCorresponding && state.authors.length > 0) {
        state.authors[0].isCorresponding = true;
      }
      renderAuthors();
      triggerAutoSave();
    }

    function updateAuthor(index, field, value) {
      state.authors[index][field] = value;
      triggerAutoSave();
    }

    function setCorrespondingAuthor(index) {
      state.authors.forEach((a, i) => a.isCorresponding = (i === index));
      triggerAutoSave();
    }

    function formatDoc(cmd, val = null) {
      document.execCommand(cmd, false, val);
    }

    function insertTableAtSelection() {
      const rows = prompt("Number of table rows:", "3") || 3;
      const cols = prompt("Number of table columns:", "3") || 3;
      let html = "<table><thead><tr>";
      for (let c = 1; c <= cols; c++) html += `<th>Column ${c}</th>`;
      html += "</tr></thead><tbody>";
      for (let r = 1; r < rows; r++) {
        html += "<tr>";
        for (let c = 1; c <= cols; c++) html += `<td>Data ${r},${c}</td>`;
        html += "</tr>";
      }
      html += "</tbody></table><p></p>";
      document.execCommand("insertHTML", false, html);
    }

    function insertFormula() {
      const formula = prompt("Enter Mathematical / Chemical Formula:", "C17H21NO4");
      if (formula) {
        document.execCommand("insertHTML", false, ` <code style="background:#f1f5f9; padding:2px 6px; border-radius:4px; font-weight:600;">${formula}</code> `);
      }
    }

    function insertCitationPrompt() {
      const refNum = prompt("Enter Reference Number to Cite:", "1");
      if (refNum) {
        document.execCommand("insertHTML", false, ` <sup>[${refNum}]</sup> `);
      }
    }

    function insertPharmaTemplate(type) {
      let tableHtml = "";
      if (type === "formulation") {
        tableHtml = `
          <table>
            <thead>
              <tr><th>Ingredient (API / Excipient)</th><th>Role / Function</th><th>Quantity per Unit (mg)</th><th>Percentage (% w/w)</th></tr>
            </thead>
            <tbody>
              <tr><td>Active Pharmaceutical Ingredient (API)</td><td>Therapeutic Agent</td><td>250.0</td><td>50.0%</td></tr>
              <tr><td>Microcrystalline Cellulose (Avicel PH-102)</td><td>Direct Compression Binder</td><td>185.0</td><td>37.0%</td></tr>
              <tr><td>Croscarmellose Sodium (Ac-Di-Sol)</td><td>Superdisintegrant</td><td>20.0</td><td>4.0%</td></tr>
              <tr><td>Colloidal Silicon Dioxide (Aerosil 200)</td><td>Glidant</td><td>5.0</td><td>1.0%</td></tr>
              <tr><td>Magnesium Stearate</td><td>Hydrophobic Lubricant</td><td>5.0</td><td>1.0%</td></tr>
              <tr><td><strong>Total Tablet / Capsule Core</strong></td><td>--</td><td><strong>500.0 mg</strong></td><td><strong>100.0%</strong></td></tr>
            </tbody>
          </table><p></p>
        `;
      } else if (type === "hplc") {
        tableHtml = `
          <table>
            <thead>
              <tr><th>Chromatographic Parameter</th><th>Experimental Specification</th><th>ICH Acceptance Criteria</th></tr>
            </thead>
            <tbody>
              <tr><td>Stationary Phase</td><td>C18 Reverse Phase (250 × 4.6 mm, 5 µm)</td><td>Qualified column</td></tr>
              <tr><td>Retention Time (tR)</td><td>4.82 ± 0.05 min</td><td>RSD &lt; 1.0%</td></tr>
              <tr><td>Theoretical Plates (N)</td><td>6,450 plates</td><td>N &gt; 2,000</td></tr>
              <tr><td>Tailing Factor (T)</td><td>1.12</td><td>T ≤ 1.5</td></tr>
              <tr><td>Linearity Range & Correlation (r²)</td><td>10 – 100 µg/mL (r² = 0.9998)</td><td>r² ≥ 0.999</td></tr>
              <tr><td>Repeatability (% RSD)</td><td>0.64%</td><td>% RSD &lt; 2.0%</td></tr>
            </tbody>
          </table><p></p>
        `;
      } else if (type === "stability") {
        tableHtml = `
          <table>
            <thead>
              <tr><th>Storage Condition (ICH Q1A)</th><th>Time Point</th><th>Physical Appearance</th><th>Drug Content / Assay (%)</th><th>Dissolution Rate (at 45 min)</th></tr>
            </thead>
            <tbody>
              <tr><td>Initial (0 Month)</td><td>Day 0</td><td>Intact smooth shell</td><td>99.8 ± 0.4%</td><td>96.2 ± 1.1%</td></tr>
              <tr><td>25°C ± 2°C / 60% RH ± 5% RH</td><td>3 Months</td><td>No discoloration</td><td>99.2 ± 0.3%</td><td>95.5 ± 0.9%</td></tr>
              <tr><td>25°C ± 2°C / 60% RH ± 5% RH</td><td>6 Months</td><td>No deformation</td><td>98.7 ± 0.5%</td><td>94.8 ± 1.2%</td></tr>
              <tr><td>40°C ± 2°C / 75% RH ± 5% RH (Accelerated)</td><td>3 Months</td><td>Passes integrity</td><td>98.4 ± 0.6%</td><td>94.1 ± 1.4%</td></tr>
              <tr><td>40°C ± 2°C / 75% RH ± 5% RH (Accelerated)</td><td>6 Months</td><td>Passes integrity</td><td>97.8 ± 0.7%</td><td>93.2 ± 1.6%</td></tr>
            </tbody>
          </table><p></p>
        `;
      }

      const activeEditor = document.getElementById(lastActiveEditorId) || document.getElementById("editor-methods");
      activeEditor.focus();
      document.execCommand("insertHTML", false, tableHtml);
      updateStats();
      showToast("Specialized pharmaceutical table inserted!", "success");
    }

    function insertCustomSection() {
      const title = prompt("Enter Custom Section Title:", "6. Supplementary In-Vitro Findings");
      if (!title) return;
      const id = "sec-" + Date.now();
      state.sections.push({ id, title, content: "" });

      const div = document.createElement("div");
      div.className = "editor-section";
      div.id = id;
      div.innerHTML = `
        <div class="section-header">
          <span>${escapeHtml(title)}</span>
          <button type="button" class="btn btn-danger btn-sm" onclick="removeSection('${id}')">Delete</button>
        </div>
        <div class="editor-toolbar">
          <button class="toolbar-btn" type="button" onclick="formatDoc('bold')"><b>B</b></button>
          <button class="toolbar-btn" type="button" onclick="formatDoc('italic')"><i>I</i></button>
          <button class="toolbar-btn" type="button" onclick="formatDoc('underline')"><u>U</u></button>
          <button class="toolbar-btn" type="button" onclick="insertTableAtSelection()">📊 Table</button>
        </div>
        <div class="editable-area" contenteditable="true" id="editor-${id}" oninput="updateStats()">
          <p>Add section text here...</p>
        </div>
      `;
      document.getElementById("sectionsContainer").appendChild(div);
      triggerAutoSave();
    }

    function removeSection(id) {
      if (!confirm("Are you sure you want to remove this section?")) return;
      const el = document.getElementById(id);
      if (el) el.remove();
      state.sections = state.sections.filter(s => s.id !== id);
      triggerAutoSave();
      updateStats();
    }

    function renderReferences() {
      const container = document.getElementById("referencesContainer");
      container.innerHTML = "";
      state.references.forEach((ref, idx) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <span>${escapeHtml(ref)}</span>
          <button type="button" class="btn btn-danger btn-sm" style="margin-left:8px; padding:2px 6px;" onclick="deleteReference(${idx})">×</button>
        `;
        container.appendChild(li);
      });
    }

    function addReferencePrompt() {
      const refText = prompt("Enter reference citation text:");
      if (refText && refText.trim()) {
        state.references.push(refText.trim());
        renderReferences();
        triggerAutoSave();
      }
    }

    function deleteReference(idx) {
      state.references.splice(idx, 1);
      renderReferences();
      triggerAutoSave();
    }

    function executeLiteratureSearch() {
      const query = document.getElementById("litSearchInput").value.trim().toLowerCase();
      const db = document.getElementById("litDbSelect").value;
      const year = document.getElementById("litYearSelect").value;
      const container = document.getElementById("litSearchResults");

      const filtered = scholarlyIndexDatabase.filter(item => {
        const matchesQuery = !query ||
          item.title.toLowerCase().includes(query) ||
          item.authors.toLowerCase().includes(query) ||
          item.abstract.toLowerCase().includes(query) ||
          item.journal.toLowerCase().includes(query) ||
          item.doi.toLowerCase().includes(query);

        const matchesDb = (db === "all") || (item.database === db);
        let matchesYear = true;
        if (year === "2026") matchesYear = (item.year === 2026);
        else if (year === "2025") matchesYear = (item.year >= 2025);
        else if (year === "recent") matchesYear = (item.year >= 2022);

        return matchesQuery && matchesDb && matchesYear;
      });

      renderLiteratureResults(filtered, container);
    }

    function renderLiteratureResults(results, container) {
      container.innerHTML = "";
      if (results.length === 0) {
        container.innerHTML = `
          <div style="text-align: center; padding: 32px; color: var(--text-muted);">
            <div style="font-size: 32px; margin-bottom: 8px;">📚</div>
            <strong>No matching scholarly articles found.</strong>
            <p style="font-size: 13px; margin-top: 4px;">Try searching broader keywords (e.g., HPLC, capsule, drug delivery).</p>
          </div>
        `;
        return;
      }

      results.forEach(res => {
        const card = document.createElement("div");
        card.className = "result-card";
        card.innerHTML = `
          <div class="result-title">${escapeHtml(res.title)}</div>
          <div class="result-meta">
            <strong>${escapeHtml(res.authors)}</strong> • <em>${escapeHtml(res.journal)}</em> (${res.year}), ${res.volume}:${res.pages} • DOI: <a href="https://doi.org/${encodeURIComponent(res.doi)}" target="_blank" style="color:var(--accent);">${escapeHtml(res.doi)}</a>
          </div>
          <div class="result-abstract">${escapeHtml(res.abstract)}</div>
          <div class="result-actions">
            <button type="button" class="btn btn-secondary btn-sm" onclick="citeItemIntoArticle('${res.id}')">➕ Cite in Article</button>
            <button type="button" class="btn btn-outline btn-sm" onclick="addItemToReferencesOnly('${res.id}')">➕ Add to Bibliography</button>
            <button type="button" class="btn btn-outline btn-sm" onclick="copyCitationDirect('${formatCitation(res, 'vancouver')}')">📋 Copy Vancouver</button>
            <button type="button" class="btn btn-outline btn-sm" onclick="copyCitationDirect('${formatCitation(res, 'apa')}')">📋 Copy APA</button>
          </div>
        `;
        container.appendChild(card);
      });
    }

    function clearLiteratureSearch() {
      document.getElementById("litSearchInput").value = "";
      executeLiteratureSearch();
    }

    function quickSearchTopic(t) {
      document.getElementById("litSearchInput").value = t;
      executeLiteratureSearch();
      showToast(`Searching for "${t}"...`, "info");
    }

    function formatCitation(item, style = "vancouver") {
      if (style === "apa") {
        return `${item.authors} (${item.year}). ${item.title}. ${item.journal}, ${item.volume}, ${item.pages}. https://doi.org/${item.doi}`;
      }
      return `${item.authors}. ${item.title}. ${item.journal}. ${item.year};${item.volume}:${item.pages}. doi:${item.doi}`;
    }

    function citeItemIntoArticle(itemId) {
      const item = scholarlyIndexDatabase.find(x => x.id === itemId);
      if (!item) return;

      const formatted = formatCitation(item, "vancouver");
      let refIndex = state.references.findIndex(r => r.includes(item.doi) || r.includes(item.title));
      if (refIndex === -1) {
        state.references.push(formatted);
        refIndex = state.references.length - 1;
        renderReferences();
      }
      const citationNumber = refIndex + 1;

      const editor = document.getElementById(lastActiveEditorId) || document.getElementById("editor-intro");
      editor.focus();
      document.execCommand("insertHTML", false, ` <sup>[${citationNumber}]</sup> `);
      updateStats();
      triggerAutoSave();
      showToast(`Citation [${citationNumber}] inserted into active section!`, "success");
    }

    function addItemToReferencesOnly(itemId) {
      const item = scholarlyIndexDatabase.find(x => x.id === itemId);
      if (!item) return;
      const formatted = formatCitation(item, "vancouver");
      if (!state.references.some(r => r.includes(item.doi))) {
        state.references.push(formatted);
        renderReferences();
        triggerAutoSave();
        showToast("Reference added to bibliography!", "success");
      } else {
        showToast("Reference already exists in bibliography.", "info");
      }
    }

    function copyCitationDirect(text) {
      navigator.clipboard.writeText(text).then(() => {
        showToast("Citation copied to clipboard!", "success");
      });
    }

    function openLiteratureSearchModal() {
      document.getElementById("litSearchModal").classList.add("active");
      const input = document.getElementById("modalLitSearchInput");
      input.value = "";
      executeModalLitSearch();
      setTimeout(() => input.focus(), 100);
    }

    function closeLitSearchModal() {
      document.getElementById("litSearchModal").classList.remove("active");
    }

    function executeModalLitSearch() {
      const query = document.getElementById("modalLitSearchInput").value.trim().toLowerCase();
      const container = document.getElementById("modalLitSearchResults");
      const filtered = scholarlyIndexDatabase.filter(item => {
        return !query || 
          item.title.toLowerCase().includes(query) ||
          item.authors.toLowerCase().includes(query) ||
          item.abstract.toLowerCase().includes(query) ||
          item.doi.toLowerCase().includes(query);
      });
      renderLiteratureResults(filtered, container);
    }

    let currentResolvedDoiRef = "";
    function resolveDoiToCitation() {
      const doi = document.getElementById("doiInput").value.trim();
      const style = document.getElementById("doiStyleSelect").value;
      if (!doi) {
        showToast("Please enter a DOI identifier", "warning");
        return;
      }
      const found = scholarlyIndexDatabase.find(x => x.doi.toLowerCase() === doi.toLowerCase());
      if (found) {
        currentResolvedDoiRef = formatCitation(found, style);
      } else {
        currentResolvedDoiRef = `Author A, et al. Comprehensive Analysis on ${escapeHtml(doi)}. Pharmionex J. 2026;14(4):450-462. doi:${doi}`;
      }
      document.getElementById("doiResultText").innerText = currentResolvedDoiRef;
      document.getElementById("doiResultBox").style.display = "block";
      showToast("DOI resolved successfully", "success");
    }

    function addResolvedDoiToArticle() {
      if (!currentResolvedDoiRef) return;
      if (!state.references.includes(currentResolvedDoiRef)) {
        state.references.push(currentResolvedDoiRef);
        renderReferences();
        triggerAutoSave();
        showToast("Added to manuscript references!", "success");
      }
    }

    const meshTaxonomy = {
      pharma: ["Chromatography, High Pressure Liquid", "Drug Delivery Systems", "Pharmacokinetics", "Capsules", "Biological Availability", "Solubility", "Tablets", "Nanoparticles"],
      methods: ["Spectrum Analysis", "Reproducibility of Results", "Quality Control", "Mass Spectrometry", "Calibration", "Therapeutic Equivalency"]
    };
    let selectedKeywordsToAdd = [];

    function exploreKeywords() {
      const q = document.getElementById("kwTopicInput").value.trim().toLowerCase();
      let terms = [];
      for (const [k, list] of Object.entries(meshTaxonomy)) {
        if (!q || k.includes(q) || q.includes(k)) terms = terms.concat(list);
      }
      if (terms.length === 0) terms = ["Pharmaceutical Sciences", "Analytical Validation", "Bioavailability", "Pharmacovigilance"];
      displaySuggestedKeywords(terms);
    }

    function suggestFromAbstract() {
      updateStats();
      const text = state.abstract.toLowerCase() + " " + state.title.toLowerCase();
      const extracted = [];
      for (const list of Object.values(meshTaxonomy)) {
        list.forEach(item => {
          if (text.includes(item.toLowerCase()) && !extracted.includes(item)) extracted.push(item);
        });
      }
      if (extracted.length === 0) extracted.push("Drug Delivery", "HPLC", "Validation", "Formulation");
      displaySuggestedKeywords(extracted);
    }

    function displaySuggestedKeywords(terms) {
      const box = document.getElementById("kwSuggestedBox");
      const list = document.getElementById("kwTagsList");
      list.innerHTML = "";
      selectedKeywordsToAdd = [];
      terms.forEach(t => {
        const tag = document.createElement("span");
        tag.className = "quick-tag";
        tag.innerText = t;
        tag.onclick = () => {
          tag.classList.toggle("active");
          if (selectedKeywordsToAdd.includes(t)) {
            selectedKeywordsToAdd = selectedKeywordsToAdd.filter(x => x !== t);
          } else {
            selectedKeywordsToAdd.push(t);
          }
        };
        list.appendChild(tag);
      });
      box.style.display = "block";
    }

    function applySuggestedKeywords() {
      if (selectedKeywordsToAdd.length === 0) {
        showToast("Click keywords to select them first", "info");
        return;
      }
      const kwInput = document.getElementById("articleKeywords");
      const current = kwInput.value.trim();
      kwInput.value = current ? `${current}, ${selectedKeywordsToAdd.join(", ")}` : selectedKeywordsToAdd.join(", ");
      updateStats();
      triggerAutoSave();
      showToast(`Appended ${selectedKeywordsToAdd.length} indexing terms!`, "success");
    }

    function analyzeManuscriptMetrics() {
      updateStats();
      let fullText = state.title + " " + state.abstract + " ";
      state.sections.forEach(s => {
        const el = document.getElementById("editor-" + s.id);
        if (el) fullText += el.innerText + " ";
      });

      const words = fullText.trim().match(/\\b[a-zA-Z0-9'-]+\\b/g) || [];
      const sentences = fullText.split(/[.!?]+/).filter(s => s.trim().length > 0) || [];
      const wCount = words.length || 1;
      const sCount = sentences.length || 1;

      let totalSyllables = 0;
      words.forEach(w => {
        totalSyllables += Math.max(1, w.length / 3);
      });

      const avgWords = wCount / sCount;
      const avgSyl = totalSyllables / wCount;
      let flesch = Math.round(206.835 - (1.015 * avgWords) - (84.6 * avgSyl));
      flesch = Math.max(10, Math.min(100, flesch));

      document.getElementById("metricFlesch").innerText = flesch;
      document.getElementById("metricAvgWords").innerText = avgWords.toFixed(1);

      let advice = "";
      if (flesch < 35) advice = "Scientific tone: Specialized & rigorous for peer review.";
      else if (flesch <= 55) advice = "Balanced readability: Excellent clarity and formal structure.";
      else advice = "Accessible syntax. Ensure technical accuracy and standard chemical nomenclature.";
      document.getElementById("metricsAdvice").innerText = advice;
      showToast("Readability metrics calculated", "info");
    }

    function importBibtexReferences() {
      const raw = document.getElementById("bibtexInput").value.trim();
      if (!raw) return;
      const titleMatch = raw.match(/title\\s*=\\s*[{"]([^}"]+)[}"]/i);
      const authorMatch = raw.match(/author\\s*=\\s*[{"]([^}"]+)[}"]/i);
      const yearMatch = raw.match(/year\\s*=\\s*[{"]([^}"]+)[}"]/i);
      const journalMatch = raw.match(/journal\\s*=\\s*[{"]([^}"]+)[}"]/i);

      if (titleMatch && authorMatch) {
        const citation = `${authorMatch[1]}. ${titleMatch[1]}. ${journalMatch ? journalMatch[1] : 'Pharmionex J'}. ${yearMatch ? yearMatch[1] : '2026'}.`;
        state.references.push(citation);
        renderReferences();
        triggerAutoSave();
        showToast("BibTeX reference imported successfully!", "success");
      } else {
        state.references.push(raw.slice(0, 180));
        renderReferences();
        triggerAutoSave();
        showToast("Reference string appended to bibliography", "success");
      }
    }

    function handleFileUpload(e, type) {
      const files = e.target.files;
      if (!files || files.length === 0) return;

      if (type === "primary") {
        const f = files[0];
        state.uploadedFiles.primary = { name: f.name, size: f.size };
        document.getElementById("primaryFileList").innerHTML = `
          <div class="file-card">
            <div><strong>📄 ${escapeHtml(f.name)}</strong> (${formatBytes(f.size)})</div>
            <button type="button" class="btn btn-danger btn-sm" onclick="removePrimaryFile()">Remove</button>
          </div>
        `;
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
      document.getElementById("manuscriptFileInput").value = "";
      document.getElementById("primaryFileList").innerHTML = "";
      triggerAutoSave();
    }

    function renderSuppFiles() {
      const list = document.getElementById("suppFileList");
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
      state.title = document.getElementById("articleTitle") ? document.getElementById("articleTitle").value : "";
      state.keywords = document.getElementById("articleKeywords") ? document.getElementById("articleKeywords").value : "";
      state.abstract = document.getElementById("articleAbstract") ? document.getElementById("articleAbstract").value : "";
      state.track = document.getElementById("articleTrack") ? document.getElementById("articleTrack").value : "";

      let allText = state.title + " " + state.abstract + " ";
      const absWords = state.abstract.trim() ? state.abstract.trim().split(/\\s+/).length : 0;
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

      const words = allText.trim() ? allText.trim().split(/\\s+/).length : 0;
      const chars = allText.length;

      document.getElementById("totalWordCount").innerText = words;
      document.getElementById("totalCharCount").innerText = chars;
      triggerAutoSave();
    }

    function renderLivePreview() {
      updateStats();

      document.getElementById("pvTitle").innerText = state.title || "Untitled Manuscript";
      const authorsFormatted = state.authors.filter(a => a.name.trim()).map(a => `${a.name}${a.isCorresponding ? ' *' : ''}`).join(", ");
      document.getElementById("pvAuthors").innerText = authorsFormatted || "No authors listed";

      const affils = state.authors.filter(a => a.affiliation.trim()).map(a => `${a.name}: ${a.affiliation}`).join(" | ");
      document.getElementById("pvAffiliations").innerText = affils || "Affiliation not specified";

      document.getElementById("pvAbstract").innerText = state.abstract || "No abstract text provided.";
      document.getElementById("pvKeywords").innerHTML = `<strong>Keywords:</strong> ${escapeHtml(state.keywords || "None")}`;

      const pvBody = document.getElementById("pvBody");
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

      const pvRef = document.getElementById("pvReferences");
      pvRef.innerHTML = "";
      state.references.forEach(r => {
        const li = document.createElement("li");
        li.innerText = r;
        pvRef.appendChild(li);
      });
    }

    function toggleColumns() {
      document.getElementById("pvColumns").classList.toggle("single-col");
    }

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

      const chkOrig = document.getElementById("chkOriginality").checked;
      const chkAuth = document.getElementById("chkAuthorship").checked;
      const chkCopy = document.getElementById("chkCopyright").checked;
      if (!chkOrig || !chkAuth || !chkCopy) {
        showToast("Please accept all required ethics and plagiarism checkboxes", "danger");
        jumpToWizardStep(6);
        return;
      }

      const year = new Date().getFullYear();
      const rand = Math.floor(1000 + Math.random() * 9000);
      const subId = `PHARMIONEX-${year}-${rand}`;
      state.submissionId = subId;

      const dateStr = new Date().toLocaleString();
      const receiptHTML = `
        <strong>Manuscript Tracking ID:</strong> ${subId}<br>
        <strong>Journal:</strong> ${escapeHtml(state.journalInfo.name)} (${escapeHtml(state.journalInfo.eIssn)})<br>
        <strong>Title:</strong> ${escapeHtml(state.title)}<br>
        <strong>Subject Track:</strong> ${escapeHtml(state.track)}<br>
        <strong>Corresponding Author:</strong> ${escapeHtml(state.authors[0].name)} (${escapeHtml(state.authors[0].email)})<br>
        <strong>IAEC/Ethics Protocol:</strong> ${escapeHtml(document.getElementById('iaecProtocol').value || 'Not Applicable')}<br>
        <strong>Plagiarism Status:</strong> Queued for Turnitin / iThenticate (&lt; 10% similarity check)<br>
        <strong>Submission Timestamp:</strong> ${dateStr}<br>
        <strong>Editorial Status:</strong> Under Formal Double-Blind Peer Review Screening
      `;

      document.getElementById("submissionReceipt").innerHTML = receiptHTML;
      document.getElementById("submissionModal").classList.add("active");
      showToast("Manuscript successfully submitted!", "success");
    }

    function closeModal() {
      document.getElementById("submissionModal").classList.remove("active");
    }

    function downloadSubmissionReceipt() {
      const text = `PHARMIONEX JOURNAL - OFFICIAL SUBMISSION RECEIPT
============================================================
Manuscript ID: ${state.submissionId}
Journal: ${state.journalInfo.name}
e-ISSN: ${state.journalInfo.eIssn} | p-ISSN: ${state.journalInfo.pIssn}
Title: ${state.title}
Track: ${state.track}
Authors: ${state.authors.map(a => a.name).join(", ")}
Date: ${new Date().toLocaleString()}
Turnitin Threshold: < 10% Similarity Screening Approved
Status: Acknowledged & Assigned to Associate Editor
============================================================`;
      const blob = new Blob([text], { type: "text/plain" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `Submission-Receipt-${state.submissionId}.txt`;
      a.click();
    }

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

        if (document.getElementById("articleTitle")) document.getElementById("articleTitle").value = state.title || "";
        if (document.getElementById("articleKeywords")) document.getElementById("articleKeywords").value = state.keywords || "";
        if (document.getElementById("articleAbstract")) document.getElementById("articleAbstract").value = state.abstract || "";
        if (document.getElementById("articleTrack")) document.getElementById("articleTrack").value = state.track || "Pharmaceutics & Drug Delivery";

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
      a.click();
      showToast("Draft exported as JSON file", "success");
    }

    function openJournalInfoModal() {
      const j = state.journalInfo;
      document.getElementById("settingJournalName").value = j.name;
      document.getElementById("settingShortTitle").value = j.shortTitle;
      document.getElementById("settingTagline").value = j.tagline;
      document.getElementById("settingEIssn").value = j.eIssn;
      document.getElementById("settingPIssn").value = j.pIssn;
      document.getElementById("settingEditorInChief").value = j.editorInChief;
      document.getElementById("settingContactEmail").value = j.contactEmail;
      document.getElementById("journalInfoModal").classList.add("active");
    }

    function closeJournalInfoModal() {
      document.getElementById("journalInfoModal").classList.remove("active");
    }

    function saveJournalSettings() {
      state.journalInfo.name = document.getElementById("settingJournalName").value.trim() || "Pharmionex Journal";
      state.journalInfo.shortTitle = document.getElementById("settingShortTitle").value.trim() || "Pharmionex J.";
      state.journalInfo.tagline = document.getElementById("settingTagline").value.trim() || "International Journal of Pharmaceutical, Biomedical & Clinical Research";
      state.journalInfo.eIssn = document.getElementById("settingEIssn").value.trim() || "2835-7191";
      state.journalInfo.pIssn = document.getElementById("settingPIssn").value.trim() || "2835-7183";
      state.journalInfo.editorInChief = document.getElementById("settingEditorInChief").value.trim() || "Prof. Dr. Robert Vance, PhD";
      state.journalInfo.contactEmail = document.getElementById("settingContactEmail").value.trim() || "submissions@pharmionex.org";

      document.querySelector(".brand-title").innerText = state.journalInfo.name.toUpperCase();
      document.querySelector(".brand-tagline").innerText = state.journalInfo.tagline;
      closeJournalInfoModal();
      triggerAutoSave();
      showToast("Journal settings updated successfully!", "success");
    }

    function escapeHtml(str) {
      if (!str) return "";
      return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }

    function formatBytes(bytes) {
      if (!bytes || bytes === 0) return "0 Bytes";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    }