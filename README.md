# Gilberto Mireles — Sitio de perfil profesional

Sitio de una sola página (one-pager) para Gilberto Mireles, consultor en TI
especializado en implementación de CRM, automatización con IA y dashboards
de datos. Inspirado en el diseño de `GibeMireles/NextGenStudio`
(Montserrat + Open Sans, header sticky, scroll suave, botón flotante de
WhatsApp), con una paleta propia más sobria.

**Repo:** https://github.com/GibeMireles/me

## Stack

Sitio 100% estático — sin frameworks, sin build tools, sin backend.

- `index.html` — todo el markup, sección por sección
- `style.css` — todos los estilos (variables CSS al inicio del archivo)
- `script.js` — scroll suave, carruseles, indicador de sección activa en el nav
- `assets/` — foto de perfil y logos de clientes (ya optimizados/recortados)

## Cómo correrlo localmente

No requiere instalación. Basta con abrir `index.html` directamente en el
navegador, o levantar un servidor simple para probar cosas como el
`IntersectionObserver` del nav sin problemas de `file://`:

```bash
python -m http.server 8000
# luego abrir http://localhost:8000/index.html
```

## Estructura de la página

1. **Hero** — nombre, título, frase de valor, CTA "Conectemos"
2. **Sobre mí** (`#sobre-mi`) — foto + bio
3. **Servicios** (`#servicios`) — carrusel horizontal con flechas, 4 tarjetas con ícono
4. **Proyectos** (`#proyectos`) — carrusel paginado (puntos + flechas, sin auto-scroll),
   tarjetas con captura real del dashboard/entregable arriba, logo del cliente
   superpuesto, categoría, título, descripción truncada a 2 líneas con
   "Ver más →", stack con badges de color, y un banner de CTA
   ("¿Tienes un proyecto en mente?") al final de la sección
5. **Stack tecnológico** (`#stack`) — 4 tarjetas por categoría con ícono
6. **Formación y certificaciones** (`#formacion`) — línea de tiempo (formación académica) + cuadrícula de chips (certificaciones)
7. **Contacto** (`#contacto`) — email, LinkedIn, ubicación
8. Botón flotante de WhatsApp (fijo, todas las secciones)
9. Selector de idioma ES/EN (botón en el header, ver "Sistema de traducción" abajo)

## Sistema de diseño

Variables definidas en `style.css` (`:root`):

| Variable | Valor | Uso |
|---|---|---|
| `--bg` | `#FFFFFF` | Fondo base |
| `--bg-alt` | `#F8FAFC` | Fondo de secciones alternas (gris) |
| `--bg-tint` | `#EAF7F5` | Fondo con tinte teal (usado en Formación) |
| `--text` | `#1E293B` | Texto de cuerpo |
| `--heading` | `#0F172A` | Títulos |
| `--muted` | `#64748B` | Texto secundario (⚠️ ver nota de contraste abajo) |
| `--accent` / `--accent-dark` | `#14B8A6` / `#0F9488` | Botones, links, íconos, acentos |
| `--card-border` | `#E2E8F0` | Bordes de tarjetas |
| `--radius` | `12px` | Radio de esquinas de tarjetas |
| `--shadow` | `0 10px 25px rgba(15,23,42,.06)` | Sombra estándar de tarjetas |

**Tipografía:** Montserrat (600/700, títulos) + Open Sans (400/600, cuerpo),
vía Google Fonts.

**Breakpoints:** `768px` (layout de 1 a 2 columnas, nav apilado) y `480px`
(tipografía/espaciado más chico).

