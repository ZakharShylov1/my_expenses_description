/* ==========================================================
   MY EXPENSES — CINEMATIC ANIMATIONS ENGINE
   GSAP + ScrollTrigger + Custom Cursor + Magnetic + Reveal + i18n
   ========================================================== */
(function () {
'use strict';

gsap.registerPlugin(ScrollTrigger);

/* ---- helpers ---- */
const qs = (s, p) => (p || document).querySelector(s);
const qa = (s, p) => [...(p || document).querySelectorAll(s)];
const isMobile = () => window.innerWidth < 769;
const isTouch = () => window.matchMedia('(pointer:coarse)').matches;

/* ==========================================================
   i18n — TRANSLATIONS
   ========================================================== */
const T = {
    ru: {
        'nav.features': 'Возможности',
        'nav.interface': 'Интерфейс',
        'nav.how': 'Как работает',
        'nav.ml': 'Локальный ML',
        'nav.tech': 'Технологии',
        'nav.privacy': 'Приватность',
        'nav.download': 'Скачать',
        'hero.pill': 'Доступно на iOS и Android',
        'hero.h1': '<span class="h1-line"><span class="h1-word" style="opacity:1;transform:none">Учёт</span> <span class="h1-word" style="opacity:1;transform:none">расходов.</span></span><span class="h1-line"><span class="h1-word" style="opacity:1;transform:none">Не</span> <span class="h1-word h1-grad" style="opacity:1;transform:none">ваших данных.</span></span>',
        'hero.sub': 'Ноль серверов. Ноль регистрации. Ноль компромиссов.<br>ML-категоризация на устройстве. Импорт банковской выписки за секунды.',
        'hero.btn1': 'Скачать приложение',
        'hero.btn2': 'Как это работает',
        'metrics.servers': 'серверов',
        'metrics.device': 'на устройстве',
        'metrics.csv': 'импорт CSV',
        'metrics.data': 'данных отправлено',
        'summary': 'My Expenses решает конкретную задачу — быстрый, приватный и понятный учёт личных расходов без навязанных подписок и облачных сервисов. Данные не покидают устройство. Импорт банковской выписки — секунды. Автокатегоризация — на устройстве. Без регистрации, без backend, без компромиссов.',
        'feat.tag': 'Основные функции',
        'feat.h2': 'Всё что нужно.<br>Ничего лишнего.',
        'feat1.h3': 'Ручной ввод',
        'feat1.p': 'Сумма, категория, название, дата. Добавление расхода за 3 секунды.',
        'feat2.h3': 'Импорт CSV',
        'feat2.p': 'Загрузите банковскую выписку. Автоопределение формата, дат, разделителей.',
        'feat3.h3': 'Автокатегоризация',
        'feat3.p': '3-уровневая система на устройстве: правила мерчантов, словарь ключевых слов, локальный ML.',
        'feat4.h3': 'Аналитика',
        'feat4.p': 'Разбивка по категориям, фильтры по периодам, donut-диаграммы, детализация.',
        'feat5.h3': 'Контроль бюджета',
        'feat5.p': 'Месячный лимит, потрачено/осталось, прогресс-бар, топ дней по расходам.',
        'feat6.h3': 'Приватность прежде всего',
        'feat6.p': 'Никаких серверов. Никаких аккаунтов. Никакого трекинга. Данные остаются на устройстве.',
        'screens.tag': 'Интерфейс',
        'screens.h2': 'Создан для ясности.',
        'sc1.tag': 'Главная',
        'sc1.h3': 'Расходы за день',
        'sc1.p': 'Текущая дата, общая сумма, хронологический список. Одно нажатие для добавления.',
        'sc2.tag': 'Статистика',
        'sc2.h3': 'Разбивка по категориям',
        'sc2.p': 'Интерактивная donut-диаграмма. Фильтры по периодам. Процент по каждой категории.',
        'sc3.tag': 'Бюджет',
        'sc3.h3': 'Контроль лимитов',
        'sc3.p': 'Месячный бюджет. Прогресс-бар. Рейтинг самых затратных дней.',
        'sc4.tag': 'Импорт',
        'sc4.h3': 'CSV за секунды',
        'sc4.p': 'Автоопределение формата, предпросмотр, категоризация, импорт. Готово.',
        'flow.tag': 'Процесс импорта CSV',
        'flow.h2': 'От банковской выписки к аналитике.<br>В четыре шага.',
        'flow1.h3': 'Загрузите CSV',
        'flow1.p': 'Экспортируйте из банка. Автоопределение формата, разделителя, псевдонимов колонок.',
        'flow1.t2': 'автоопределение',
        'flow1.t3': 'мультибанк',
        'flow2.h3': 'Предпросмотр и валидация',
        'flow2.p': 'Просмотрите распарсенные строки, пропущенные записи, отфильтрованные доходы. Полный контроль.',
        'flow2.t1': 'распарсенные',
        'flow2.t2': 'пропущенные',
        'flow2.t3': 'доходы отфильтрованы',
        'flow3.h3': 'Автокатегоризация',
        'flow3.p': '3-уровневая классификация: правила мерчантов \u2192 словарь ключевых слов \u2192 локальный ML. Ручная коррекция.',
        'flow3.t1': 'правила мерчантов',
        'flow3.t2': 'словарь',
        'flow3.t3': 'локальный ML',
        'flow4.h3': 'Сохранение и аналитика',
        'flow4.p': 'Массовая вставка в SQLite. Дедупликация через hashKey. Аналитика обновляется мгновенно.',
        'flow4.t2': 'дедупликация',
        'flow4.t3': 'мгновенно',
        'ml.tag': 'Интеллект на устройстве',
        'ml.h2': 'Учится у вас.<br>Локально.',
        'ml.label1': 'Простое объяснение',
        'ml.simple.h3': 'Приложение запоминает ваши исправления.',
        'ml.simple.p': 'Исправили категорию — запомнил. В следующий раз тот же мерчант — правильная категория. Всё происходит <em>на вашем телефоне</em>. Никакой облачной нейросети. Локальный текстовый матчинг, который улучшается с использованием.',
        'ml.demo1': 'Вы исправляете "LIDL" \u2192 <strong>Продукты</strong>',
        'ml.demo2': 'Приложение сохраняет правило локально',
        'ml.demo3': '"LIDL PARIS" \u2192 Продукты',
        'ml.label2': 'Технические детали',
        'ml.p1.name': 'Правила мерчантов',
        'ml.p1.desc': 'Точное / фразовое совпадение по нормализованному описанию. Высший приоритет.',
        'ml.p2.name': 'Словарь правил',
        'ml.p2.desc': 'Словарь ключевых слов по категориям с весовыми приоритетами.',
        'ml.p3.name': 'Локальный ML-классификатор',
        'ml.p3.desc': 'Bag-of-words + n-grams, косинусное сходство. На истории пользователя.',
        'ml.fb.name': 'Фоллбэк',
        'ml.fb.desc': 'Низкая уверенность \u2192 остаётся без категории для ручной проверки.',
        'priv.tag': 'Приватность и безопасность',
        'priv.h2': 'Ваши финансы.<br>Ваше устройство.<br>Ваши правила.',
        'priv1.title': 'Локальная обработка',
        'priv1.p': 'Все данные обрабатываются и хранятся на устройстве. Ничего не покидает ваш телефон.',
        'priv2.title': 'Без серверов',
        'priv2.p': 'Нет backend API. Нет облака. Нет серверной обработки.',
        'priv3.title': 'Без регистрации',
        'priv3.p': 'Никакого email, телефона, аккаунта. Установите и пользуйтесь.',
        'priv4.title': 'Файлы остаются на устройстве',
        'priv4.p': 'CSV-файлы читаются на устройстве, никогда не загружаются на сервер.',
        'arch.tag': 'Архитектура',
        'arch.h2': 'Под капотом.',
        'arch.stack': 'Технологический стек',
        'arch.lang': 'Язык',
        'arch.framework': 'Фреймворк',
        'arch.nav': 'Навигация',
        'arch.db': 'База данных',
        'arch.ui.val': 'Кастомные компоненты',
        'arch.platforms': 'Платформы',
        'arch.architecture': 'Архитектура',
        'arch.arch.val': 'Только локально',
        'arch.model': 'Модель данных',
        'arch.flow': 'Поток данных',
        'arch.pipe1': 'CSV / Ручной ввод',
        'arch.pipe2': 'Парсер',
        'arch.pipe3': 'Категоризатор',
        'arch.pipe5': 'UI-слой',
        'cta.h2': 'Начните учёт.<br>Забудьте о беспокойстве.',
        'cta.sub': 'Бесплатно. Приватно. Без аккаунта.',
        'cta.appstore.sm': 'Загрузите в',
        'cta.gplay.sm': 'Доступно в',
        'foot.desc': 'Приватный учёт расходов.',
        'foot.col1': 'Продукт',
        'foot.col2': 'Технологии',
        'foot.col3': 'Контакт'
    },
    en: {
        'nav.features': 'Features',
        'nav.interface': 'Interface',
        'nav.how': 'How it works',
        'nav.ml': 'Local ML',
        'nav.tech': 'Tech',
        'nav.privacy': 'Privacy',
        'nav.download': 'Download',
        'hero.pill': 'Available on iOS & Android',
        'hero.h1': '<span class="h1-line"><span class="h1-word" style="opacity:1;transform:none">Track</span> <span class="h1-word" style="opacity:1;transform:none">expenses.</span></span><span class="h1-line"><span class="h1-word" style="opacity:1;transform:none">Not</span> <span class="h1-word h1-grad" style="opacity:1;transform:none">your data.</span></span>',
        'hero.sub': 'Zero servers. Zero registration. Zero compromise.<br>On-device ML categorization. Bank CSV import in seconds.',
        'hero.btn1': 'Get the app',
        'hero.btn2': 'See how it works',
        'metrics.servers': 'servers',
        'metrics.device': 'on-device',
        'metrics.csv': 'CSV import',
        'metrics.data': 'data sent',
        'summary': 'My Expenses solves a specific problem \u2014 fast, private, and intuitive personal expense tracking without forced subscriptions or cloud services. Data never leaves your device. Bank statement import \u2014 seconds. Auto-categorization \u2014 on-device. No registration, no backend, no compromise.',
        'feat.tag': 'Core Features',
        'feat.h2': 'Everything you need.<br>Nothing you don\'t.',
        'feat1.h3': 'Manual Entry',
        'feat1.p': 'Amount, category, name, date. Add an expense in 3 seconds.',
        'feat2.h3': 'CSV Import',
        'feat2.p': 'Drop your bank statement. Auto-detection of formats, dates, delimiters.',
        'feat3.h3': 'Auto-categorize',
        'feat3.p': '3-layer on-device system: merchant rules, keyword dictionary, local ML.',
        'feat4.h3': 'Analytics',
        'feat4.p': 'Category breakdown, period filters, donut charts, drill-down screens.',
        'feat5.h3': 'Budget Control',
        'feat5.p': 'Monthly limit, spent vs. remaining, progress tracking, top spending days.',
        'feat6.h3': 'Privacy First',
        'feat6.p': 'No servers. No accounts. No tracking. Data stays on your device.',
        'screens.tag': 'Interface',
        'screens.h2': 'Designed for clarity.',
        'sc1.tag': 'Home',
        'sc1.h3': 'Daily expenses at a glance',
        'sc1.p': 'Current date, total spent, chronological list. One tap to add.',
        'sc2.tag': 'Stats',
        'sc2.h3': 'Category breakdown',
        'sc2.p': 'Interactive donut chart. Period filters. Percentage per category.',
        'sc3.tag': 'Budget',
        'sc3.h3': 'Stay within limits',
        'sc3.p': 'Monthly budget. Progress bar. Top spending days ranking.',
        'sc4.tag': 'Import',
        'sc4.h3': 'CSV in seconds',
        'sc4.p': 'Auto-detect format, preview, categorize, import. Done.',
        'flow.tag': 'CSV Import Flow',
        'flow.h2': 'Bank statement to insights.<br>In four steps.',
        'flow1.h3': 'Upload CSV',
        'flow1.p': 'Export from your bank. Auto-detect format, delimiter, column aliases.',
        'flow1.t2': 'auto-detect',
        'flow1.t3': 'multi-bank',
        'flow2.h3': 'Preview & validate',
        'flow2.p': 'Review parsed rows, skipped entries, filtered income. Full control.',
        'flow2.t1': 'parsed rows',
        'flow2.t2': 'unparsed',
        'flow2.t3': 'income filtered',
        'flow3.h3': 'Auto-categorize',
        'flow3.p': '3-layer classification: merchant rules \u2192 keyword dictionary \u2192 local ML. Manual override.',
        'flow3.t1': 'merchant rules',
        'flow3.t2': 'keyword dict',
        'flow3.t3': 'local ML',
        'flow4.h3': 'Save & analyze',
        'flow4.p': 'Bulk insert into SQLite. Dedup via hashKey. Analytics update instantly.',
        'flow4.t2': 'dedup',
        'flow4.t3': 'instant',
        'ml.tag': 'On-Device Intelligence',
        'ml.h2': 'It learns from you.<br>Locally.',
        'ml.label1': 'Simple explanation',
        'ml.simple.h3': 'The app remembers your corrections.',
        'ml.simple.p': 'Fix a category \u2014 it learns. Next time, same merchant, correct category. Happens <em>on your phone</em>. No cloud neural net. Local text matching that improves with usage.',
        'ml.demo1': 'You fix "LIDL" \u2192 <strong>Groceries</strong>',
        'ml.demo2': 'App saves the rule locally',
        'ml.demo3': '"LIDL PARIS" \u2192 Groceries',
        'ml.label2': 'Technical details',
        'ml.p1.name': 'Merchant Rules',
        'ml.p1.desc': 'Exact / phrase matching on normalized description. Highest priority.',
        'ml.p2.name': 'Rule-based Dictionary',
        'ml.p2.desc': 'Keyword dictionary per category with weighted priorities.',
        'ml.p3.name': 'Local ML Classifier',
        'ml.p3.desc': 'Bag-of-words + n-grams, cosine similarity. On user history.',
        'ml.fb.name': 'Fallback',
        'ml.fb.desc': 'Low confidence \u2192 stays Uncategorized for manual review.',
        'priv.tag': 'Privacy & Security',
        'priv.h2': 'Your finances.<br>Your device.<br>Your rules.',
        'priv1.title': 'Local processing',
        'priv1.p': 'All data processed and stored on-device. Nothing leaves your phone.',
        'priv2.title': 'No servers',
        'priv2.p': 'No backend API. No cloud. No server-side processing.',
        'priv3.title': 'No registration',
        'priv3.p': 'No email, no phone, no account. Install and go.',
        'priv4.title': 'Files stay local',
        'priv4.p': 'CSV files read on-device, never uploaded.',
        'arch.tag': 'Architecture',
        'arch.h2': 'Under the hood.',
        'arch.stack': 'Tech Stack',
        'arch.lang': 'Language',
        'arch.framework': 'Framework',
        'arch.nav': 'Navigation',
        'arch.db': 'Database',
        'arch.ui.val': 'Custom components',
        'arch.platforms': 'Platforms',
        'arch.architecture': 'Architecture',
        'arch.arch.val': 'Local-only',
        'arch.model': 'Data Model',
        'arch.flow': 'Data Flow',
        'arch.pipe1': 'CSV / Manual',
        'arch.pipe2': 'Parser',
        'arch.pipe3': 'Categorizer',
        'arch.pipe5': 'UI Layer',
        'cta.h2': 'Start tracking.<br>Stop worrying.',
        'cta.sub': 'Free. Private. No account needed.',
        'cta.appstore.sm': 'Download on the',
        'cta.gplay.sm': 'Get it on',
        'foot.desc': 'Privacy-first expense tracking.',
        'foot.col1': 'Product',
        'foot.col2': 'Technology',
        'foot.col3': 'Contact'
    }
};

/* ---- language state ---- */
let currentLang = localStorage.getItem('lang') || 'en';

function applyLang(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;

    const dict = T[lang];
    if (!dict) return;

    // Simple text nodes
    qa('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key] != null) el.textContent = dict[key];
    });

    // HTML nodes
    qa('[data-i18n-html]').forEach(el => {
        const key = el.getAttribute('data-i18n-html');
        if (dict[key] != null) el.innerHTML = dict[key];
    });

    // Summary — special: re-split into words for scroll reveal
    const sumEl = qs('#summaryText');
    if (sumEl && dict['summary']) {
        const raw = dict['summary'];
        sumEl.innerHTML = raw.split(/\s+/).map(w => `<span class="sw" style="color:rgba(255,255,255,0.08)">${w}</span>`).join(' ');
        // Re-create ScrollTrigger for summary
        ScrollTrigger.getAll().forEach(st => {
            if (st.vars && st.vars.trigger === sumEl) st.kill();
        });
        gsap.fromTo(qa('.sw'),
            { color: 'rgba(255,255,255,0.08)' },
            {
                color: 'rgba(245,245,247,1)',
                stagger: 0.035,
                scrollTrigger: { trigger: sumEl, start: 'top 82%', end: 'bottom 35%', scrub: 1.2 }
            }
        );
    }

    // Update toggle buttons
    qa('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
}

// Language switch click handler
const langSwitch = qs('#langSwitch');
if (langSwitch) {
    langSwitch.addEventListener('click', e => {
        const btn = e.target.closest('.lang-btn');
        if (!btn || btn.classList.contains('active')) return;
        applyLang(btn.dataset.lang);
    });
}

/* ==========================================================
   CUSTOM CURSOR
   ========================================================== */
const curDot = qs('#cursor');
const curRing = qs('#cursorRing');

if (curDot && curRing && !isTouch()) {
    let mx = -100, my = -100;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

    // Dot — instant via GSAP ticker
    gsap.ticker.add(() => {
        gsap.set(curDot, { x: mx - 6, y: my - 6 });
    });

    // Ring — smooth follow
    let rx = -100, ry = -100;
    gsap.ticker.add(() => {
        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;
        gsap.set(curRing, { x: rx - 20, y: ry - 20 });
    });

    // Hover interactions
    qa('a, button, .feat-card, .pipe-n, .module-chip, .store-btn, .magnetic').forEach(el => {
        el.addEventListener('mouseenter', () => curRing.classList.add('hover'));
        el.addEventListener('mouseleave', () => curRing.classList.remove('hover'));
    });
}

/* ==========================================================
   MAGNETIC BUTTONS
   ========================================================== */
qa('.magnetic').forEach(btn => {
    if (isTouch()) return;
    btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        gsap.to(btn, { x: x * 0.25, y: y * 0.25, duration: 0.4, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1,0.4)' });
    });
});

/* ==========================================================
   FEATURE CARDS — RADIAL GLOW FOLLOW
   ========================================================== */
qa('.feat-card').forEach(c => {
    c.addEventListener('mousemove', e => {
        const r = c.getBoundingClientRect();
        c.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
        c.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
    });
});

/* ==========================================================
   NAV
   ========================================================== */
const nav = qs('#nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// Smooth anchor links
qa('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const t = qs(a.getAttribute('href'));
        if (!t) return;
        e.preventDefault();
        const top = t.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});

/* ==========================================================
   HERO — ENTRANCE TIMELINE
   ========================================================== */
const htl = gsap.timeline({ delay: 0.2 });

// Pill
htl.to('.hero-pill', { opacity: 1, duration: 0.6, ease: 'power3.out' });

// Words fly in
htl.to('.h1-word', {
    opacity: 1, y: 0, rotateX: 0,
    duration: 1.1, ease: 'power4.out', stagger: 0.09
}, '-=0.3');

// Subtitle + buttons
htl.to('.hero-sub', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5');
htl.to('.hero-btns', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6');

// Phones — center first, then sides
htl.from('.h-phone-c', {
    y: 140, opacity: 0, scale: 0.88, rotateX: 12,
    duration: 1.3, ease: 'power3.out'
}, '-=0.7');

htl.from('.h-phone-l', {
    x: -100, y: 80, opacity: 0, rotateY: 20, rotateZ: -4,
    duration: 1.1, ease: 'power3.out'
}, '-=1.0');

htl.from('.h-phone-r', {
    x: 100, y: 80, opacity: 0, rotateY: -20, rotateZ: 4,
    duration: 1.1, ease: 'power3.out'
}, '-=1.0');

// Metrics
htl.to('.hero-metrics', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6');

/* ==========================================================
   HERO — PARALLAX ON SCROLL
   ========================================================== */
if (!isMobile()) {
    gsap.to('.h-phone-c', {
        y: -80, scale: 0.95,
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.5 }
    });
    gsap.to('.h-phone-l', {
        y: -40, x: -30, rotation: -4,
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.5 }
    });
    gsap.to('.h-phone-r', {
        y: -40, x: 30, rotation: 4,
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.5 }
    });
    gsap.to('.hero-content', {
        y: -100, opacity: 0.3,
        scrollTrigger: { trigger: '.hero', start: 'top top', end: '60% top', scrub: 1.5 }
    });
    gsap.to('.hero-metrics', {
        y: -50,
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.5 }
    });
}

