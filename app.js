/* ============================================================ */
/* DATA — ULAB Benchmark · 1,387 questions · March 2026         */
/* ============================================================ */
const ULAB_RESULTS = [
  { id: 'kimi-k2p5', name: 'Kimi K2.5', type: 'opensource',  overall: 71.7, partial: false, answered: 1387, total: 1387, RC: 97.4, GC: 79.5, WS: 79.1, CL: 65.3, RI: 91.9, ED: 53.3 },
  { id: 'mistral-large', name: 'Mistral Large 2512', type: 'commercial',  overall: 70.7, partial: false, answered: 1387, total: 1387, RC: 96.7, GC: 75.4, WS: 79.6, CL: 64.3, RI: 84.9, ED: 57.9 },
  { id: 'llama4-maverick', name: 'Llama 4 Maverick', type: 'opensource',  overall: 69.6, partial: false, answered: 1387, total: 1387, RC: 96.7, GC: 70.8, WS: 74.9, CL: 59.2, RI: 91.9, ED: 51.8 },
  { id: 'cogito-671b', name: 'Cogito 671B', type: 'opensource',  overall: 69.6, partial: false, answered: 1387, total: 1387, RC: 97.4, GC: 78.5, WS: 80.1, CL: 62.2, RI: 82.2, ED: 56.9 },
  { id: 'glm-5', name: 'GLM-5', type: 'opensource',  overall: 69.3, partial: false, answered: 1387, total: 1387, RC: 98.0, GC: 75.9, WS: 80.1, CL: 55.1, RI: 91.9, ED: 49.7 },
  { id: 'llama4-scout', name: 'Llama 4 Scout', type: 'opensource',  overall: 68.8, partial: false, answered: 1387, total: 1387, RC: 98.0, GC: 70.8, WS: 74.9, CL: 64.3, RI: 82.2, ED: 59.5 },
  { id: 'kimi-k2-0905', name: 'Kimi K2 (0905)', type: 'opensource',  overall: 68.4, partial: false, answered: 1387, total: 1387, RC: 98.7, GC: 74.4, WS: 80.6, CL: 64.3, RI: 84.3, ED: 55.9 },
  { id: 'kimi-k2', name: 'Kimi K2', type: 'opensource',  overall: 68.2, partial: false, answered: 1387, total: 1387, RC: 98.0, GC: 74.4, WS: 77.0, CL: 56.1, RI: 84.3, ED: 62.6 },
  { id: 'deepseek-v3.1', name: 'DeepSeek V3.1', type: 'opensource',  overall: 68.0, partial: false, answered: 1387, total: 1387, RC: 96.0, GC: 77.4, WS: 77.5, CL: 58.2, RI: 84.9, ED: 58.5 },
  { id: 'llama3.3-70b', name: 'Llama 3.3 70B', type: 'opensource',  overall: 67.7, partial: false, answered: 1387, total: 1387, RC: 97.4, GC: 75.4, WS: 70.7, CL: 61.2, RI: 89.7, ED: 67.2 },
  { id: 'gpt-oss-120b', name: 'GPT-OSS 120B', type: 'opensource',  overall: 67.6, partial: false, answered: 1387, total: 1387, RC: 96.7, GC: 69.7, WS: 75.4, CL: 60.2, RI: 89.2, ED: 54.4 },
  { id: 'gemma-3-27b', name: 'Gemma 3 27B', type: 'opensource',  overall: 67.2, partial: false, answered: 1387, total: 1387, RC: 97.4, GC: 74.4, WS: 75.4, CL: 56.1, RI: 90.8, ED: 56.9 },
  { id: 'qwen3-32b', name: 'Qwen3 32B', type: 'opensource',  overall: 65.4, partial: false, answered: 1387, total: 1387, RC: 97.4, GC: 81.5, WS: 80.1, CL: 56.1, RI: 88.1, ED: 42.6 },
  { id: 'ministral-14b', name: 'Ministral 14B', type: 'opensource',  overall: 64.7, partial: false, answered: 1387, total: 1387, RC: 98.0, GC: 70.3, WS: 73.3, CL: 63.3, RI: 84.3, ED: 57.9 },
  { id: 'llama3.1-8b', name: 'Llama 3.1 8B', type: 'opensource',  overall: 61.4, partial: false, answered: 1387, total: 1387, RC: 94.7, GC: 65.6, WS: 69.6, CL: 44.9, RI: 80.5, ED: 56.9 },
];

