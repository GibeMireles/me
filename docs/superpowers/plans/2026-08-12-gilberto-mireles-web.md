# Sitio de perfil profesional — Gilberto Mireles — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the static one-pager (`index.html` + `style.css` + `script.js`) defined in `docs/superpowers/specs/2026-08-12-gilberto-mireles-web-design.md`, one section at a time, so the user can review each section live before moving to the next.

**Architecture:** Single-page static HTML site, no build tools, no backend. `index.html` grows section-by-section (each task appends one `<section>`), `style.css` grows in lockstep with each section's rules, `script.js` is added last (smooth-scroll only).

**Tech Stack:** Plain HTML5, CSS3 (custom properties, flexbox, grid), vanilla JS. Google Fonts (Montserrat, Open Sans). No frameworks, no package manager.

## Global Constraints

- No backend, no contact form, no build tools — plain HTML/CSS/JS only (per spec "Alcance").
- No automated tests exist for this project (per spec "Verificación" — static site, no business logic). Every task's "test" step is a **manual browser verification checklist** instead of an automated test run.
- Color tokens (exact, from spec): `--bg:#FFFFFF; --bg-alt:#F8FAFC; --text:#1E293B; --heading:#0F172A; --accent:#14B8A6; --accent-dark:#0F9488;`
- Fonts (exact, from spec): Montserrat 600/700 for headings, Open Sans 400/600 for body — loaded via Google Fonts `<link>`, same pattern as `GibeMireles/NextGenStudio`.
- Contact email: `gilbertomireles@hotmail.com`. LinkedIn: `https://linkedin.com/in/gilberto-mireles`. WhatsApp: `https://wa.me/529991304016`.
- Breakpoints: 768px (grids → 1 column, header stacks) and 480px (typography/spacing shrink), matching NGS's breakpoints per spec.
- All section copy (headlines, service/project descriptions, stack items, education/certification entries) must match the spec verbatim — it is already final, approved content.
- Commit after every task using the repo at `C:\Users\gilberto.mireles\claude-context\projects\gilberto-mireles-web` (already `git init`'d, first commit `f6d842a` contains the spec and `assets/gilbertomireles_2.png`). Do not push to `github.com/GibeMireles/me` — that remote is not configured yet and must not be added without explicit user request.

---

### Task 1: Project scaffold — HTML boilerplate, CSS reset, design tokens, base utilities

**Files:**
- Create: `index.html`
- Create: `style.css`

**Interfaces:**
- Produces: CSS custom properties (`--bg`, `--bg-alt`, `--text`, `--heading`, `--muted`, `--accent`, `--accent-dark`, `--card-bg`, `--card-border`, `--radius`, `--shadow`, `--font-primary`, `--font-secondary`) and utility classes (`.container`, `.section`, `.section--alt`, `.section-title`, `.section-subtitle`, `.btn`, `.btn--primary`, `.btn--outline`, `.badge`) that every later task relies on.

- [ ] **Step 1: Write `index.html` boilerplate**

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gilberto Mireles | Consultor Técnico en CRM, IA &amp; Dashboards</title>
    <meta name="description" content="Consultor técnico especializado en implementación de CRM, automatización con IA y dashboards de datos para empresas en crecimiento.">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>



<script src="script.js"></script>
</body>
</html>
```

- [ ] **Step 2: Write `style.css` tokens, reset, and shared utilities**

```css
:root {
  --bg: #FFFFFF;
  --bg-alt: #F8FAFC;
  --text: #1E293B;
  --heading: #0F172A;
  --muted: #64748B;
  --accent: #14B8A6;
  --accent-dark: #0F9488;
  --card-bg: #FFFFFF;
  --card-border: #E2E8F0;
  --radius: 12px;
  --shadow: 0 10px 25px rgba(15, 23, 42, 0.06);

  --font-primary: 'Montserrat', sans-serif;
  --font-secondary: 'Open Sans', sans-serif;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-secondary);
  color: var(--text);
  background-color: var(--bg);
  line-height: 1.6;
}

.container {
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 24px;
}

h1, h2, h3, h4 {
  font-family: var(--font-primary);
  color: var(--heading);
  line-height: 1.25;
}

a {
  text-decoration: none;
  color: var(--accent);
}

img {
  max-width: 100%;
  display: block;
}

.section {
  padding: 96px 0;
}

.section--alt {
  background-color: var(--bg-alt);
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 16px;
}

.section-subtitle {
  font-family: var(--font-secondary);
  color: var(--muted);
  text-align: center;
  max-width: 640px;
  margin: 0 auto 48px auto;
  font-size: 1.05rem;
}