/* ==========================================================
   SUMMARY — WORD-BY-WORD REVEAL
   ========================================================== */
const sumEl = qs('#summaryText');
if (sumEl) {
    const raw = sumEl.textContent.trim();
    sumEl.innerHTML = raw.split(/\s+/).map(w => `<span class="sw">${w}</span>`).join(' ');

    gsap.fromTo(qa('.sw'),
        { color: 'rgba(255,255,255,0.08)' },
        {
            color: 'rgba(245,245,247,1)',
            stagger: 0.035,
            scrollTrigger: { trigger: sumEl, start: 'top 82%', end: 'bottom 35%', scrub: 1.2 }
        }
    );
}

/* ==========================================================
   FEATURES — STAGGER IN
   ========================================================== */
gsap.from('.feat-card', {
    y: 80, opacity: 0, scale: 0.96,
    duration: 0.9, ease: 'power3.out', stagger: 0.08,
    scrollTrigger: { trigger: '.feat-grid', start: 'top 82%' }
});

/* ==========================================================
   SCREENS — DRAG CAROUSEL
   ========================================================== */
const carousel = qs('#carousel');
const track = qs('#carouselTrack');
const cards = qa('.sc-card');
const prevBtn = qs('#carPrev');
const nextBtn = qs('#carNext');
const dotsWrap = qs('#carDots');

