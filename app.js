function gegloSmartReply(raw) {
  const q = (raw || "").trim();
  const low = q.toLowerCase().replace(/[?!.]+$/g, "").trim();

  window.gegloKnockStep = window.gegloKnockStep || 0;
  if (window.gegloKnockStep === 1) {
    window.gegloKnockStep = 2;
    return q.replace(/[?!.]+$/g, "").trim() + " who?";
  }
  if (window.gegloKnockStep === 2) {
    window.gegloKnockStep = 0;
    return "Haha, good one! Got another knock-knock joke?";
  }
  if (low === "knock knock" || low === "knock, knock") {
    window.gegloKnockStep = 1;
    return "Who's there?";
  }
  if (low.includes("knock knock")) {
    return "Knock, knock! (Reply with \"Who's there?\" or start your own by typing \"knock knock\")";
  }
  if (low === "whos there" || low === "who's there") {
    return "Geglo! (Reply: \"Geglo who?\")";
  }
  if (low === "geglo who") {
    return "Geglo-ing to find whatever you need on the web!";
  }

  if (/^(hi|hello|hey|yo|sup|gday|g'day)\b/.test(low)) {
    return "Hey! Welcome to Geglo Browser. Ask me a question, do math, check the time, or type 'search <topic>' to browse.";
  }
  if (low.includes("your name") || low.includes("who are you")) {
    return "I'm Geglo AI, the built-in assistant inside Geglo Browser.";
  }
  if (low.includes("what can you do") || low === "help" || low === "/help") {
    return "I can answer math problems, tell the date & time, tell jokes, explain browser features (10-color tab groups, bookmarks, themes: /starwars, /venom, /doe, /yoda), or open web searches!";
  }
  if (low.includes("time")) {
    return "The current time is " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) + ".";
  }
  if (low.includes("date") || low.includes("today") || low.includes("day is it")) {
    return "Today is " + new Date().toLocaleDateString([], { weekday: "long", year: "numeric", month: "long", day: "numeric" }) + ".";
  }
  if (low.includes("sky blue")) {
    return "Sunlight scatters off gases in Earth's atmosphere—blue light has shorter waves, so it scatters in every direction more than other colors.";
  }
  if (low.includes("joke")) {
    return "Why do programmers prefer dark mode? Because light attracts bugs!";
  }
  if (low.includes("tab group") || low.includes("tabs")) {
    return "Geglo Browser supports 10-color tab groups—right-click or use the tab controls to organize your open pages by color.";
  }
  if (low.includes("bookmark")) {
    return "Click the ☆ star button next to the address bar to save any page to your bookmarks bar.";
  }
  if (low.includes("theme") || low.includes("secret") || low.includes("easter egg")) {
    return "Try typing /starwars, /venom, /doe, or /yoda in the search bar to switch your New Tab theme!";
  }
  if (low.startsWith("search ") || low.startsWith("open ") || low.startsWith("go to ")) {
    const target = q.replace(/^(search|open|go to)\s+/i, "");
    setTimeout(() => openInTab(target), 200);
    return "Opening Geglo Link Page for \"" + target + "\"...";
  }
  return "I don't have an offline answer for \"" + q + "\" yet—type \"search " + q + "\" and I'll open the Geglo Link Page for it!";
}
const $ = id => document.getElementById(id);
const ch = $("ch"), ip = $("in"), bg = $("bg"), c = bg.getContext("2d");
const fl = $("fl"), hm = $("hm"), dm = $("dm"), ho = $("ho"), home = $("home");

let W, H, rf, md = "normal", hu = 0, nm = "", pr = "normal";
let tabs = [{ id: 0, title: "New Tab", url: "", src: "about:blank", isHome: false, gid: null }];
let groups = [], curTab = 0, tabSeq = 1, grpSeq = 1, pickGrp = null;

const GCOLS = [
  { n: "Crimson", c: "#dc143c" }, { n: "Red", c: "#ef4444" },
  { n: "Orange", c: "#f97316" }, { n: "Deep Blue", c: "#1e40af" },
  { n: "Turquoise", c: "#06b6d4" }, { n: "Blue", c: "#3b82f6" },
  { n: "Purple", c: "#a855f7" }, { n: "Cosmos", c: "#4c1d95" },
  { n: "Forest Green", c: "#15803d" }, { n: "Light Green", c: "#4ade80" }
];

