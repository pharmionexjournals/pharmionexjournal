const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
if(toggle&&nav){toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));nav.classList.toggle('is-open',!open);});}
document.querySelectorAll('#year').forEach(el=>el.textContent=new Date().getFullYear());
const searchInput=document.querySelector('#site-search');
const results=document.querySelector('#search-results');
if(searchInput&&results){const cards=[...results.querySelectorAll('[data-search]')];searchInput.addEventListener('input',()=>{const q=searchInput.value.trim().toLowerCase();cards.forEach(card=>{card.hidden=q&&!card.dataset.search.toLowerCase().includes(q);});});}

// Turn numbered feature markers into small, consistent inline icons. These
// SVGs are local markup, so the site has no icon-font or third-party dependency.
const journalIcons={
  file:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3.8h8l4 4V20a.8.8 0 0 1-.8.8H6a.8.8 0 0 1-.8-.8V4.6a.8.8 0 0 1 .8-.8Z"/><path d="M14 3.8v4h4M8.5 12h7M8.5 15.5h7"/></svg>',
  check:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5h11v15H5v-15h3"/><path d="M8 5.5V3.8h8v3.4H8V5.5ZM8.5 12l2 2 4.5-4.5M8.5 17h7"/></svg>',
  people:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3"/><path d="M3.8 19.5v-1.1A5.2 5.2 0 0 1 9 13.2a5.2 5.2 0 0 1 5.2 5.2v1.1H3.8ZM16 5.5a3 3 0 0 1 0 5.8m1.2 2.1a4.7 4.7 0 0 1 3 4.4v1.7h-3"/></svg>',
  shield:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5 20 6v5.7c0 4.4-3.2 7.4-8 9.3-4.8-1.9-8-4.9-8-9.3V6l8-2.5Z"/><path d="m8.5 12.2 2.3 2.2 4.7-4.9"/></svg>',
  book:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.2c3.5-.8 6.2-.2 8 1.5v13c-1.8-1.7-4.5-2.3-8-1.5v-13ZM20 5.2c-3.5-.8-6.2-.2-8 1.5v13c1.8-1.7 4.5-2.3 8-1.5v-13Z"/></svg>',
  mail:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="13" rx="1.8"/><path d="m4.5 7 7.5 6 7.5-6"/></svg>',
  upload:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15V4m0 0L7.5 8.5M12 4l4.5 4.5M5 14.5v4.7c0 .5.4.8.9.8h12.2c.5 0 .9-.3.9-.8v-4.7"/></svg>',
  quote:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 6.5h6v6H7.5c0 2.2-.8 3.8-2.5 5M13 6.5h6v6h-3.5c0 2.2-.8 3.8-2.5 5"/></svg>'
};
function featureIconFor(label){
  if(/ethic|conflict|privacy|integrity|consent|policy|safeguard/i.test(label))return journalIcons.shield;
  if(/review|editor|board|author|people|team/i.test(label))return journalIcons.people;
  if(/check|checklist|quality|ready|verify|screen/i.test(label))return journalIcons.check;
  if(/citation|reference|doi|orcid|quote/i.test(label))return journalIcons.quote;
  if(/archive|issue|journal|publication|history|article/i.test(label))return journalIcons.book;
  if(/mail|letter|contact|appeal|correspondence/i.test(label))return journalIcons.mail;
  if(/submit|submission|upload|file/i.test(label))return journalIcons.upload;
  return journalIcons.file;
}
document.querySelectorAll('.feature-icon').forEach(node=>{
  if(!/^\d{1,2}$|^[A-Z]$/i.test(node.textContent.trim()))return;
  const title=node.closest('.feature-card')?.querySelector('h3')?.textContent||'';
  node.innerHTML=featureIconFor(title);node.classList.add('feature-icon-svg');
});
