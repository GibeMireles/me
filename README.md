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
4. **Proyectos** (`#proyectos`) — carrusel de ancho completo con auto-scroll (solo desktop) + flechas, logos de clientes en círculo
5. **Stack tecnológico** (`#stack`) — 4 tarjetas por categoría con ícono
6. **Formación y certificaciones** (`#formacion`) — línea de tiempo (formación académica) + cuadrícula de chips (certificaciones)
7. **Contacto** (`#contacto`) — email, LinkedIn, ubicación
8. Botón flotante de WhatsApp (fijo, todas las secciones)

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
- **Carrusel** (`.carousel` / `.projects-carousel` + `[data-carousel-track]`
  + `[data-carousel-prev/next]`): la lógica de flechas en `script.js` es
  genérica, funciona para cualquier contenedor con esos atributos.
- **Badges** (`.badge`): píldora con fondo `--bg-alt` y borde, usada para
  stack tecnológico y estrellas de proyectos.

## Cómo agregar un proyecto nuevo a "Proyectos"

El carrusel de Proyectos hace loop infinito duplicando todas las tarjetas
(el segundo set tiene `aria-hidden="true"`). Al agregar un proyecto:

1. **Logo del cliente:** si te pasan un archivo, procésalo así antes de
   guardarlo en `assets/`:
   - Recortar el margen/espacio en blanco alrededor del logo
     (usar el color de la esquina como referencia de fondo)
   - Componerlo sobre un lienzo cuadrado relleno con **su propio color de
     fondo** (no blanco) — así se ve bien dentro del círculo sin espacios
     vacíos ni logos de texto cortados
   - Redimensionar a ~400-500px de lado máximo (los originales suelen venir
     en 4000×4000px / varios MB; no hace falta esa resolución)
   - **Siempre haz un respaldo (`shutil.copy2`) antes de sobrescribir el
     archivo original y verifica que el resultado se guardó bien antes de
     borrar el respaldo** — ya perdimos un logo una vez por no hacer esto.
   - Si no hay logo disponible, usa un ícono SVG temático en
     `.project-card__icon-circle` en vez de dejarlo vacío o con iniciales.
2. **HTML:** agrega la tarjeta completa (logo + `<h3>` + `<p
   class="project-card__desc">` + botón "Leer más" + stack) **dos veces**:
   una vez en el set original y otra vez en el set `aria-hidden="true"` al
   final del carrusel. Si se te olvida la copia duplicada, el loop del
   carrusel se ve con un salto/corte.
3. Descripción larga: se trunca a 2 líneas automáticamente
   (`.project-card__desc` + botón `[data-toggle-desc]` en `script.js`), así
   que no hace falta acortarla a mano — pero tampoco conviene que sea
   excesivamente larga.

## Notas de comportamiento

- El auto-scroll del carrusel de Proyectos **se desactiva en pantallas
  ≤768px** (`script.js`) porque competía con los toques/taps en botones
  como "Leer más" — en móvil el usuario desliza manualmente.
- Las flechas de los carruseles se ocultan en `≤768px` por la misma razón
  (el swipe táctil nativo ya cubre esa función).
- El auto-scroll respeta `prefers-reduced-motion`.
- Todas las imágenes de logos usan `loading="lazy"`.

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