const rz = () => { W = bg.width = innerWidth; H = bg.height = innerHeight; };
onresize = rz; rz();

const ad = (t, w) => {
  const d = document.createElement("div");
  d.className = "m " + w;
  d.textContent = t;
  ch.appendChild(d);
  ch.scrollTop = ch.scrollHeight;
};

hm.onclick = () => { hu ^= 1; hm.classList.toggle("on", !!hu); };

const rs = () => {
  cancelAnimationFrame(rf);
  md = pr = "normal";
  document.body.className = "";
  dm.style.display = "none";
  fl.style.opacity = 0;
  c.clearRect(0, 0, W, H);
};
dm.onclick = rs;
function vnm(){rs();md=pr="venom";dm.style.display="block";let tr=Array.from({length:55},(_,i)=>{let e=i%4,x=e==1?W:e==3?0:Math.random()*W,y=e==0?0:e==2?H:Math.random()*H;return{p:[{x,y}],a:Math.atan2(H/2-y,W/2-x)+(Math.random()-.5)*.9,l:0,m:Math.max(W,H)*(.45+Math.random()*.45),w:2+Math.random()*5}}),ws=[{t:"WE",r:"-14deg"},{t:"ARE",r:"14deg"},{t:"VENOM",r:"0deg"}],s=0,t=0;document.body.classList.add("shk");(function sw(){if(s>=3||md!="venom"){fl.style.opacity=0;document.body.classList.remove("shk");return}let w=ws.at(s);fl.textContent=w.t;fl.style.transform="rotate("+w.r+")";fl.style.opacity=1;setTimeout(()=>{fl.style.opacity=0;s++;setTimeout(sw,140)},360)})();(function lp(){if(md!="venom")return;t+=.04;c.clearRect(0,0,W,H);tr.forEach(r=>{if(r.l<r.m){let l=r.p.at(-1);r.a+=(Math.random()-.5)*.22;r.p.push({x:l.x+Math.cos(r.a)*14,y:l.y+Math.sin(r.a)*14});r.l+=14}if(r.p.length>1){let f=r.p.at(0);c.beginPath();c.moveTo(f.x,f.y);r.p.forEach(p=>c.lineTo(p.x,p.y));c.strokeStyle="#070709";c.lineWidth=r.w+2;c.stroke();c.strokeStyle="rgba(215,225,240,.28)";c.lineWidth=Math.max(1,r.w*.3);c.stroke()}});c.save();c.translate(W/2,H/2);c.scale(1+Math.sin(t)*.06,1+Math.sin(t)*.06);c.fillStyle="#fff";c.beginPath();c.ellipse(0,-18,12,15,0,0,7);c.fill();c.beginPath();c.ellipse(0,12,16,24,0,0,7);c.fill();c.strokeStyle="#fff";c.lineWidth=5;c.lineCap="round";[[-14,-22,-46,-54,-66,-22],[-16,-12,-58,-28,-74,10],[-16,-2,-56,14,-64,52],[-12,10,-42,38,-44,74]].forEach(([a,b,d,e,f,g])=>{[1,-1].forEach(k=>{c.beginPath();c.moveTo(a*k,b);c.quadraticCurveTo(d*k,e,f*k,g);c.stroke()})});c.restore();rf=requestAnimationFrame(lp)})()}
function doe(){rs();md="doe";dm.style.display="block";document.body.classList.add("doe","glt");setTimeout(()=>document.body.classList.remove("glt"),480);let dr=Array(Math.floor(W/16)).fill(1);(function lp(){if(md!="doe")return;c.fillStyle="rgba(0,0,0,.08)";c.fillRect(0,0,W,H);c.fillStyle="#00ff41";c.font="15px monospace";dr.forEach((y,i)=>{c.fillText(Math.random()>.5?"1":"0",i*16,y*16);dr[i]=y*16>H&&Math.random()>.975?0:y+1});rf=requestAnimationFrame(lp)})()}
function sws(){rs();md=pr="starwars";dm.style.display="block";let st=Array.from({length:160},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.6+.3})),sp=[],t=0,saber=(ang,col)=>{c.save();c.translate(W/2,H/2);c.rotate(ang);c.fillStyle="#6b7280";c.fillRect(-7,95,14,48);c.fillStyle="#1f2937";c.fillRect(-8,103,16,6);c.fillRect(-8,125,16,6);c.shadowBlur=28;c.shadowColor=col;c.strokeStyle=col;c.lineWidth=13;c.lineCap="round";c.beginPath();c.moveTo(0,92);c.lineTo(0,-175);c.stroke();c.strokeStyle="#fff";c.lineWidth=5;c.stroke();c.restore()};(function lp(){if(md!="starwars")return;t+=.06;c.fillStyle="#03050a";c.fillRect(0,0,W,H);c.fillStyle="#fff";st.forEach(s=>{c.beginPath();c.arc(s.x,s.y,s.r,0,7);c.fill()});let w=Math.sin(t)*.07;saber(-.62+w,"#3b82f6");saber(.62-w,"#ef4444");if(Math.random()<.5)sp.push({x:W/2,y:H/2,vx:(Math.random()-.5)*9,vy:(Math.random()-.5)*9,a:1});sp=sp.filter(p=>{p.x+=p.vx;p.y+=p.vy;p.a-=.05;c.fillStyle="rgba(254,240,138,"+p.a+")";c.beginPath();c.arc(p.x,p.y,2.5,0,7);c.fill();return p.a>0});let g=c.createRadialGradient(W/2,H/2,1,W/2,H/2,26+Math.sin(t*3)*6);g.addColorStop(0,"#fff");g.addColorStop(.4,"rgba(253,224,71,.8)");g.addColorStop(1,"transparent");c.fillStyle=g;c.beginPath();c.arc(W/2,H/2,32,0,7);c.fill();rf=requestAnimationFrame(lp)})()}
function yoda(){rs();md=pr="yoda";dm.style.display="block";document.body.classList.add("yoda");let orbs=Array.from({length:70},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*3+1,vx:(Math.random()-.5)*.6,vy:-Math.random()*.5-.1,p:Math.random()*6}));(function lp(){if(md!="yoda")return;let g=c.createRadialGradient(W/2,H*.8,20,W/2,H/2,Math.max(W,H)*.7);g.addColorStop(0,"#1a2e12");g.addColorStop(1,"#070d05");c.fillStyle=g;c.fillRect(0,0,W,H);orbs.forEach(o=>{o.x+=o.vx;o.y+=o.vy;o.p+=.04;if(o.y<0)o.y=H;c.fillStyle="rgba(163,230,53,"+(0.35+Math.sin(o.p)*0.35)+")";c.beginPath();c.arc(o.x,o.y,o.r,0,7);c.fill()});rf=requestAnimationFrame(lp)})()}