if (carousel && track && cards.length) {
    let current = 0;
    let isDragging = false;
    let startX = 0;
    let scrollStart = 0;
    let dragDelta = 0;
    let currentTranslate = 0;

    // Page-based: calculate how many pages we need
    function getPageCount() {
        const viewW = carousel.offsetWidth;
        const totalW = track.scrollWidth;
        return Math.max(1, Math.ceil(totalW / viewW));
    }

    function getPageWidth() {
        return carousel.offsetWidth;
    }

    // Build dots based on page count
    function buildDots() {
        dotsWrap.innerHTML = '';
        const pages = getPageCount();
        for (let i = 0; i < pages; i++) {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
            dot.addEventListener('click', () => goTo(i));
            dotsWrap.appendChild(dot);
        }
    }
    buildDots();

    function goTo(idx) {
        const pages = getPageCount();
        current = Math.max(0, Math.min(idx, pages - 1));
        const maxTranslate = track.scrollWidth - carousel.offsetWidth;
        currentTranslate = Math.min(current * getPageWidth(), maxTranslate);
        track.style.transform = `translateX(-${currentTranslate}px)`;
        qa('.carousel-dot').forEach((d, i) => d.classList.toggle('active', i === current));
    }

    prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn.addEventListener('click', () => goTo(current + 1));

    // Rebuild dots on resize
    window.addEventListener('resize', () => { buildDots(); goTo(Math.min(current, getPageCount() - 1)); });

    // Mouse drag
    carousel.addEventListener('mousedown', e => {
        isDragging = true;
        startX = e.clientX;
        scrollStart = currentTranslate;
        dragDelta = 0;
        carousel.classList.add('dragging');
    });

    window.addEventListener('mousemove', e => {
        if (!isDragging) return;
        dragDelta = startX - e.clientX;
        const next = Math.max(0, scrollStart + dragDelta);
        track.style.transform = `translateX(-${next}px)`;
    });

    window.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        carousel.classList.remove('dragging');
        const threshold = getPageWidth() * 0.15;
        if (dragDelta > threshold) goTo(current + 1);
        else if (dragDelta < -threshold) goTo(current - 1);
        else goTo(current);
    });

    // Touch drag
    carousel.addEventListener('touchstart', e => {
        isDragging = true;
        startX = e.touches[0].clientX;
        scrollStart = currentTranslate;
        dragDelta = 0;
        carousel.classList.add('dragging');
    }, { passive: true });

    carousel.addEventListener('touchmove', e => {
        if (!isDragging) return;
        dragDelta = startX - e.touches[0].clientX;
        const next = Math.max(0, scrollStart + dragDelta);
        track.style.transform = `translateX(-${next}px)`;
    }, { passive: true });

    carousel.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;
        carousel.classList.remove('dragging');
        const threshold = getPageWidth() * 0.15;
        if (dragDelta > threshold) goTo(current + 1);
        else if (dragDelta < -threshold) goTo(current - 1);
        else goTo(current);
    });

    // Keyboard
    carousel.setAttribute('tabindex', '0');
    carousel.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight') goTo(current + 1);
        if (e.key === 'ArrowLeft') goTo(current - 1);
    });

    // Fade cards in on scroll
    gsap.from('.sc-card', {
        y: 50, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '.sec-screens', start: 'top 80%' }
    });
}