/* ============================================================ */
/* PURE UTILITIES                                                */
/* ============================================================ */

/** Bar color based on score tier. */
function getBarColor(score) {
  if (score >= 75) return '#1D4ED8';
  if (score >= 65) return '#3B82F6';
  if (score >= 55) return '#93C5FD';
  return '#BFDBFE';
}

/** Heatmap cell color and text contrast based on score. */
function getHeatmapStyle(score) {
  if (score >= 75) return { bg: '#1E40AF', text: '#FFFFFF' };
  if (score >= 70) return { bg: '#3B82F6', text: '#FFFFFF' };
  if (score >= 65) return { bg: '#93C5FD', text: '#1E3A8A' };
  if (score >= 55) return { bg: '#DBEAFE', text: '#1E40AF' };
  return { bg: '#F3F4F6', text: '#6B7280' };
}

/** Format number as "XX.X%". */
function fmt(n) {
  return n.toFixed(1) + '%';
}

/** Return models sorted descending by overall score. */
function getSortedResults() {
  return [...ULAB_RESULTS].sort((a, b) => b.overall - a.overall);
}

/* ============================================================ */
/* HEADER — scroll shadow + nav scroll-spy                       */
/* ============================================================ */
function initHeader() {
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  const sections = Array.from(navLinks)
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((l) => l.classList.remove('nav-link--active'));
          const active = document.querySelector(
            `.nav-link[href="#${entry.target.id}"]`
          );
          if (active) active.classList.add('nav-link--active');
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach((s) => spyObserver.observe(s));
}

/* ============================================================ */
/* HERO COUNTERS                                                  */
/* Animates elements with data-target attribute.                 */
/* Elements with stat-number--static class are skipped.          */
/* ============================================================ */
function initCounters() {
  const DURATION = 1500;
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  document.querySelectorAll('.stat-number[data-target]').forEach((el) => {
    // Skip if the element also carries the static modifier
    if (el.classList.contains('stat-number--static')) return;

    const target = parseInt(el.dataset.target, 10);
    const start = performance.now();

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / DURATION, 1);
      el.textContent = Math.round(easeOut(progress) * target).toLocaleString('ru-RU');
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  });
}

/* ============================================================ */
/* SCROLL REVEAL                                                  */
/* ============================================================ */
function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

/* ============================================================ */
/* ULAB CHART — horizontal bar, sorted by overall accuracy       */
/* ============================================================ */
let ulabChart = null;

function buildChartData() {
  const sorted = getSortedResults();
  const medals = ['', '', ''];

  return {
    labels: sorted.map((m, i) =>
      (i < 3 ? medals[i] + ' ' : '') + m.name + (m.partial ? ' *' : '')
    ),
    values: sorted.map((m) => m.overall),
    colors: sorted.map((m) => getBarColor(m.overall)),
    sorted,
  };
}

/**
 * Custom Chart.js plugin: draws a dashed vertical reference line
 * at the 65% threshold with a label above the chart area.
 */
const thresholdLinePlugin = {
  id: 'thresholdLine',
  afterDraw(chart) {
    const { ctx: c, chartArea, scales } = chart;
    const x = scales.x.getPixelForValue(65);
    if (x < chartArea.left || x > chartArea.right) return;

    c.save();
    c.setLineDash([6, 4]);
    c.strokeStyle = 'rgba(107, 114, 128, 0.45)';
    c.lineWidth = 1.5;
    c.beginPath();
    c.moveTo(x, chartArea.top);
    c.lineTo(x, chartArea.bottom);
    c.stroke();
    c.setLineDash([]);
    c.fillStyle = 'rgba(107, 114, 128, 0.75)';
    c.font = '500 11px Inter, -apple-system, sans-serif';
    c.textAlign = 'center';
    c.fillText('Порог приемлемости', x, chartArea.top - 8);
    c.restore();
  },
};

