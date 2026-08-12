# Diseño: Sitio de perfil profesional — Gilberto Mireles

**Fecha:** 2026-08-12
**Repo destino (futuro remoto):** https://github.com/GibeMireles/me

## Propósito

Página web de una sola página (one-pager) que presenta a Gilberto Mireles como
consultor técnico independiente (CRM, automatización con IA, dashboards de
datos), inspirada en el diseño del repo `GibeMireles/NextGenStudio` (Montserrat
+ Open Sans, header sticky, scroll suave, botón flotante de WhatsApp), pero con
una paleta más sobria/corporativa en vez de la paleta azul/cian/lima de NGS.

## Alcance

Sitio 100% estático (HTML/CSS/JS plano, sin build tools ni backend). A
diferencia de NGS, no hay formulario de contacto con envío a Google Apps
Script — el contacto se resuelve con enlaces `mailto:` y WhatsApp directos.

## Estructura de archivos

```
gilberto-mireles-web/
├── index.html
├── style.css
├── script.js
└── assets/
    └── gilbertomireles_2.png   (copiada de NGS)
```

## Tipografía y paleta

Google Fonts: Montserrat (600/700, títulos) + Open Sans (400/600, cuerpo) —
igual que NGS.

Variables CSS (tema claro, acento teal, más sobrio que NGS):

```css
--bg: #FFFFFF;
--bg-alt: #F8FAFC;
--text: #1E293B;
--heading: #0F172A;
--accent: #14B8A6;
--accent-dark: #0F9488;   /* hover */
```

## Header / navegación

Sticky, wordmark "Gilberto Mireles" + tagline pequeño "Consultor Técnico" a la
izquierda. Nav a la derecha con anclas a cada sección: Sobre mí · Servicios ·
Proyectos · Stack · Formación · Contacto. En móvil el nav se envuelve
(flex-wrap, centrado) — sin menú hamburguesa, igual que el comportamiento de
NGS.

## Secciones y contenido

### 1. Hero
- Nombre: Gilberto Mireles Jiménez
- Título: "Consultor Técnico en CRM, Automatización con IA & Dashboards de Datos"
- Frase de valor: "Convierto datos y procesos en sistemas que funcionan — CRMs
  a la medida, dashboards de negocio y automatizaciones con IA para empresas
  en crecimiento."
- CTA: "Conectemos →" → `mailto:gilbertomireles@hotmail.com`
- Fondo: gradiente sobrio con la paleta (no hay foto ancha de fondo disponible,
  así que no se replica el hero con imagen de NGS).

### 2. Sobre mí
Layout de dos columnas (foto circular + texto), igual patrón que
`.about-section` de NGS.

- Foto: `assets/gilbertomireles_2.png`
- Bio (2 párrafos):
  1. "Soy consultor técnico con más de 10 años de experiencia en tecnología,
     CRM y análisis de datos. Combino desarrollo (Python, APIs,
     automatizaciones con IA) con una visión de negocio formada en la
     práctica — desde startups hasta instituciones educativas y hoteles en
     Yucatán."
  2. "Soy Licenciado en Administración de Tecnologías de Información y
     Maestro en Ingeniería de Operaciones Estratégicas (UADY). Esa
     combinación — tecnología + estrategia — me permite pasar de una idea a
     un sistema funcional y escalable sin perder de vista el impacto real en
     el negocio."

### 3. Servicios
Grid de 4 tarjetas (estilo `benefit-item` de NGS, sin iconos):

1. **Implementación de CRM** — Diseño y configuración de Kommo CRM adaptado a
   tu proceso comercial: pipelines, automatizaciones, bots de WhatsApp y
   capacitación al equipo.
2. **Dashboards de datos** — Desarrollo de tableros en Looker Studio
   conectados a tus fuentes reales — CRM, Meta Ads, PMS hotelero, Google
   Sheets — para tomar decisiones con información actualizada.
3. **Automatización con IA** — Agentes de WhatsApp, flujos automáticos de
   atención y calificación de leads, integración de herramientas con IA
   (Claude, GPT) para reducir trabajo manual.
4. **Integración de sistemas** — Conexión entre plataformas: CRM + sitio web,
   PMS + dashboard, Meta Ads + base de datos. Arquitecturas limpias con
   Python, Supabase y APIs.

### 4. Proyectos
Grid responsivo (auto-fit, ~340px min) de 5 tarjetas. Cada una: nombre,
descripción, stack como badges/pills.

1. **Dashboard Hotelero — Rinconada & Samas** — Dashboards de analítica
   operativa para dos hoteles en Yucatán. Extracción de datos vía API de
   Cloudbeds (PMS), procesamiento con Python, modelado en Supabase y
   visualización en Looker Studio. Métricas: ocupación, ingresos, tendencias.
   Stack: Python · Cloudbeds API · Supabase · Looker Studio