/* ==========================================================
   DONUT CHART ANIMATION
   ========================================================== */
qa('.donut-seg').forEach(seg => {
    const finalDash = seg.getAttribute('stroke-dasharray');
    seg.setAttribute('stroke-dasharray', '0 302');

    ScrollTrigger.create({
        trigger: seg.closest('.hero-phones') || seg.closest('.sc-card') || seg,
        start: 'top 80%',
        once: true,
        onEnter: () => {
            gsap.to(seg, {
                attr: { 'stroke-dasharray': finalDash },
                duration: 1.6,
                ease: 'power3.out',
                delay: parseFloat(seg.dataset?.delay || 0)
            });
        }
    });
});

// Hero donut — animate on load after phones appear
const heroDonutSegs = qa('.h-phone-l .donut-seg');
heroDonutSegs.forEach((seg, i) => {
    const finalDash = seg.getAttribute('stroke-dasharray');
    if (finalDash === '0 302') return; // already reset above
    gsap.fromTo(seg,
        { attr: { 'stroke-dasharray': '0 302' } },
        { attr: { 'stroke-dasharray': finalDash }, duration: 1.8, ease: 'power3.out', delay: 2.2 + i * 0.15 }
    );
});

/* ==========================================================
   BUDGET BAR FILL
   ========================================================== */