let editingGrp=null,dragTabId=null;const tabRow=t=>{const act=t.id===curTab?" act":"",gb=(!t.isHome&&groups.length)?`<i onclick="event.stopPropagation();cycGrp(${t.id})">▤</i>`:"",cb=t.isHome?"":`<i class="x" onclick="event.stopPropagation();clsTab(${t.id})">×</i>`,da=t.isHome?"":`draggable="true" ondragstart="dragTabId=${t.id};event.dataTransfer.setData('text/plain',${t.id})" ondragend="dragTabId=null;document.querySelectorAll('.dragover,.dragover-root').forEach(e=>e.classList.remove('dragover','dragover-root'))"`;return`<div class="tab${act}" ${da} onclick="selTab(${t.id})"><span>${t.title}</span>${gb}${cb}</div>`};$("tlist").ondragover=e=>{if(!e.target.closest(".grp")){e.preventDefault();$("tlist").classList.add("dragover-root")}};$("tlist").ondrop=e=>{$("tlist").classList.remove("dragover-root");if(!e.target.closest(".grp")){e.preventDefault();const t=tabs.find(x=>x.id===(dragTabId??Number(e.dataTransfer.getData("text/plain"))));if(t&&!t.isHome){t.gid=null;renderTabs()}}};function updateNtTheme(){const n=$("ntpage"),lg=$("ntlogo");if(!n)return;n.className="mode-"+md;if(lg)lg.textContent=md==="starwars"?"Geglo Browser":"Geglo"}function renderTabs() {
  const cBtn = $("homebtn") || document.querySelector('[onclick*="openChat"], [title*="Chat"]');
  const curObj = tabs.find(t => t.id === curTab);
  if (cBtn && curObj) {
    cBtn.style.background = curObj.isHome ? "#2563eb" : "rgba(255,255,255,0.08)";
    cBtn.style.borderColor = curObj.isHome ? "#3b82f6" : "rgba(255,255,255,0.15)";
    cBtn.style.color = "#fff";
  }
  if (typeof renderBookmarks === "function") setTimeout(renderBookmarks, 0);let out="";tabs.filter(t=>!t.gid).forEach(t=>out+=tabRow(t));groups.forEach(g=>{const gt=tabs.filter(t=>t.gid===g.id),sw=pickGrp===g.id?`<div class="swatches">${GCOLS.map(x=>`<span class="sw" style="background:${x.c}" onclick="event.stopPropagation();setCol(${g.id},'${x.c}')"></span>`).join("")}</div>`:"",nh=editingGrp===g.id?`<input id="ginp-${g.id}" class="gname-in" value="${g.name.replace(/"/g,"&quot;")}" onclick="event.stopPropagation()" onkeydown="if(event.key==='Enter')saveGrp(${g.id},this.value);if(event.key==='Escape'){editingGrp=null;renderTabs()}" onblur="saveGrp(${g.id},this.value)">`:`<span class="gname" ondblclick="event.stopPropagation();renGrp(${g.id})">${g.col?"▸ ":"▾ "}${g.name}</span>`;out+=`<div class="grp" style="--gc:${g.color}" ondragover="event.preventDefault();event.stopPropagation();this.classList.add('dragover')" ondragleave="this.classList.remove('dragover')" ondrop="event.preventDefault();event.stopPropagation();this.classList.remove('dragover');const t=tabs.find(x=>x.id===(dragTabId??Number(event.dataTransfer.getData('text/plain'))));if(t&&!t.isHome){t.gid=${g.id};renderTabs()}"><div class="ghdr" onclick="togGrp(${g.id})"><span class="gdot" onclick="event.stopPropagation();openCol(${g.id})"></span>${nh}<span class="gact" onclick="event.stopPropagation();addTabInGrp(${g.id})">+</span><span class="gact" onclick="event.stopPropagation();renGrp(${g.id})">✎</span><span class="gact" onclick="event.stopPropagation();delGrp(${g.id})">×</span></div>${sw}${g.col?"":gt.map(tabRow).join("")}</div>`});$("tlist").innerHTML=out;if(editingGrp!==null){const i=$("ginp-"+editingGrp);if(i){i.focus();i.select()}}const act=tabs.find(t=>t.id===curTab)||tabs.at(0);$("wq").value=act.url||"";if(act.isHome){$("ntpage").style.display="none";$("gportal").style.display="none";$("tabbox").style.display="none";$("dashcards").style.display="flex"}else if(act.src==="geglo://portal"){$("dashcards").style.display="none";$("ntpage").style.display="none";$("tabbox").style.display="none";$("gportal").style.display="flex";showGegloPortal(act.portalQuery||act.title||"")}else if(!act.src||act.src==="about:blank"){$("dashcards").style.display="none";$("gportal").style.display="none";$("tabbox").style.display="none";$("ntpage").style.display="flex";if($("ntq"))$("ntq").value="";updateNtTheme()}else{$("gportal").style.display="none";$("dashcards").style.display="none";$("ntpage").style.display="none";$("tabbox").style.display="flex";$("taburl").textContent=act.url||"New Tab";const wv=$("tabframe");if(wv.dataset.tid!==String(act.id)||wv.dataset.u!==act.src){wv.dataset.tid=act.id;wv.dataset.u=act.src;try{wv.loadURL(act.src)}catch(e){wv.src=act.src}}}}