⚠️ **Nota de contraste:** `--muted` (#64748B) sobre `--bg` da ~4.75:1
(pasa WCAG AA por poco). Sobre `--bg-tint` cae a ~4.3:1 (no pasa). Por eso
`.education-list__meta` usa `#475569` en vez de `var(--muted)` — si agregas
texto `--muted` sobre un fondo `--bg-tint` en otro lado, usa ese mismo tono
más oscuro.

## Patrones reutilizables

- **Tarjeta con ícono circular** (Servicios, Stack, Formación): círculo de
  52px, fondo `rgba(20,184,166,.12)`, ícono SVG stroke-based (`stroke-width:
  1.8`, sin relleno) — nunca emojis.
- **Carrusel simple** (`.carousel` en Servicios, usado con
  `[data-carousel-track]` + `[data-carousel-prev/next]`): las flechas
  desplazan el contenedor un 80% de su ancho. Lógica genérica en `script.js`.
- **Carrusel paginado** (`.pcarousel` en Proyectos, con `.pcarousel__viewport`
  + `.pcarousel__track` + `[data-pcarousel-track/prev/next/dots]`): a
  diferencia del carrusel simple, calcula cuántas tarjetas caben por página
  y genera un punto de paginación por página (`.pcarousel__dot`). Sin
  auto-scroll — es 100% manual (flechas, puntos o swipe táctil).
- **Badges** (`.badge` genérico; `.pcard__badge` en Proyectos): píldora de
  texto simple con fondo `--bg-alt` y borde — sin ícono ni punto de color
  (se quitaron por no aportar información y ocupar espacio extra en móvil).

## Cómo agregar un proyecto nuevo a "Proyectos"

Cada proyecto es un `<article class="pcard">` dentro de
`.pcarousel__track` (sin duplicados — el carrusel paginado no hace loop
infinito, así que cada tarjeta va **una sola vez**). Al agregar uno:

1. **Logo del cliente** (`assets/<cliente>.png`): si te pasan un archivo,
   procésalo así antes de guardarlo:
   - Recortar el margen/espacio en blanco alrededor del logo (usar el color
     de la esquina como referencia de fondo)
   - Componerlo sobre un lienzo cuadrado relleno con **su propio color de
     fondo** (no blanco) — así se ve bien dentro del círculo sin espacios
     vacíos ni logos de texto cortados
   - Redimensionar a ~400-500px de lado máximo (los originales suelen venir
     en 4000×4000px / varios MB; no hace falta esa resolución)
   - **Siempre haz un respaldo (`shutil.copy2`) antes de sobrescribir el
     archivo original y verifica que el resultado se guardó bien antes de
     borrar el respaldo** — ya perdimos un logo una vez por no hacer esto.
   - Si no hay logo disponible, usa `.project-card__icon-circle` (círculo
     con ícono SVG temático) en vez de dejarlo vacío o con iniciales — patrón
     usado antes de tener el logo real de Cisneros Gómez, por ejemplo.
2. **Captura de evidencia** (`assets/<cliente>_evidencia.png`): un
   screenshot real del dashboard/CRM/entregable — **no la inventes**, si no
   hay captura disponible pregunta antes de fabricar datos falsos para un
   cliente real. Va en `.pcard__media` con `object-fit: cover;
   object-position: center top` (deja pasar cualquier proporción/tamaño, se
   recorta mostrando la parte de arriba).
3. **HTML** — estructura de cada `.pcard`:
   ```html
   <article class="pcard">
     <div class="pcard__media">
       <img class="pcard__screenshot" loading="lazy" src="assets/cliente_evidencia.png" alt="...">
       <img class="pcard__logo" loading="lazy" src="assets/cliente.png" alt="Cliente">
       <!-- o .pcard__logo-group con 2+ <img class="pcard__logo"> si son varios clientes -->
     </div>
     <div class="pcard__body">
       <span class="pcard__eyebrow" data-en="...">Dashboard|CRM|Sitio Web|Consultoría</span>
       <h3 data-en="...">Título</h3>
       <p class="pcard__desc" data-en="...">Descripción</p>
       <button type="button" class="pcard__case" data-toggle-desc aria-expanded="false">Ver más →</button>
       <div class="pcard__stack">
         <span class="pcard__badge">Herramienta</span>
       </div>
     </div>
   </article>
   ```
   El texto inicial del botón `Ver más →` no importa mucho — `script.js` lo
   sobreescribe según idioma/estado al cargar.
4. Después de agregar/quitar tarjetas, la paginación por puntos se recalcula
   sola en el próximo `resize`/carga — no hay que tocar nada más.
5. **Traducción:** agrega `data-en="..."` a `.pcard__eyebrow`, `h3` y
   `.pcard__desc` (ver "Sistema de traducción" abajo) para que el toggle
   ES/EN funcione en la tarjeta nueva.

## Sistema de traducción (ES/EN)

Botón `#lang-toggle` en el header. Un solo `index.html` — nada de páginas
duplicadas. `script.js` hace todo el trabajo con atributos `data-*`:

| Atributo | Qué traduce | Ejemplo |
|---|---|---|
| `data-en="..."` | `textContent` del elemento | `<h3 data-en="Services">Servicios</h3>` |
| `data-aria-en="..."` | atributo `aria-label` | botones de flecha, WhatsApp |
| `data-content-en="..."` | atributo `content` (meta tags) | meta description |
| `data-href-en="..."` | atributo `href` | el link de WhatsApp (mensaje distinto en inglés) |

La preferencia se guarda en `localStorage` (`site-lang`). Se aplica al
cargar la página (`applyLanguage(storedLang)` al final de `script.js`).

**No se traducen** (son nombres propios): instituciones, nombres de cursos/
certificaciones, nombres de clientes, y las herramientas del stack
tecnológico (Python, Kommo CRM, etc.).

## Notas de comportamiento

- El carrusel de Proyectos **no tiene auto-scroll** (se probó y competía con
  los toques/taps en botones como "Ver más" en móvil) — es 100% manual.
- Las flechas de los carruseles se ocultan en `≤768px` (el swipe táctil
  nativo ya cubre esa función).
- Todas las imágenes de logos y capturas de evidencia usan `loading="lazy"`.

## Despliegue

El repo no tiene GitHub Pages configurado todavía. Para publicarlo así, en
GitHub: **Settings → Pages → Deploy from branch → `main` / `/ (root)`**.
Al ser un sitio 100% estático sin build step, no requiere ningún workflow
adicional.

## Historial de diseño

La spec original y el plan de implementación (primera versión del sitio,
antes de las iteraciones de esta sesión) están en:

- `docs/superpowers/specs/2026-08-12-gilberto-mireles-web-design.md`
- `docs/superpowers/plans/2026-08-12-gilberto-mireles-web.md`

Sirven como referencia histórica de cómo arrancó el proyecto; el diseño
actual (colores, layout de Proyectos y Formación, carruseles) evolucionó
bastante desde ahí — este README refleja el estado actual.