qa('.mb-bar-fill').forEach(bar => {
    bar.style.width = '0%';
    ScrollTrigger.create({
        trigger: bar.closest('.mockup') || bar,
        start: 'top 80%',
        once: true,
        onEnter: () => gsap.to(bar, { width: '16%', duration: 1.5, ease: 'power3.out', delay: 0.3 })
    });
});

/* ==========================================================
   FLOW STEPS
   ========================================================== */
gsap.from('.flow-step', {
    y: 50, opacity: 0,
    duration: 0.8, ease: 'power3.out', stagger: 0.15,
    scrollTrigger: { trigger: '.flow-steps', start: 'top 78%' }
});

/* ==========================================================
   ML SECTION
   ========================================================== */
if (!isMobile()) {
    gsap.from('.ml-simple', {
        x: -80, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.ml-cols', start: 'top 75%' }
    });
    gsap.from('.ml-tech', {
        x: 80, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.ml-cols', start: 'top 75%' }
    });
} else {
    gsap.from('.ml-col', {
        y: 60, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.ml-cols', start: 'top 80%' }
    });
}

// ML layers cascade
gsap.from('.ml-layer', {
    y: 30, opacity: 0,
    duration: 0.6, stagger: 0.12, ease: 'power3.out',
    scrollTrigger: { trigger: '.ml-layers', start: 'top 82%' }
});