function initUlabChart() {
  const canvas = document.getElementById('ulabChart');
  if (!canvas) return;

  const container = canvas.parentElement;
  const height = ULAB_RESULTS.length * 40 + 64;
  container.style.height = height + 'px';

  const { labels, values, colors, sorted } = buildChartData();

  ulabChart = new Chart(canvas.getContext('2d'), {
    type: 'bar',
    plugins: [thresholdLinePlugin],
    data: {
      labels,
      datasets: [{
        data: values,
        backgroundColor: colors,
        borderRadius: 6,
        borderSkipped: false,
        barThickness: 22,
      }],
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 700, easing: 'easeOutQuart' },
      layout: { padding: { top: 24, right: 20, bottom: 4, left: 0 } },
      scales: {
        x: {
          min: 0,
          max: 100,
          grid: { color: 'rgba(0,0,0,0.04)', drawTicks: false },
          border: { display: false },
          ticks: {
            font: { family: 'Inter', size: 11, weight: '500' },
            color: '#9CA3AF',
            callback: (v) => v + '%',
            maxTicksLimit: 8,
          },
        },
        y: {
          grid: { display: false },
          border: { display: false },
          ticks: {
            font: { family: 'Inter', size: 13, weight: '500' },
            color: '#374151',
            padding: 8,
          },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#0F172A',
          titleFont: { family: 'Inter', size: 13, weight: '600' },
          bodyFont: { family: 'Inter', size: 12 },
          padding: 12,
          cornerRadius: 8,
          callbacks: {
            label(ctx) {
              const model = sorted[ctx.dataIndex];
              const lines = [' Точность: ' + fmt(ctx.parsed.x)];
              if (model.partial) {
                lines.push(
                  ' * Частичные данные: ' +
                  model.answered.toLocaleString('ru-RU') + ' / ' +
                  model.total.toLocaleString('ru-RU') + ' вопросов'
                );
              } else {
                lines.push(' Охват: ' + model.answered.toLocaleString('ru-RU') + ' / ' + model.total.toLocaleString('ru-RU'));
              }
              return lines;
            },
          },
        },
      },
    },
  });
}

