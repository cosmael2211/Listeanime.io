<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Ma Liste</title>
<style>
:root{--paper:#f2ead9;--paper2:#fff;--ink:#181418;--ink2:#242028;--line:#181418;--muted:#8a8290;--red:#e6304a;--fd:Georgia,'Times New Roman',serif;--fb:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}
html{scroll-padding-top:env(safe-area-inset-top,0px)}
@media(prefers-color-scheme:dark){:root:not([data-theme="light"]){--paper:#151217;--paper2:#1f1b21;--ink:#f2ead9;--ink2:#e8dfc8;--line:#f2ead9;--muted:#948c98}}
:root[data-theme="dark"]{--paper:#151217;--paper2:#1f1b21;--ink:#f2ead9;--ink2:#e8dfc8;--line:#f2ead9;--muted:#948c98}
*{box-sizing:border-box}
body{margin:0;background:var(--paper);color:var(--ink);font-family:var(--fb)}
button{font-family:var(--fb);font-weight:600;cursor:pointer;border-radius:2px}
header{position:sticky;top:0;z-index:5;padding:12px 14px;background:var(--paper);border-bottom:3px solid var(--line);display:flex;align-items:center;gap:12px;flex-wrap:wrap}
.me{display:flex;align-items:center;gap:10px;background:none;border:none;color:var(--ink);padding:0;text-align:left}
.av{width:46px;height:46px;border-radius:50%;background:var(--red);border:3px solid var(--line);display:flex;align-items:center;justify-content:center;font-size:24px;flex-shrink:0}
.me b{font-family:var(--fd);font-style:italic;font-size:20px;display:block;line-height:1.1}
.me small{color:var(--muted);font-size:12px;display:block;max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.sp{flex:1}
.btn{border:2px solid var(--line);background:var(--paper2);color:var(--ink);padding:9px 14px;font-size:14px}
.btn:hover{background:var(--ink);color:var(--paper)}
.btn.p{background:var(--red);color:#fff;border-color:var(--red)}
.tog{display:flex;border:2px solid var(--line);border-radius:2px;overflow:hidden}
.tog button{border:none;background:var(--paper2);color:var(--ink);padding:9px 12px;font-size:14px}
.tog button.on{background:var(--ink);color:var(--paper)}
.sync{background:var(--paper2);border-bottom:2px solid var(--line);padding:10px 14px;display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-size:14px}
.sync textarea{flex:1;min-width:140px;max-width:320px;height:38px;padding:6px 10px;border:2px solid var(--line);background:var(--paper);color:var(--ink);font-size:12px;border-radius:2px;resize:none}
.bar{max-width:900px;margin:0 auto;padding:12px 12px 0}
.row{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:10px}
.chips{display:flex;gap:8px;overflow-x:auto;padding-bottom:6px;flex:1;min-width:0}
.chip{flex-shrink:0;border:2px solid var(--line);background:var(--paper2);color:var(--ink);padding:8px 14px;font-size:14px;border-radius:20px}
.chip.on{background:var(--red);color:#fff;border-color:var(--red)}
.chip small{opacity:.7;margin-left:4px}
select.sel{padding:8px;border:2px solid var(--line);background:var(--paper2);color:var(--ink);font-size:14px;border-radius:2px}
.lh{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin:6px 0 12px}
.lh h2{font-family:var(--fd);font-style:italic;margin:0;font-size:26px}
.badge{font-size:12px;font-weight:700;color:var(--muted);background:var(--paper2);border:2px solid var(--line);padding:3px 8px;text-transform:uppercase}
main{max-width:900px;margin:0 auto;padding:4px 12px 90px}
.empty{text-align:center;padding:50px 16px;color:var(--muted)}
.empty strong{display:block;font-family:var(--fd);font-style:italic;font-size:24px;color:var(--ink);margin-bottom:6px}
.item{cursor:grab;user-select:none;-webkit-user-select:none;background:var(--paper2);border:3px solid var(--line);border-radius:4px}
.item.dragging{opacity:.4}
.item.dt{border-top:4px solid var(--red)}.item.db{border-bottom:4px solid var(--red)}
.mode-list .item{display:flex;align-items:center;gap:12px;padding:10px 12px;margin-bottom:12px}
.mode-list .rank{font-family:var(--fd);font-style:italic;font-weight:700;font-size:36px;color:var(--red);min-width:50px;text-align:center}
.mode-list .cover{width:68px;height:96px;object-fit:cover;border:3px solid var(--line);flex-shrink:0;background:var(--paper)}
.cover.ph{display:flex;align-items:center;justify-content:center;font-size:26px;color:var(--muted)}
.info{flex:1;min-width:0}
.title{font-weight:700;font-size:19px;margin:0 0 4px;line-height:1.2}
.meta{font-size:12px;color:var(--muted);text-transform:uppercase;font-weight:700}
.note{font-size:14px;color:var(--ink2);margin-top:5px}
.actions{display:flex;gap:6px;flex-shrink:0}
.ib{border:2px solid var(--line);background:var(--paper2);color:var(--ink);width:38px;height:38px;padding:0;font-size:16px;border-radius:2px}
.ib:hover{background:var(--ink);color:var(--paper)}.ib:disabled{opacity:.2}
.mode-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
@media(min-width:600px){.mode-grid{grid-template-columns:repeat(auto-fill,minmax(180px,1fr))}}
.mode-grid .item{position:relative;overflow:hidden;display:flex;flex-direction:column}
.mode-grid .cover{width:100%;aspect-ratio:2/3;object-fit:cover;display:block;background:var(--paper)}
.mode-grid .cover.ph{font-size:44px}
.mode-grid .rank{position:absolute;top:6px;left:6px;font-family:var(--fd);font-style:italic;font-weight:700;font-size:20px;color:#fff;background:var(--red);min-width:32px;height:32px;display:flex;align-items:center;justify-content:center;border:2px solid var(--line);z-index:2}
.mode-grid .info{padding:9px 11px 11px}
.mode-grid .title{font-size:15px}
.mode-grid .actions{position:absolute;top:6px;right:6px;z-index:2}
.mode-grid .ib{width:34px;height:34px}
.fab{position:fixed;bottom:calc(20px + env(safe-area-inset-bottom,0px));right:20px;z-index:10;box-shadow:0 4px 12px rgba(0,0,0,.3);border-radius:50px;padding:14px 22px;font-size:16px}
.overlay{position:fixed;inset:0;background:rgba(10,8,10,.6);display:none;align-items:center;justify-content:center;z-index:20;padding:16px}
.overlay.open{display:flex}
.modal{background:var(--paper2);border:3px solid var(--line);max-width:440px;width:100%;max-height:92%;overflow-y:auto;padding:20px;border-radius:4px}
.modal h2{font-family:var(--fd);font-style:italic;margin:0 0 14px;font-size:24px}
.field{margin-bottom:12px}
.field label{display:block;font-size:12px;font-weight:700;text-transform:uppercase;color:var(--muted);margin-bottom:4px}
.field input,.field select,.field textarea{width:100%;padding:9px;border:2px solid var(--line);background:var(--paper);color:var(--ink);font-family:var(--fb);font-size:16px;border-radius:2px}
.field input[type=color]{padding:2px;height:42px}
.field textarea{resize:vertical;min-height:70px}
.ma{display:flex;justify-content:flex-end;gap:8px;margin-top:14px;flex-wrap:wrap}
.hint{font-size:13px;color:var(--muted);margin:0 0 10px}
</style>
</head>
<body>
<header>
  <button class="me" onclick="profileM()"><span class="av" id="av">📚</span><span><b id="pn">Mon profil</b><small id="pb">Touche pour personnaliser</small></span></button>
  <span class="sp"></span>
  <div class="tog"><button id="bL" onclick="setMode('list')">Liste</button><button id="bG" onclick="setMode('grid')">Grille</button></div>
  <button class="btn" onclick="shareM()">🔗 Partager</button>
</header>
<div class="sync">
  <button class="btn p" onclick="saveFile()">💾 Enregistrer</button>
  <button class="btn" onclick="$('fileIn').click()">📂 Ouvrir</button>
  <input type="file" id="fileIn" accept=".json,application/json" style="display:none" onchange="openFile(this)">
  <span>📱 Code :</span>
  <textarea id="syncCode" placeholder="Générer ou coller..."></textarea>
  <button class="btn" onclick="genCode()">Générer</button>
  <button class="btn p" onclick="loadCode()">Importer</button>
  <button class="btn" onclick="linksM()">🖼 Liens images</button>
</div>
<div class="bar">
  <div class="row">
    <select class="sel" id="flt" onchange="S.filter=this.value;render()"></select>
    <div class="chips" id="chips"></div>
    <button class="btn p" onclick="listM()">+ Liste</button>
  </div>
  <div class="lh"><h2 id="ln"></h2><span class="badge" id="st"></span><button class="ib" title="Renommer / collection" onclick="listM(S.cur)">✎</button><button class="ib" title="Supprimer la liste" onclick="delList(S.cur)">🗑</button></div>
</div>
<main><div id="list" class="mode-list"></div></main>
<button class="btn p fab" onclick="itemM()">+ Ajouter</button>
<div class="overlay" id="overlay"><div class="modal" id="mbox"></div></div>

<script>
const K='malliste_v2';
let S={profile:{name:'',emoji:'📚',bio:'',color:'#e6304a',theme:'auto'},lists:[],cur:null,mode:'list',filter:'',types:['Anime','Manga','Anime + Manga']};
let drag=null;
const $=id=>document.getElementById(id);
const uid=()=>'i'+Date.now()+Math.random().toString(36).slice(2,6);
const esc=s=>(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const L=()=>S.lists.find(l=>l.id===S.cur);
function toast(m){const t=document.createElement('div');t.textContent=m;t.style.cssText='position:fixed;left:50%;bottom:90px;transform:translateX(-50%);background:var(--ink);color:var(--paper);padding:12px 18px;border:2px solid var(--line);z-index:99;font:600 14px var(--fb);max-width:90%;text-align:center';document.body.appendChild(t);setTimeout(()=>t.remove(),3000);}
window.alert=toast;

function load(){
  try{
    const r=localStorage.getItem(K);
    if(r){const d=JSON.parse(r);S.profile=Object.assign(S.profile,d.profile||{});S.lists=d.lists||[];S.cur=d.cur;S.mode=d.mode||'list';if(d.types)S.types=d.types;}
  }catch(e){}
  if(!S.lists.length)S.lists=[{id:uid(),name:'Classement anime/manga',col:'',items:[]}];
  S.lists.forEach(l=>{if(l.name==='Mon top 100')l.name='Classement anime/manga';});
  if(!L())S.cur=S.lists[0].id;
}
function save(){try{localStorage.setItem(K,JSON.stringify({profile:S.profile,lists:S.lists,cur:S.cur,mode:S.mode,types:S.types}));}catch(e){}}

function modal(h){$('mbox').innerHTML=h;$('overlay').classList.add('open');}
function closeM(){$('overlay').classList.remove('open');}
$('overlay').addEventListener('click',e=>{if(e.target.id==='overlay')closeM();});

/* PROFIL */
function profileM(){
  const p=S.profile;
  modal(`<h2>Mon profil</h2>
  <div class="field"><label>Pseudo</label><input id="pName" value="${esc(p.name)}" placeholder="Ton pseudo"></div>
  <div class="field"><label>Avatar (emoji)</label><input id="pEmo" value="${esc(p.emoji)}" maxlength="4"></div>
  <div class="field"><label>Bio</label><textarea id="pBio" placeholder="Fan de shonen, de seinen...">${esc(p.bio)}</textarea></div>
  <div class="field"><label>Couleur</label><input type="color" id="pCol" value="${esc(p.color)}"></div>
  <div class="field"><label>Thème</label><select id="pTh">
    <option value="auto"${p.theme==='auto'?' selected':''}>Auto</option>
    <option value="light"${p.theme==='light'?' selected':''}>Clair</option>
    <option value="dark"${p.theme==='dark'?' selected':''}>Sombre</option></select></div>
  <div class="ma"><button class="btn" onclick="closeM()">Annuler</button><button class="btn p" onclick="saveProfile()">Enregistrer</button></div>`);
}
function saveProfile(){
  S.profile={name:$('pName').value.trim(),emoji:$('pEmo').value.trim()||'📚',bio:$('pBio').value.trim(),color:$('pCol').value,theme:$('pTh').value};
  save();closeM();render();
}
function applyProfile(){
  const p=S.profile,r=document.documentElement;
  r.style.setProperty('--red',p.color);
  if(p.theme==='auto')r.removeAttribute('data-theme');else r.setAttribute('data-theme',p.theme);
  $('av').textContent=p.emoji;
  $('pn').textContent=p.name||'Mon profil';
  $('pb').textContent=p.bio||'Touche pour personnaliser';
}

/* LISTES */
function listM(id){
  const l=id?S.lists.find(x=>x.id===id):null;
  const cols=[...new Set(S.lists.map(x=>x.col).filter(Boolean))];
  modal(`<h2>${l?'Modifier la liste':'Nouvelle liste'}</h2>
  <input type="hidden" id="lId" value="${l?l.id:''}">
  <div class="field"><label>Nom</label><input id="lName" value="${l?esc(l.name):''}" placeholder="Top 100, Favoris shonen..."></div>
  <div class="field"><label>Collection (optionnel)</label><input id="lCol" list="cols" value="${l?esc(l.col):''}" placeholder="Ex : Shonen, Romance...">
    <datalist id="cols">${cols.map(c=>`<option value="${esc(c)}">`).join('')}</datalist></div>
  <div class="ma">${l?`<button class="btn" onclick="delList('${l.id}')" style="margin-right:auto">Supprimer</button>`:''}
  <button class="btn" onclick="closeM()">Annuler</button><button class="btn p" onclick="saveList()">Enregistrer</button></div>`);
}
function saveList(){
  const name=$('lName').value.trim();if(!name){$('lName').focus();return;}
  const col=$('lCol').value.trim(),id=$('lId').value;
  if(id){const l=S.lists.find(x=>x.id===id);l.name=name;l.col=col;}
  else{const l={id:uid(),name,col,items:[]};S.lists.push(l);S.cur=l.id;}
  save();closeM();render();
}
function delList(id,ok){
  if(!ok){modal(`<h2>Supprimer cette liste ?</h2><p class="hint">Tout son contenu sera perdu.</p><div class="ma"><button class="btn" onclick="closeM()">Annuler</button><button class="btn p" onclick="delList('${id}',1)">Supprimer</button></div>`);return;}
  S.lists=S.lists.filter(l=>l.id!==id);
  if(!S.lists.length)S.lists=[{id:uid(),name:'Classement anime/manga',col:'',items:[]}];
  S.cur=S.lists[0].id;save();closeM();render();
}
function pick(id){S.cur=id;save();render();}

/* ITEMS */
function itemM(id){
  const it=id?L().items.find(i=>i.id===id):null;
  pend=it&&it.cover&&it.cover.startsWith('data:')?it.cover:null;
  const t=it?it.type:'Anime';
  modal(`<h2>${it?'Modifier':'Ajouter un titre'}</h2>
  <input type="hidden" id="eId" value="${it?it.id:''}">
  <div class="field"><label>Titre</label><input id="fT" value="${it?esc(it.title):''}" placeholder="Nom de l'anime ou du manga"></div>
  <div class="field"><label>Type</label><select id="fTy" onchange="newType(this)">${allTypes().map(x=>`<option${x===t?' selected':''}>${esc(x)}</option>`).join('')}<option value="__new">＋ Nouveau type…</option></select></div>
  <div class="field"><label>Image</label><div id="pv" style="margin-bottom:6px"></div><input type="file" id="fF" accept="image/*" onchange="pickImg(this)" style="margin-bottom:6px"><input id="fC" value="${it&&pend===null?esc(it.cover):''}" placeholder="ou colle une URL https://..." oninput="pend=null;showPv()"></div>
  <div class="field"><label>Note personnelle (optionnel)</label><textarea id="fN">${it?esc(it.note):''}</textarea></div>
  <div class="ma"><button class="btn" onclick="closeM()">Annuler</button><button class="btn p" onclick="saveItem()">Enregistrer</button></div>`);
  showPv();
}
let pend=null;
function allTypes(){const s=new Set(S.types);S.lists.forEach(l=>l.items.forEach(i=>i.type&&s.add(i.type)));return [...s];}
function newType(sel){if(sel.value!=='__new')return;const i=document.createElement('input');i.id='fTy';i.placeholder='Nom du nouveau type (Roman, Film...)';sel.replaceWith(i);i.focus();}
function showPv(){$('pv').innerHTML=pend?`<img src="${pend}" style="height:90px;border:2px solid var(--line)">`:'';}
function pickImg(inp){
  const f=inp.files[0];if(!f)return;
  const rd=new FileReader();
  rd.onload=()=>{
    const im=new Image();
    im.onload=()=>{
      const w=Math.min(240,im.width),h=Math.round(im.height*w/im.width);
      const c=document.createElement('canvas');c.width=w;c.height=h;
      c.getContext('2d').drawImage(im,0,0,w,h);
      pend=c.toDataURL('image/jpeg',0.7);$('fC').value='';showPv();
    };
    im.onerror=()=>alert('Image illisible.');
    im.src=rd.result;
  };
  rd.readAsDataURL(f);
}
function saveItem(){
  const title=$('fT').value.trim();if(!title){$('fT').focus();return;}
  const id=$('eId').value,d={title,type:$('fTy').value,cover:pend||$('fC').value.trim(),note:$('fN').value.trim()};
  const l=L();
  if(id)Object.assign(l.items.find(i=>i.id===id),d);else l.items.push({id:uid(),...d});
  save();closeM();render();
}
function delItem(id){const l=L();l.items=l.items.filter(i=>i.id!==id);save();render();}
function move(id,dir){
  const a=L().items,i=a.findIndex(x=>x.id===id),n=i+dir;
  if(n<0||n>=a.length)return;
  const [m]=a.splice(i,1);a.splice(n,0,m);save();render();
}
function setMode(m){S.mode=m;save();render();}

/* PARTAGE */
function enc(o){return btoa(encodeURIComponent(JSON.stringify(o)));}
function dec(s){s=s.trim();if(s[0]==='['||s[0]==='{')return JSON.parse(s);return JSON.parse(decodeURIComponent(atob(s.replace(/\s+/g,''))));}
function shareM(){
  modal(`<h2>Partager</h2>
  <p class="hint">Envoie ce lien du site + un code : la personne colle le code dans « Importer » et récupère ta liste. Aucun fichier à envoyer.</p>
  <div class="field"><label>Code de la liste « ${esc(L().name)} »</label><textarea id="cOut" readonly onclick="this.select()">${enc({t:'list',from:S.profile.name,list:{name:L().name,col:L().col,items:L().items}})}</textarea></div>
  <div class="ma" style="margin:0 0 14px"><button class="btn p" onclick="copyC('cOut')">Copier ce code</button><button class="btn" onclick="allC()">Sauvegarde de tout</button></div>
  <div class="field"><label>Importer un code</label><textarea id="cIn" placeholder="Colle un code ici..."></textarea></div>
  <div class="ma"><button class="btn" onclick="closeM()">Fermer</button><button class="btn p" onclick="importC()">Importer</button></div>`);
}
function allC(){$('cOut').value=enc({t:'all',profile:S.profile,lists:S.lists,types:S.types});copyC('cOut');}
function copyC(id){
  const e=$(id);e.select();
  try{navigator.clipboard.writeText(e.value);}catch(x){try{document.execCommand('copy');}catch(y){}}
  alert('Code copié !');
}
function importC(v){
  try{
    const d=dec(typeof v==='string'?v:$('cIn').value);
    if(d.t==='list'){
      const l={id:uid(),name:d.list.name+(d.from?' ('+d.from+')':''),col:d.list.col||'',items:(d.list.items||[]).map(i=>({...i,id:uid()}))};
      S.lists.push(l);S.cur=l.id;
    }else if(d.t==='all'){
      
      S.profile=Object.assign(S.profile,d.profile);S.lists=d.lists;if(d.types)S.types=d.types;S.cur=d.lists[0].id;
    }else if(Array.isArray(d)){
      S.lists.push({id:uid(),name:'Liste importée',col:'',items:d});S.cur=S.lists[S.lists.length-1].id;
    }else throw 0;
    save();closeM();render();
  }catch(e){alert('Code invalide.');}
}

/* FICHIER DE SAUVEGARDE */
function saveFile(){
  const b=new Blob([JSON.stringify({t:'all',profile:S.profile,lists:S.lists,types:S.types})],{type:'application/json'});
  const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='ma-liste-sauvegarde.json';
  document.body.appendChild(a);a.click();a.remove();
}
function openFile(inp){
  const f=inp.files[0];if(!f)return;
  const rd=new FileReader();
  rd.onload=()=>{
    try{
      const d=JSON.parse(rd.result);if(d.t!=='all')throw 0;
      
      S.profile=Object.assign(S.profile,d.profile);S.lists=d.lists;if(d.types)S.types=d.types;S.cur=d.lists[0].id;
      save();render();alert('✅ Fichier chargé !');
    }catch(e){alert('Fichier invalide.');}
  };
  rd.readAsText(f);inp.value='';
}

/* CODE DE BASE (Importer) */
function genCode(){
  if(!S.lists.some(l=>l.items.length)){alert('Tout est vide !');return;}
  $('syncCode').value=enc({t:'all',profile:S.profile,lists:S.lists,types:S.types});
  try{$('syncCode').select();navigator.clipboard.writeText($('syncCode').value);}catch(e){}
  alert('Code généré (tout : listes, titres, liens des images) et copié !');
}
function loadCode(){
  const v=$('syncCode').value.trim();
  if(!v){alert('Colle ton code !');return;}
  try{
    const d=dec(v);
    if(Array.isArray(d)){
      const l=L();
      
      l.items=d.map(i=>({...i,id:uid()}));
      save();render();alert('✅ Synchronisé !');
    }else{importC(v);alert('✅ Tout est importé !');}
  }catch(e){alert('❌ Code invalide.');}
}

/* LIENS IMAGES : export + import (remplace l'image de chaque emplacement) */
function linksM(){
  let out=[],n=0,local=0;
  S.lists.forEach(l=>{
    const rows=[];
    l.items.forEach((it,i)=>{
      if(!it.cover)return;
      if(it.cover.startsWith('data:')){local++;return;}
      rows.push((i+1)+'. '+it.title+' : '+it.cover);n++;
    });
    if(rows.length)out.push('== '+l.name+' ==\n'+rows.join('\n'));
  });
  modal(`<h2>Liens des images</h2>
  <p class="hint">${n} lien${n>1?'s':''} trouvé${n>1?'s':''}${local?` · ${local} image${local>1?'s importées':' importée'} depuis la galerie (pas de lien)`:''}.</p>
  <div class="field"><label>Exporter</label><textarea id="lk" readonly onclick="this.select()" style="min-height:120px;font-size:13px">${esc(out.join('\n\n'))}</textarea></div>
  <div class="ma" style="margin:0 0 14px"><button class="btn p" onclick="copyC('lk')">Copier tout</button></div>
  <div class="field"><label>Importer : remplace les images par emplacement</label>
  <textarea id="lkIn" style="min-height:120px;font-size:13px" placeholder="== Nom de la liste ==&#10;1. Titre : https://...jpg&#10;2. Titre : https://...jpg&#10;(sans titre de liste = liste actuelle)"></textarea></div>
  <div class="ma"><button class="btn" onclick="closeM()">Fermer</button><button class="btn p" onclick="applyLinks()">Remplacer les images</button></div>`);
}
function applyLinks(){
  const txt=$('lkIn').value;if(!txt.trim()){alert('Colle tes liens !');return;}
  let list=L(),n=0;
  txt.split(/\r?\n/).forEach(line=>{
    line=line.trim();if(!line)return;
    let m=line.match(/^==\s*(.*?)\s*==$/);
    if(m){list=S.lists.find(x=>x.name===m[1])||null;return;}
    m=line.match(/^(\d+)\s*[.)]\s.*?(https?:\/\/\S+)$/)||line.match(/^(\d+)\s*[.):]\s*(https?:\/\/\S+)$/);
    if(m&&list){const it=list.items[+m[1]-1];if(it){it.cover=m[2];n++;}}
  });
  save();render();closeM();alert(n+' image'+(n>1?'s remplacées':' remplacée')+' !');
}

/* RENDU */
function render(){
  applyProfile();
  $('bL').className=S.mode==='list'?'on':'';$('bG').className=S.mode==='grid'?'on':'';
  const cols=[...new Set(S.lists.map(l=>l.col).filter(Boolean))];
  if(S.filter&&!cols.includes(S.filter))S.filter='';
  $('flt').innerHTML='<option value="">Toutes les collections</option>'+cols.map(c=>`<option value="${esc(c)}"${c===S.filter?' selected':''}>${esc(c)}</option>`).join('');
  $('flt').style.display=cols.length?'':'none';
  const vis=S.lists.filter(l=>!S.filter||l.col===S.filter);
  $('chips').innerHTML=vis.map(l=>`<button class="chip${l.id===S.cur?' on':''}" onclick="pick('${l.id}')">${esc(l.name)}<small>${l.items.length}</small></button>`).join('');
  const l=L(),items=l.items;
  $('ln').textContent=l.name;
  const cnt={};items.forEach(i=>{(i.type==='Anime + Manga'?['Anime','Manga']:[i.type]).forEach(t=>cnt[t]=(cnt[t]||0)+1);});
  const parts=['Anime','Manga'].filter(t=>cnt[t]).concat(Object.keys(cnt).filter(t=>t!=='Anime'&&t!=='Manga')).map(t=>t+' : '+cnt[t]);
  $('st').textContent=`Total : ${items.length}`+(parts.length?` (${parts.join(' | ')})`:'')+(l.col?' · '+l.col:'');
  const box=$('list');box.className=S.mode==='list'?'mode-list':'mode-grid';box.innerHTML='';
  if(!items.length){box.innerHTML='<div class="empty"><strong>Liste vide</strong>Ajoute ton premier anime ou manga.</div>';return;}
  const fr=document.createDocumentFragment();
  items.forEach((it,idx)=>{
    const el=document.createElement('div');el.className='item';el.draggable=true;
    const cv=it.cover?`<img class="cover" src="${esc(it.cover)}" alt="" referrerpolicy="no-referrer" onerror="this.outerHTML='<div class=&quot;cover ph&quot;>?</div>'">`:'<div class="cover ph">?</div>';
    el.innerHTML=`<div class="rank">${idx+1}</div>${cv}<div class="info"><p class="title">${esc(it.title)}</p><div class="meta">${esc(it.type)}</div>${it.note&&S.mode==='list'?`<div class="note">${esc(it.note)}</div>`:''}</div>
    <div class="actions">${S.mode==='list'?`<button class="ib" onclick="move('${it.id}',-1)"${idx===0?' disabled':''}>▲</button><button class="ib" onclick="move('${it.id}',1)"${idx===items.length-1?' disabled':''}>▼</button>`:''}
    <button class="ib" onclick="itemM('${it.id}')">✎</button><button class="ib" onclick="delItem('${it.id}')">✕</button></div>`;
    el.addEventListener('dragstart',()=>{drag=it.id;setTimeout(()=>el.classList.add('dragging'),0);});
    el.addEventListener('dragend',()=>{drag=null;document.querySelectorAll('.item').forEach(i=>i.classList.remove('dragging','dt','db'));});
    el.addEventListener('dragover',e=>{e.preventDefault();if(it.id===drag)return;const r=el.getBoundingClientRect(),top=e.clientY<r.top+r.height/2;el.classList.toggle('dt',top);el.classList.toggle('db',!top);});
    el.addEventListener('dragleave',()=>el.classList.remove('dt','db'));
    el.addEventListener('drop',e=>{
      e.preventDefault();if(!drag||drag===it.id)return;
      const arr=L().items,f=arr.findIndex(i=>i.id===drag);let t=arr.findIndex(i=>i.id===it.id);
      const r=el.getBoundingClientRect();if(e.clientY>=r.top+r.height/2)t++;
      const [mv]=arr.splice(f,1);if(f<t)t--;arr.splice(t,0,mv);save();render();
    });
    fr.appendChild(el);
  });
  box.appendChild(fr);
}
load();render();
</script>
</body>
</html>
