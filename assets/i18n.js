/* Переводы. Русский текст статичных элементов живёт прямо в index.html и
   забирается оттуда при первом переключении — здесь только английский.
   Тексты, которые собирает скрипт, лежат в TEXT на обоих языках. */
window.I18N_EN = {
  'nav.about': 'ABOUT', 'nav.projects': 'PROJECTS', 'nav.services': 'SERVICES', 'nav.stack': 'STACK', 'nav.log': 'LOG', 'nav.contact': 'CONTACT',
  'wx.loading': 'LOADING...', 'wx.atmo': 'SITE ATMOSPHERE', 'wx.auto': 'AUTO', 'wx.clear': 'CLEAR', 'wx.rain': 'RAIN', 'wx.snow': 'SNOW', 'wx.storm': 'STORM',
  'wx.src': 'Data: Open-Meteo. In auto mode the site mirrors the weather in Moscow.',
  'hero.tag': 'OPEN FOR PROJECTS', 'hero.sub': 'Tim. Information security student, 2nd year, ITHUB College.',
  'hero.desc': 'I build things real people use: Telegram bots, LLM automation, trading systems. My code ships to production, and my deadlines are honest.',
  'hero.cta1': 'See projects →', 'hero.cta2': 'Project forecast',
  'st.status': 'STATUS', 'st.open': 'OPEN FOR PROJECTS', 'st.loc': 'LOCATION', 'st.msk': 'MOSCOW', 'st.wx': 'OUTSIDE', 'st.edu': 'STUDY', 'st.eduv': 'ITHUB · INFOSEC · YEAR 2',
  'st.prod': 'IN PRODUCTION', 'st.prodv': '3 SYSTEMS', 'st.reply': 'REPLY', 'st.replyv': '~ A FEW HOURS', 'st.conf': 'CONFIDENCE', 'st.confnote': 'Everything on this page actually works. No embellishment.',
  'pr.1t': 'Production, not "works on my machine"', 'pr.1': 'systemd services, 24/7 bots, one-script deploys. It runs on the server, not just on my laptop.',
  'pr.2t': 'Honest deadlines', 'pr.2': 'I name a real deadline and say upfront where it gets hard. No last-day surprises.',
  'pr.3t': 'Secure by default', 'pr.3': 'No secrets in code, prompt injection defenses, real money only when explicitly switched on.',
  'pr.4t': 'Tests, not hope', 'pr.4': 'Where logic touches money: offline checks and network-mocked tests first. Deploy second.',
  'num.1': 'student groups covered by the timetable parser', 'num.2': 'systems running in production right now', 'num.3': 'stages in the trading system pipeline', 'num.4': 'test modules in the trading system', 'num.5': 'systemd services, no manual restarts',
  'about.label': '// 01 — ABOUT', 'about.title': 'Who I am', 'about.lead': 'Pick how much detail you want.',
  'mode.short': 'SHORT', 'mode.tech': 'FOR A TECH LEAD', 'mode.raw': 'UNFILTERED',
  'fact.edu': 'STUDY', 'fact.edut': 'ITHUB College, Moscow', 'fact.edus': 'Information security, 2nd year',
  'fact.work': 'WORK', 'fact.workt': 'Commercial development', 'fact.works': 'Trading signal system for a client: from parsing to exchange orders',
  'fact.brand': 'BRAND', 'fact.brands': 'My bots and community under one mark', 'fact.oss': 'OPEN SOURCE', 'fact.osss': 'Timetable bot core, open code with tests',
  'fact.hobby': 'HOBBY', 'fact.hobbyt': 'Radio and hardware', 'fact.hobbys': 'LilyGO T-Embed CC1101, Bruce firmware: Sub-GHz, NFC, BLE',
  'proj.label': '// 02 — PORTFOLIO', 'proj.title': 'Projects', 'proj.lead': 'Not homework. Every one of these systems serves real people. Go ahead and poke the cards.',
  'proj.inwork': 'ACTIVE', 'proj.commercial': 'COMMERCIAL PROJECT',
  'sig.title': 'Trading signal system', 'sig.pitch': 'Turns Telegram channel posts into exchange trades. A human operator makes the final call.',
  'sig.pipe': 'PIPELINE // 7 STAGES', 'sig.n1': 'Telegram channels', 'sig.n1s': 'text + screenshots', 'sig.n1t': 'SOURCE', 'sig.n2': 'Parser', 'sig.n2t': 'INGEST',
  'sig.n3': 'Vision model', 'sig.n3s': 'text from images', 'sig.n4t': 'PARSE', 'sig.n5': 'Signal registry', 'sig.n5t': 'DATA',
  'sig.n6': 'Operator bot', 'sig.n6s': 'card + buttons', 'sig.n6t': 'HUMAN', 'sig.n7': 'Bybit exchange', 'sig.n7s': 'demo · real by flag', 'sig.n7t': 'EXECUTION',
  'sig.mock': 'WHAT THE OPERATOR SEES // PRESS A BUTTON', 'sig.bot': 'Operator bot', 'sig.botst': 'bot',
  'sig.ok': '✅ Confirm', 'sig.no': '❌ Reject', 'sig.sim': '📊 Simulate', 'sig.next': '↻ Next signal', 'sig.mocknote': 'Mockup: pairs and prices are made up, the format matches production.',
  'sig.p1': 'An LLM turns the author\'s free text into structure: pair, side, entry, stop, take-profits.',
  'sig.p2': 'Screenshots are parsed too: a vision model transcribes the image under an explicit label, so a chart description never turns into an invented trade.',
  'sig.p3': 'The operator confirms with a button. Everything goes to a demo account by default, the real one only when explicitly enabled, and a risk guard blocks oversized trades.',
  'sig.p4': 'A simulator runs virtual trades with MFE/MAE. The backtester replays channel history, draws candle charts and builds reports.',
  'sig.nda': 'Client name and details stay private',
  'cdb.badge': 'MY BRAND', 'cdb.pitch': 'The brand my bots and community live under. The flagship is a timetable bot for students at several universities.',
  'cdb.p1': 'Pulls the timetable from the university\'s public sources. Changes are picked up automatically.',
  'cdb.p2': 'Renders a day or a week as an image, sends a month as an album.', 'cdb.p3': 'Reminds you before class, sends tomorrow\'s plan in the evening, serves a calendar subscription.',
  'cdb.code': 'Core code ↗',
  'ss.pitch': 'Generates information security policies for small businesses under Russian data protection law (152-FZ, GOST R 57580).',
  'ss.p1': 'The user answers 13 questions, an LLM assembles the document, output is a PDF.', 'ss.p2': 'Frontend in Yandex Object Storage, logic in Cloud Functions, the model on Cloudflare Workers AI.',
  'ss.p3': 'SHA-256 auth, CSP, prompt injection defenses. Leads arrive in Telegram via the Bot API.',
  'oss.pitch': 'The timetable bot core, open source: pulls classes from a public Yandex Calendar layer, renders the week and builds .ics.',
  'oss.p1': 'Cleans up messy class names: all caps, unclosed brackets, addresses in the room field, links to online classes.', 'oss.p2': '12 tests. While extracting the code I found and fixed address parsing without brackets.',
  'rf.hobby': 'HOBBY', 'rf.pitch': 'Learning how wireless systems get attacked in practice, to understand how to defend them.',
  'rf.p1': 'LilyGO T-Embed CC1101 on Bruce firmware: Sub-GHz, NFC, BLE, BadUSB.', 'rf.p2': 'The Flipper Zero ecosystem, pentest concepts on Kali Linux and Parrot OS.', 'rf.talk': 'Let\'s talk →',
  'svc.label': '// 03 — SERVICES', 'svc.title': 'What I can build', 'svc.lead': 'Typical formats. Timeframes are for a typical task, I give exact ones after we talk.',
  'svc.1e': '3–14 DAYS', 'svc.1t': 'Telegram bot, end to end', 'svc.1': 'Requests, bookings, broadcasts, access control, schedules. With a database, admin commands and server deploy.',
  'svc.2e': '2–10 DAYS', 'svc.2t': 'Automation & integrations', 'svc.2': 'Connect services that don\'t want to talk: n8n, webhooks, Google Sheets, APIs, scheduled reports.',
  'svc.3e': '5–14 DAYS', 'svc.3t': 'LLM inside your product', 'svc.3': 'Free text to structured data, classification, text from screenshots. With prompt injection defenses.',
  'svc.4e': '2–7 DAYS', 'svc.4t': 'Scrapers & data collection', 'svc.4': 'Pull data from a website, Telegram channels or a closed widget and put it where it\'s easy to use.',
  'svc.5e': 'FROM 1 DAY', 'svc.5t': 'Fixing someone else\'s code', 'svc.5': 'The bot crashed, the script misbehaves, the last developer vanished. I\'ll dig in, fix it and explain what was wrong.',
  'svc.6e': '1–3 DAYS', 'svc.6t': 'Servers & deploy', 'svc.6': 'Set up a Linux server with systemd, nginx and TLS, close what shouldn\'t be public. So it runs without you.',
  'svc.anyq': 'Not on the list?', 'svc.any': '<strong>I take on almost anything at my level.</strong> If it can be solved with code, message me and we\'ll talk. If I see I can\'t pull it off, or it will cost more than it\'s worth, I\'ll say so right away, not two weeks later.',
  'svc.anybtn': 'Discuss a task →',
  'step.1': '<b>You describe the task</b>In your own words. No spec required.', 'step.2': '<b>We clarify</b>I ask questions, name the deadline and price, warn about pitfalls.',
  'step.3': '<b>You see progress</b>Intermediate versions, not a black box until the deadline.', 'step.4': '<b>I ship and deploy</b>Launch it, explain how to use it, stay in touch afterwards.',
  'svc.price': 'Pricing depends on the task: scope, deadline and what already exists.',
  'fc.title': 'TIM://forecast // PROJECT FORECAST', 'fc.lead': 'Tick what you need and get a weather forecast for your project.', 'fc.type': 'WHAT WE BUILD', 'fc.extra': 'WHAT\'S INSIDE',
  'fc.honest': 'HONEST', 'fc.raw': 'UNFILTERED', 'fc.conf': 'CONFIDENCE', 'fc.rain': 'PRECIPITATION (REVISIONS)', 'fc.wind': 'WIND (EXTERNAL APIS)', 'fc.vis': 'VISIBILITY (SPEC)',
  'fc.send': 'Send forecast →', 'fc.copy': 'Copy', 'fc.disc': 'A ballpark estimate from experience. Exact deadline and price after we talk.',
  'stack.label': '// 04 — STACK', 'stack.title': 'What I work with', 'stack.lead': 'Tools that have already been in production, not just on a CV. Hover a blip on the radar.',
  'stack.build': 'DEVELOPMENT', 'stack.ops': 'INFRA & SECURITY', 'rd.n8n': 'n8n / webhooks', 'rd.law': '152-FZ / GOST R 57580', 'rd.pentest': 'Pentest basics',
  'lvl.main': 'PRIMARY', 'lvl.prod': 'PROD', 'lvl.always': 'ALWAYS', 'lvl.conf': 'CONFIDENT', 'lvl.product': 'SHIPPED', 'lvl.learn': 'LEARNING', 'lvl.hobby': 'HOBBY',
  'log.label': '// 05 — LOG', 'log.title': 'Patch notes', 'log.lead': 'What changed in my projects and on this site.',
  'log.21t': 'Weather, forecasts and a terminal', 'log.21': 'Services and a project forecast, Moscow weather drives the site atmosphere, stack radar, terminal, themes, English version, PDF résumé.',
  'log.osst': 'Timetable core on GitHub', 'log.oss': 'Extracted the parser and renderer from the CDB bot into an open repository with tests. Fixed address parsing without brackets along the way.',
  'log.20t': 'CDB-style redesign', 'log.20': 'CRT screen, boot sequence, dot grid, rain on the cards.',
  'log.commt': 'CDB community', 'log.comm': 'A community with roles and auto-moderation, configured by a bot through the API.',
  'log.bott': 'Timetable bot in production', 'log.bot': 'Week images, class reminders, calendar subscription.',
  'log.10t': 'First version of the site', 'log.10': 'A grid, a terminal and skill bars. Had to start somewhere.',
  'cv.sub': 'FOR APPLICATIONS AND HR', 'cv.title': 'Résumé', 'cv.lead': 'Everything from this site on one A4 page. No animations, but it prints.',
  'ct.label': '// 06 — CONTACT', 'ct.title': 'Get in touch', 'ct.lead': 'Message me with a task, even if it\'s not in the services. Telegram is the fastest.',
  'ct.name': 'CALLSIGN:', 'ct.nameph': 'What should I call you', 'ct.msg': 'MESSAGE:', 'ct.msgph': 'What needs to be done and by when', 'ct.send': 'Send →', 'ct.hint': 'Your mail client will open with the email ready.',
  'ft.theme': 'THEME:', 'ft.phosphor': 'PHOSPHOR', 'ft.paper': 'PAPER', 'ft.broadcast': 'BROADCAST-80', 'ft.term': 'TERMINAL:', 'ft.notrack': 'NO TRACKERS',
  'lb.title': 'CDB // GROUP 106 WEEK · REAL RENDER'
};

