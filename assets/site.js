(function () {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(pointer: fine)').matches;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
    sget(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
    sset(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }
  };

  let lang = store.get('lang') === 'en' || new URLSearchParams(location.search).get('lang') === 'en' ? 'en' : 'ru';
  const T = () => window.TEXT[lang];
  const listeners = [];
  const onLang = fn => { listeners.push(fn); fn(); };

  $('#year').textContent = new Date().getFullYear();

  /* ─────────────── Тост ─────────────── */
  const toastEl = $('#toast');
  let toastTimer = 0;
  function toast(text) {
    toastEl.textContent = text;
    toastEl.classList.add('on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('on'), 2600);
  }

  /* ─────────────── Язык ─────────────── */
  function applyLang(next) {
    lang = next;
    store.set('lang', lang);
    root.lang = lang;
    const en = window.I18N_EN;
    $$('[data-i18n]').forEach(el => {
      if (el.dataset.ru === undefined) el.dataset.ru = el.textContent;
      const v = lang === 'en' ? en[el.dataset.i18n] : el.dataset.ru;
      if (v !== undefined) el.textContent = v;
    });
    $$('[data-i18n-html]').forEach(el => {
      if (el.dataset.ruHtml === undefined) el.dataset.ruHtml = el.innerHTML;
      const v = lang === 'en' ? en[el.dataset.i18nHtml] : el.dataset.ruHtml;
      if (v !== undefined) el.innerHTML = v;
    });
    $$('[data-i18n-ph]').forEach(el => {
      if (el.dataset.ruPh === undefined) el.dataset.ruPh = el.placeholder;
      const v = lang === 'en' ? en[el.dataset.i18nPh] : el.dataset.ruPh;
      if (v !== undefined) el.placeholder = v;
    });
    $('#lang-btn').textContent = lang === 'en' ? 'RU' : 'EN';
    listeners.forEach(fn => fn());
  }
  $('#lang-btn').addEventListener('click', () => applyLang(lang === 'en' ? 'ru' : 'en'));

  /* ─────────────── Тема ─────────────── */
  let colors = {};
  function readColors() {
    const cs = getComputedStyle(root);
    colors = { accent: cs.getPropertyValue('--accent-rgb').trim(), cream: cs.getPropertyValue('--cream-rgb').trim() };
  }
  function setTheme(name, announce) {
    if (name === 'broadcast' && store.get('broadcast') !== '1') return false;
    root.dataset.theme = name;
    store.set('theme', name);
    $$('[data-theme-set]').forEach(b => b.setAttribute('aria-checked', String(b.dataset.themeSet === name)));
    readColors();
    if (announce) toast(T().toast.theme + ($(`[data-theme-set="${name}"]`)?.textContent || name));
    return true;
  }
  if (store.get('broadcast') === '1') $('[data-theme-set="broadcast"]').hidden = false;
  setTheme(root.dataset.theme || 'cdb');
  $$('[data-theme-set]').forEach(b => b.addEventListener('click', () => setTheme(b.dataset.themeSet, true)));

  function unlockBroadcast() {
    store.set('broadcast', '1');
    $('[data-theme-set="broadcast"]').hidden = false;
    setTheme('broadcast');
    toast(T().toast.secret);
  }
  const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let kpos = 0;
  addEventListener('keydown', e => {
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    kpos = key === konami[kpos] ? kpos + 1 : (key === konami[0] ? 1 : 0);
    if (kpos === konami.length) { kpos = 0; unlockBroadcast(); }
  });

  /* ─────────────── Экран загрузки: один раз за сессию ─────────────── */
  if (!reduced && store.sget('booted') !== '1') {
    const boot = document.createElement('div');
    boot.className = 'boot';
    boot.setAttribute('aria-hidden', 'true');
    const cur = document.createElement('span');
    cur.className = 'cur';
    const skip = document.createElement('div');
    skip.className = 'skip';
    skip.textContent = T().bootSkip;
    boot.append(cur, skip);
    document.body.appendChild(boot);
    const screen = $('.screen');
    screen.style.animationPlayState = 'paused';

    const timers = [];
    T().boot.forEach((text, i) => timers.push(setTimeout(() => {
      const p = document.createElement('p');
      p.textContent = text;
      if (i === T().boot.length - 2) p.className = 'hl';
      boot.insertBefore(p, cur);
    }, i * 130)));

    const finish = () => {
      timers.forEach(clearTimeout);
      removeEventListener('keydown', finish);
      boot.removeEventListener('click', finish);
      store.sset('booted', '1');
      boot.classList.add('done');
      screen.style.animationPlayState = 'running';
      setTimeout(() => boot.remove(), 500);
    };
    timers.push(setTimeout(finish, 1550));
    addEventListener('keydown', finish);
    boot.addEventListener('click', finish);
  }

  /* ─────────────── Часы ─────────────── */
  const fmt = new Intl.DateTimeFormat('ru-RU', { timeZone: 'Europe/Moscow', hour: '2-digit', minute: '2-digit' });
  function tick() { const t = fmt.format(new Date()); $('#clock').textContent = t; $('#clock2').textContent = t; }
  tick(); setInterval(tick, 10000);

  /* ─────────────── Строка «сейчас» ─────────────── */
  const typed = $('#typed');
  let typedIdx = 0, typeTimer = 0;
  function typeLine(s) {
    clearInterval(typeTimer);
    if (reduced) { typed.textContent = s; return; }
    let i = 0;
    typeTimer = setInterval(() => { typed.textContent = s.slice(0, ++i); if (i >= s.length) clearInterval(typeTimer); }, 28);
  }
  onLang(() => typeLine(T().typed[typedIdx]));
  setInterval(() => { typedIdx = (typedIdx + 1) % T().typed.length; typeLine(T().typed[typedIdx]); }, 4200);

  /* ─────────────── Появление и счётчики ─────────────── */
  function countUp(el) {
    const target = +el.dataset.count, suffix = el.dataset.suffix || '';
    if (reduced) { el.textContent = target + suffix; return; }
    const t0 = performance.now();
    const step = now => {
      const p = Math.min((now - t0) / 1200, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * e) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    $$('[data-count]', e.target).forEach(countUp);
    io.unobserve(e.target);
  }), { threshold: 0.12 });
  $$('.reveal').forEach(el => io.observe(el));

  /* ─────────────── Обо мне ─────────────── */
  let mode = 'tech';
  function renderMode() {
    const m = T().modes[mode];
    $('#mode-name').textContent = m.name;
    $('#mode-hint').textContent = m.hint;
    $('#mode-body').innerHTML = m.html;
    $$('[data-mode]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.mode === mode)));
  }
  $$('[data-mode]').forEach(b => b.addEventListener('click', () => { mode = b.dataset.mode; renderMode(); }));
  onLang(renderMode);

  /* ─────────────── Конвейер ─────────────── */
  const nodes = $$('#pipe .node');
  if (!reduced) {
    let n = 0;
    setInterval(() => { nodes.forEach((el, i) => el.classList.toggle('on', i === n)); n = (n + 1) % (nodes.length + 2); }, 650);
  } else {
    nodes[nodes.length - 1].classList.add('on');
  }

  /* ─────────────── Макет карточки оператора ─────────────── */
  const tgMsg = $('#tg-msg');
  let sigIdx = 0, sigState = '';
  function renderSig() {
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    let html = T().sig[sigIdx].html;
    if (sigState === 'ok') html += sigIdx === 2 ? T().sigBlocked : T().sigOk;
    if (sigState === 'no') html += T().sigNo;
    if (sigState === 'sim') html += T().sigSim;
    tgMsg.innerHTML = html + `<div class="tg-time">${time}</div>`;
    $$('#tg-kb [data-act]').forEach(b => { if (b.dataset.act !== 'next') b.disabled = !!sigState; });
  }
  $('#tg-kb').addEventListener('click', e => {
    const b = e.target.closest('[data-act]');
    if (!b) return;
    tgMsg.style.opacity = '.4';
    setTimeout(() => {
      if (b.dataset.act === 'next') { sigIdx = (sigIdx + 1) % T().sig.length; sigState = ''; }
      else sigState = b.dataset.act;
      renderSig();
      tgMsg.style.opacity = '1';
    }, 220);
  });
  onLang(renderSig);

  /* ─────────────── Скриншот ─────────────── */
  const lb = $('#lightbox');
  onLang(() => $('#shot').dataset.cap = T().shotCap);
  $('#shot').addEventListener('click', () => lb.showModal ? lb.showModal() : lb.setAttribute('open', ''));
  $('#lb-close').addEventListener('click', () => lb.close());
  lb.addEventListener('click', e => { if (e.target === lb) lb.close(); });

  /* ─────────────── Погодные иконки ─────────────── */
  const CLOUD = 'M17 46h30a10 10 0 0 0 1-20 15 15 0 0 0-29-4A12 12 0 0 0 17 46z';
  function icon(kind, night) {
    const a = 'var(--accent)', c = 'rgb(var(--cream-rgb))';
    const cloud = (y = 0) => `<path class="wx-cloud" d="${CLOUD}" transform="translate(0 ${y})" fill="var(--pane-solid)" stroke="${c}" stroke-width="2.5" stroke-linejoin="round"/>`;
    const sun = (cx = 32, cy = 32, r = 10) => `<g class="wx-sun-rays" style="transform-origin:${cx}px ${cy}px">${[0, 45, 90, 135, 180, 225, 270, 315].map(d => `<line x1="${cx}" y1="${cy - r - 5}" x2="${cx}" y2="${cy - r - 11}" stroke="${a}" stroke-width="3" stroke-linecap="round" transform="rotate(${d} ${cx} ${cy})"/>`).join('')}</g><circle cx="${cx}" cy="${cy}" r="${r}" fill="${a}"/>`;
    const moon = (cx = 32, cy = 30) => `<path d="M${cx + 6} ${cy - 14}a15 15 0 1 0 10 22 12 12 0 0 1-10-22z" fill="${a}"/>`;
    const svg = inner => `<svg class="wx" viewBox="0 0 64 64" aria-hidden="true">${inner}</svg>`;
    switch (kind) {
      case 'clear': return svg(night ? moon() : sun());
      case 'mostly': return svg((night ? moon(40, 20) : sun(42, 22, 8)) + cloud(4));
      case 'cloudy': return svg(cloud(-4));
      case 'fog': return svg(cloud(-10) + [44, 51, 58].map((y, i) => `<line x1="${12 + i * 4}" y1="${y}" x2="${52 - i * 2}" y2="${y}" stroke="${c}" stroke-opacity=".6" stroke-width="2.5" stroke-linecap="round"/>`).join(''));
      case 'drizzle':
      case 'rain': return svg(cloud(-8) + `<g>${[22, 32, 42].map(x => `<line class="wx-drop" x1="${x}" y1="44" x2="${x - 3}" y2="52" stroke="${a}" stroke-width="3" stroke-linecap="round"/>`).join('')}</g>`);
      case 'snow': return svg(cloud(-8) + `<g>${[22, 32, 42].map(x => `<circle class="wx-flake" cx="${x}" cy="47" r="2.6" fill="${c}"/>`).join('')}</g>`);
      case 'storm': return svg(cloud(-8) + `<path class="wx-bolt" d="M34 38l-8 12h7l-4 10 12-14h-7l4-8z" fill="${a}"/>` + `<path d="M34 38l-8 12h7l-4 10 12-14h-7l4-8z" fill="none" stroke="${a}" stroke-opacity=".35" stroke-width="1.5"/>`);
    }
    return svg(cloud());
  }
  const codeKind = c => c === 0 ? 'clear' : c === 1 ? 'mostly' : c <= 3 ? 'cloudy' : c <= 48 ? 'fog' : c <= 57 ? 'drizzle' : c <= 67 || (c >= 80 && c <= 82) ? 'rain' : c <= 77 || c === 85 || c === 86 ? 'snow' : c >= 95 ? 'storm' : 'cloudy';

  /* ─────────────── Погода в Москве ─────────────── */
  let weather = null;
  const URL_WX = 'https://api.open-meteo.com/v1/forecast?latitude=55.7558&longitude=37.6173&current=temperature_2m,apparent_temperature,weather_code,is_day,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=3&timezone=Europe%2FMoscow';
  async function loadWeather() {
    try {
      const cached = JSON.parse(store.sget('wx') || 'null');
      if (cached && Date.now() - cached.t < 15 * 60e3) return cached.d;
    } catch (e) {}
    const r = await fetch(URL_WX);
    if (!r.ok) throw new Error(r.status);
    const d = await r.json();
    store.sset('wx', JSON.stringify({ t: Date.now(), d }));
    return d;
  }
  const signed = t => (t > 0 ? '+' : '') + Math.round(t) + '°';

  function renderWeather() {
    const W = T().wx;
    if (!weather) {
      $('#wx-temp').textContent = 'MSK';
      if (weather === false) { $('#wx-now-c').textContent = W.fail; $('#st-wx').textContent = '—'; }
      return;
    }
    const cur = weather.current, kind = codeKind(cur.weather_code), night = !cur.is_day;
    $('#wx-icon').innerHTML = icon(kind, night);
    $('#wx-temp').textContent = signed(cur.temperature_2m);
    $('#wx-now-icon').innerHTML = icon(kind, night).replace('<svg', '<svg width="64" height="64"');
    $('#wx-now-t').textContent = signed(cur.temperature_2m);
    $('#wx-now-c').textContent = W[kind];
    $('#wx-now-s').textContent = `${W.feels} ${signed(cur.apparent_temperature)} · ${W.wind} ${Math.round(cur.wind_speed_10m)} ${W.kmh}`;
    $('#wx-comment').textContent = W.comment[kind];
    $('#st-wx').textContent = `${signed(cur.temperature_2m)} · ${W[kind]}`;
    const d = weather.daily;
    $('#wx-days').innerHTML = d.time.map((_, i) => `<div class="wx-day"><div class="d">${W.days[i]}</div>${icon(codeKind(d.weather_code[i]))}<div class="t">${signed(d.temperature_2m_max[i])} / ${signed(d.temperature_2m_min[i])}</div></div>`).join('');
  }
  onLang(renderWeather);

  /* Выпадашки в шапке: погода и темы. Открыта только одна. */
  const pops = [[$('#wx-btn'), $('#wx-pop')], [$('#theme-btn'), $('#theme-pop')]];
  const closePops = except => pops.forEach(([btn, pop]) => { if (pop !== except) { pop.hidden = true; btn.setAttribute('aria-expanded', 'false'); } });
  pops.forEach(([btn, pop]) => btn.addEventListener('click', e => {
    e.stopPropagation();
    const open = pop.hidden;
    closePops(pop);
    pop.hidden = !open;
    btn.setAttribute('aria-expanded', String(open));
  }));
  document.addEventListener('click', e => { if (!pops.some(([, pop]) => pop.contains(e.target))) closePops(); });
  addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    const open = pops.find(([, pop]) => !pop.hidden);
    if (open) { closePops(); open[0].focus(); }
  });

  /* ─────────────── Небо: дождь, снег, гроза поверх сайта ─────────────── */
  let atmo = store.get('atmo') || 'auto';
  const sky = $('#sky'), sctx = sky.getContext('2d');
  const small = innerWidth < 820;
  let skyMode = 'none', night = false, parts = [], splashes = [], targets = [], lastMeasure = 0, lastT = 0, skyRaf = 0, nextBolt = 0;
  let SW = 0, SH = 0;

  function skySize() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    SW = innerWidth; SH = innerHeight;
    sky.width = SW * dpr; sky.height = SH * dpr;
    sky.style.width = SW + 'px'; sky.style.height = SH + 'px';
    sctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  skySize();
  addEventListener('resize', skySize);

  function effectiveKind() {
    if (atmo !== 'auto') return atmo;
    return weather ? codeKind(weather.current.weather_code) : 'clear';
  }
  function particle(kind, fresh) {
    const y = fresh ? Math.random() * SH : -20 - Math.random() * 80;
    if (kind === 'snow') return { x: Math.random() * SW, y, vy: 28 + Math.random() * 45, r: .8 + Math.random() * 2, ph: Math.random() * 6.28, o: .35 + Math.random() * .5 };
    if (kind === 'dust') return { x: Math.random() * SW, y: fresh ? Math.random() * SH : SH + 10, vy: -(6 + Math.random() * 12), r: .6 + Math.random() * 1.4, ph: Math.random() * 6.28, o: .15 + Math.random() * .3 };
    if (kind === 'star') return { x: Math.random() * SW, y: Math.random() * SH * .7, r: .5 + Math.random() * 1.1, ph: Math.random() * 6.28, sp: .6 + Math.random() * 1.8 };
    const heavy = kind === 'storm';
    return { x: Math.random() * (SW + 200) - 100, y, vy: (heavy ? 900 : kind === 'drizzle' ? 380 : 700) + Math.random() * 250, len: (kind === 'drizzle' ? 5 : 10) + Math.random() * 10, o: .25 + Math.random() * .45 };
  }
  function setSky() {
    const kind = effectiveKind();
    night = weather ? !weather.current.is_day : (new Date().getUTCHours() + 3) % 24 < 6 || (new Date().getUTCHours() + 3) % 24 >= 21;
    $$('[data-atmo]').forEach(b => b.setAttribute('aria-checked', String(b.dataset.atmo === atmo)));
    $('.sun-glow').classList.toggle('on', kind === 'clear' && !night);
    $('.fog').classList.toggle('on', kind === 'fog' || kind === 'cloudy');
    const k = small ? .45 : 1;
    let mode = 'dust', count = 18;
    if (kind === 'rain') { mode = 'rain'; count = 110; }
    else if (kind === 'drizzle') { mode = 'drizzle'; count = 60; }
    else if (kind === 'storm') { mode = 'storm'; count = 170; }
    else if (kind === 'snow') { mode = 'snow'; count = 90; }
    else if (kind === 'clear' && night) { mode = 'star'; count = 70; }
    skyMode = mode;
    const pk = mode === 'drizzle' || mode === 'storm' ? mode : mode;
    parts = Array.from({ length: Math.round(count * k) }, () => particle(pk, true));
    splashes = [];
    nextBolt = performance.now() + 2500;
    if (reduced) { sctx.clearRect(0, 0, SW, SH); return; }
    if (!skyRaf) { lastT = performance.now(); skyRaf = requestAnimationFrame(skyFrame); }
  }
  function measureTargets() {
    targets = $$('.panel, .principles, .services').map(el => el.getBoundingClientRect())
      .filter(r => r.bottom > 0 && r.top < SH && r.width > 40).map(r => ({ l: r.left, r: r.right, t: r.top }));
  }
  addEventListener('scroll', () => { lastMeasure = 0; }, { passive: true });

  function hit(x, y, prevY) {
    for (const k of targets) if (x >= k.l && x <= k.r && prevY <= k.t && y >= k.t) return k;
    return null;
  }
  function skyFrame(now) {
    skyRaf = 0;
    if (document.hidden) { skyRaf = requestAnimationFrame(skyFrame); return; }
    const dt = Math.min((now - lastT) / 1000, .033); lastT = now;
    if (now - lastMeasure > 250) { measureTargets(); lastMeasure = now; }
    sctx.clearRect(0, 0, SW, SH);
    const A = colors.accent, C = colors.cream;

    if (skyMode === 'rain' || skyMode === 'storm' || skyMode === 'drizzle') {
      const wind = skyMode === 'storm' ? .28 : .12;
      sctx.lineCap = 'round';
      for (const p of parts) {
        const py = p.y;
        p.y += p.vy * dt; p.x += p.vy * wind * dt;
        const k = hit(p.x, p.y, py);
        if (k) { if (Math.random() < .35) splashes.push({ x: p.x, y: k.t, a: 0, s: 1 }); Object.assign(p, particle(skyMode, false)); continue; }
        if (p.y > SH + 20 || p.x > SW + 60) { Object.assign(p, particle(skyMode, false)); continue; }
        sctx.strokeStyle = `rgba(${A},${p.o})`; sctx.lineWidth = skyMode === 'drizzle' ? 1 : 1.3;
        sctx.beginPath(); sctx.moveTo(p.x, p.y); sctx.lineTo(p.x - p.len * wind, p.y - p.len); sctx.stroke();
      }
      if (skyMode === 'storm' && now > nextBolt) {
        const f = $('.flash'); f.classList.remove('on'); void f.offsetWidth; f.classList.add('on');
        nextBolt = now + 5000 + Math.random() * 9000;
      }
    } else if (skyMode === 'snow') {
      for (const p of parts) {
        const py = p.y;
        p.y += p.vy * dt; p.ph += dt * 1.4; p.x += Math.sin(p.ph) * 18 * dt;
        const k = hit(p.x, p.y, py);
        if (k) { if (Math.random() < .5) splashes.push({ x: p.x, y: k.t, a: 0, s: 0 }); Object.assign(p, particle('snow', false)); continue; }
        if (p.y > SH + 10) { Object.assign(p, particle('snow', false)); continue; }
        sctx.fillStyle = `rgba(${C},${p.o})`;
        sctx.beginPath(); sctx.arc(p.x, p.y, p.r, 0, 6.283); sctx.fill();
      }
    } else if (skyMode === 'star') {
      for (const p of parts) {
        p.ph += dt * p.sp;
        sctx.fillStyle = `rgba(${C},${.15 + (Math.sin(p.ph) + 1) * .22})`;
        sctx.beginPath(); sctx.arc(p.x, p.y, p.r, 0, 6.283); sctx.fill();
      }
    } else {
      for (const p of parts) {
        p.y += p.vy * dt; p.ph += dt * .8; p.x += Math.sin(p.ph) * 6 * dt;
        if (p.y < -10) Object.assign(p, particle('dust', false));
        sctx.fillStyle = `rgba(${A},${p.o})`;
        sctx.beginPath(); sctx.arc(p.x, p.y, p.r, 0, 6.283); sctx.fill();
      }
    }

    for (let i = splashes.length - 1; i >= 0; i--) {
      const s = splashes[i];
      if ((s.a += dt) > .35) { splashes.splice(i, 1); continue; }
      const p = s.a / .35;
      if (s.s) {
        sctx.strokeStyle = `rgba(${A},${(1 - p) * .45})`; sctx.lineWidth = 1;
        sctx.beginPath(); sctx.ellipse(s.x, s.y, 6 * p + 1, 2 * p + .5, 0, Math.PI, 0); sctx.stroke();
      } else {
        sctx.fillStyle = `rgba(${C},${(1 - p) * .5})`;
        sctx.beginPath(); sctx.arc(s.x, s.y - 1, 2 + p * 2, Math.PI, 0); sctx.fill();
      }
    }
    skyRaf = requestAnimationFrame(skyFrame);
  }
  function setAtmo(next, silent) {
    atmo = next;
    store.set('atmo', atmo);
    setSky();
    return !silent;
  }
  $$('[data-atmo]').forEach(b => b.addEventListener('click', () => setAtmo(b.dataset.atmo)));
  setSky();

  loadWeather().then(d => { weather = d; renderWeather(); setSky(); }).catch(() => { weather = false; renderWeather(); });

  /* ─────────────── Точечная сетка под курсором ─────────────── */
  if (finePointer && !reduced) {
    const cv = $('#grid'), ctx = cv.getContext('2d');
    const STEP = 36, R = 3, FADE = 550;
    const mouse = { x: -1e4, y: -1e4, down: false };
    const lit = new Map(), waves = [];
    let raf = 0;
    const size = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      cv.width = innerWidth * dpr; cv.height = innerHeight * dpr;
      cv.style.width = innerWidth + 'px'; cv.style.height = innerHeight + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size(); addEventListener('resize', size);
    const wake = () => { if (!raf) raf = requestAnimationFrame(draw); };
    addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; wake(); }, { passive: true });
    addEventListener('mousedown', () => { mouse.down = true; wake(); });
    addEventListener('mouseup', e => { mouse.down = false; waves.push({ x: e.clientX, y: e.clientY, t: performance.now() }); wake(); });

    function draw(now) {
      raf = 0;
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      const cx = Math.round(mouse.x / STEP), cy = Math.round(mouse.y / STEP), r = mouse.down ? R + 2 : R;
      for (let dx = -r; dx <= r; dx++) for (let dy = -r; dy <= r; dy++)
        if (Math.max(Math.abs(dx), Math.abs(dy)) + (Math.abs(dx) + Math.abs(dy)) * .15 <= r) lit.set((cx + dx) + ',' + (cy + dy), now);
      for (let i = waves.length - 1; i >= 0; i--) if (now - waves[i].t > 700) waves.splice(i, 1);

      const dot = (gx, gy, a) => {
        if (a <= .01) return;
        ctx.beginPath(); ctx.arc(gx * STEP, gy * STEP, 1.2 + a * 1.6, 0, 6.283);
        ctx.fillStyle = `rgba(${colors.accent},${Math.min(a, 1) * .85})`; ctx.fill();
      };
      const waveAt = (px, py) => {
        let v = 0;
        for (const w of waves) {
          const p = (now - w.t) / 700, d = Math.abs(Math.hypot(px - w.x, py - w.y) - p * 240), band = 36 + p * 20;
          if (d < band) v += (1 - p) * (1 - d / band);
        }
        return v;
      };
      const done = new Set();
      for (const [key, t] of lit) {
        const age = now - t;
        if (age > FADE) { lit.delete(key); continue; }
        const [gx, gy] = key.split(',').map(Number);
        const dist = Math.max(Math.abs(gx - cx), Math.abs(gy - cy));
        const near = dist <= r ? Math.pow(1 - dist / (r + 1), 1.4) : 0;
        dot(gx, gy, Math.max(near, (1 - age / FADE) * .5) + waveAt(gx * STEP, gy * STEP) * .6);
        done.add(key);
      }
      for (const w of waves) {
        const rad = (now - w.t) / 700 * 240 + 60;
        for (let gx = Math.floor((w.x - rad) / STEP); gx <= Math.ceil((w.x + rad) / STEP); gx++)
          for (let gy = Math.floor((w.y - rad) / STEP); gy <= Math.ceil((w.y + rad) / STEP); gy++)
            if (!done.has(gx + ',' + gy)) dot(gx, gy, waveAt(gx * STEP, gy * STEP) * .7);
      }
      if (lit.size || waves.length) raf = requestAnimationFrame(draw);
    }
  }

  /* ─────────────── Прогноз по проекту ─────────────── */
  const FC_TYPES = { bot: [3, 7, 10], auto: [2, 6, 10], llm: [5, 10, 25], parser: [2, 5, 15], fix: [1, 4, 20], other: [3, 10, 30] };
  const FC_EXTRAS = { db: [2, 3, 5], pay: [2, 4, 15], api: [1, 3, 15], ai: [2, 4, 15], deploy: [1, 1, 3], pics: [1, 3, 5], rush: [0, 0, 20], fuzzy: [2, 4, 25] };
  const fc = { type: 'bot', extras: new Set(['db', 'deploy']), tone: 'honest', last: '' };

  function buildForecastForm() {
    const F = T().fc;
    $('#fc-type').innerHTML = Object.keys(FC_TYPES).map(k => `<button class="chip" type="button" role="radio" data-fc-type="${k}" aria-checked="${k === fc.type}">${F.types[k]}</button>`).join('');
    $('#fc-extra').innerHTML = Object.keys(FC_EXTRAS).map(k => `<button class="chip" type="button" data-fc-extra="${k}" aria-pressed="${fc.extras.has(k)}">${F.extras[k]}</button>`).join('');
  }
  function forecast() {
    const F = T().fc;
    let [lo, hi, risk] = FC_TYPES[fc.type];
    let wind = fc.type === 'parser' ? 1 : 0;
    for (const k of fc.extras) {
      let [a, b, r] = FC_EXTRAS[k];
      if (k === 'ai' && fc.type === 'llm') { a = 1; b = 2; r = 5; }
      lo += a; hi += b; risk += r;
      if (k === 'api') wind += 1;
    }
    if (fc.extras.has('rush')) { lo = Math.max(1, Math.ceil(lo * .7)); hi = Math.max(lo + 1, Math.ceil(hi * .7)); }
    const level = risk < 25 ? 0 : risk < 45 ? 1 : risk < 65 ? 2 : 3;
    const conf = Math.max(40, Math.min(95, Math.round((95 - risk * .6) / 5) * 5));
    const kinds = ['clear', 'mostly', 'rain', 'storm'];
    $('#fc-icon').innerHTML = icon(kinds[level]);
    $('#fc-cond').textContent = F.cond[level];
    $('#fc-eta').innerHTML = F.days(lo, hi);
    $('#fc-conf').textContent = conf + '%';
    $('#fc-rain').textContent = F.rain[level];
    $('#fc-wind').textContent = F.wind[Math.min(wind, 2)];
    $('#fc-vis').textContent = F.vis[fc.extras.has('fuzzy') ? 1 : 0];
    $('#fc-comment').textContent = F[fc.tone][level] + (fc.extras.has('rush') ? ` (${F.rush})` : '');
    fc.last = [
      `${F.types[fc.type]}${fc.extras.size ? ': ' + [...fc.extras].map(k => F.extras[k]).join(', ') : ''}`,
      `${F.cond[level]} · ${F.days(lo, hi).replace(/<\/?b>/g, '')} · ${F.conf} ${conf}%`
    ].join('\n');
  }
  $('#fc-type').addEventListener('click', e => {
    const b = e.target.closest('[data-fc-type]'); if (!b) return;
    fc.type = b.dataset.fcType;
    $$('[data-fc-type]').forEach(x => x.setAttribute('aria-checked', String(x === b)));
    forecast();
  });
  $('#fc-extra').addEventListener('click', e => {
    const b = e.target.closest('[data-fc-extra]'); if (!b) return;
    const k = b.dataset.fcExtra;
    fc.extras.has(k) ? fc.extras.delete(k) : fc.extras.add(k);
    b.setAttribute('aria-pressed', String(fc.extras.has(k)));
    forecast();
  });
  $$('[data-tone]').forEach(b => b.addEventListener('click', () => {
    fc.tone = b.dataset.tone;
    $$('[data-tone]').forEach(x => x.setAttribute('aria-checked', String(x === b)));
    forecast();
  }));
  $('#fc-send').addEventListener('click', () => {
    const F = T().fc;
    location.href = 'mailto:titbob000@gmail.com?subject=' + encodeURIComponent(F.mailSubj) + '&body=' + encodeURIComponent(`${F.mailIntro}\n\n${fc.last}\n\n`);
  });
  $('#fc-copy').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(fc.last); toast(T().fc.copied); } catch (e) { toast(fc.last); }
  });
  onLang(() => { buildForecastForm(); forecast(); });

  /* ─────────────── Радар стека ─────────────── */
  const BLIPS = [
    ['Python', 'build', .12, 20], ['aiogram', 'build', .36, 55], ['Telethon', 'build', .42, 18], ['APScheduler', 'build', .58, 82], ['pytest', 'build', .5, 105],
    ['n8n', 'ai', .44, 150], ['Groq', 'ai', .52, 128], ['Vision LLM', 'ai', .64, 175], ['Workers AI', 'ai', .74, 150],
    ['Linux', 'ops', .3, 215], ['systemd', 'ops', .46, 240], ['nginx', 'ops', .6, 262], ['Yandex Cloud', 'ops', .74, 225], ['Docker', 'ops', .84, 280],
    ['CSP', 'sec', .56, 310], ['152-ФЗ', 'sec', .7, 335], ['CC1101', 'sec', .86, 298], ['Kali', 'sec', .9, 350]
  ].map(([name, g, r, deg]) => ({ name, g, r, a: (deg - 90) * Math.PI / 180, hit: -1e9 }));
  const radarBox = $('#radar'), rcv = $('#radar-cv'), rctx = rcv.getContext('2d'), tip = $('#radar-tip');
  let RS = 0, sweep = -Math.PI / 2, hover = null, radarVisible = false, radarRaf = 0, radarLast = 0, lastPing = null;

  function radarSize() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    RS = radarBox.clientWidth;
    rcv.width = RS * dpr; rcv.height = RS * dpr;
    rctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (reduced || !radarVisible) drawRadar(performance.now());
  }
  const blipXY = b => { const R = RS / 2 - 14; return [RS / 2 + Math.cos(b.a) * b.r * R, RS / 2 + Math.sin(b.a) * b.r * R]; };
  function marker(ctx, g, x, y, size, alpha) {
    const A = colors.accent, C = colors.cream;
    const rgb = g === 'build' || g === 'ops' ? A : C;
    ctx.beginPath(); ctx.arc(x, y, size, 0, 6.283);
    if (g === 'build' || g === 'ai') { ctx.fillStyle = `rgba(${rgb},${alpha})`; ctx.fill(); }
    else { ctx.strokeStyle = `rgba(${rgb},${alpha})`; ctx.lineWidth = 2; ctx.stroke(); }
  }
  function drawRadar(now) {
    const A = colors.accent, C = colors.cream, c = RS / 2, R = RS / 2 - 14;
    rctx.clearRect(0, 0, RS, RS);
    rctx.fillStyle = `rgba(${A},.03)`; rctx.beginPath(); rctx.arc(c, c, R, 0, 6.283); rctx.fill();
    rctx.strokeStyle = `rgba(${C},.12)`; rctx.lineWidth = 1;
    for (let i = 1; i <= 4; i++) { rctx.beginPath(); rctx.arc(c, c, R * i / 4, 0, 6.283); rctx.stroke(); }
    [0, 120, 200, 290].forEach(d => {
      const a = (d - 90) * Math.PI / 180;
      rctx.beginPath(); rctx.moveTo(c, c); rctx.lineTo(c + Math.cos(a) * R, c + Math.sin(a) * R); rctx.stroke();
    });
    rctx.font = '600 10px JetBrains Mono, monospace'; rctx.textAlign = 'center'; rctx.fillStyle = `rgba(${C},.45)`;
    const G = T().radar.groups;
    [['build', 60], ['ai', 160], ['ops', 245], ['sec', 325]].forEach(([g, d]) => {
      const a = (d - 90) * Math.PI / 180;
      rctx.fillText(G[g], c + Math.cos(a) * (R + 2) * .97, c + Math.sin(a) * (R + 2) * .97 + 3);
    });
    if (!reduced) {
      const grad = rctx.createConicGradient ? rctx.createConicGradient(sweep - 1.1, c, c) : null;
      if (grad) {
        grad.addColorStop(0, `rgba(${A},0)`); grad.addColorStop(.175, `rgba(${A},.22)`); grad.addColorStop(.176, `rgba(${A},0)`);
        rctx.fillStyle = grad; rctx.beginPath(); rctx.moveTo(c, c); rctx.arc(c, c, R, sweep - 1.1, sweep); rctx.closePath(); rctx.fill();
      }
      rctx.strokeStyle = `rgba(${A},.9)`; rctx.lineWidth = 1.5;
      rctx.beginPath(); rctx.moveTo(c, c); rctx.lineTo(c + Math.cos(sweep) * R, c + Math.sin(sweep) * R); rctx.stroke();
    }
    for (const b of BLIPS) {
      const [x, y] = blipXY(b);
      const age = (now - b.hit) / 1000;
      const glow = reduced ? .7 : Math.max(0, 1 - age / 3.4);
      const on = hover === b;
      if (glow > .02 || on) {
        rctx.beginPath(); rctx.arc(x, y, 6 + (1 - glow) * 10, 0, 6.283);
        rctx.strokeStyle = `rgba(${A},${on ? .6 : glow * .35})`; rctx.lineWidth = 1; rctx.stroke();
      }
      marker(rctx, b.g, x, y, on ? 6 : 4, on ? 1 : .35 + glow * .65);
      if (on || glow > .55) {
        rctx.fillStyle = `rgba(${C},${on ? 1 : glow})`; rctx.font = '500 11px JetBrains Mono, monospace';
        rctx.textAlign = x > c ? 'left' : 'right';
        rctx.fillText(b.name, x + (x > c ? 10 : -10), y + 4);
      }
    }
    rctx.fillStyle = `rgba(${A},1)`; rctx.beginPath(); rctx.arc(c, c, 3, 0, 6.283); rctx.fill();
  }
  function radarFrame(now) {
    radarRaf = 0;
    if (!radarVisible) return;
    const dt = Math.min((now - radarLast) / 1000, .05); radarLast = now;
    const TAU = Math.PI * 2, norm = x => ((x % TAU) + TAU) % TAU;
    const from = norm(sweep);
    sweep = norm(sweep + dt * (TAU / 4.5));
    for (const b of BLIPS) {
      const a = norm(b.a);
      const crossed = sweep >= from ? a > from && a <= sweep : a > from || a <= sweep;
      if (crossed) { b.hit = now; lastPing = b; }
    }
    if (lastPing && !hover) renderRead();
    lastPing = null;
    drawRadar(now);
    radarRaf = requestAnimationFrame(radarFrame);
  }
  let lastRead = null;
  function renderRead(b) {
    if (b !== undefined) lastRead = b; else if (lastPing) lastRead = lastPing;
    const t = T();
    $('#radar-read').innerHTML = lastRead ? `${t.radar.ping}<b>${lastRead.name}</b> — ${t.blips[lastRead.name]}` : t.radar.idle;
  }
  function radarPointer(e) {
    const r = rcv.getBoundingClientRect();
    const px = e.clientX - r.left, py = e.clientY - r.top;
    let best = null, bd = 18;
    for (const b of BLIPS) { const [x, y] = blipXY(b); const d = Math.hypot(px - x, py - y); if (d < bd) { bd = d; best = b; } }
    hover = best;
    if (best) {
      const [x, y] = blipXY(best);
      tip.style.left = x + 'px'; tip.style.top = y + 'px';
      tip.querySelector('b').textContent = best.name;
      tip.querySelector('span').textContent = T().blips[best.name];
      tip.classList.add('on');
      renderRead(best);
    } else tip.classList.remove('on');
    if (reduced || !radarRaf) drawRadar(performance.now());
  }
  rcv.addEventListener('pointermove', radarPointer);
  rcv.addEventListener('pointerdown', radarPointer);
  rcv.addEventListener('pointerleave', () => { hover = null; tip.classList.remove('on'); if (reduced) drawRadar(performance.now()); });
  new IntersectionObserver(([e]) => {
    radarVisible = e.isIntersecting;
    if (radarVisible && !reduced && !radarRaf) { radarLast = performance.now(); radarRaf = requestAnimationFrame(radarFrame); }
  }).observe(radarBox);
  addEventListener('resize', radarSize);
  onLang(() => {
    const G = T().radar.groups;
    $('#radar-legend').innerHTML = [['build', 'background:var(--accent)'], ['ai', 'background:rgb(var(--cream-rgb))'], ['ops', 'border:2px solid var(--accent)'], ['sec', 'border:2px solid rgb(var(--cream-rgb))']]
      .map(([g, s]) => `<span><i style="${s}"></i>${G[g]}</span>`).join('') + `<span>· ${T().radar.near}</span>`;
    renderRead(lastRead);
    radarSize();
  });

  /* ─────────────── Терминал ─────────────── */
  const term = $('#term'), tout = $('#term-out'), tin = $('#term-input');
  const hist = []; let hpos = 0, termBooted = false;
  const esc = s => s.replace(/[&<>]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[ch]));
  const rich = s => s.replace(/<c>/g, '<span class="c">').replace(/<\/c>/g, '</span>');
  function print(html, cls) {
    const div = document.createElement('div');
    if (cls) div.className = cls;
    div.innerHTML = html;
    tout.appendChild(div);
    tout.scrollTop = tout.scrollHeight;
  }
  function openTerm() {
    term.classList.add('on'); term.setAttribute('aria-hidden', 'false');
    if (!termBooted) { print(rich(T().term.hello), 'm'); termBooted = true; }
    setTimeout(() => tin.focus(), 50);
  }
  function closeTerm() { term.classList.remove('on'); term.setAttribute('aria-hidden', 'true'); tin.blur(); }
  $('#term-btn').addEventListener('click', () => term.classList.contains('on') ? closeTerm() : openTerm());
  $('#term-close').addEventListener('click', closeTerm);
  addEventListener('keydown', e => {
    const typing = /INPUT|TEXTAREA/.test(document.activeElement?.tagName) && document.activeElement !== tin;
    if (!typing && ['`', '~', 'ё', 'Ё'].includes(e.key)) { e.preventDefault(); term.classList.contains('on') ? closeTerm() : openTerm(); }
    if (e.key === 'Escape' && term.classList.contains('on')) closeTerm();
  });
  tin.addEventListener('keydown', e => {
    if (e.key === 'ArrowUp' && hist.length) { hpos = Math.max(0, hpos - 1); tin.value = hist[hpos]; e.preventDefault(); }
    if (e.key === 'ArrowDown' && hist.length) { hpos = Math.min(hist.length, hpos + 1); tin.value = hist[hpos] || ''; e.preventDefault(); }
  });
  function run(raw) {
    const t = T().term;
    const [cmd, ...args] = raw.trim().split(/\s+/);
    const c = (cmd || '').toLowerCase(), arg = (args[0] || '').toLowerCase();
    const go = id => setTimeout(() => { closeTerm(); $(id).scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' }); }, 500);
    switch (c) {
      case '': return;
      case 'help': case '?': return print(rich(t.help));
      case 'whoami': return print(t.whoami);
      case 'projects': case 'ls projects': go('#projects'); return print(t.projects);
      case 'services': go('#services'); return print(t.services);
      case 'stack': go('#stack'); return print(t.stack);
      case 'contact': return print(t.contact);
      case 'weather': {
        if (!weather) return print(T().wx.fail, 'e');
        const cur = weather.current, k = codeKind(cur.weather_code);
        return print(`${lang === 'en' ? 'Moscow' : 'Москва'}: ${signed(cur.temperature_2m)}, ${T().wx[k]}\n${T().wx.comment[k]}`);
      }
      case 'rain': case 'snow': case 'storm': case 'auto':
        setAtmo(c); return print(t.atmo + c, 'c');
      case 'sun': setAtmo('clear'); return print(t.atmo + 'sun', 'c');
      case 'clear': case 'cls': tout.innerHTML = ''; return;
      case 'theme':
        if (!arg) return print('cdb | phosphor | paper');
        return setTheme(arg, true) ? print(t.theme + arg, 'c') : print(t.unknown + 'theme ' + esc(arg), 'e');
      case 'lang':
        applyLang(arg === 'en' ? 'en' : arg === 'ru' ? 'ru' : (lang === 'en' ? 'ru' : 'en'));
        return print(T().term.lang + lang, 'c');
      case 'cv': case 'resume': print(t.cv, 'm'); location.href = lang === 'en' ? 'cv/tim-cv-en.pdf' : 'cv/tim-cv-ru.pdf'; return;
      case 'hire': print(t.hire, 'c'); go('#contact'); setTimeout(() => $('#callsign').focus(), 1100); return;
      case 'sudo': return print(rich(args.join(' ').toLowerCase().includes('hire') ? t.sudo : t.sudo.split('\n')[0] + '\n' + t.unknown + esc(args.join(' '))));
      case 'rm': return print(t.rm, 'e');
      case 'ls': return print(arg.startsWith('secret') ? t.secrets : t.ls, arg.startsWith('secret') ? 'e' : '');
      case 'cat': return print(arg.startsWith('secret') ? t.secrets : rich(t.cat), arg.startsWith('secret') ? 'e' : 'm');
      case 'cd': return print(arg.startsWith('secret') ? t.secrets : '~', arg.startsWith('secret') ? 'e' : 'm');
      case 'coffee': case 'tea': return print(t.coffee, 'm');
      case 'matrix': return print(rich(t.matrix), 'm');
      case 'konami': case 'broadcast': return print('↑ ↑ ↓ ↓ ← → ← → B A', 'm');
      case 'exit': case 'quit': return closeTerm();
      default: return print(t.unknown + esc(cmd), 'e');
    }
  }
  $('#term-form').addEventListener('submit', e => {
    e.preventDefault();
    const v = tin.value;
    if (v.trim()) { hist.push(v); hpos = hist.length; }
    print(`<span class="c">guest@tim:~$</span> ${esc(v)}`);
    tin.value = '';
    run(v);
  });

  /* ─────────────── Логотип-диафрагма: 5 кликов ─────────────── */
  const logo = $('#logo');
  let clicks = [];
  logo.addEventListener('click', () => {
    const now = Date.now();
    clicks = clicks.filter(t => now - t < 2000); clicks.push(now);
    if (clicks.length >= 5) {
      clicks = [];
      logo.classList.add('shut');
      const f = $('.flash'); f.classList.remove('on'); void f.offsetWidth; f.classList.add('on');
      toast(T().toast.shutter);
      setTimeout(() => logo.classList.remove('shut'), 1200);
    }
  });

  /* ─────────────── Форма ─────────────── */
  $('#form').addEventListener('submit', e => {
    e.preventDefault();
    const who = $('#callsign').value.trim(), msg = $('#msg').value.trim();
    const subj = lang === 'en' ? 'Project request from ' : 'Заказ с сайта от ';
    location.href = 'mailto:titbob000@gmail.com?subject=' + encodeURIComponent(subj + who) + '&body=' + encodeURIComponent(msg + '\n\n— ' + who);
  });

  /* ─────────────── Для тех, кто открыл консоль ─────────────── */
  console.log('%cTIM//DEV', 'font:800 20px monospace;color:#E86A1A');
  console.log(T().console);

  applyLang(lang);
})();
