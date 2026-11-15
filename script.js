"use strict";
/* Prague local time 2026-11-18 00:00 equals 2026-11-17 23:00 UTC (CET). */
const END_OF_APPEAL = Date.parse("2026-11-17T23:00:00Z");
const calloutTarget = document.getElementById("temporaryCallout");
function renderTemporaryCallout() {
  if (!calloutTarget) return;
  if (Date.now() >= END_OF_APPEAL) {
    calloutTarget.replaceChildren();
    return;
  }
  if (calloutTarget.childElementCount) return;
  const section = document.createElement("section");
  section.className = "urgent";
  section.id = "mimoradna-vyzva";
  section.setAttribute("aria-labelledby", "urgentTitle");
  section.innerHTML = `<div class="container"><p class="section-kicker">✦ Mimořádná občanská výzva</p><h2 id="urgentTitle">Pojďme do ulic. Slušně, ale nahlas.</h2><p class="lead">Zákon ještě není schválen a o budoucnosti České televize a Českého rozhlasu se rozhoduje právě teď. Přijďte svůj názor ukázat veřejně. Buďte ohleduplní k lidem kolem sebe, k městu i k těm, kdo to vidí jinak — a zároveň tak důrazní, aby náš hlas nešel přeslechnout.</p><ul class="urgent-rules" aria-label="Jak demonstrovat"><li>Pokojně</li><li>Ohleduplně</li><li>Důrazně</li></ul><a class="urgent-button" href="#dnesni-akce">Kdy a kde? ↓</a></div>`;
  calloutTarget.append(section);
}
renderTemporaryCallout();
// Keep the expiry correct if the browser stays open across midnight without a reload.
if (Date.now() < END_OF_APPEAL) {
  const remaining = END_OF_APPEAL - Date.now();
  setTimeout(renderTemporaryCallout, Math.min(remaining + 50, 2147483647));
  document.addEventListener('visibilitychange',()=>{if(!document.hidden) renderTemporaryCallout();});
}
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
   const data={title:'NeVOLE – Veřejná média patří veřejnosti',url:'https://jiri-web.github.io/nevole/'};
   try {
     if(navigator.share){await navigator.share(data);if(shareFeedback)shareFeedback.textContent='';}
     else if(navigator.clipboard){await navigator.clipboard.writeText(data.url);if(shareFeedback)shareFeedback.textContent='Odkaz byl zkopírován.';}
     else if(shareFeedback){shareFeedback.textContent='Odkaz: '+data.url;}
   }catch(err){if(err?.name!=='AbortError' && shareFeedback)shareFeedback.textContent='Odkaz: '+data.url;}
 });
}