// ML demo steps
gsap.from('.mld-step, .mld-arrow', {
    y: 20, opacity: 0,
    duration: 0.5, stagger: 0.1, ease: 'power3.out',
    scrollTrigger: { trigger: '.ml-demo', start: 'top 85%' }
});

// Confidence bars
qa('.mll-fill').forEach(bar => {
    const w = bar.dataset.w;
    ScrollTrigger.create({
        trigger: bar, start: 'top 88%', once: true,
        onEnter: () => gsap.to(bar, { width: w + '%', duration: 1.4, ease: 'power3.out' })
    });
});


/* ==========================================================
   PRIVACY
   ========================================================== */
gsap.from('.priv-item', {
    y: 40, opacity: 0,
    duration: 0.7, stagger: 0.12, ease: 'power3.out',
    scrollTrigger: { trigger: '.priv-right', start: 'top 78%' }
});

/* ==========================================================
   ARCHITECTURE
   ========================================================== */
gsap.from('.arch-card', {
    y: 50, opacity: 0,
    duration: 0.8, stagger: 0.1, ease: 'power3.out',
    scrollTrigger: { trigger: '.arch-grid', start: 'top 82%' }
});

// Pipeline — nodes bounce in
gsap.from('.pipe-n, .pipe-a', {
    scale: 0.7, opacity: 0,
    duration: 0.5, stagger: 0.06, ease: 'back.out(1.7)',
    scrollTrigger: { trigger: '#pipeline', start: 'top 85%' }
});