$("tabframe").addEventListener("page-title-updated", e => {
  const a = tabs.find(t => t.id === curTab);
  if (a && !a.isHome && e.title) { a.title = e.title; renderTabs(); }
});

$("tabframe").addEventListener("did-navigate", e => {
  const a = tabs.find(t => t.id === curTab);
  if (a && !a.isHome && e.url && e.url !== "about:blank") {
    a.url = e.url; a.src = e.url;
    $("wq").value = e.url; $("taburl").textContent = e.url;
  }
});

window.selTab = id => { curTab = id; renderTabs(); };
window.clsTab = id => { tabs = tabs.filter(t => t.id !== id); if (curTab === id) curTab = tabs.at(-1).id; renderTabs(); };
window.togGrp = id => { const g = groups.find(x => x.id === id); if (g) { g.col = !g.col; renderTabs(); } };
window.openCol = id => { pickGrp = pickGrp === id ? null : id; renderTabs(); };
window.setCol = (id, col) => { const g = groups.find(x => x.id === id); if (g) g.color = col; pickGrp = null; renderTabs(); };
window.renGrp=id=>{editingGrp=id;renderTabs()};window.saveGrp=(id,v)=>{const g=groups.find(x=>x.id===id);if(g&&v&&v.trim())g.name=v.trim();editingGrp=null;renderTabs()};
window.delGrp = id => { tabs.forEach(t => { if (t.gid === id) t.gid = null; }); groups = groups.filter(g => g.id !== id); renderTabs(); };
window.addTabInGrp = gid => { const id = tabSeq++; tabs.push({ id, title: "New Tab", url: "", src: "about:blank", isHome: false, gid }); curTab = id; renderTabs(); $("wq").focus(); };
window.cycGrp = tid => {
  const t = tabs.find(x => x.id === tid);
  if (!t || !groups.length) return;
  const i = groups.findIndex(g => g.id === t.gid);
  t.gid = i === -1 ? groups.at(0).id : (i + 1 < groups.length ? groups.at(i + 1).id : null);
  renderTabs();
};

