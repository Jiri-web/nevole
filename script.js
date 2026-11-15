"use strict";
// Informační panel pro 2. prosince je trvalou součástí HTML.
// Nemá žádné automatické datum odstranění.
const toggle = document.getElementById('menuToggle');
const nav = document.getElementById('siteNav');
if(toggle && nav){
 toggle.addEventListener('click',()=>{
   const open=nav.classList.toggle('open');
   toggle.setAttribute('aria-expanded',String(open));
 });
 nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
   nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');
 }));
}
const shareButton=document.getElementById('shareButton');
const shareFeedback=document.getElementById('shareFeedback');
if(shareButton){
 shareButton.addEventListener('click',async()=>{
   const data={title:'NeVOLE – Veřejná média patří veřejnosti',url:'https://nevole.info/'};
   try {
     if(navigator.share){await navigator.share(data);if(shareFeedback)shareFeedback.textContent='';}
     else if(navigator.clipboard){await navigator.clipboard.writeText(data.url);if(shareFeedback)shareFeedback.textContent='Odkaz byl zkopírován.';}
     else if(shareFeedback){shareFeedback.textContent='Odkaz: '+data.url;}
   }catch(err){if(err?.name!=='AbortError' && shareFeedback)shareFeedback.textContent='Odkaz: '+data.url;}
 });
}