window.TEXT = {
  ru: {
    boot: ['CDB BIOS v2.1 // TIM', 'Проверка памяти... 640K OK', 'Подключение Python runtime........ OK', 'Синхронизация погоды Москвы....... OK', 'Загрузка LLM-конвейеров........... OK', 'Калибровка паранойи ИБ............ OK', '', 'TIM // SECURITY & DEV ENGINEER', 'ЗАГРУЗКА ЗАВЕРШЕНА. ВКЛЮЧАЮ ДИСПЛЕЙ...'],
    bootSkip: 'НАЖМИ ЛЮБУЮ КЛАВИШУ, ЧТОБЫ ПРОПУСТИТЬ',
    typed: ['сейчас: торговая система и CDB', 'учусь: ИБ, 2 курс', 'ищу: интересные заказы', 'пишу: тесты перед деплоем', 'нажми ~ — откроется терминал'],
    modes: {
      short: { name: 'КОРОТКО', hint: 'Для тех, у кого 10 секунд.', html: '<p><strong>Тим, 2 курс ИБ в ITHUB College, Москва.</strong></p><p>Делаю Telegram-ботов, автоматизацию на LLM и торговые системы. Всё из портфолио ниже работает у живых пользователей. Открыт к заказам.</p>' },
      tech: { name: 'ДЛЯ ТЕХЛИДА', hint: 'Стек, подход, как я пишу код.', html: '<p>Основной язык <strong>Python</strong>. Для Telegram беру <strong>aiogram</strong> и <strong>Telethon</strong>, для сети aiohttp и httpx, фоновые задачи держу на APScheduler. Храню данные в SQLite и Google Sheets.</p><p><strong>LLM встраиваю как деталь с ограничениями</strong>, а не как магию: Groq, Cloudflare Workers AI, vision-модели. Машинный текст всегда помечен, чтобы его не спутали со словами человека.</p><p>Деплою на Linux: systemd, nginx, bash. Из облаков работал с Yandex Cloud и Cloudflare. Если логика трогает деньги, перед изменением гоняю офлайн-selftest и тесты с моками сети.</p>' },
      raw: { name: 'БЕЗ ФИЛЬТРА', hint: 'Как есть.', html: '<p>Учусь на безопасника, но <strong>больше всего кайфую, когда то, что я написал в два ночи, утром спокойно работает у людей.</strong></p><p>Ковыряю радиоэфир на LilyGO T-Embed CC1101 с Bruce: Sub-GHz, NFC, BLE. Сам собрал ПК на Ryzen 7 7700 и RTX 5060 Ti. Отдыхаю в CS2 и PUBG.</p><p>Если в задаче есть подвох, скажу сразу, а не в день дедлайна.</p>' }
    },
    shotCap: 'НАСТОЯЩАЯ КАРТИНКА ИЗ БОТА · НАЖМИ, ЧТОБЫ ОТКРЫТЬ',
    wx: {
      clear: 'ЯСНО', mostly: 'МАЛООБЛАЧНО', cloudy: 'ОБЛАЧНО', fog: 'ТУМАН', drizzle: 'МОРОСЬ', rain: 'ДОЖДЬ', snow: 'СНЕГ', storm: 'ГРОЗА',
      wind: 'ветер', kmh: 'км/ч', feels: 'ощущается', days: ['СЕГОДНЯ', 'ЗАВТРА', 'ПОСЛЕЗАВТРА'], fail: 'НЕТ СВЯЗИ С МЕТЕО',
      comment: {
        clear: 'В Москве ясно. Идеальная погода, чтобы не сидеть за ноутбуком. Я всё равно сижу.',
        mostly: 'Пара облаков над Москвой. Как пара TODO в коде: жить можно.',
        cloudy: 'Над Москвой серо. Хорошая погода для деплоя: всё равно никуда не пойдёшь.',
        fog: 'Туман. Видимость как у ТЗ, написанного за пять минут.',
        drizzle: 'Моросит. Сайт тоже моросит, для атмосферы.',
        rain: 'В Москве дождь, и на сайте тоже. Капли падают на карточки, можно понаблюдать.',
        snow: 'В Москве снег. Сайт в солидарности.',
        storm: 'Гроза над Москвой. Самое время проверить бэкапы.'
      }
    },
    fc: {
      types: { bot: 'Telegram-бот', auto: 'Автоматизация', llm: 'LLM в продукт', parser: 'Парсер', fix: 'Доработка', other: 'Что-то другое' },
      extras: { db: 'База / админка', pay: 'Оплата', api: 'Чужой API', ai: 'Нейросеть внутри', deploy: 'Деплой на сервер', pics: 'Картинки / отчёты', rush: 'Срочно', fuzzy: 'ТЗ пока в голове' },
      cond: ['ЯСНО', 'ПЕРЕМЕННАЯ ОБЛАЧНОСТЬ', 'ДОЖДЬ', 'ГРОЗА'],
      days: (a, b) => `срок: <b>${a}–${b}</b> ${b % 10 >= 2 && b % 10 <= 4 && (b % 100 < 12 || b % 100 > 14) ? 'дня' : b % 10 === 1 && b % 100 !== 11 ? 'день' : 'дней'}`,
      rain: ['1 круг правок', '1–2 круга правок', '2–3 круга правок', 'затяжные, 3+ круга'],
      wind: ['штиль', 'порывы: чужой API может капризничать', 'сильный: зависим от чужих сервисов'],
      vis: ['хорошая', 'туман: сначала вместе распишем ТЗ'],
      honest: [
        'Типовая задача, сюрпризов не жду. Можно начинать хоть завтра.',
        'Есть пара мест, где придётся подумать. Скажу о них сразу, до начала работы.',
        'Задача с характером. Разобьём на этапы, чтобы ты видел результат по ходу.',
        'Штормит: много неизвестных. Сначала короткий созвон, потом честный срок.'
      ],
      raw: [
        'Солнечно. Если за этот срок не сделаю, можешь написать мне гневный отзыв.',
        'Облачка. Где-то в этой задаче сидит подвох, и я его найду раньше, чем он меня.',
        'Льёт. Чужие API, правки, «а можно ещё кнопочку». Классика, прорвёмся.',
        'Гроза. Неизвестных больше, чем известных. Уважаю смелость. Созвонимся и разберём по косточкам.'
      ],
      rush: 'срочность ужимает срок, но поднимает риск',
      mailSubj: 'Прогноз по проекту с сайта', mailIntro: 'Привет! Посчитал прогноз на сайте:', copied: 'ПРОГНОЗ СКОПИРОВАН', conf: 'уверенность'
    },
    sig: [
      { html: '🟢 <b>LONG · SOLUSDT</b>\n<span class="muted">Канал: ••••••• · 2 мин назад</span>\n\nВход: 142.30\nСтоп: 138.90\nTP1: 146.80 · TP2: 151.20\n\n💼 По умолчанию: позиция 20 USDT · плечо x5.\n<span class="muted">Рынок: demo</span>' },
      { html: '🔴 <b>SHORT · ETHUSDT</b>\n<span class="muted">Канал: ••••••• · только что</span>\n\nВход: 3 412\nСтоп: 3 488\nTP1: 3 330\n\n<span class="tag-img">[с картинки] график: ETHUSDT 15m, нисходящий тренд</span>\n\n💼 По умолчанию: позиция 20 USDT · плечо x5.' },
      { html: '🟢 <b>LONG · DOGEUSDT</b>\n<span class="muted">Канал: ••••••• · 5 мин назад</span>\n\nВход: 0.1840\nСтоп: 0.1790\nTP1: 0.1920\n\n⚠️ По монете уже открыта позиция.\n💼 Маржа: 25 USDT · плечо x10 → позиция ≈ 250 USDT\n⛔ Защита не пропустит: позиция больше лимита' }
    ],
    sigOk: '\n\n<span class="green">✅ Подтверждено оператором</span>\n<span class="muted">Ордер ушёл на demo · исполнен</span>',
    sigNo: '\n\n<span class="red">❌ Отклонено оператором</span>',
    sigSim: '\n\n📊 <b>Симуляция запущена</b>\n<span class="muted">виртуальная сделка, MFE/MAE пишутся в реестр</span>',
    sigBlocked: '\n\n<span class="red">⛔ Не отправлено: защита режет слишком крупные сделки</span>',
    radar: {
      groups: { build: 'РАЗРАБОТКА', ai: 'ИИ', ops: 'ИНФРА', sec: 'ИБ' },
      idle: 'радар сканирует стек...', ping: 'засёк: ', near: 'ближе к центру — чаще в работе'
    },
    blips: {
      'Python': 'основной язык, всё на нём', 'aiogram': 'бот CDB', 'Telethon': 'парсер торговой системы', 'APScheduler': 'напоминания о парах', 'pytest': 'тесты перед деплоем',
      'n8n': 'разбор сигналов', 'Groq': 'LLM-разбор сигналов', 'Vision LLM': 'текст со скриншотов', 'Workers AI': 'генерация документов в ScrewSec',
      'Linux': 'все сервисы на своих серверах', 'systemd': 'сервисы 24/7', 'nginx': 'раздача календаря, TLS', 'Yandex Cloud': 'хостинг ScrewSec', 'Docker': 'контейнеры',
      'CSP': 'защита фронта ScrewSec', '152-ФЗ': 'логика ScrewSec', 'CC1101': 'радио, хобби', 'Kali': 'учёба и эксперименты'
    },
    term: {
      hello: 'TIM terminal v2.1. Напиши <c>help</c>, чтобы увидеть команды.',
      help: 'Команды:\n  <c>whoami</c>          кто я\n  <c>projects</c>        проекты\n  <c>services</c>        что могу сделать\n  <c>stack</c>           стек\n  <c>weather</c>         погода в Москве\n  <c>rain</c> | <c>snow</c> | <c>storm</c> | <c>sun</c> | <c>auto</c>   атмосфера сайта\n  <c>theme</c> [cdb|phosphor|paper]   тема\n  <c>lang</c> [ru|en]    язык\n  <c>cv</c>              резюме\n  <c>contact</c>         как связаться\n  <c>hire</c>            нанять\n  <c>clear</c>           очистить экран\n  <c>exit</c>            закрыть',
      whoami: 'Тим. Студент ИБ, 2 курс, ITHUB College, Москва.\nTelegram-боты, автоматизация на LLM, торговые системы.',
      projects: '01  Торговая система сигналов   коммерческий\n02  CDB                         бот расписания, LIVE\n03  ScrewSec                    SaaS, LIVE\n04  yandex-calendar-timetable   open source\n05  RF / Hardware               хобби',
      services: 'Telegram-боты · автоматизация · LLM · парсеры · доработка · деплой.\nНет в списке? Пиши, обсудим. Берусь почти за всё на своём уровне.',
      stack: 'Python, aiogram, Telethon, httpx, n8n, Groq, Workers AI, SQLite,\nGoogle Sheets API, Linux, systemd, nginx, Docker, Yandex Cloud.',
      contact: 'Telegram: <a href="https://t.me/becarefulx" target="_blank" rel="noopener">@becarefulx</a>\nEmail:    <a href="mailto:titbob000@gmail.com">titbob000@gmail.com</a>',
      hire: 'Отличное решение. Открываю форму...', sudo: '[sudo] пароль для guest: ********\nДоступ выдан. Тим нанят. Осталось только написать ему: <a href="https://t.me/becarefulx" target="_blank" rel="noopener">@becarefulx</a>',
      rm: 'Хорошая попытка. Это сайт на GitHub Pages, тут нечего удалять. Но за смелость +1.',
      ls: 'about.txt  projects/  services.txt  cv.pdf  secrets/',
      secrets: 'ls: secrets/: доступ запрещён. Я же на безопасника учусь.',
      cat: 'Используй <c>whoami</c>, это быстрее.',
      atmo: 'Атмосфера: ', theme: 'Тема: ', lang: 'Язык: ', unknown: 'команда не найдена: ', cv: 'Скачиваю резюме...',
      coffee: 'Ошибка 418: я чайник.', matrix: 'Wake up, Neo... Нет, не та тема. Попробуй <c>theme phosphor</c>.'
    },
    toast: { theme: 'ТЕМА: ', secret: 'СЕКРЕТНАЯ ТЕМА ОТКРЫТА: ЭФИР-80', shutter: 'ДИАФРАГМА ЗАКРЫТА. СНИМОК СДЕЛАН.' },
    console: 'Ищешь баги в коде сайта? Нашёл — напиши @becarefulx, мне правда интересно.'
  },

  en: {
    boot: ['CDB BIOS v2.1 // TIM', 'Memory test... 640K OK', 'Linking Python runtime............ OK', 'Syncing Moscow weather............ OK', 'Loading LLM pipelines............. OK', 'Calibrating security paranoia..... OK', '', 'TIM // SECURITY & DEV ENGINEER', 'BOOT COMPLETE. INITIALIZING DISPLAY...'],
    bootSkip: 'PRESS ANY KEY TO SKIP',
    typed: ['now: trading system and CDB', 'studying: infosec, year 2', 'looking for: interesting projects', 'writing: tests before deploy', 'press ~ to open the terminal'],
    modes: {
      short: { name: 'SHORT', hint: 'For those with 10 seconds.', html: '<p><strong>Tim, 2nd-year information security student at ITHUB College, Moscow.</strong></p><p>I build Telegram bots, LLM automation and trading systems. Everything in the portfolio below is used by real people. Open for projects.</p>' },
      tech: { name: 'FOR A TECH LEAD', hint: 'Stack, approach, how I write code.', html: '<p>Primary language: <strong>Python</strong>. For Telegram I use <strong>aiogram</strong> and <strong>Telethon</strong>, aiohttp and httpx for networking, APScheduler for background jobs. Data lives in SQLite and Google Sheets.</p><p><strong>I treat LLMs as a constrained component</strong>, not magic: Groq, Cloudflare Workers AI, vision models. Machine-generated text is always labeled so it never gets confused with a human\'s words.</p><p>I deploy on Linux: systemd, nginx, bash. Clouds: Yandex Cloud and Cloudflare. When logic touches money, I run offline self-tests and network-mocked tests before any change.</p>' },
      raw: { name: 'UNFILTERED', hint: 'As is.', html: '<p>I study security, but <strong>what I love most is when something I wrote at 2 a.m. is quietly working for people by morning.</strong></p><p>I tinker with radio on a LilyGO T-Embed CC1101 running Bruce: Sub-GHz, NFC, BLE. Built my own PC on a Ryzen 7 7700 and an RTX 5060 Ti. I unwind with CS2 and PUBG.</p><p>If a task has a catch, I\'ll tell you right away, not on deadline day.</p>' }
    },
    shotCap: 'A REAL IMAGE FROM THE BOT · CLICK TO OPEN',
    wx: {
      clear: 'CLEAR', mostly: 'MOSTLY CLEAR', cloudy: 'CLOUDY', fog: 'FOG', drizzle: 'DRIZZLE', rain: 'RAIN', snow: 'SNOW', storm: 'THUNDERSTORM',
      wind: 'wind', kmh: 'km/h', feels: 'feels like', days: ['TODAY', 'TOMORROW', 'NEXT DAY'], fail: 'NO WEATHER LINK',
      comment: {
        clear: 'Clear skies over Moscow. Perfect weather to step away from the laptop. I\'m still at it.',
        mostly: 'A couple of clouds over Moscow. Like a couple of TODOs in code: livable.',
        cloudy: 'Grey over Moscow. Good deploy weather: you\'re not going anywhere anyway.',
        fog: 'Fog. Visibility like a spec written in five minutes.',
        drizzle: 'Drizzling. The site drizzles too, for atmosphere.',
        rain: 'It\'s raining in Moscow, and on the site too. Watch the drops land on the cards.',
        snow: 'Snow in Moscow. The site stands in solidarity.',
        storm: 'Thunderstorm over Moscow. Good time to check your backups.'
      }
    },
    fc: {
      types: { bot: 'Telegram bot', auto: 'Automation', llm: 'LLM in product', parser: 'Scraper', fix: 'Fix / extend', other: 'Something else' },
      extras: { db: 'Database / admin', pay: 'Payments', api: 'Third-party API', ai: 'AI inside', deploy: 'Server deploy', pics: 'Images / reports', rush: 'Urgent', fuzzy: 'Spec is still in my head' },
      cond: ['CLEAR', 'PARTLY CLOUDY', 'RAIN', 'THUNDERSTORM'],
      days: (a, b) => `timeframe: <b>${a}–${b}</b> days`,
      rain: ['1 revision round', '1–2 revision rounds', '2–3 revision rounds', 'prolonged, 3+ rounds'],
      wind: ['calm', 'gusty: a third-party API may act up', 'strong: we depend on other services'],
      vis: ['good', 'foggy: let\'s write the spec together first'],
      honest: [
        'A typical task, no surprises expected. We could start tomorrow.',
        'A couple of spots need thinking. I\'ll flag them before we start.',
        'A task with character. We\'ll split it into stages so you see progress.',
        'Stormy: lots of unknowns. A short call first, then an honest deadline.'
      ],
      raw: [
        'Sunny. If I miss this timeframe, feel free to leave me an angry review.',
        'Some clouds. There\'s a catch hiding in this task, and I\'ll find it before it finds me.',
        'Pouring. Third-party APIs, revisions, "can we add one more button". Classic, we\'ll make it.',
        'Thunderstorm. More unknowns than knowns. I respect the courage. Let\'s call and take it apart.'
      ],
      rush: 'urgency shortens the timeframe but raises the risk',
      mailSubj: 'Project forecast from your site', mailIntro: 'Hi! I ran the forecast on your site:', copied: 'FORECAST COPIED', conf: 'confidence'
    },
    sig: [
      { html: '🟢 <b>LONG · SOLUSDT</b>\n<span class="muted">Channel: ••••••• · 2 min ago</span>\n\nEntry: 142.30\nStop: 138.90\nTP1: 146.80 · TP2: 151.20\n\n💼 Default: position 20 USDT · leverage x5.\n<span class="muted">Market: demo</span>' },
      { html: '🔴 <b>SHORT · ETHUSDT</b>\n<span class="muted">Channel: ••••••• · just now</span>\n\nEntry: 3,412\nStop: 3,488\nTP1: 3,330\n\n<span class="tag-img">[from image] chart: ETHUSDT 15m, downtrend</span>\n\n💼 Default: position 20 USDT · leverage x5.' },
      { html: '🟢 <b>LONG · DOGEUSDT</b>\n<span class="muted">Channel: ••••••• · 5 min ago</span>\n\nEntry: 0.1840\nStop: 0.1790\nTP1: 0.1920\n\n⚠️ A position on this coin is already open.\n💼 Margin: 25 USDT · leverage x10 → position ≈ 250 USDT\n⛔ Risk guard will block: position over the limit' }
    ],
    sigOk: '\n\n<span class="green">✅ Confirmed by operator</span>\n<span class="muted">Order sent to demo · filled</span>',
    sigNo: '\n\n<span class="red">❌ Rejected by operator</span>',
    sigSim: '\n\n📊 <b>Simulation started</b>\n<span class="muted">virtual trade, MFE/MAE go to the registry</span>',
    sigBlocked: '\n\n<span class="red">⛔ Not sent: the risk guard blocks oversized trades</span>',
    radar: {
      groups: { build: 'BUILD', ai: 'AI', ops: 'INFRA', sec: 'SECURITY' },
      idle: 'radar is scanning the stack...', ping: 'contact: ', near: 'closer to center — used more often'
    },
    blips: {
      'Python': 'primary language, everything', 'aiogram': 'CDB bot', 'Telethon': 'trading system parser', 'APScheduler': 'class reminders', 'pytest': 'tests before deploy',
      'n8n': 'signal parsing', 'Groq': 'LLM signal parsing', 'Vision LLM': 'text from screenshots', 'Workers AI': 'document generation in ScrewSec',
      'Linux': 'every service on my servers', 'systemd': '24/7 services', 'nginx': 'calendar serving, TLS', 'Yandex Cloud': 'ScrewSec hosting', 'Docker': 'containers',
      'CSP': 'ScrewSec frontend hardening', '152-ФЗ': 'ScrewSec logic', 'CC1101': 'radio, hobby', 'Kali': 'study and experiments'
    },
    term: {
      hello: 'TIM terminal v2.1. Type <c>help</c> to see commands.',
      help: 'Commands:\n  <c>whoami</c>          who I am\n  <c>projects</c>        projects\n  <c>services</c>        what I can build\n  <c>stack</c>           stack\n  <c>weather</c>         Moscow weather\n  <c>rain</c> | <c>snow</c> | <c>storm</c> | <c>sun</c> | <c>auto</c>   site atmosphere\n  <c>theme</c> [cdb|phosphor|paper]   theme\n  <c>lang</c> [ru|en]    language\n  <c>cv</c>              résumé\n  <c>contact</c>         how to reach me\n  <c>hire</c>            hire me\n  <c>clear</c>           clear screen\n  <c>exit</c>            close',
      whoami: 'Tim. Information security student, year 2, ITHUB College, Moscow.\nTelegram bots, LLM automation, trading systems.',
      projects: '01  Trading signal system       commercial\n02  CDB                         timetable bot, LIVE\n03  ScrewSec                    SaaS, LIVE\n04  yandex-calendar-timetable   open source\n05  RF / Hardware               hobby',
      services: 'Telegram bots · automation · LLM · scrapers · fixes · deploy.\nNot on the list? Message me. I take on almost anything at my level.',
      stack: 'Python, aiogram, Telethon, httpx, n8n, Groq, Workers AI, SQLite,\nGoogle Sheets API, Linux, systemd, nginx, Docker, Yandex Cloud.',
      contact: 'Telegram: <a href="https://t.me/becarefulx" target="_blank" rel="noopener">@becarefulx</a>\nEmail:    <a href="mailto:titbob000@gmail.com">titbob000@gmail.com</a>',
      hire: 'Excellent decision. Opening the form...', sudo: '[sudo] password for guest: ********\nAccess granted. Tim is hired. Now just message him: <a href="https://t.me/becarefulx" target="_blank" rel="noopener">@becarefulx</a>',
      rm: 'Nice try. This is a GitHub Pages site, there\'s nothing to delete. +1 for courage though.',
      ls: 'about.txt  projects/  services.txt  cv.pdf  secrets/',
      secrets: 'ls: secrets/: permission denied. I do study security, you know.',
      cat: 'Use <c>whoami</c>, it\'s faster.',
      atmo: 'Atmosphere: ', theme: 'Theme: ', lang: 'Language: ', unknown: 'command not found: ', cv: 'Downloading résumé...',
      coffee: 'Error 418: I\'m a teapot.', matrix: 'Wake up, Neo... Wrong theme. Try <c>theme phosphor</c>.'
    },
    toast: { theme: 'THEME: ', secret: 'SECRET THEME UNLOCKED: BROADCAST-80', shutter: 'APERTURE CLOSED. SHOT TAKEN.' },
    console: 'Hunting for bugs in this site? Found one — message @becarefulx, I genuinely want to know.'
  }
};