/* ============================================================ */
/* RANKING TABLE                                                  */
/* ============================================================ */
function renderRankingTable() {
  const tbody = document.getElementById('rankingTableBody');
  if (!tbody) return;

  const medals = ['', '', ''];
  const rankClasses = ['gold', 'silver', 'bronze'];

  getSortedResults().forEach((m, i) => {
    const rank = i + 1;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <span class="rank-num${rank <= 3 ? ' ' + rankClasses[rank - 1] : ''}">
          ${rank}
        </span>
      </td>
      <td>
        <div class="model-name-cell">
          <div class="model-name">
            ${rank <= 3 ? medals[rank - 1] + ' ' : ''}${m.name}
            <span class="model-type-badge ${m.type === 'commercial' ? 'badge--commercial' : 'badge--opensource'}">
              ${m.type === 'commercial' ? 'Commercial' : 'Open Source'}
            </span>
          </div>
          ${m.partial ? '<span class="partial-badge">* Частичные данные</span>' : ''}
        </div>
      </td>
      <td class="score-total">${fmt(m.overall)}</td>
      <td class="coverage-cell">${m.answered.toLocaleString('ru-RU')} / ${m.total.toLocaleString('ru-RU')}</td>
    `;
    tbody.appendChild(tr);
  });
}

/* ============================================================ */
/* DETAILS TOGGLE                                                 */
/* ============================================================ */
function initDetailsToggle() {
  const btn = document.getElementById('toggleDetails');
  const panel = document.getElementById('detailsTable');
  if (!btn || !panel) return;

  let open = false;

  function setButtonState(isOpen) {
    const chevronPath = isOpen ? 'M4 10l4-4 4 4' : 'M4 6l4 4 4-4';
    const label = isOpen ? 'Скрыть таблицу' : 'Показать полную таблицу';
    btn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="${chevronPath}" stroke="currentColor" stroke-width="1.75"
          stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      ${label}
    `;
  }

  btn.addEventListener('click', () => {
    open = !open;
    panel.classList.toggle('open', open);
    setButtonState(open);
  });

  setButtonState(false);
}

/* ============================================================ */
/* HEATMAP — Top-10 complete models, 6 task types + overall      */
/* ============================================================ */
function renderHeatmap() {
  const table = document.getElementById('heatmapTable');
  if (!table) return;

  const TASKS = ['RC', 'GC', 'WS', 'CL', 'RI', 'ED'];
  const TASK_LABELS = {
    RC: 'Документы', GC: 'Грамматика', WS: 'Словарь',
    CL: 'Контекст', RI: 'Регистр', ED: 'Ошибки'
  };

  const complete = ULAB_RESULTS
    .filter(m => !m.partial)
    .sort((a, b) => b.overall - a.overall)
    .slice(0, 10);

  // thead
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  const modelTh = document.createElement('th');
  modelTh.className = 'hm-model-col';
  modelTh.textContent = 'Модель';
  headerRow.appendChild(modelTh);

  TASKS.forEach(task => {
    const th = document.createElement('th');
    th.innerHTML = `<span title="${TASK_LABELS[task]}">${task}</span>`;
    th.title = TASK_LABELS[task];
    headerRow.appendChild(th);
  });

  const overallTh = document.createElement('th');
  overallTh.textContent = 'Итого';
  headerRow.appendChild(overallTh);

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // tbody
  const tbody = document.createElement('tbody');
  complete.forEach(model => {
    const tr = document.createElement('tr');
    const nameTd = document.createElement('td');
    nameTd.className = 'hm-model-name';
    nameTd.innerHTML = `<span>${model.name}</span>`;
    tr.appendChild(nameTd);

    TASKS.forEach(task => {
      const score = model[task] || 0;
      const { bg, text } = getHeatmapStyle(score);
      const td = document.createElement('td');
      td.style.background = bg;
      td.style.color = text;
      td.title = `${model.name} — ${TASK_LABELS[task]}: ${fmt(score)}`;
      td.textContent = score.toFixed(0) + '%';
      tr.appendChild(td);
    });

    // Overall
    const { bg, text } = getHeatmapStyle(model.overall);
    const overallTd = document.createElement('td');
    overallTd.style.background = bg;
    overallTd.style.color = text;
    overallTd.style.fontWeight = '700';
    overallTd.textContent = fmt(model.overall);
    tr.appendChild(overallTd);

    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
}

/* ============================================================ */
/* LEADER CARDS — rendered into #leaderCards                     */
/* ============================================================ */
const LEADER_CARD_DATA = [
  {
    medal: '',
    category: 'Лидер по точности',
    name: 'Kimi K2.5',
    type: 'opensource',
    score: '70.2%',
    note: 'Лучший результат среди всех моделей с полными данными. Открытая лицензия, возможно развёртывание на инфраструктуре банка.',
  },
  {
    medal: '',
    category: 'Лучшая коммерческая модель',
    name: 'Mistral Large 2512',
    type: 'commercial',
    score: '69.3%',
    note: 'Лучший результат среди коммерческих моделей. Европейская разработка, соответствует GDPR.',
  },
  {
    medal: '',
    category: 'Масштаб открытого AI',
    name: 'Cogito 671B',
    type: 'opensource',
    score: '68.1%',
    note: '671 млрд параметров. Входит в топ-3 по точности, демонстрируя конкурентоспособность открытых решений.',
  },
];

function renderLeaderCards() {
  const container = document.getElementById('leaderCards');
  if (!container) return;

  LEADER_CARD_DATA.forEach((card) => {
    const isCommercial = card.type === 'commercial';
    const div = document.createElement('div');
    div.className = 'leader-card';
    div.innerHTML = `
      <div class="leader-medal">${card.medal}</div>
      <div class="leader-category">${card.category}</div>
      <div class="leader-model">
        ${card.name}
        <span class="model-type-badge ${isCommercial ? 'badge--commercial' : 'badge--opensource'}" style="font-size:10px;vertical-align:middle;margin-left:6px">
          ${isCommercial ? 'Commercial' : 'Open Source'}
        </span>
      </div>
      <div class="leader-score">${card.score}</div>
      <div class="leader-note">${card.note}</div>
    `;
    container.appendChild(div);
  });
}

/* ============================================================ */
/* DEPT GROUPS — task → department mapping                        */
/* ============================================================ */
const DEPT_GROUPS = [
  {
    task: 'RC', taskName: 'Понимание документов', score: '94–98%', leader: 'Kimi K2 (0905)',
    color: '#1D4ED8', bgColor: '#DBEAFE', borderColor: '#93C5FD',
    desc: 'Чтение, анализ и извлечение информации из кредитных досье, договоров, финансовой отчётности',
    why: 'RC — наиболее сильная компетенция у всех моделей. Топ-5 дают 96–98%. Любая из них подойдёт.',
    departments: ['Кредитование физлиц', 'Мониторинг кредитного портфеля', 'Одобрение кредитов', 'Бухгалтерия и финотчётность', 'Инвестиционный банкинг', 'Агропромышленный сектор'],
  },
  {
    task: 'GC', taskName: 'Составление документов', score: '64–80%', leader: 'Qwen3 32B',
    color: '#059669', bgColor: '#D1FAE5', borderColor: '#6EE7B7',
    desc: 'Грамматически корректное создание официальных писем, регламентов, стратегических документов',
    why: 'GC — ключевой дифференциатор: разброс 64–80%. Qwen3 32B на 16 п.п. лучше слабейшей модели.',
    departments: ['IT-департамент', 'Стратегическое развитие', 'Международная отчётность', 'Корпоративное управление', 'Управление проектами', 'Закупки и снабжение'],
  },
  {
    task: 'WS', taskName: 'Точность терминологии', score: '68–79%', leader: 'Kimi K2 (0905)',
    color: '#7C3AED', bgColor: '#EDE9FE', borderColor: '#C4B5FD',
    desc: 'Правильный выбор банковского и юридического термина из близких по значению вариантов',
    why: 'В юридических документах замена одного слова способна изменить смысл обязательства.',
    departments: ['Юридический департамент', 'Казначейство', 'Финансовые институты', 'Поддержка и сопровождение клиентов', 'Управление активами и пассивами'],
  },
  {
    task: 'RI', taskName: 'Коммуникации и регистр', score: '78–90%', leader: 'Kimi K2.5',
    color: '#D97706', bgColor: '#FEF3C7', borderColor: '#FCD34D',
    desc: 'Адаптация тона под канал: официальные письма, чат, колл-центр, внутренние сообщения',
    why: 'RI критично для клиентских коммуникаций. Модель должна различать регистры — иначе тон будет неуместным.',
    departments: ['Контакт-центр', 'HR и кадровое развитие', 'Розничный бизнес', 'Цифровой бизнес и каналы', 'Маркетинг и PR', 'Малый и микробизнес'],
  },
  {
    task: 'ED', taskName: 'Контроль и верификация', score: '41–65%', leader: 'Llama 3.3 70B',
    color: '#DC2626', bgColor: '#FEE2E2', borderColor: '#FCA5A5',
    desc: 'Обнаружение грамматических, орфографических и смысловых ошибок в документах',
    why: 'ED — наиболее слабый тип. Максимум 65%. Для аудита нужна дополнительная архитектурная компенсация.',
    departments: ['Комплаенс и надзор', 'Внутренний аудит', 'Защита информации', 'Итоговый контроль документов', 'Антикоррупционная служба'],
  },
  {
    task: 'CL', taskName: 'Контекстный анализ', score: '43–62%', leader: 'Kimi K2.5',
    color: '#0891B2', bgColor: '#CFFAFE', borderColor: '#67E8F9',
    desc: 'Понимание смысла сложных финансовых конструкций и длинных многоуровневых документов',
    why: 'CL измеряет глубину понимания. Слабые результаты: модели теряют нить в длинных документах.',
    departments: ['Казначейство и ликвидность', 'Финансовый менеджмент', 'Управление активами и пассивами (ALM)', 'Корпоративный центр', 'Средний и крупный бизнес'],
  },
];

function renderDeptGroups() {
  const container = document.getElementById('deptGroups');
  if (!container) return;

  DEPT_GROUPS.forEach((g) => {
    const card = document.createElement('div');
    card.className = 'dg-card reveal';
    card.style.setProperty('--dg-color', g.color);
    card.style.setProperty('--dg-bg', g.bgColor);
    card.style.setProperty('--dg-border', g.borderColor);

    const deptItems = g.departments.map(d =>
      `<span class="dg-dept-item">${d}</span>`
    ).join('');

    card.innerHTML = `
      <div class="dg-header">
        <div class="dg-task-badge">${g.task}</div>
        <div class="dg-task-name">${g.taskName}</div>
        <div class="dg-score">${g.score}</div>
      </div>
      <p class="dg-desc">${g.desc}</p>
      <div class="dg-why">
        <span class="dg-why-icon">💡</span>
        <span>${g.why}</span>
      </div>
      <div class="dg-leader">
        <span class="dg-leader-label">Лидер по задаче</span>
        <span class="dg-leader-name">${g.leader}</span>
      </div>
      <div class="dg-depts-label">Подходит для</div>
      <div class="dg-depts">${deptItems}</div>
    `;
    container.appendChild(card);
  });
}

/* ============================================================ */
/* IMPROVE STEPS — 5 approaches to boost Uzbek AI               */
/* ============================================================ */
const IMPROVE_STEPS = [
  {
    num: '01', emoji: '🗄️', title: 'RAG — База знаний',
    timeline: '2–4 недели', effort: 'Низкий', effortClass: 'effort--low',
    tasks: ['RC', 'WS', 'CL'], gain: '+15–25 п.п. по RC/WS',
    desc: 'Подключить векторную базу с узбекскими банковскими документами. При каждом запросе модель получает нужный контекст — без переобучения и дополнительных GPU.',
    tools: 'LlamaIndex · ChromaDB · multilingual-e5-large',
  },
  {
    num: '02', emoji: '🎯', title: 'Fine-tuning — Банковские данные',
    timeline: '6–8 недель', effort: 'Средний', effortClass: 'effort--medium',
    tasks: ['GC', 'WS', 'RI'], gain: '+8–20 п.п. по GC/WS',
    desc: 'Дообучить открытую модель методом LoRA/QLoRA на парах «вопрос–ответ» из банковских задач. Достаточно 10–50 тыс. размеченных примеров.',
    tools: 'Hugging Face PEFT · LoRA · Axolotl · A100',
  },
  {
    num: '03', emoji: '🔤', title: 'Токенизатор — Узбекский язык',
    timeline: '1–2 месяца', effort: 'Высокий', effortClass: 'effort--high',
    tasks: ['GC', 'CL', 'ED'], gain: '−40–60% стоимости токенов',
    desc: 'Большинство моделей разбивают узбекские слова на 3–6 токенов вместо 1–2. Расширение токенизатора снижает стоимость и улучшает морфологическое понимание.',
    tools: 'SentencePiece · Common Crawl uz · Wikipedia uz',
  },
  {
    num: '04', emoji: '📚', title: 'Continual Pre-training — Корпус',
    timeline: '3–6 месяцев', effort: 'Очень высокий', effortClass: 'effort--very-high',
    tasks: ['CL', 'ED', 'GC'], gain: '+10–30 п.п. по CL/ED',
    desc: 'Продолжить предобучение на большом корпусе узбекских текстов без разметки: 500 млн – 5 млрд токенов (новости, законы, банковские документы).',
    tools: 'DeepSpeed ZeRO-3 · CC-100 uz · Leipzig Corpora',
  },
  {
    num: '05', emoji: '🏦', title: 'Постоянный цикл с ULAB',
    timeline: 'Ежеквартально', effort: 'Процесс', effortClass: 'effort--process',
    tasks: ['RC', 'GC', 'WS', 'CL', 'RI', 'ED'], gain: 'Измеримый прогресс',
    desc: 'Запускать ULAB при каждом обновлении модели. Расширять датасет ошибками из реальной работы. Аннотированные банковские примеры — наиболее ценные обучающие данные.',
    tools: 'run_benchmark_ulab.py · Label Studio · MLflow',
  },
];

function renderImproveSection() {
  const container = document.getElementById('improveGrid');
  if (!container) return;

  IMPROVE_STEPS.forEach((s) => {
    const taskBadges = s.tasks.map(t =>
      `<span class="imp-task-badge">${t}</span>`
    ).join('');

    const div = document.createElement('div');
    div.className = 'imp-card reveal';
    div.innerHTML = `
      <div class="imp-header">
        <div class="imp-num">${s.num}</div>
        <div class="imp-emoji">${s.emoji}</div>
        <div class="imp-title">${s.title}</div>
      </div>
      <p class="imp-desc">${s.desc}</p>
      <div class="imp-meta">
        <div class="imp-meta-item">
          <span class="imp-meta-label">Срок</span>
          <span class="imp-meta-val">${s.timeline}</span>
        </div>
        <div class="imp-meta-item">
          <span class="imp-meta-label">Сложность</span>
          <span class="imp-meta-val imp-effort ${s.effortClass}">${s.effort}</span>
        </div>
        <div class="imp-meta-item">
          <span class="imp-meta-label">Эффект</span>
          <span class="imp-meta-val imp-gain">${s.gain}</span>
        </div>
      </div>
      <div class="imp-tasks">
        <span class="imp-tasks-label">Улучшает:</span>
        ${taskBadges}
      </div>
      <div class="imp-tools">${s.tools}</div>
    `;
    container.appendChild(div);
  });
}

/* ============================================================ */
/* INIT                                                           */
/* ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initCounters();
  initUlabChart();
  initDetailsToggle();
  renderRankingTable();
  renderHeatmap();
  renderLeaderCards();
  renderDeptGroups();
  renderImproveSection();
  initReveal(); // LAST — чтобы все динамически созданные .reveal элементы уже были в DOM
});
