const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
if(toggle&&nav){toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));nav.classList.toggle('is-open',!open);});}
document.querySelectorAll('#year').forEach(el=>el.textContent=new Date().getFullYear());
const searchInput=document.querySelector('#site-search');
const results=document.querySelector('#search-results');
if(searchInput&&results){const cards=[...results.querySelectorAll('[data-search]')];searchInput.addEventListener('input',()=>{const q=searchInput.value.trim().toLowerCase();cards.forEach(card=>{card.hidden=q&&!card.dataset.search.toLowerCase().includes(q);});});}