/* ==========================================================
   CTA — smooth cascading reveal (single timeline)
   ========================================================== */
const ctaTl = gsap.timeline({
    scrollTrigger: { trigger: '.sec-cta', start: 'top 82%' }
});
ctaTl.from('.sec-cta h2', { y: 60, opacity: 0, duration: 1.4, ease: 'power3.out' })
     .from('.cta-sub', { y: 30, opacity: 0, duration: 1, ease: 'power3.out' }, '-=1.0')
     .from('.cta-btns', { y: 30, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.7');

/* ==========================================================
   GLOBAL — SECTION TAGS & TITLES FADE
   ========================================================== */
qa('.sec-head .tag, .priv-left .tag').forEach(tag => {
    gsap.from(tag, {
        y: 20, opacity: 0, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: tag, start: 'top 88%' }
    });
});

qa('.sec-head h2, .priv-left h2').forEach(h => {
    gsap.from(h, {
        y: 50, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: h, start: 'top 88%' }
    });
});

/* ==========================================================
   PARALLAX — SUBTLE FLOAT ON SECTIONS
   ========================================================== */
if (!isMobile()) {
    qa('.sec-head').forEach(el => {
        gsap.to(el, {
            y: -20,
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 2 }
        });
    });
}

/* ==========================================================
   APPLY INITIAL LANGUAGE
   ========================================================== */
applyLang(currentLang);

})();
