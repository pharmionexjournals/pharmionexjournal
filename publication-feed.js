/* Public article listing. Published metadata is intentionally loaded from the
   journal's approved-release feed; no private tracker fields are requested. */
(function () {
  'use strict';

  const endpoint = 'https://script.google.com/macros/s/AKfycbwDyZCOaPMA2ips2Q1buPvkaCUHr7m9fJc3IL6ERIjyb762kC9LSyeTYIB1BuPAFAX4Jg/exec';
  const root = document.getElementById('publication-feed');
  const status = document.getElementById('feed-status');
  if (!root || !status) return;

  const icon = {
    article: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3.8h8l4 4V20a.8.8 0 0 1-.8.8H6a.8.8 0 0 1-.8-.8V4.6a.8.8 0 0 1 .8-.8Z"/><path d="M14 3.8v4h4M8.5 12h7M8.5 15.5h7"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.8" y="5.5" width="16.4" height="14.2" rx="1.8"/><path d="M8 3.8v3.4M16 3.8v3.4M3.8 9.5h16.4"/></svg>',
    book: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.2c3.5-.8 6.2-.2 8 1.5v13c-1.8-1.7-4.5-2.3-8-1.5v-13ZM20 5.2c-3.5-.8-6.2-.2-8 1.5v13c1.8-1.7 4.5-2.3 8-1.5v-13Z"/></svg>',
    pdf: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3.8h8l4 4V20a.8.8 0 0 1-.8.8H6a.8.8 0 0 1-.8-.8V4.6a.8.8 0 0 1 .8-.8Z"/><path d="M14 3.8v4h4M8 15h1.5a1.4 1.4 0 0 0 0-2.8H8V17m4-4.8h1.2a2.4 2.4 0 0 1 0 4.8H12v-4.8Zm4 4.8v-4.8h3"/></svg>',
    link: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 7H7a5 5 0 0 0 0 10h3m4-10h3a5 5 0 0 1 0 10h-3m-7-5h10"/></svg>',
    search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.3"/><path d="m16 16 4.2 4.2"/></svg>',
    empty: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M10 7h19l9 9v25H10V7Z"/><path d="M29 7v9h9M16 25h16M16 31h16M16 37h10"/></svg>'
  };

  function escapeHtml(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (ch) {
      return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[ch];
    });
  }

  function safeUrl(value) {
    const text = String(value || '').trim();
    try {
      const parsed = new URL(text);
      return parsed.protocol === 'https:' ? parsed.href : '';
    } catch (_) { return ''; }
  }

  function yearOf(article) {
    const match = String(article.published || '').match(/(?:19|20)\d{2}/);
    return match ? match[0] : 'Date not available';
  }

  function articleDate(article) {
    return String(article.published || '').trim();
  }

  function recordMeta(article) {
    return [article.volume && 'Volume ' + article.volume, article.issue && 'Issue ' + article.issue, article.pages && article.pages].filter(Boolean).join(' · ');
  }

  function citationDoi(value) {
    const text = String(value || '').trim();
    if (!text) return '';
    if (/^https:\/\/doi\.org\//i.test(text)) return safeUrl(text);
    if (/^10\.\d{4,9}\/\S+$/i.test(text)) return 'https://doi.org/' + encodeURI(text);
    return '';
  }

  function linksFor(article) {
    const links = [];
    const articleUrl = safeUrl(article.articleUrl);
    const fullTextUrl = safeUrl(article.fullTextUrl);
    const pdfUrl = safeUrl(article.pdfUrl);
    if (articleUrl) links.push('<a class="article-action" href="' + escapeHtml(articleUrl) + '" target="_blank" rel="noopener noreferrer">' + icon.link + '<span>Article page</span></a>');
    if (fullTextUrl && fullTextUrl !== articleUrl) links.push('<a class="article-action" href="' + escapeHtml(fullTextUrl) + '" target="_blank" rel="noopener noreferrer">' + icon.article + '<span>Full text</span></a>');
    if (pdfUrl) links.push('<a class="article-action" href="' + escapeHtml(pdfUrl) + '" target="_blank" rel="noopener noreferrer">' + icon.pdf + '<span>PDF</span></a>');
    return links.join('');
  }

  function card(article) {
    const articleUrl = safeUrl(article.articleUrl);
    const title = escapeHtml(article.title || 'Untitled article');
    const heading = articleUrl
      ? '<h3><a href="' + escapeHtml(articleUrl) + '" target="_blank" rel="noopener noreferrer">' + title + '</a></h3>'
      : '<h3>' + title + '</h3>';
    const authors = article.authors ? '<p class="published-authors">' + escapeHtml(article.authors) + '</p>' : '';
    const dates = [article.received && 'Received ' + article.received, article.accepted && 'Accepted ' + article.accepted, articleDate(article) && 'Published ' + articleDate(article)].filter(Boolean).join(' · ');
    const meta = [recordMeta(article), dates].filter(Boolean).map(function (line) {
      return '<span class="published-meta-line">' + icon.calendar + '<span>' + escapeHtml(line) + '</span></span>';
    }).join('');
    const type = article.type ? '<span class="published-type">' + escapeHtml(article.type) + '</span>' : '<span class="published-type">Journal article</span>';
    const abstract = article.abstract ? '<p class="published-abstract">' + escapeHtml(article.abstract) + '</p>' : '';
    const keywords = article.keywords ? '<p class="published-keywords"><strong>Keywords:</strong> ' + escapeHtml(article.keywords) + '</p>' : '';
    const doiHref = citationDoi(article.doi);
    const doi = article.doi ? '<p class="published-identifiers"><strong>DOI:</strong> ' + (doiHref ? '<a href="' + escapeHtml(doiHref) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(article.doi) + '</a>' : escapeHtml(article.doi)) + '</p>' : '';
    const licenceHref = safeUrl(article.licenceUrl);
    const licence = article.licence ? '<p class="published-identifiers"><strong>Licence:</strong> ' + (licenceHref ? '<a href="' + escapeHtml(licenceHref) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(article.licence) + '</a>' : escapeHtml(article.licence)) + '</p>' : '';
    return '<article class="published-article">' + type + heading + authors + (meta ? '<div class="published-meta">' + meta + '</div>' : '') + abstract + keywords + doi + licence + '<div class="published-actions">' + linksFor(article) + '</div></article>';
  }

  function emptyState() {
    return '<div class="feed-empty">' + icon.empty + '<h3>No articles have been published yet</h3><p>Only finalized, approved articles appear here. This journal is not displaying sample or placeholder research.</p><a href="editorial-workflow.html">How articles are reviewed and published →</a></div>';
  }

  let requestTimer;
  let activeScript;
  function setError() {
    clearTimeout(requestTimer);
    if (activeScript) activeScript.remove();
    status.className = 'feed-status feed-error';
    status.innerHTML = '<span>We could not load the published-article list. Try again in a moment or <a href="mailto:pharmionex.journal@gmail.com">contact the editorial office</a>.</span> <button class="feed-retry" type="button">Retry</button>';
    status.querySelector('.feed-retry').addEventListener('click', loadFeed);
  }

  function currentArticles(items) {
    if (!items.length) return [];
    const first = items[0];
    if (first.volume || first.issue) {
      const latestKey = String(first.volume || '') + '|' + String(first.issue || '');
      const latest = items.filter(function (item) { return String(item.volume || '') + '|' + String(item.issue || '') === latestKey; });
      if (latest.length) return latest;
    }
    return items.slice(0, 6);
  }

  function renderCurrent(items) {
    const list = currentArticles(items);
    if (!list.length) { root.innerHTML = emptyState(); return; }
    root.innerHTML = '<div class="publication-list">' + list.map(card).join('') + '</div>';
    if (items.length > list.length) {
      root.insertAdjacentHTML('beforeend', '<p class="feed-more"><a class="text-link" href="archives.html">Browse all ' + items.length + ' published articles →</a></p>');
    }
  }

  function renderArchive(items) {
    const search = document.getElementById('archive-search');
    const yearSelect = document.getElementById('archive-year');
    const typeSelect = document.getElementById('archive-type');
    const reset = document.getElementById('archive-reset');
    const years = Array.from(new Set(items.map(yearOf))).sort(function (a, b) { return b.localeCompare(a); });
    const types = Array.from(new Set(items.map(function (item) { return String(item.type || '').trim(); }).filter(Boolean))).sort(function (a, b) { return a.localeCompare(b); });
    years.forEach(function (year) { yearSelect.insertAdjacentHTML('beforeend', '<option value="' + escapeHtml(year) + '">' + escapeHtml(year) + '</option>'); });
    types.forEach(function (type) { typeSelect.insertAdjacentHTML('beforeend', '<option value="' + escapeHtml(type) + '">' + escapeHtml(type) + '</option>'); });

    function update() {
      const term = search.value.trim().toLocaleLowerCase();
      const chosenYear = yearSelect.value;
      const chosenType = typeSelect.value;
      const matches = items.filter(function (item) {
        const corpus = [item.title, item.authors, item.keywords, item.abstract, item.type].join(' ').toLocaleLowerCase();
        return (!term || corpus.includes(term)) && (!chosenYear || yearOf(item) === chosenYear) && (!chosenType || String(item.type || '') === chosenType);
      });
      if (!items.length) {
        root.innerHTML = emptyState();
        status.textContent = 'No published records.';
        return;
      }
      status.textContent = matches.length + (matches.length === 1 ? ' article found.' : ' articles found.');
      if (!matches.length) { root.innerHTML = '<div class="feed-empty feed-no-results"><h3>No matching articles</h3><p>Change or clear your search filters to see more records.</p></div>'; return; }
      const groups = new Map();
      matches.forEach(function (item) { const year = yearOf(item); if (!groups.has(year)) groups.set(year, []); groups.get(year).push(item); });
      root.innerHTML = Array.from(groups.entries()).map(function (entry) {
        return '<section class="archive-year-group"><h3 class="archive-group-title"><span>' + escapeHtml(entry[0]) + '</span><span>' + entry[1].length + (entry[1].length === 1 ? ' article' : ' articles') + '</span></h3><div class="publication-list">' + entry[1].map(card).join('') + '</div></section>';
      }).join('');
    }
    search.addEventListener('input', update);
    yearSelect.addEventListener('change', update);
    typeSelect.addEventListener('change', update);
    reset.addEventListener('click', function () { search.value = ''; yearSelect.value = ''; typeSelect.value = ''; update(); search.focus(); });
    update();
  }

  function loadFeed() {
    clearTimeout(requestTimer);
    if (activeScript) activeScript.remove();
    status.className = 'feed-status';
    status.innerHTML = '<span class="loading-dot" aria-hidden="true"></span> Loading published articles…';
    root.replaceChildren();
    const script = document.createElement('script');
    activeScript = script;
    script.async = true;
    script.src = endpoint + '?view=published-data&v=' + Date.now();
    script.onerror = setError;
    window.PharmionexPublishedFeed = {
      receive: function (records) {
        clearTimeout(requestTimer);
        script.remove();
        activeScript = null;
        const items = Array.isArray(records) ? records : [];
        status.className = 'feed-status';
        if (root.dataset.mode === 'archive') renderArchive(items);
        else {
          status.textContent = items.length ? items.length + (items.length === 1 ? ' published article.' : ' published articles.') : 'No published records.';
          renderCurrent(items);
        }
      }
    };
    requestTimer = setTimeout(setError, 18000);
    document.head.appendChild(script);
  }

  loadFeed();
})();