$("newgrp").onclick = () => { const id = grpSeq++; groups.push({ id, name: "Group " + id, color: GCOLS.at((id - 1) % GCOLS.length).c, col: false }); pickGrp = id; renderTabs(); };
const ntFn=()=>{const id=tabSeq++;tabs.push({id,title:"New Tab",url:"",src:"about:blank",isHome:false,gid:null});curTab=id;renderTabs();if($("ntq"))$("ntq").focus()};$("newtab").onclick=ntFn;
$("reloadtab").onclick = () => { const w = $("tabframe"); if (w && w.reload) w.reload(); };

function toggleHome(f) {
  const s = typeof f === "boolean" ? f : !home.classList.contains("show");
  home.classList.toggle("show", s);
  ch.style.display = s ? "none" : "flex";
  ho.classList.toggle("on", s);
  if (s) {
    renderTabs();
    $("wx").textContent = "Port Kembla NSW • Online";
    $("nw").innerHTML = `<a href="https://willyweather.com.au" onclick="event.preventDefault();openInTab(this.href)">WillyWeather — Port Kembla</a><a href="https://bom.gov.au" onclick="event.preventDefault();openInTab(this.href)">BOM — Wollongong & Illawarra</a><a href="https://abc.net.au" onclick="event.preventDefault();openInTab(this.href)">ABC News Australia</a>`;
  }
}
ho.onclick = () => toggleHome();
window.runCmd = cmd => { toggleHome(false); go(cmd); };

window.setNtMode=m=>{m==="normal"?rs():m==="/starwars"?sws():m==="/venom"?vnm():m==="/doe"?doe():yoda();updateNtTheme()};const QUICK_SITES = {
  youtube: "https://youtube.com",
  yt: "https://youtube.com",
  google: "https://google.com",
  gmail: "https://mail.google.com",
  github: "https://github.com",
  spotify: "https://spotify.com",
  reddit: "https://reddit.com",
  wikipedia: "https://wikipedia.org",
  wiki: "https://wikipedia.org",
  weather: "https://willyweather.com.au",
  bom: "https://bom.gov.au",
  abc: "https://abc.net.au",
  netflix: "https://netflix.com",
  discord: "https://discord.com"
};

