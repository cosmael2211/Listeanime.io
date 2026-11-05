/* ════════════════════════════════════════════════════════════
   projets.js — Filtres + Side Panel (page projets.html)
   CORRECTION : bindProjetCards lit les data-* et ouvre le panel
════════════════════════════════════════════════════════════ */
 
(function () {
    'use strict';
 
    /* ══════════════════════════════════════════
       1. OVERLAY PANEL — création DOM unique
    ══════════════════════════════════════════ */
 
    function buildOverlay() {
        if (document.getElementById('projetSidePanel')) return;
 
        const html = `
        <div id="projetSidePanel" class="side-panel" role="dialog" aria-modal="true" aria-label="Détail du projet">
            <div class="side-panel-backdrop" id="sidePanelBackdrop"></div>
            <div class="side-panel-drawer" id="sidePanelDrawer">
 
                <div class="side-panel-topbar"></div>
 
                <button class="side-panel-close" id="sidePanelClose" aria-label="Fermer">✕</button>
 
                <div class="side-panel-img-wrap" id="sidePanelImgWrap">
                    <img src="" alt="" id="sidePanelImg" class="side-panel-img">
                    <div class="side-panel-img-gradient"></div>
                    <span class="side-panel-cat-badge" id="sidePanelCat"></span>
                </div>
 
                <div class="side-panel-body" id="sidePanelBody">
 
                    <div class="sp-meta">
                        <span class="sp-sae" id="spSae"></span>
                    </div>
                    <h2 class="sp-title" id="spTitle"></h2>
 
                    <p class="sp-desc" id="spDesc"></p>
 
                    <div class="sp-divider"></div>
 
                    <div class="sp-section">
                        <div class="sp-section-label">Présentation du projet et ce que j'ai réalisé</div>
                        <p class="sp-detail" id="spDetail"></p>
                    </div>
 
                    <div class="sp-section" id="spRetenuWrap">
                        <div class="sp-section-label">Ce que j'ai retenu</div>
                        <ul class="sp-list" id="spRetenu"></ul>
                    </div>
 
                    <div class="sp-section" id="spDiffWrap">
                        <div class="sp-section-label">Difficultés rencontrées</div>
                        <ul class="sp-list sp-list-diff" id="spDiff"></ul>
                    </div>
 
                    <div class="sp-section">
                        <div class="sp-section-label">Compétences mobilisées</div>
                        <div class="sp-comps" id="spComps"></div>
                    </div>
 
                    <div class="sp-actions">
                        <a href="#" class="btn-gold sp-lien" id="spLien" target="_blank">
                            <span>Voir le projet complet</span>
                            <svg width="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        </a>
                        <a href="#" class="btn-outline sp-detail-link" id="spDetailLink">
                            <span>Page détail</span>
                            <svg width="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        </a>
                        <button class="btn-outline sp-close-btn" id="spCloseBtn">
                            Fermer
                        </button>
                    </div>
 
                </div>
            </div>
        </div>`;
 
        document.body.insertAdjacentHTML('beforeend', html);
 
        document.getElementById('sidePanelBackdrop').addEventListener('click', closePanel);
        document.getElementById('sidePanelClose').addEventListener('click', closePanel);
        document.getElementById('spCloseBtn').addEventListener('click', closePanel);
        document.addEventListener('keydown', e => { if (e.key === 'Escape') closePanel(); });
    }
 
 
    /* ══════════════════════════════════════════
       2. OPEN / CLOSE PANEL
    ══════════════════════════════════════════ */
 
    function openPanel(data) {
        buildOverlay();
 
        const panel   = document.getElementById('projetSidePanel');
        const drawer  = document.getElementById('sidePanelDrawer');
        const img     = document.getElementById('sidePanelImg');
        const imgWrap = document.getElementById('sidePanelImgWrap');
 
        /* ── Catégorie ── */
        const catEl = document.getElementById('sidePanelCat');
        catEl.textContent = data.catName  || '';
        catEl.className   = 'side-panel-cat-badge ' + (data.catClass || '');
 
        /* ── Méta texte ── */
        document.getElementById('spSae').textContent    = data.sae    || '';
        document.getElementById('spTitle').textContent  = data.titre  || '';
        document.getElementById('spDesc').textContent   = data.desc   || '';
        document.getElementById('spDetail').textContent = data.detail || data.desc || '';
 
        /* ── Image ── */
        const imageSrc = (data.image || '').trim();
        if (imageSrc) {
            img.src       = imageSrc;
            img.alt       = data.titre || '';
            img.className = 'side-panel-img' + (data.contain === 'true' ? ' side-panel-img-contain' : '');
            imgWrap.style.display = '';
 
            /* Fallback si l'image ne charge pas */
            img.onerror = () => { imgWrap.style.display = 'none'; };
        } else {
            imgWrap.style.display = 'none';
        }
 
        /* ── Ce que j'ai retenu (appris) ── */
        const retenuWrap = document.getElementById('spRetenuWrap');
        const retenuList = document.getElementById('spRetenu');
        if (data.retenu) {
            const items = data.retenu.split('|').filter(Boolean);
            retenuList.innerHTML = items.map(t => `<li>${t.trim()}</li>`).join('');
            retenuWrap.style.display = '';
        } else {
            retenuWrap.style.display = 'none';
        }
 
        /* ── Difficultés ── */
        const diffWrap = document.getElementById('spDiffWrap');
        const diffList = document.getElementById('spDiff');
        if (data.diff) {
            const items = data.diff.split('|').filter(Boolean);
            diffList.innerHTML = items.map(t => `<li>${t.trim()}</li>`).join('');
            diffWrap.style.display = '';
        } else {
            diffWrap.style.display = 'none';
        }
 
        /* ── Compétences ── */
        const comps = [data.comp1, data.comp2, data.comp3].filter(Boolean);
        document.getElementById('spComps').innerHTML =
            comps.map(c => `<span class="overlay-comp">${c}</span>`).join('');
 
        /* ── Lien externe ── */
        const lienEl = document.getElementById('spLien');
        if (data.lien) {
            lienEl.href          = data.lien;
            lienEl.style.display = '';
        } else {
            lienEl.style.display = 'none';
        }
 
        /* ── Lien vers la page détail ── */
        const detailLinkEl = document.getElementById('spDetailLink');
        if (data.href) {
            detailLinkEl.href          = data.href;
            detailLinkEl.style.display = '';
        } else {
            detailLinkEl.style.display = 'none';
        }
 
        /* ── Reset scroll + ouverture ── */
        document.getElementById('sidePanelBody').scrollTop = 0;
        panel.classList.add('open');
        document.body.style.overflow = 'hidden';
 
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                drawer.classList.add('open');
            });
        });
    }
 
    function closePanel() {
        const panel  = document.getElementById('projetSidePanel');
        const drawer = document.getElementById('sidePanelDrawer');
        if (!panel) return;
 
        drawer.classList.remove('open');
        setTimeout(() => {
            panel.classList.remove('open');
            document.body.style.overflow = '';
        }, 420);
    }
 
    window.openProjetPanel  = openPanel;
    window.closeProjetPanel = closePanel;
 
 
    /* ══════════════════════════════════════════
       3. CARTES PROJET — ouverture du panel
          Les cartes PHP doivent avoir les
          attributs data-* correspondants.
    ══════════════════════════════════════════ */
 
    const catNames   = { strat: 'Stratégie', crea: 'Création numérique', dev: 'Développement' };
    const catClasses = { strat: 'dom-strat',  crea: 'dom-crea',           dev: 'dom-dev'       };
 
    function bindProjetCards() {
        document.querySelectorAll('.projet-card').forEach(card => {
            card.addEventListener('click', e => {
                e.preventDefault(); // empêche la navigation directe
 
                const cat = card.dataset.cat || '';
 
                openPanel({
                    href:     card.getAttribute('href') || '',   // lien vers la page détail
                    catName:  catNames[cat]   || '',
                    catClass: catClasses[cat] || '',
                    image:    card.dataset.image   || '',
                    titre:    card.dataset.titre   || '',
                    desc:     card.dataset.desc    || '',
                    detail:   card.dataset.detail  || '',
                    sae:      card.dataset.sae     || '',
                    comp1:    card.dataset.comp1   || '',
                    comp2:    card.dataset.comp2   || '',
                    comp3:    card.dataset.comp3   || '',
                    lien:     card.dataset.lien    || '',
                    retenu:   card.dataset.retenu  || '',   // champ "appris" du CSV
                    diff:     card.dataset.diff    || '',
                    contain:  card.dataset.contain || 'false',
                });
            });
        });
    }
 
 
    /* ══════════════════════════════════════════
       4. FILTRES (page projets.html uniquement)
    ══════════════════════════════════════════ */
 
    function initFiltres() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const cards      = Array.from(document.querySelectorAll('.projet-card'));
        if (!filterBtns.length) return;
 
        function filterProjets(cat) {
            filterBtns.forEach(btn =>
                btn.classList.toggle('active', btn.dataset.filter === cat)
            );
 
            let visibleIdx = 0;
            cards.forEach(card => {
                const match = cat === 'all' || card.dataset.cat === cat;
                if (match) {
                    card.style.display = '';
                    const delay = visibleIdx * 55;
                    visibleIdx++;
                    setTimeout(() => {
                        card.style.opacity       = '1';
                        card.style.transform     = '';
                        card.style.pointerEvents = 'auto';
                    }, delay);
                } else {
                    card.style.opacity       = '0';
                    card.style.transform     = 'scale(0.94) translateY(10px)';
                    card.style.pointerEvents = 'none';
                    setTimeout(() => { card.style.display = 'none'; }, 350);
                }
            });
 
            const url = new URL(window.location);
            if (cat === 'all') url.searchParams.delete('cat');
            else url.searchParams.set('cat', cat);
            history.replaceState(null, '', url);
        }
 
        window.filterProjets = filterProjets;
        filterBtns.forEach(btn =>
            btn.addEventListener('click', () => filterProjets(btn.dataset.filter))
        );
    }
 
 
    /* ══════════════════════════════════════════
       5. TILT 3D — cartes projets
    ══════════════════════════════════════════ */
 
    function initTilt() {
        document.querySelectorAll('.projet-card').forEach(card => {
            card.addEventListener('mousemove', e => {
                const r  = card.getBoundingClientRect();
                const dx = (e.clientX - r.left - r.width  / 2) / (r.width  / 2);
                const dy = (e.clientY - r.top  - r.height / 2) / (r.height / 2);
                card.style.transform = `perspective(900px) rotateY(${dx * 5}deg) rotateX(${-dy * 5}deg) translateY(-5px)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transition = 'transform 0.55s cubic-bezier(0.34,1.56,0.64,1)';
                card.style.transform  = '';
                setTimeout(() => { card.style.transition = ''; }, 560);
            });
        });
    }
 
 
    /* ══════════════════════════════════════════
       6. SLIDER — pause hover (sliders index.html)
    ══════════════════════════════════════════ */
 
    function initSliders() {
        ['sliderTrack', 'sliderTrack2'].forEach(id => {
            const track = document.getElementById(id);
            if (!track) return;
            track.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
            track.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');
        });
    }
 
 
    /* ══════════════════════════════════════════
       INIT
    ══════════════════════════════════════════ */
    document.addEventListener('DOMContentLoaded', () => {
        bindProjetCards(); /* ← CORRECTION : était vide avant */
        initFiltres();
        initTilt();
        initSliders();
    });
 
})();
 
 
/* ════════════════════════════════════════════════════════════
   CSS DU PANEL
════════════════════════════════════════════════════════════ */
(function injectPanelStyles() {
    const css = `
    .side-panel {
        position: fixed;
        inset: 0;
        z-index: 1050;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.35s ease;
    }
    .side-panel.open {
        pointer-events: auto;
        opacity: 1;
    }
 
    .side-panel-backdrop {
        position: absolute;
        inset: 0;
        background: rgba(4, 4, 6, 0.82);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        cursor: pointer;
    }
 
    .side-panel-drawer {
        position: absolute;
        top: 0;
        right: 0;
        width: min(700px, 92vw);
        height: 100%;
        background: #0c0c10;
        border-left: 1px solid rgba(184,151,90,0.18);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        transform: translateX(100%);
        transition: transform 0.42s cubic-bezier(0.34, 1.2, 0.64, 1);
        box-shadow: -20px 0 80px rgba(0,0,0,0.7);
    }
    .side-panel-drawer.open {
        transform: translateX(0);
    }
 
    .side-panel-topbar {
        height: 2px;
        background: linear-gradient(90deg, #b8975a, rgba(184,151,90,0.2), transparent);
        flex-shrink: 0;
    }
 
    .side-panel-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: rgba(255,255,255,0.04);
        border: 1px solid rgba(255,255,255,0.08);
        color: #8c8880;
        font-size: 0.9rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10;
        transition: background 0.2s, border-color 0.2s, color 0.2s;
        font-family: inherit;
    }
    .side-panel-close:hover {
        background: rgba(184,151,90,0.1);
        border-color: rgba(184,151,90,0.3);
        color: #b8975a;
    }
 
    /* ── Image ── */
    .side-panel-img-wrap {
        height: 260px;
        position: relative;
        flex-shrink: 0;
        overflow: hidden;
        background: #16161c;
    }
    .side-panel-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: grayscale(10%);
        display: block;
    }
    .side-panel-img.side-panel-img-contain {
        object-fit: contain;
        padding: 2rem;
        background: #16161c;
    }
    .side-panel-img-gradient {
        position: absolute;
        bottom: 0; left: 0; right: 0;
        height: 120px;
        background: linear-gradient(to top, #0c0c10, transparent);
        pointer-events: none;
    }
 
    .side-panel-cat-badge {
        position: absolute;
        bottom: 1.2rem;
        left: 1.5rem;
        font-size: 0.6rem;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        padding: 0.28rem 0.65rem;
        border-radius: 3px;
        z-index: 2;
    }
 
    /* ── Corps ── */
    .side-panel-body {
        flex: 1;
        overflow-y: auto;
        padding: 1.75rem 2rem 2.5rem;
        scrollbar-width: thin;
        scrollbar-color: rgba(184,151,90,0.2) transparent;
    }
    .side-panel-body::-webkit-scrollbar { width: 4px; }
    .side-panel-body::-webkit-scrollbar-track { background: transparent; }
    .side-panel-body::-webkit-scrollbar-thumb { background: rgba(184,151,90,0.2); border-radius: 2px; }
 
    .sp-meta {
        display: flex;
        gap: 0.6rem;
        align-items: center;
        margin-bottom: 0.6rem;
    }
    .sp-sae {
        font-size: 0.58rem;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: #8c8880;
        border: 1px solid rgba(255,255,255,0.06);
        padding: 0.22rem 0.6rem;
        border-radius: 3px;
    }
 
    .sp-title {
        font-family: 'Cormorant Garamond', Georgia, serif;
        font-size: clamp(1.8rem, 3vw, 2.6rem);
        font-weight: 600;
        color: #ede8e0;
        line-height: 1.1;
        margin-bottom: 0.9rem;
    }
 
    .sp-desc {
        font-size: 0.95rem;
        color: #c0bab0;
        line-height: 1.75;
        margin-bottom: 1.2rem;
    }
 
    .sp-divider {
        height: 1px;
        background: linear-gradient(90deg, rgba(184,151,90,0.3), transparent);
        margin: 1.25rem 0;
    }
 
    .sp-section {
        margin-bottom: 1.5rem;
    }
    .sp-section-label {
        font-size: 0.6rem;
        letter-spacing: 0.3em;
        text-transform: uppercase;
        color: #b8975a;
        font-weight: 600;
        margin-bottom: 0.65rem;
    }
    .sp-detail {
        font-size: 0.9rem;
        color: #8c8880;
        line-height: 1.8;
    }
 
    .sp-list {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding: 0;
        margin: 0;
    }
    .sp-list li {
        font-size: 0.88rem;
        color: #8c8880;
        line-height: 1.6;
        padding-left: 1.2rem;
        position: relative;
    }
    .sp-list li::before {
        content: '✦';
        position: absolute;
        left: 0;
        color: #b8975a;
        font-size: 0.55rem;
        top: 0.3rem;
    }
    .sp-list-diff li::before {
        content: '—';
        color: #7ab0f0;
        font-size: 0.75rem;
        top: 0.1rem;
    }
 
    .sp-comps {
        display: flex;
        flex-wrap: wrap;
        gap: 0.45rem;
    }
 
    .sp-actions {
        display: flex;
        gap: 0.75rem;
        flex-wrap: wrap;
        margin-top: 2rem;
        padding-top: 1.5rem;
        border-top: 1px solid rgba(255,255,255,0.06);
    }
    .sp-close-btn {
        font-family: inherit;
    }
 
    @media (max-width: 600px) {
        .side-panel-drawer {
            width: 100vw;
        }
        .side-panel-body {
            padding: 1.25rem 1.25rem 2rem;
        }
        .side-panel-img-wrap {
            height: 200px;
        }
    }
    `;
 
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
})();
