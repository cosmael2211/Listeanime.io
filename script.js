/* ═══════════════════════════════════════════════════════
   script.js — Portfolio Mael Rabah
═══════════════════════════════════════════════════════ */

/* ── 1. CURSEUR ── */
(function () {
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
  });

  (function lerp() {
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(lerp);
  })();

  document.querySelectorAll('a, button, .fan-card, .slide-card, .domaine-card, .projet-card').forEach(el => {
    el.addEventListener('mouseenter', () => { dot.classList.add('big'); ring.classList.add('big'); });
    el.addEventListener('mouseleave', () => { dot.classList.remove('big'); ring.classList.remove('big'); });
  });
})();


/* ── 2. NAVBAR SCROLL ── */
(function () {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();


/* ── 3. BURGER MENU ── */
(function () {
  const burger = document.getElementById('burger');
  const links  = document.getElementById('navLinks');
  if (!burger || !links) return;

  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    links.classList.toggle('open');
  });

  links.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      burger.classList.remove('open');
      links.classList.remove('open');
    })
  );
})();


//* ── 4. SCROLL REVEAL ── */
(function () {
  const els = document.querySelectorAll('.rv, .rv-r, .rv-l');
  if (!els.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0, rootMargin: '0px 0px 0px 0px' });

  els.forEach(el => io.observe(el));
})();


/* ── 5. COMPTEUR ANIMÉ (hero stats) ── */
(function () {
const counters = document.querySelectorAll('.stat-count[data-count], .counter[data-count]');
  if (!counters.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el  = e.target;
      const end = parseInt(el.dataset.count, 10);
      let cur   = 0;
      const step = Math.max(1, Math.ceil(end / 40));
      const timer = setInterval(() => {
        cur = Math.min(cur + step, end);
        el.textContent = cur;
        if (cur >= end) clearInterval(timer);
      }, 30);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => io.observe(c));
})();


/* ══════════════════════════════════════════════════════
   6. FAN CAROUSEL — Éventail + hover superposition
══════════════════════════════════════════════════════ */
(function () {
  const carousel = document.getElementById('fanCarousel');
  if (!carousel) return;

  const cards   = Array.from(carousel.querySelectorAll('.fan-card'));
  const dotsEl  = document.getElementById('fanDots');
  const prevBtn = document.getElementById('fanPrev');
  const nextBtn = document.getElementById('fanNext');
  const total   = cards.length;
  let active    = 0;

  function getStyle(cardIdx, activeIdx, isHovered = false) {
    const offset = cardIdx - activeIdx;
    const absOff = Math.abs(offset);
    const rotDeg = offset * 15;
    const transX = offset * 28;
    const transY = absOff * 6;
    const scl    = cardIdx === activeIdx ? 1 : isHovered ? 0.96 : Math.max(0.82, 0.90 - absOff * 0.03);
    const bright = cardIdx === activeIdx ? 1 : isHovered ? 0.92 : Math.max(0.55, 0.80 - absOff * 0.06);
    const zi     = cardIdx === activeIdx ? 30 : isHovered ? 25 : Math.max(1, 15 - absOff * 3);

    return {
      transform: `translateX(${transX}px) translateY(${transY}px) rotate(${rotDeg}deg) scale(${scl})`,
      zIndex:    zi,
      filter:    `brightness(${bright})`,
    };
  }

  function applyStyle(card, style, instant = false) {
    const dur = instant ? '0s' : '0.55s';
    card.style.transition = `transform ${dur} cubic-bezier(0.34,1.4,0.64,1), box-shadow 0.4s ease, filter 0.4s ease, border-color 0.3s`;
    card.style.transform  = style.transform;
    card.style.zIndex     = style.zIndex;
    card.style.filter     = style.filter;
  }

  function render(newActive, instant = false) {
    active = ((newActive % total) + total) % total;

    cards.forEach((card, i) => {
      const isAct = i === active;
      card.classList.toggle('is-active', isAct);
      card.style.borderColor = isAct ? 'rgba(184,151,90,0.35)' : 'rgba(255,255,255,0.06)';
      card.style.boxShadow   = isAct
        ? '0 0 0 1px rgba(184,151,90,0.25), 0 30px 80px rgba(0,0,0,0.65), 0 0 50px rgba(184,151,90,0.06)'
        : 'none';
      applyStyle(card, getStyle(i, active, false), instant);
    });

    if (dotsEl) {
      dotsEl.querySelectorAll('.fan-dot').forEach((d, i) =>
        d.classList.toggle('active', i === active)
      );
    }
  }

  cards.forEach((card, i) => {
    card.addEventListener('mouseenter', () => {
      if (i === active) return;
      card.style.transition = 'transform 0.3s cubic-bezier(0.34,1.3,0.64,1), box-shadow 0.3s ease, filter 0.3s ease, border-color 0.3s';
      const s = getStyle(i, active, true);
      card.style.transform   = s.transform;
      card.style.zIndex      = s.zIndex;
      card.style.filter      = s.filter;
      card.style.borderColor = 'rgba(184,151,90,0.3)';
      card.style.boxShadow   = '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(184,151,90,0.25)';
    });

    card.addEventListener('mouseleave', () => {
      if (i === active) return;
      applyStyle(card, getStyle(i, active, false));
      card.style.borderColor = 'rgba(255,255,255,0.06)';
      card.style.boxShadow   = 'none';
    });

    card.addEventListener('click', e => {
      if (i !== active) {
        e.preventDefault();
        render(i);
      }
    });
  });

  if (prevBtn) prevBtn.addEventListener('click', () => render(active - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => render(active + 1));

  if (dotsEl) {
    dotsEl.querySelectorAll('.fan-dot').forEach((d, i) =>
      d.addEventListener('click', () => render(i))
    );
  }

  let touchX = 0;
  carousel.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
  carousel.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40) render(active + (dx < 0 ? 1 : -1));
  });

  render(0, true);
})();