function showGegloPortal(query) {
  const clean = (query || "").trim();
  const enc = encodeURIComponent(clean);
  const low = clean.toLowerCase();
  const slug = low.replace(/[^a-z0-9-]/g, "");
  const options = [];

  if (QUICK_SITES[low]) {
    options.push({ name: "Open " + clean + " Official Site", desc: QUICK_SITES[low], url: QUICK_SITES[low] });
  }
  if (/^[a-z0-9.-]+\.[a-z]{2,}(\/.*)?$/i.test(clean) && !/\s/.test(clean)) {
    const direct = /^https?:\/\//i.test(clean) ? clean : "https://" + clean;
    options.push({ name: "Visit " + clean, desc: direct, url: direct });
  }
  options.push({ name: "Search Google for \"" + clean + "\"", desc: "Web results on Google", url: "https://google.com/search?q=" + enc });
  if (slug && !QUICK_SITES[low]) {
    options.push({ name: "Try " + slug + ".com", desc: "https://" + slug + ".com", url: "https://" + slug + ".com" });
    options.push({ name: "Try " + slug + ".com.au", desc: "https://" + slug + ".com.au", url: "https://" + slug + ".com.au" });
  }
  options.push({ name: "Search YouTube", desc: "Videos for \"" + clean + "\"", url: "https://youtube.com/results?search_query=" + enc });
  options.push({ name: "Search Wikipedia", desc: "Articles for \"" + clean + "\"", url: "https://wikipedia.org/wiki/Special:Search?search=" + enc });
  options.push({ name: "Search Reddit", desc: "Threads for \"" + clean + "\"", url: "https://reddit.com/search/?q=" + enc });

  if ($("gpquery")) $("gpquery").textContent = "Geglo Link Page: \"" + clean + "\"";
  if ($("gpgoogle")) $("gpgoogle").onclick = () => loadDirectUrl("https://google.com/search?q=" + enc, clean);
  if ($("gpgrid")) {
    $("gpgrid").innerHTML = options.map(o =>
      `<button class="gp-card" style="text-align:left;padding:16px;border-radius:12px;border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.06);color:#fff;cursor:pointer;display:flex;flex-direction:column;gap:4px;" onclick="loadDirectUrl('${o.url.replace(/'/g, "\\'")}', '${clean.replace(/'/g, "\\'")}')"><b style="font-size:15px;">${o.name}</b><span style="font-size:12px;opacity:0.7;">${o.desc}</span></button>`
    ).join("");
  }
}

window.loadDirectUrl = (url, title) => {
  const a = tabs.find(t => t.id === curTab);
  const id = a && !a.isHome ? a.id : tabSeq++;
  if (!a || a.isHome) tabs.push({ id, title: title || url, url, src: url, portalQuery: "", isHome: false, gid: null });
  else { a.title = title || url; a.url = url; a.src = url; a.portalQuery = ""; }
  curTab = id;
  renderTabs();
};

function openInTab(q) {
  const s = q.trim();
  if (!s) return;
  const low = s.toLowerCase();
  if (["/starwars", "/venom", "/doe", "/yoda"].includes(low)) {
    setNtMode(low);
    $("wq").value = "";
    if ($("ntq")) $("ntq").value = "";
    return;
  }
  if (/^https?:\/\//i.test(s)) {
    return loadDirectUrl(s, s);
  }
  const a = tabs.find(t => t.id === curTab);
  const id = a && !a.isHome ? a.id : tabSeq++;
  if (!a || a.isHome) tabs.push({ id, title: s, url: s, src: "geglo://portal", portalQuery: s, isHome: false, gid: null });
  else { a.title = s; a.url = s; a.src = "geglo://portal"; a.portalQuery = s; }
  curTab = id;
  renderTabs();
}
$("wb").onclick = () => openInTab($("wq").value);
$("wq").onkeydown = e => { if (e.key === "Enter") openInTab($("wq").value); };