.btn {
  display: inline-block;
  padding: 14px 32px;
  border-radius: 50px;
  font-family: var(--font-secondary);
  font-weight: 600;
  font-size: 1rem;
  transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

.btn--primary {
  background-color: var(--accent);
  color: #FFFFFF;
  border: 2px solid var(--accent);
}

.btn--primary:hover {
  background-color: var(--accent-dark);
  border-color: var(--accent-dark);
  transform: translateY(-2px);
}

.btn--outline {
  background-color: transparent;
  color: var(--accent);
  border: 2px solid var(--accent);
}

.btn--outline:hover {
  background-color: var(--accent);
  color: #FFFFFF;
  transform: translateY(-2px);
}

.badge {
  display: inline-block;
  background-color: var(--bg-alt);
  border: 1px solid var(--card-border);
  color: var(--text);
  font-size: 0.85rem;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 50px;
}
```

- [ ] **Step 3: Verify in browser**

Open `index.html` directly in a browser. Confirm:
- Page loads with a blank white body, no console errors (check DevTools console — no 404s for `style.css` or the Google Fonts request).
- View source shows the `<script src="script.js">` tag (the file doesn't exist yet — that's expected, browsers won't error on a missing `<script src>` load in the console beyond a 404 network log, which is fine to ignore until Task 10).

- [ ] **Step 4: Commit**

```bash
git add index.html style.css
git commit -m "Add HTML scaffold and base design tokens/utilities"
```

---

### Task 2: Header & navigation

**Files:**
- Modify: `index.html` (insert as the first element inside `<body>`, before the closing `<script>` tag)
- Modify: `style.css` (append after Task 1's rules)

**Interfaces:**
- Consumes: `.container`, CSS tokens from Task 1.
- Produces: `.site-header`, `.brand`, `.brand__name`, `.brand__tagline`, `.nav` — and anchor targets (`#sobre-mi`, `#servicios`, `#proyectos`, `#stack`, `#formacion`, `#contacto`) that Tasks 4–9 must use as their `<section id="...">`.

- [ ] **Step 1: Add header markup to `index.html`**

Insert right after `<body>`:

```html
<header class="site-header">
    <div class="container site-header__inner">
        <a href="#inicio" class="brand">
            <span class="brand__name">Gilberto Mireles</span>
            <span class="brand__tagline">Consultor Técnico</span>
        </a>
        <nav class="nav">
            <a href="#sobre-mi">Sobre mí</a>
            <a href="#servicios">Servicios</a>
            <a href="#proyectos">Proyectos</a>
            <a href="#stack">Stack</a>
            <a href="#formacion">Formación</a>
            <a href="#contacto">Contacto</a>
        </nav>
    </div>
</header>

<div id="inicio"></div>
```

- [ ] **Step 2: Add header CSS**

```css
.site-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: var(--bg);
  border-bottom: 1px solid var(--card-border);
  padding: 16px 0;
}

.site-header__inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.brand__name {
  font-family: var(--font-primary);
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--heading);
}

.brand__tagline {
  font-family: var(--font-secondary);
  font-size: 0.8rem;
  color: var(--muted);
}

.nav {
  display: flex;
  gap: 28px;
  flex-wrap: wrap;
  justify-content: center;
}

.nav a {
  font-family: var(--font-secondary);
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--text);
  position: relative;
}

.nav a::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -4px;
  width: 0;
  height: 2px;
  background-color: var(--accent);
  transition: width 0.2s ease;
}

.nav a:hover {
  color: var(--accent);
}

.nav a:hover::after {
  width: 100%;
}

@media (max-width: 768px) {
  .site-header__inner {
    flex-direction: column;
    gap: 12px;
  }
  .nav {
    gap: 16px;
  }
}
```

- [ ] **Step 3: Verify in browser**

Confirm:
- Header shows "Gilberto Mireles" + "Consultor Técnico" on the left, 6 nav links on the right.
- Header stays pinned to the top when you scroll (there's nothing to scroll yet, but resizing the window should still show it sticking once later sections add height).
- Resize the browser to <768px width: nav wraps and centers below the brand.
- Clicking a nav link doesn't error (it will jump nowhere useful yet since target sections don't exist — that's expected until Tasks 4–9 land).

- [ ] **Step 4: Commit**

```bash
git add index.html style.css
git commit -m "Add sticky header and navigation"
```

---

### Task 3: Hero section

**Files:**
- Modify: `index.html` (insert immediately after `<div id="inicio"></div>`)
- Modify: `style.css` (append)

**Interfaces:**
- Consumes: `.btn`, `.btn--primary` from Task 1.
- Produces: `.hero`, `.hero__inner`, `.hero__eyebrow`, `.hero__value` classes (not reused elsewhere).

- [ ] **Step 1: Add hero markup**

```html
<section class="hero">
    <div class="container hero__inner">
        <p class="hero__eyebrow">Gilberto Mireles Jiménez</p>
        <h1>Consultor Técnico en CRM, Automatización con IA &amp; Dashboards de Datos</h1>
        <p class="hero__value">Convierto datos y procesos en sistemas que funcionan — CRMs a la medida, dashboards de negocio y automatizaciones con IA para empresas en crecimiento.</p>
        <a href="mailto:gilbertomireles@hotmail.com" class="btn btn--primary">Conectemos →</a>
    </div>
</section>
```

- [ ] **Step 2: Add hero CSS**

```css
.hero {
  background: linear-gradient(135deg, var(--heading) 0%, #1E293B 100%);
  padding: 140px 0 100px 0;
  text-align: center;
}

.hero__inner {
  max-width: 760px;
}

.hero__eyebrow {
  font-family: var(--font-secondary);
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
  font-size: 0.9rem;
  margin-bottom: 20px;
}

.hero h1 {
  color: #FFFFFF;
  font-size: 2.75rem;
  margin-bottom: 24px;
}

.hero__value {
  color: #CBD5E1;
  font-size: 1.15rem;
  margin-bottom: 36px;
}

@media (max-width: 768px) {
  .hero {
    padding: 120px 0 72px 0;
  }
  .hero h1 {
    font-size: 2rem;
  }
}
```

- [ ] **Step 3: Verify in browser**

Confirm:
- Hero shows a dark navy gradient background, white headline, teal eyebrow text above it, light gray value proposition paragraph, and a teal pill "Conectemos →" button.
- Clicking "Conectemos →" opens the default mail client addressed to `gilbertomireles@hotmail.com` (or shows a `mailto:` prompt).
- At <768px width, the headline shrinks and hero padding tightens.

- [ ] **Step 4: Commit**

```bash
git add index.html style.css
git commit -m "Add hero section"
```

---

### Task 4: Sobre mí section

**Files:**
- Modify: `index.html` (insert after the `.hero` section)
- Modify: `style.css` (append)

**Interfaces:**
- Consumes: `.section`, `.section-title` from Task 1; anchor id `sobre-mi` defined by Task 2's nav.
- Produces: `.about`, `.about__inner`, `.about__photo`, `.about__content`, `.section-title--left` (new modifier, reusable by later tasks if a left-aligned title is ever needed, but only used here for now).

- [ ] **Step 1: Add "Sobre mí" markup**

```html
<section id="sobre-mi" class="section about">
    <div class="container about__inner">
        <div class="about__photo">
            <img src="assets/gilbertomireles_2.png" alt="Gilberto Mireles">
        </div>
        <div class="about__content">
            <h2 class="section-title section-title--left">Sobre mí</h2>
            <p>Soy consultor técnico con más de 10 años de experiencia en tecnología, CRM y análisis de datos. Combino desarrollo (Python, APIs, automatizaciones con IA) con una visión de negocio formada en la práctica — desde startups hasta instituciones educativas y hoteles en Yucatán.</p>
            <p>Soy Licenciado en Administración de Tecnologías de Información y Maestro en Ingeniería de Operaciones Estratégicas (UADY). Esa combinación — tecnología + estrategia — me permite pasar de una idea a un sistema funcional y escalable sin perder de vista el impacto real en el negocio.</p>
        </div>
    </div>
</section>
```

- [ ] **Step 2: Add "Sobre mí" CSS**

```css
.about__inner {
  display: flex;
  align-items: center;
  gap: 64px;
}

.about__photo {
  flex: 0 0 260px;
  display: flex;
  justify-content: center;
}

.about__photo img {
  width: 240px;
  height: 240px;
  object-fit: cover;
  border-radius: 50%;
  border: 6px solid var(--bg-alt);
  box-shadow: var(--shadow);
}

.about__content {
  flex: 1;
}

.about__content p {
  margin-bottom: 16px;
  font-size: 1.05rem;
  color: var(--text);
}

.section-title--left {
  text-align: left;
  margin-bottom: 24px;
}

@media (max-width: 768px) {
  .about__inner {
    flex-direction: column;
    text-align: center;
  }
  .section-title--left {
    text-align: center;
  }
}
```

- [ ] **Step 3: Verify in browser**

Confirm:
- Circular profile photo on the left, bio text (2 paragraphs) on the right, vertically centered.
- Clicking "Sobre mí" in the nav scrolls smoothly to this section (this is the first section wired to a nav anchor — confirms Task 2's anchors work now that a target exists; scroll behavior comes from `html { scroll-behavior: smooth }` set in Task 1, `script.js` isn't needed for this).
- At <768px width, photo stacks above the text, both centered.

- [ ] **Step 4: Commit**

```bash
git add index.html style.css
git commit -m "Add Sobre mi section"
```

---

### Task 5: Servicios section

**Files:**
- Modify: `index.html` (insert after `.about` section)
- Modify: `style.css` (append)

**Interfaces:**
- Consumes: `.section`, `.section--alt`, `.section-title`, `.section-subtitle` from Task 1; anchor id `servicios`.
- Produces: `.services-grid`, `.service-card` (not reused elsewhere).

- [ ] **Step 1: Add Servicios markup**

```html
<section id="servicios" class="section section--alt">
    <div class="container">
        <h2 class="section-title">Servicios</h2>
        <p class="section-subtitle">Soluciones técnicas de punta a punta, del proceso comercial a la visualización de datos.</p>
        <div class="services-grid">
            <div class="service-card">
                <h3>Implementación de CRM</h3>
                <p>Diseño y configuración de Kommo CRM adaptado a tu proceso comercial: pipelines, automatizaciones, bots de WhatsApp y capacitación al equipo.</p>
            </div>
            <div class="service-card">
                <h3>Dashboards de datos</h3>
                <p>Desarrollo de tableros en Looker Studio conectados a tus fuentes reales — CRM, Meta Ads, PMS hotelero, Google Sheets — para tomar decisiones con información actualizada.</p>
            </div>
            <div class="service-card">
                <h3>Automatización con IA</h3>
                <p>Agentes de WhatsApp, flujos automáticos de atención y calificación de leads, integración de herramientas con IA (Claude, GPT) para reducir trabajo manual.</p>
            </div>
            <div class="service-card">
                <h3>Integración de sistemas</h3>
                <p>Conexión entre plataformas: CRM + sitio web, PMS + dashboard, Meta Ads + base de datos. Arquitecturas limpias con Python, Supabase y APIs.</p>
            </div>
        </div>
    </div>
</section>
```

- [ ] **Step 2: Add Servicios CSS**

```css
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 28px;
}

.service-card {
  background-color: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: var(--radius);
  padding: 32px 28px;
  box-shadow: var(--shadow);
  transition: transform 0.2s ease;
}

.service-card:hover {
  transform: translateY(-6px);
}

.service-card h3 {
  font-size: 1.15rem;
  color: var(--accent-dark);
  margin-bottom: 12px;
}

.service-card p {
  color: var(--muted);
  font-size: 0.98rem;
}
```

- [ ] **Step 3: Verify in browser**

Confirm:
- Light gray section background (`--bg-alt`), 4 white cards in a grid (4 columns on wide screens, wrapping down as the window narrows).
- Hovering a card lifts it slightly.
- At <768px, cards stack to 1 column (grid's `auto-fit`/`minmax` handles this automatically — no extra media query needed, verify it actually collapses).

- [ ] **Step 4: Commit**

```bash
git add index.html style.css
git commit -m "Add Servicios section"
```

---

### Task 6: Proyectos section

**Files:**
- Modify: `index.html` (insert after `#servicios` section)
- Modify: `style.css` (append)

**Interfaces:**
- Consumes: `.section`, `.section-title`, `.section-subtitle`, `.badge` from Task 1; anchor id `proyectos`.
- Produces: `.projects-grid`, `.project-card`, `.project-card__stack` (not reused elsewhere).

- [ ] **Step 1: Add Proyectos markup**

```html
<section id="proyectos" class="section">
    <div class="container">
        <h2 class="section-title">Proyectos</h2>
        <p class="section-subtitle">Trabajo real con empresas de hospedaje, eventos, retail y educación.</p>
        <div class="projects-grid">
            <div class="project-card">
                <h3>Dashboard Hotelero — Rinconada &amp; Samas</h3>
                <p>Dashboards de analítica operativa para dos hoteles en Yucatán. Extracción de datos vía API de Cloudbeds (PMS), procesamiento con Python, modelado en Supabase y visualización en Looker Studio. Métricas: ocupación, ingresos, tendencias.</p>
                <div class="project-card__stack">
                    <span class="badge">Python</span>
                    <span class="badge">Cloudbeds API</span>
                    <span class="badge">Supabase</span>
                    <span class="badge">Looker Studio</span>
                </div>
            </div>
            <div class="project-card">
                <h3>Dashboard de Reportería Comercial — Trama</h3>
                <p>Sistema de reportería integral para empresa de venues de eventos con 4 sedes (Casa Faller, Kantoyná, Salina-Santa Lucía, Hunxectamán). Sincronización diaria automática desde Kommo CRM y Meta Ads hacia Supabase vía GitHub Actions. Dashboard con 8 hojas: resumen ejecutivo, funnel comercial, heatmap de conversión y ROAS.</p>
                <div class="project-card__stack">
                    <span class="badge">Python</span>
                    <span class="badge">Supabase</span>
                    <span class="badge">Looker Studio</span>
                    <span class="badge">Kommo CRM</span>
                    <span class="badge">Meta Ads API</span>
                    <span class="badge">GitHub Actions</span>
                </div>
            </div>
            <div class="project-card">
                <h3>Dashboard de Ventas — La Casa del Herrero</h3>
                <p>Tablero comercial con KPIs generales, análisis por sucursal y visualización geográfica del desempeño. Datos desde Kommo CRM conectados vía Google Sheets.</p>
                <div class="project-card__stack">
                    <span class="badge">Looker Studio</span>
                    <span class="badge">Kommo CRM</span>
                    <span class="badge">Google Sheets</span>
                    <span class="badge">Meta Ads</span>
                </div>
            </div>
            <div class="project-card">
                <h3>Automatización de CRM — Instituto Séneca</h3>
                <p>Rediseño del proceso de gestión de leads y seguimiento comercial en Kommo CRM. Automatizaciones internas y conexión con WordPress para capturar prospectos desde formularios directamente al pipeline.</p>
                <div class="project-card__stack">
                    <span class="badge">Kommo CRM</span>
                    <span class="badge">WordPress</span>
                    <span class="badge">Automatizaciones</span>
                </div>
            </div>
            <div class="project-card">
                <h3>CRM con Bot de WhatsApp — Sector Herrería</h3>
                <p>Configuración completa de Kommo CRM con pipelines de ventas, bot de WhatsApp para calificación automática de leads e integración vía API con Make para sincronización de datos.</p>
                <div class="project-card__stack">
                    <span class="badge">Kommo CRM</span>
                    <span class="badge">WhatsApp Business API</span>
                    <span class="badge">Make</span>
                    <span class="badge">Python</span>
                </div>
            </div>
        </div>
    </div>
</section>
```

- [ ] **Step 2: Add Proyectos CSS**

```css
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 28px;
}

.project-card {
  background-color: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: var(--radius);
  padding: 28px;
  box-shadow: var(--shadow);
  text-align: left;
}

.project-card h3 {
  font-size: 1.1rem;
  margin-bottom: 12px;
}

.project-card p {
  color: var(--muted);
  font-size: 0.95rem;
  margin-bottom: 18px;
}

.project-card__stack {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
```

- [ ] **Step 3: Verify in browser**

Confirm:
- 5 project cards render, each with title, description, and a row of stack badges at the bottom.
- Cards wrap responsively (2-3 per row on desktop, 1 per row on narrow screens).
- All 5 project names and stacks match the spec exactly (Rinconada & Samas, Trama, La Casa del Herrero, Instituto Séneca, Sector Herrería).

- [ ] **Step 4: Commit**

```bash
git add index.html style.css
git commit -m "Add Proyectos section"
```

---

### Task 7: Stack tecnológico section

**Files:**
- Modify: `index.html` (insert after `#proyectos` section)
- Modify: `style.css` (append)

**Interfaces:**
- Consumes: `.section`, `.section--alt`, `.section-title`, `.badge` from Task 1; anchor id `stack`.
- Produces: `.stack-categories`, `.stack-category`, `.stack-category__badges` (not reused elsewhere).

- [ ] **Step 1: Add Stack tecnológico markup**

```html
<section id="stack" class="section section--alt">
    <div class="container">
        <h2 class="section-title">Stack tecnológico</h2>
        <div class="stack-categories">
            <div class="stack-category">
                <h3>Datos &amp; Dashboards</h3>
                <div class="stack-category__badges">
                    <span class="badge">Python</span>
                    <span class="badge">Supabase (PostgreSQL)</span>
                    <span class="badge">Looker Studio</span>
                    <span class="badge">Power BI</span>
                    <span class="badge">R</span>
                    <span class="badge">GitHub Actions</span>
                </div>
            </div>
            <div class="stack-category">
                <h3>CRM &amp; Automatización</h3>
                <div class="stack-category__badges">
                    <span class="badge">Kommo CRM</span>
                    <span class="badge">Make</span>
                    <span class="badge">WhatsApp Business API</span>
                    <span class="badge">Active Campaign</span>
                    <span class="badge">HubSpot</span>
                    <span class="badge">Zapier</span>
                </div>
            </div>
            <div class="stack-category">
                <h3>IA &amp; Desarrollo</h3>
                <div class="stack-category__badges">
                    <span class="badge">Claude (Anthropic)</span>
                    <span class="badge">ChatGPT</span>
                    <span class="badge">Prompt Engineering</span>
                    <span class="badge">APIs REST</span>
                    <span class="badge">JSON</span>
                </div>
            </div>
            <div class="stack-category">
                <h3>Plataformas &amp; Herramientas</h3>
                <div class="stack-category__badges">
                    <span class="badge">WordPress</span>
                    <span class="badge">Elementor</span>
                    <span class="badge">Cloudbeds API</span>
                    <span class="badge">Meta Ads API</span>
                    <span class="badge">Google Sheets</span>
                    <span class="badge">Asana</span>
                </div>
            </div>
        </div>
    </div>
</section>
```

- [ ] **Step 2: Add Stack tecnológico CSS**

```css
.stack-categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 32px;
}

.stack-category h3 {
  font-size: 1.05rem;
  color: var(--accent-dark);
  margin-bottom: 16px;
}

.stack-category__badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
```

- [ ] **Step 3: Verify in browser**

Confirm:
- 4 category blocks (Datos & Dashboards, CRM & Automatización, IA & Desarrollo, Plataformas & Herramientas), each with its badge list matching the spec exactly.
- Badges wrap within each category without overflowing the container.

- [ ] **Step 4: Commit**

```bash
git add index.html style.css
git commit -m "Add Stack tecnologico section"
```

---

### Task 8: Formación y certificaciones section

**Files:**
- Modify: `index.html` (insert after `#stack` section)
- Modify: `style.css` (append)

**Interfaces:**
- Consumes: `.section`, `.section-title` from Task 1; anchor id `formacion`.
- Produces: `.education`, `.education-block`, `.education-list`, `.education-list__title`, `.education-list__meta` (not reused elsewhere).

- [ ] **Step 1: Add Formación y certificaciones markup**

```html
<section id="formacion" class="section">
    <div class="container">
        <h2 class="section-title">Formación y certificaciones</h2>
        <div class="education">
            <div class="education-block">
                <h3>Formación académica</h3>
                <ul class="education-list">
                    <li>
                        <span class="education-list__title">Maestría en Ingeniería de Operaciones Estratégicas</span>
                        <span class="education-list__meta">UADY · 2023–2025</span>
                    </li>
                    <li>
                        <span class="education-list__title">Especialidad en Docencia</span>
                        <span class="education-list__meta">UADY · 2021–2022</span>
                    </li>
                    <li>
                        <span class="education-list__title">Licenciatura en Administración de Tecnologías de Información</span>
                        <span class="education-list__meta">UADY · 2008–2013</span>
                    </li>
                </ul>
            </div>
            <div class="education-block">
                <h3>Certificaciones recientes</h3>
                <ul class="education-list">
                    <li>
                        <span class="education-list__title">Claude Code in Action</span>
                        <span class="education-list__meta">Anthropic · 2026</span>
                    </li>
                    <li>
                        <span class="education-list__title">Generative AI Leader</span>
                        <span class="education-list__meta">Google · 2026</span>
                    </li>
                    <li>
                        <span class="education-list__title">Enseñanza Innovadora con ChatGPT</span>
                        <span class="education-list__meta">Vanderbilt University · 2025</span>
                    </li>
                    <li>
                        <span class="education-list__title">Marketing en Redes Sociales</span>
                        <span class="education-list__meta">HubSpot Academy · 2025</span>
                    </li>
                    <li>
                        <span class="education-list__title">Lead Management with HubSpot</span>
                        <span class="education-list__meta">HubSpot Academy · 2024</span>
                    </li>
                    <li>
                        <span class="education-list__title">Tools for Data Science</span>
                        <span class="education-list__meta">IBM · 2024</span>
                    </li>
                    <li>
                        <span class="education-list__title">ChatGPT Advanced Data Analysis</span>
                        <span class="education-list__meta">Vanderbilt University · 2024</span>
                    </li>
                    <li>
                        <span class="education-list__title">Prompt Engineering for ChatGPT</span>
                        <span class="education-list__meta">Vanderbilt University · 2024</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</section>
```

- [ ] **Step 2: Add Formación y certificaciones CSS**

```css
.education {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 48px;
}

.education-block h3 {
  font-size: 1.15rem;
  margin-bottom: 20px;
}

.education-list {
  list-style: none;
}

.education-list li {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 14px 0;
  border-bottom: 1px solid var(--card-border);
}

.education-list li:last-child {
  border-bottom: none;
}

.education-list__title {
  font-weight: 600;
  color: var(--heading);
  font-size: 0.98rem;
}

.education-list__meta {
  color: var(--muted);
  font-size: 0.88rem;
}
```

- [ ] **Step 3: Verify in browser**

Confirm:
- Two columns side by side on desktop: "Formación académica" (3 items) and "Certificaciones recientes" (8 items), each item showing a title line and a muted institution/year line below it.
- At <768px (`auto-fit`/`minmax(320px,...)` triggers this on its own — verify it actually stacks), the two blocks stack vertically.
- All entries and years match the spec exactly.

- [ ] **Step 4: Commit**

```bash
git add index.html style.css
git commit -m "Add Formacion y certificaciones section"
```

---

### Task 9: Contacto, footer, and WhatsApp floating button

**Files:**
- Modify: `index.html` (insert after `#formacion` section, and add the floating WhatsApp link as the last element before `<script src="script.js">`)
- Modify: `style.css` (append)

**Interfaces:**
- Consumes: `.section`, `.section--alt`, `.section-title`, `.section-subtitle`, `.btn`, `.btn--primary`, `.btn--outline` from Task 1.
- Produces: `.contact__inner`, `.contact__links`, `.contact__location`, `.site-footer`, `.whatsapp-float` (not reused elsewhere).

- [ ] **Step 1: Add Contacto, footer, and WhatsApp markup**

```html
<section id="contacto" class="section section--alt">
    <div class="container contact__inner">
        <h2 class="section-title">Contacto</h2>
        <p class="section-subtitle">¿Tienes un proyecto de CRM, automatización o dashboards en mente? Hablemos.</p>
        <div class="contact__links">
            <a href="mailto:gilbertomireles@hotmail.com" class="btn btn--primary">Conectemos →</a>
            <a href="https://linkedin.com/in/gilberto-mireles" target="_blank" rel="noopener" class="btn btn--outline">LinkedIn</a>
        </div>
        <p class="contact__location">Mérida, Yucatán, México</p>
    </div>
</section>

<footer class="site-footer">
    <div class="container">
        <p>&copy; 2026 Gilberto Mireles Jiménez. Todos los derechos reservados.</p>
        <a href="https://linkedin.com/in/gilberto-mireles" target="_blank" rel="noopener">linkedin.com/in/gilberto-mireles</a>
    </div>
</footer>

<a href="https://wa.me/529991304016?text=Hola%20Gilberto%2C%20me%20gustar%C3%ADa%20platicar%20sobre%20un%20proyecto%20de%20CRM%2Fautomatizaci%C3%B3n%2Fdashboards"
   class="whatsapp-float" target="_blank" rel="noopener" aria-label="Contactar por WhatsApp">
    <svg viewBox="0 0 32 32" width="28" height="28" fill="#FFFFFF" aria-hidden="true">
        <path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.386.7 4.605 1.908 6.47L4 29l7.72-1.858A11.94 11.94 0 0 0 16.001 27C22.629 27 28 21.627 28 15S22.629 3 16.001 3zm0 21.75c-1.98 0-3.833-.55-5.417-1.505l-.389-.23-4.583 1.103 1.126-4.464-.253-.4A9.71 9.71 0 0 1 6.25 15c0-5.385 4.366-9.75 9.751-9.75 5.384 0 9.75 4.365 9.75 9.75s-4.366 9.75-9.75 9.75zm5.345-7.297c-.293-.147-1.734-.856-2.003-.954-.268-.098-.463-.147-.658.147-.195.293-.756.954-.927 1.15-.171.196-.342.22-.635.073-.293-.147-1.235-.455-2.353-1.452-.87-.776-1.457-1.735-1.628-2.028-.171-.293-.018-.451.129-.598.132-.132.293-.342.44-.513.147-.171.196-.293.293-.489.098-.196.049-.367-.024-.514-.073-.147-.658-1.586-.902-2.172-.238-.57-.48-.493-.658-.502l-.561-.01c-.196 0-.514.073-.783.367-.269.293-1.026 1.003-1.026 2.445s1.051 2.837 1.197 3.033c.147.196 2.069 3.16 5.014 4.432.7.302 1.246.483 1.672.618.703.224 1.343.192 1.849.117.564-.084 1.734-.709 1.979-1.393.244-.685.244-1.271.171-1.393-.073-.122-.268-.196-.561-.343z"/>
    </svg>
</a>
```

- [ ] **Step 2: Add Contacto, footer, and WhatsApp CSS**

```css
.contact__inner {
  text-align: center;
}

.contact__links {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 24px;
}

.contact__location {
  color: var(--muted);
  font-size: 0.95rem;
}

.site-footer {
  background-color: var(--heading);
  color: #CBD5E1;
  text-align: center;
  padding: 32px 0;
  font-size: 0.9rem;
}

.site-footer a {
  color: #94A3B8;
  margin-left: 8px;
}

.site-footer a:hover {
  color: var(--accent);
}

.whatsapp-float {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #25D366;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  z-index: 1000;
  transition: transform 0.2s ease;
}

.whatsapp-float:hover {
  transform: scale(1.08);
}
```

- [ ] **Step 3: Verify in browser**

Confirm:
- Contacto section shows "Conectemos →" (mailto) and "LinkedIn" (opens in a new tab) buttons side by side, plus "Mérida, Yucatán, México" below them.
- Dark footer bar below with copyright text and a LinkedIn link.
- Green circular WhatsApp button fixed at the bottom-right corner, visible while scrolling through every section.
- Clicking the WhatsApp button opens `wa.me/529991304016` with the pre-filled message in a new tab.

- [ ] **Step 4: Commit**

```bash
git add index.html style.css
git commit -m "Add Contacto section, footer, and WhatsApp floating button"
```

---

### Task 10: Smooth-scroll script and final responsive pass

**Files:**
- Create: `script.js`
- Modify: `style.css` (append small-screen tweaks)

**Interfaces:**
- Consumes: all anchor links (`.nav a[href^="#"]`) and section ids produced by Tasks 2–9.
- Produces: nothing new consumed by other tasks — this is the last task.

- [ ] **Step 1: Write `script.js`**

```js
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
```

- [ ] **Step 2: Add final small-screen CSS tweaks**

```css
@media (max-width: 480px) {
  .section {
    padding: 64px 0;
  }
  .section-title {
    font-size: 1.6rem;
  }
  .hero h1 {
    font-size: 1.75rem;
  }
  .btn {
    padding: 12px 24px;
    font-size: 0.95rem;
  }
}
```

- [ ] **Step 3: Full-site manual verification**

Open `index.html` in a browser and walk through the entire page:
- Click every nav link (Sobre mí, Servicios, Proyectos, Stack, Formación, Contacto) and confirm each one smooth-scrolls to the right section.
- Scroll top to bottom once, confirming section order matches the spec: Hero → Sobre mí → Servicios → Proyectos → Stack tecnológico → Formación y certificaciones → Contacto → Footer.
- Resize the window to ~375px wide (mobile) and re-check every section: header stacks, hero type shrinks, all grids collapse to 1 column, about-section stacks photo-then-text, WhatsApp button stays visible and doesn't overlap content.
- Click the hero and contact "Conectemos →" buttons — both should trigger a `mailto:gilbertomireles@hotmail.com` action.
- Click the WhatsApp floating button and the footer/contact LinkedIn links — both should open in a new tab to the correct URLs.
- Open DevTools console and confirm there are no JS errors and no 404s (fonts, `style.css`, `script.js`, `assets/gilbertomireles_2.png` all load).

- [ ] **Step 4: Commit**

```bash
git add script.js style.css
git commit -m "Add smooth-scroll script and final responsive polish"
```

---

## Self-Review Notes

- **Spec coverage:** All 7 spec sections (Hero, Sobre mí, Servicios, Proyectos, Stack tecnológico, Formación y certificaciones, Contacto) map 1:1 to Tasks 3–9. Header/nav (Task 2), scaffold/tokens (Task 1), and script.js/responsive polish (Task 10) cover the remaining spec requirements (typography, palette, WhatsApp float, smooth scroll, responsive breakpoints). Footer is covered inside Task 9 alongside Contacto since they're adjacent, small, and share the review checkpoint.
- **Placeholder scan:** No TBD/TODO markers; every step contains literal HTML/CSS/JS to write and a concrete verification checklist (no automated test runner exists for this static site, per spec, so "run tests" steps are replaced with browser checklists throughout).
- **Type/class consistency:** Verified class names are introduced once and reused consistently — e.g., `.badge` (Task 1) is reused unchanged by Tasks 6 and 7; `.section`, `.section--alt`, `.section-title`, `.section-subtitle`, `.btn`/`.btn--primary`/`.btn--outline` (Task 1) are reused unchanged by Tasks 3, 5, 6, 7, 8, 9; anchor ids introduced in Task 2's nav (`sobre-mi`, `servicios`, `proyectos`, `stack`, `formacion`, `contacto`) match the `id` attributes used on each section in Tasks 4–9 exactly.