/* ══════════════════════════════════════════════════════
   7. PARTICULES FLOTTANTES — arrière-plan #projets-perso
   Points dorés visibles, sans lignes de connexion
══════════════════════════════════════════════════════ */
(function () {
  const section = document.getElementById('projets-perso');
  if (!section) return;

  const canvas = document.createElement('canvas');
  canvas.id = 'persoCanvas';
  canvas.style.cssText = `
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
  `;
  section.style.position = 'relative';
  section.insertBefore(canvas, section.firstChild);

  const ctx = canvas.getContext('2d');
  let W = 0, H = 0;

  function resize() {
    const r = section.getBoundingClientRect();
    W = canvas.width  = r.width;
    H = canvas.height = r.height;
  }

  window.addEventListener('resize', resize, { passive: true });
  resize();

  const N_STARS = 80;

  const stars = Array.from({ length: N_STARS }, () => ({
    x:  Math.random() * W,
    y:  Math.random() * H,
    vx: (Math.random() - 0.5) * 0.28,
    vy: (Math.random() - 0.5) * 0.28,
    r:  Math.random() * 2.5 + 1.2,
    a:  Math.random() * 0.6 + 0.4,
    phase: Math.random() * Math.PI * 2,
    speed: 0.02 + Math.random() * 0.03,
  }));

  let tick = 0;

  function draw() {
    ctx.clearRect(0, 0, W, H);
    tick++;

    stars.forEach(s => {
      s.x += s.vx; s.y += s.vy;
      if (s.x < 0) { s.x = 0; s.vx *= -1; }
      if (s.x > W) { s.x = W; s.vx *= -1; }
      if (s.y < 0) { s.y = 0; s.vy *= -1; }
      if (s.y > H) { s.y = H; s.vy *= -1; }

      const twinkle = 0.5 + 0.5 * Math.sin(tick * s.speed + s.phase);
      const alpha   = s.a * (0.5 + 0.5 * twinkle);
      const radius  = s.r * (0.85 + 0.15 * twinkle);

      ctx.beginPath();
      ctx.arc(s.x, s.y, radius * 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(184,151,90,${alpha * 0.15})`;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(s.x, s.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(212,180,122,${alpha})`;
      ctx.shadowColor = `rgba(184,151,90,0.9)`;
      ctx.shadowBlur  = 8;
      ctx.fill();
      ctx.shadowBlur  = 0;
    });

    requestAnimationFrame(draw);
  }

  draw();
})();


/* ── 8. TILT 3D LÉGER (cartes projets & domaines) ── */
(function () {
  const TILT = 8;

  document.querySelectorAll('.projet-card, .domaine-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r  = card.getBoundingClientRect();
      const cx = r.left + r.width  / 2;
      const cy = r.top  + r.height / 2;
      const dx = (e.clientX - cx) / (r.width  / 2);
      const dy = (e.clientY - cy) / (r.height / 2);
      card.style.transform = `perspective(800px) rotateX(${-dy * TILT}deg) rotateY(${dx * TILT}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform  = '';
      card.style.transition = 'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease';
    });
  });
})();


/* ── 9. BOUTONS MAGNÉTIQUES ── */
(function () {
  const STRENGTH = 0.35;

  document.querySelectorAll('.btn-gold, .btn-outline, .btn-submit').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r  = btn.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width  / 2);
      const dy = e.clientY - (r.top  + r.height / 2);
      btn.style.transform = `translate(${dx * STRENGTH}px, ${dy * STRENGTH}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform  = '';
      btn.style.transition = 'transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)';
    });

    btn.addEventListener('mouseenter', () => {
      btn.style.transition = 'transform 0.1s ease';
    });
  });
})();