const jk=["Why don't scientists trust atoms? Because they make up everything!","My computer needed a break, so it sent Kit-Kat ads.","Why did the scarecrow win an award? He was outstanding in his field!"];
const toYoda=t=>{let w=t.replace(/[.!?]+$/,"").split(/\s+/);return(w.length>3?w.slice(Math.ceil(w.length/2)).join(" ")+", "+w.slice(0,Math.ceil(w.length/2)).join(" ").toLowerCase():t)+". Hmmm, yes."};
const st=t=>{if(hu&&md!="doe"&&!t.startsWith("WE ARE VENOM"))t+=" "+jk[Math.floor(Math.random()*jk.length)];return pr=="venom"?"WE SAY: "+t.toUpperCase():pr=="johndoe"?"P-p-please... "+t.replace(/([a-zA-Z])/,m=>m+"-"+m.toLowerCase())+"... d-don't hurt me!":pr=="einstein"?"Listen up, Einstein—"+t+" Even a nerd like you gets that, dweeb.":pr=="starwars"?"Strong with the Force, this is: "+t+" May the Force be with you.":pr=="yoda"?toYoda(t):t};
function go(r){
  const mq=r.trim().replace(/^what\s+is\s+/i,"").replace(/[?=]+$/g,"").trim();if(/^[0-9+\-*/().\s]+$/.test(mq)&&/[+\-*/]/.test(mq)){try{const ans=Function("return ("+mq+")")();if(typeof ans==="number"&&isFinite(ans)){ad(r.trim(),"u");return ad(st(String(ans)),"b")}}catch(e){}}
  const q=r.trim();if(!q)return;
  if(home.classList.contains("show"))toggleHome(false);
  ad(q,"u");const l=q.toLowerCase();
  if(l=="humor mode on"){hu=1;hm.classList.add("on");return ad(st("Humor mode active!"),"b")}
  if(l=="humor mode off"){hu=0;hm.classList.remove("on");return ad(st("Humor mode off."),"b")}
  if(l=="/home"||l=="home"){toggleHome(true);return ad(st("Opened browser."),"b")}
  if(l=="/venom"){vnm();return ad("WE ARE VENOM.","b")}
  if(l=="/doe"){doe();return ad("error","b")}
  if(l=="/starwars"){sws();return ad(st("The blades ignite! May the Force be with you."),"b")}
  if(l=="/yoda"){yoda();return ad("Welcome to Dagobah, you are. Teach you the Force, I will. Hmmm.","b")}
  if(md=="doe"){
    let m=q.match(/^translate:\s*['"](.+?)['"]\s*to\s*binary$/i);
    if(m)return ad(m.at(1).split("").map(x=>x.charCodeAt(0).toString(2).padStart(8,"0")).join(" "),"b");
    if(/^[01\s]+$/.test(q)&&q.replace(/\s+/g,"").length>=8)return ad("[Decoded: \""+q.trim().split(/\s+/).map(b=>String.fromCharCode(parseInt(b,2))).join("")+"\"]","b");
  }
  let nM=q.match(/(?:i\s+am|i'm|im|my\s+name\s+is)\s+(.+)/i);
  if(nM){nm=nM.at(1).trim();if(/john\s*doe/i.test(nm)){pr="johndoe";return ad("W-w-what?! J-John Doe?! P-please don't hack me!","b")}if(/einstein/i.test(nm)){pr="einstein";return ad("Whoa, Albert Einstein over here! Take a seat, nerd.","b")}return ad(st("Nice to meet you, "+nm+"!"),"b")}
  if(/^(hi|hello|hey|yo|sup)\b/i.test(l))return ad(st(nm?"Hey, "+nm+"!":"Hello! How can I help?"),"b");
  ad(st(gegloSmartReply(typeof q !== "undefined" ? q : (typeof text !== "undefined" ? text : ""))),"b");
}

$("sn").onclick = () => { go(ip.value); ip.value = ""; };
ip.onkeydown = e => { if (e.key === "Enter") { go(ip.value); ip.value = ""; } };

$("tabframe").addEventListener("did-fail-load",e=>{if(e.errorCode!==-3)$("taburl").textContent="Load error ("+e.errorDescription+"): "+e.validatedURL});
try{require("electron").ipcRenderer.on("open-tab",(_,u)=>{const id=tabSeq++;tabs.push({id,title:u,url:u,src:u,isHome:false,gid:null});curTab=id;renderTabs()})}catch(e){}
window.addEventListener("DOMContentLoaded",()=>{tabs.push({id:1,title:"New Tab",url:"",src:"about:blank",isHome:false,gid:null});curTab=1;tabSeq=2;toggleHome(true);});
if(document.readyState!=="loading"){tabs.push({id:1,title:"New Tab",url:"",src:"about:blank",isHome:false,gid:null});curTab=1;tabSeq=2;toggleHome(true);}


let bookmarks = JSON.parse(localStorage.getItem('geglo_bookmarks') || '[]');

function saveBookmarks() {
  localStorage.setItem('geglo_bookmarks', JSON.stringify(bookmarks));
  renderBookmarks();
}

window.toggleBookmark = () => {
  const act = tabs.find(t => t.id === curTab);
  if (!act || act.isHome || !act.src || act.src === 'about:blank') return;
  const targetUrl = act.src === 'geglo://portal' ? (act.portalQuery || act.title) : act.src;
  const title = act.title || targetUrl;
  const idx = bookmarks.findIndex(b => b.url === targetUrl);
  if (idx >= 0) {
    bookmarks.splice(idx, 1);
  } else {
    bookmarks.push({ title, url: targetUrl, isPortal: act.src === 'geglo://portal' });
  }
  saveBookmarks();
};

window.removeBookmark = (e, idx) => {
  e.stopPropagation();
  bookmarks.splice(idx, 1);
  saveBookmarks();
};

function renderBookmarks() {
  const bar = $('bmbar');
  const btn = $('bmbtn');
  const act = tabs.find(t => t.id === curTab);
  if (btn) {
    const curUrl = act ? (act.src === 'geglo://portal' ? (act.portalQuery || act.title) : act.src) : '';
    const isSaved = bookmarks.some(b => b.url === curUrl);
    btn.textContent = isSaved ? '★' : '☆';
    btn.style.color = isSaved ? '#facc15' : '#fff';
  }
  if (!bar) return;
  if (!bookmarks.length) {
    bar.innerHTML = '<span style="font-size:12px;opacity:0.45;">No bookmarks yet — click ☆ on any page to save it</span>';
    return;
  }
  bar.innerHTML = bookmarks.map((b, i) =>
    `<div onclick="${b.isPortal ? `openInTab('${b.url.replace(/'/g, "\\'")}')` : `loadDirectUrl('${b.url.replace(/'/g, "\\'")}', '${b.title.replace(/'/g, "\\'")}')`}" style="display:flex;align-items:center;gap:6px;padding:3px 10px;border-radius:6px;background:rgba(255,255,255,0.08);color:#fff;font-size:12px;cursor:pointer;white-space:nowrap;">
      <span>${b.title}</span>
      <span onclick="removeBookmark(event, ${i})" title="Remove" style="opacity:0.6;font-weight:bold;padding-left:2px;">×</span>
    </div>`
  ).join('');
}

setTimeout(renderBookmarks, 100);






(function initNativeChatToggle() {
  const chatBtn = $("ho");
  const chatBar = $("bar");

  function syncChatState() {
    const inBrowser = home && home.classList.contains("show");
    const inChat = !inBrowser;
    if (chatBtn) {
      chatBtn.style.setProperty("background", inChat ? "#2563eb" : "rgba(255,255,255,0.08)", "important");
      chatBtn.style.setProperty("border", inChat ? "1px solid #3b82f6" : "1px solid rgba(255,255,255,0.15)", "important");
      chatBtn.style.setProperty("color", "#fff", "important");
    }
    if (chatBar) {
      chatBar.style.display = inChat ? "flex" : "none";
    }
  }

  if (chatBtn && typeof toggleHome === "function") {
    chatBtn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const currentlyInBrowser = home && home.classList.contains("show");
      toggleHome(!currentlyInBrowser);
      if (currentlyInBrowser && $("in")) setTimeout(() => $("in").focus(), 50);
      syncChatState();
    };
  }

  // Start in Browser mode
  if (typeof toggleHome === "function") toggleHome(true);
  syncChatState();
  setInterval(syncChatState, 150);
})();