2. **Dashboard de Reportería Comercial — Trama** — Sistema de reportería
   integral para empresa de venues de eventos con 4 sedes (Casa Faller,
   Kantoyná, Salina-Santa Lucía, Hunxectamán). Sincronización diaria
   automática desde Kommo CRM y Meta Ads hacia Supabase vía GitHub Actions.
   Dashboard con 8 hojas: resumen ejecutivo, funnel comercial, heatmap de
   conversión y ROAS.
   Stack: Python · Supabase · Looker Studio · Kommo CRM · Meta Ads API ·
   GitHub Actions
3. **Dashboard de Ventas — La Casa del Herrero** — Tablero comercial con KPIs
   generales, análisis por sucursal y visualización geográfica del
   desempeño. Datos desde Kommo CRM conectados vía Google Sheets.
   Stack: Looker Studio · Kommo CRM · Google Sheets · Meta Ads
4. **Automatización de CRM — Instituto Séneca** — Rediseño del proceso de
   gestión de leads y seguimiento comercial en Kommo CRM. Automatizaciones
   internas y conexión con WordPress para capturar prospectos desde
   formularios directamente al pipeline.
   Stack: Kommo CRM · WordPress · Automatizaciones
5. **CRM con Bot de WhatsApp — Sector Herrería** — Configuración completa de
   Kommo CRM con pipelines de ventas, bot de WhatsApp para calificación
   automática de leads e integración vía API con Make para sincronización de
   datos.
   Stack: Kommo CRM · WhatsApp Business API · Make · Python

### 5. Stack tecnológico
4 categorías, cada una con badges de tecnologías:

- **Datos & Dashboards:** Python · Supabase (PostgreSQL) · Looker Studio ·
  Power BI · R · GitHub Actions
- **CRM & Automatización:** Kommo CRM · Make · WhatsApp Business API ·
  Active Campaign · HubSpot · Zapier
- **IA & Desarrollo:** Claude (Anthropic) · ChatGPT · Prompt Engineering ·
  APIs REST · JSON
- **Plataformas & Herramientas:** WordPress · Elementor · Cloudbeds API ·
  Meta Ads API · Google Sheets · Asana

### 6. Formación y certificaciones
Dos bloques, formato lista/timeline con título, institución y año.

**Formación académica**
- Maestría en Ingeniería de Operaciones Estratégicas — UADY (2023–2025)
- Especialidad en Docencia — UADY (2021–2022)
- Licenciatura en Administración de Tecnologías de Información — UADY
  (2008–2013)

**Certificaciones recientes**
- Claude Code in Action — Anthropic (2026)
- Generative AI Leader — Google (2026)
- Enseñanza Innovadora con ChatGPT — Vanderbilt University (2025)
- Marketing en Redes Sociales — HubSpot Academy (2025)
- Lead Management with HubSpot — HubSpot Academy (2024)
- Tools for Data Science — IBM (2024)
- ChatGPT Advanced Data Analysis — Vanderbilt University (2024)
- Prompt Engineering for ChatGPT — Vanderbilt University (2024)

### 7. Contacto
- Email: gilbertomireles@hotmail.com (`mailto:`)
- LinkedIn: linkedin.com/in/gilberto-mireles (botón estilo `btn-linkedin` de
  NGS)
- Ubicación: Mérida, Yucatán, México
- CTA repetido ("Conectemos →")

### Footer
Copyright + enlace a LinkedIn.

### Botón flotante de WhatsApp
Fijo, abajo-derecha. `https://wa.me/529991304016` con mensaje precargado
profesional (ej. "Hola Gilberto, me gustaría platicar sobre un proyecto de
CRM/automatización/dashboards").

## Interacción (`script.js`)

Solo scroll suave para los enlaces de ancla del nav (mismo patrón que
`script.js` de NGS). Sin lógica de formulario — no hay backend ni envío de
datos, por lo que no hay manejo de errores de red que replicar.

## Responsive

Mismos breakpoints que NGS (768px, 480px): grids de servicios/proyectos/stack
a 1 columna, `about-section` apila la foto arriba del texto, nav se envuelve
centrado, tamaños de fuente del hero se reducen.

## Verificación

Abrir `index.html` directamente en el navegador (o servidor local simple):

- Revisar visualmente cada sección con el contenido final.
- Redimensionar la ventana para confirmar los breakpoints responsive.
- Confirmar que el enlace `mailto:` y el botón de WhatsApp abren
  correctamente.

No aplica testing automatizado (sitio estático sin lógica de negocio).

## Fuera de alcance (por ahora)

- Formulario de contacto con backend.
- Menú hamburguesa en móvil.
- Push al repo remoto `GibeMireles/me` (se hará cuando el usuario lo pida
  explícitamente).