/* ── 10. SPARKLES — étoiles brillantes sur éléments interactifs ── */
(function () {
  const TARGETS = '.slide-card, .domaine-card, .fan-card, .btn-gold, .btn-outline, .studio-card';
  const COLORS  = ['#b8975a', '#d4b47a', '#fff8e7', '#ede8e0'];

  function spawnStar(x, y) {
    const star  = document.createElement('span');
    const size  = 4 + Math.random() * 6;
    const angle = Math.random() * 360;
    const dist  = 20 + Math.random() * 40;
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const dur   = 600 + Math.random() * 500;

    star.style.cssText = `
      position: fixed;
      width: ${size}px;
      height: ${size}px;
      pointer-events: none;
      z-index: 9999;
      left: ${x}px;
      top: ${y}px;
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
      background: ${color};
      border-radius: 50%;
      box-shadow: 0 0 ${size * 2}px ${color};
      transition: transform ${dur}ms ease-out, opacity ${dur}ms ease-out;
    `;
    document.body.appendChild(star);

    const rad = angle * Math.PI / 180;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      star.style.transform = `translate(calc(-50% + ${Math.cos(rad) * dist}px), calc(-50% + ${Math.sin(rad) * dist}px)) scale(0)`;
      star.style.opacity   = '0';
    }));

    setTimeout(() => star.remove(), dur);
  }

  function attachTo(el) {
    let interval = null;

    el.addEventListener('mouseenter', () => {
      interval = setInterval(() => {
        const r    = el.getBoundingClientRect();
        const side = Math.floor(Math.random() * 4);
        let x, y;
        if (side === 0)      { x = r.left + Math.random() * r.width; y = r.top; }
        else if (side === 1) { x = r.right; y = r.top + Math.random() * r.height; }
        else if (side === 2) { x = r.left + Math.random() * r.width; y = r.bottom; }
        else                 { x = r.left; y = r.top + Math.random() * r.height; }
        spawnStar(x, y);
      }, 120);
    });

    el.addEventListener('mouseleave', () => {
      clearInterval(interval);
      interval = null;
    });
  }

  document.querySelectorAll(TARGETS).forEach(attachTo);
})();


/* ── 11. SLIDER — pause hover + clic drag-safe ── */
(function () {
  const track = document.getElementById('sliderTrack');
  if (!track) return;

  track.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
  track.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');

  let startX = 0;
  track.addEventListener('mousedown', e => { startX = e.clientX; });
  track.addEventListener('click', e => {
    if (Math.abs(e.clientX - startX) > 5) e.preventDefault();
  }, true);
})();
