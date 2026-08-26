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

**Cache-busting:** `index.html` referencia `style.css?v=YYYYMMDD` y
`script.js?v=YYYYMMDD`. Al no haber build step, algunos navegadores
(sobre todo móviles) cachean agresivamente estos archivos y no revisan
si cambiaron — un push puede verse bien en desktop y desactualizado en
celular. **Sube ese número de versión en `index.html` cada vez que
cambies `style.css` o `script.js`** para forzar que todos los
navegadores traigan la versión nueva.

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

**Espaciado entre secciones:** `.section { padding: 72px 0; }` (64px en
`≤480px`). Antes era 96px — con dos secciones consecutivas eso sumaba
192px de espacio combinado en cada borde, y se sentía excesivo sobre todo
en secciones con poco contenido (como "Sobre mí"). El espaciado interno
título→subtítulo (16px) y subtítulo→contenido (48px) es independiente de
este padding y no se tocó.

⚠️ **Nota de contraste:** `--muted` (#64748B) sobre `--bg` da ~4.75:1
(pasa WCAG AA por poco). Sobre `--bg-tint` cae a ~4.3:1 (no pasa). Por eso
`.education-list__meta` usa `#475569` en vez de `var(--muted)` — si agregas
texto `--muted` sobre un fondo `--bg-tint` en otro lado, usa ese mismo tono
más oscuro.

## Efecto de fondo animado del Hero (red neuronal)

El `<section class="hero">` tiene un fondo animado de nodos conectados
(estilo grafo/red neuronal) dibujado con `<canvas>` y JS puro — sin
librerías externas. El código vive en un solo bloque dentro del
`DOMContentLoaded` de `script.js` (busca `heroCanvas`); el markup es un
único `<canvas class="hero__canvas" aria-hidden="true">` insertado como
primer hijo de `.hero` en `index.html`.

**Posicionamiento:** `.hero` tiene `position: relative; overflow: hidden`;
`.hero__canvas` es `position: absolute; inset: 0; z-index: 0; pointer-events:
none`; `.hero__inner` es `position: relative; z-index: 1`. Así el canvas
nunca bloquea clics en el texto/botón del hero.

**Comportamiento:**
- Nodos (color `#14B8A6`) flotan lentamente y rebotan en los bordes del hero.
- Se dibuja una línea entre cada par de nodos a menos de `LINK_DISTANCE`.
- Pulsos ambientales viajan por conexiones activas cada ~0.7s, simulando
  señales/datos fluyendo por la red.
- **Cursor como imán:** los nodos dentro de `INTERACT_RADIUS` del mouse se
  atraen hacia él (no solo brillan) y se dibujan líneas del cursor a cada
  nodo cercano, uniendo el patrón actual con el puntero.
- **Click = ráfaga de activación:** un click en una zona vacía del hero
  (nunca sobre el botón/links, filtrado por `e.target !== heroSection`)
  dispara un anillo expansivo y pulsos hacia los nodos cercanos.
- Respeta `prefers-reduced-motion`: si está activado, dibuja un solo frame
  estático (sin movimiento, pulsos ni ráfagas) en vez de animar.
- El canvas se redimensiona en el evento `resize` de la ventana.
- **Watchdog de `visibilitychange`:** el loop de animación se auto-programa
  con `requestAnimationFrame(step)` al final de cada frame. En móvil, el
  navegador a veces no entrega ese callback tras cambiar de pestaña/app
  (ahorro de batería), lo que rompe la cadena y congela el efecto para
  siempre. Al volver la pestaña a visible, si no se dibujó un frame en los
  últimos 500ms, se relanza el loop manualmente.
- **`step()` nunca debe lanzar una excepción sin capturar:** como el loop
  se auto-programa a sí mismo, un solo error no capturado en cualquier
  frame mata la animación para siempre (nunca se vuelve a llamar
  `requestAnimationFrame`). Por eso el dibujo real vive en `drawFrame()` y
  `step()` lo envuelve en `try/catch` — un frame puede fallar sin romper
  los siguientes. Ya se dio un caso real: el anillo del click (`ripples`)
  calculaba su radio como `progress * RIPPLE_RADIUS`, y si el timestamp
  del click (`performance.now()`) leía un valor mayor al del frame de
  `requestAnimationFrame` por unos milisegundos de desfase entre relojes,
  `progress` salía negativo y `ctx.arc()` lanzaba `IndexSizeError` — de
  ahí que el efecto se congelara "después de varios clics". El `progress`
  de los ripples ahora se recorta a `[0, 1]`.

**Parámetros ajustables** (constantes al inicio del bloque en `script.js`):

| Constante | Valor | Efecto |
|---|---|---|
| `NODE_COUNT` | 34 | Cantidad de nodos |
| `LINK_DISTANCE` | 150px | Distancia máxima para dibujar línea entre nodos |
| `LINK_OPACITY` | 0.14 | Opacidad máxima de las líneas |
| `MAX_PULSES` | 6 | Pulsos ambientales simultáneos máximos |
| `PULSE_SPAWN_INTERVAL` | 700ms | Frecuencia de spawn de pulsos ambientales |
| `PULSE_DURATION` | 900ms | Duración de cada pulso viajando entre dos nodos |
| `INTERACT_RADIUS` | 140px | Radio de atracción/brillo alrededor del cursor |
| `ATTRACT_STRENGTH` | 0.9 | Fuerza del "imán" del cursor sobre nodos cercanos |
| `RIPPLE_RADIUS` | 220px | Radio de nodos afectados por un click |
| `RIPPLE_MAX_NODES` | 8 | Máximo de pulsos disparados por click |
| `RIPPLE_RING_DURATION` | 600ms | Duración del anillo expansivo del click |

## Mancha con parallax en "Sobre mí"

El fondo verde detrás de la foto de perfil (`.about__photo-backdrop`) es
una capa independiente — no está fusionada con la `<img>` — para poder
moverla a distinta velocidad que la foto al hacer scroll (efecto de
profundidad). Ya no es un círculo perfecto: usa un `border-radius`
asimétrico (`63% 37% 54% 46% / 43% 65% 35% 57%`) para una forma orgánica
tipo mancha. La foto no lleva borde ni sombra — flota directo sobre la
mancha (se probaron aro blanco y `box-shadow`, ninguno convenció).

**Centrado horizontal vs. parallax:** el centrado usa `left` +
`margin-left` (no `transform: translateX(-50%)`), porque el parallax
mueve el elemento escribiendo `style.transform` directo en JS — si el
centrado también dependiera de `transform`, cada actualización del
parallax lo borraría. Es la causa de un bug real durante el desarrollo:
el círculo se veía pegado a la derecha, invadiendo el texto, hasta
separar ambos mecanismos.

**Comportamiento:** en `script.js`, un `IntersectionObserver` sobre
`#sobre-mi` solo activa el listener de `scroll` (con `requestAnimationFrame`
para no recalcular más de una vez por frame) mientras la sección está en
pantalla. El offset vertical es `(centroViewport - centroSección) *
PARALLAX_FACTOR` (0.15), limitado a `±PARALLAX_MAX_OFFSET` (40px).
Respeta `prefers-reduced-motion` (no se activa si está encendido).

## Patrones reutilizables

- **Tarjeta con ícono circular** (Servicios, Stack, Formación): círculo de
  52px, fondo `rgba(20,184,166,.12)`, ícono SVG stroke-based (`stroke-width:
  1.8`, sin relleno) — nunca emojis.
- **Carrusel simple** (`.carousel` en Servicios, usado con
  `[data-carousel-track]` + `[data-carousel-prev/next]`): las flechas
  desplazan el contenedor un 80% de su ancho. Lógica genérica en `script.js`.
- **Carrusel paginado** (`.pcarousel` en Proyectos, con `.pcarousel__viewport`
  + `.pcarousel__track` + `[data-pcarousel-track/prev/next/progress-fill]`):
  a diferencia del carrusel simple, calcula cuántas tarjetas caben por
  página (usando el ancho real de tarjeta+gap, no el ancho del viewport) y
  muestra el avance con una sola línea delgada (`.pcarousel__progress-fill`,
  máx. 160px) que crece según la página actual — sin contador numérico ni
  contenedor/track de fondo, en vez de puntos — con muchos proyectos, una
  fila de puntos se ve saturada tanto en desktop como en móvil. El
  contenedor (`[data-pcarousel-progress]`) lleva `role="progressbar"` +
  `aria-valuemin/max/now` (actualizados en cada scroll/resize) y
  `aria-label` traducible, para no perder el indicador de posición en
  lectores de pantalla al quitar el texto visible. Sin auto-scroll — es
  100% manual (flechas o swipe táctil).
- **Badges** (`.badge` genérico; `.pcard__badge` en Proyectos): píldora de
  texto simple con fondo `--bg-alt` y borde — sin ícono ni punto de color
  (se quitaron por no aportar información y ocupar espacio extra en móvil).
- **Cert-chip con logo** (`.cert-chip` en Formación): logo de la
  institución (`.cert-chip__logo`, 24px, `object-fit: contain` para no
  deformar logos con proporciones distintas — cuadrados, wordmarks
  anchos, etc.) en fila junto al título dentro de `.cert-chip__head`;
  meta (institución · año) debajo. Logos en `assets/*_logo.{png,webp}`;
  si una institución se repite (p. ej. HubSpot, Vanderbilt), reusa el
  mismo archivo en cada chip correspondiente.
- **Marquee de logos con hover** (`.stack-marquee` en Stack tecnológico):
  reemplazó las 4 tarjetas de categorías con badges de texto — con ~20
  herramientas, agruparlas en categorías con badges se veía saturado.
  Es una tira de logos (`.stack-marquee__track`, la secuencia completa
  duplicada una vez para loop infinito sin salto) en escala de grises y
  45% opacidad (`filter: grayscale(1) opacity(.45)`), moviéndose sola
  vía `@keyframes` — sin JS. Al pasar el cursor sobre un logo se
  ilumina a color completo; al pasar el cursor sobre el carrusel en
  general, el movimiento se pausa (`animation-play-state: paused`).
  Respeta `prefers-reduced-motion` (sin animación). El listado real de
  herramientas para lectores de pantalla vive aparte en un `<ul
  class="sr-only">` (el marquee lleva `aria-hidden="true"`, es
  puramente decorativo/redundante).
  - Logos en `assets/logos-herramientas/`, cuadro fijo de
    `.stack-marquee__logo` (100×36px, `object-fit: contain`) — **el
    ancho y el alto deben ser fijos los dos**, no solo la altura: con
    solo altura fija, un wordmark ancho (ej. "Claude") ocupa hasta 4x
    el área de un ícono cuadrado (ej. Python) y se ve "gigante" al
    lado de los demás.
  - **Antes de usar un logo nuevo, recórtalo a su contenido real.**
    Varios PNG traen mucho margen en blanco/transparente de fábrica
    (canvas cuadrado con el logo real ocupando solo el 15-20% del
    alto) — dentro de un cuadro fijo eso lo hace verse diminuto aunque
    el archivo en sí "se vea bien" al abrirlo. Recorta al bounding box
    del contenido no-transparente (o no-blanco si el fondo es opaco),
    dejando ~5% de padding. Si es un wordmark de una sola línea sin
    ícono (ej. ActiveCampaign), su proporción recortada puede quedar
    demasiado ancha/delgada (10:1 o más) y verse chica igual — en ese
    caso agrégale relleno vertical extra hasta una proporción más
    normal (~3.5-4:1, como Zapier).
  - **Si el logo es SVG, verifica que `width`/`height` coincidan en
    proporción con el `viewBox`.** Un mismatch (pasó con
    `googlesheets.svg`: `viewBox` 129×22 pero `width="2500"
    height="1486"`) hace que el navegador rellene con espacio
    invisible para cuadrar las proporciones, y el logo real termina
    siendo una fracción minúscula del recuadro — mismo síntoma que el
    margen en blanco de los PNG, pero la causa está en el propio SVG.
    Solución: quita `width`/`height` del `<svg>` y deja que el
    `viewBox` defina la proporción.

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
   - **Antes de guardarla, revisa si expone cifras reales (ingresos, montos,
     KPIs) o datos personales de terceros (nombres, teléfonos de leads o
     empleados)** y difumínalos directamente en el PNG (no con CSS — un
     `filter: blur()` es solo cosmético, el archivo original seguiría
     teniendo el dato real). Usa `PIL.ImageFilter.GaussianBlur` sobre la
     región exacta (recórtala, aplícale blur, pégala de vuelta), con el
     mismo patrón de respaldo/verificación que para los logos. Antes de
     sobrescribir el archivo real, guarda una copia de prueba en un
     directorio aparte y revísala visualmente — las coordenadas de texto en
     un dashboard casi nunca son las que uno espera a primera vista.
   - **Difumina cada cifra/nombre individualmente, nunca con un solo
     rectángulo grande cubriendo toda una fila/columna/gráfica.** Un bloque
     grande se ve como censura obvia y, si cae encima de un borde de
     tarjeta, lo borra dejando la tarjeta "flotando" sin contorno. Recorta
     un box ajustado por cada número/nombre (o, si son varios valores
     dispersos en una gráfica, un box angosto por barra/columna de datos)
     dejando bordes, labels y espacio en blanco intactos — más iteraciones,
     pero se ve intencional en vez de un parche.
3. **HTML** — estructura de cada `.pcard`:
   ```html
   <article class="pcard">
     <div class="pcard__media">
       <img class="pcard__screenshot" loading="lazy" src="assets/cliente_evidencia.png" alt="...">
       <img class="pcard__logo" loading="lazy" src="assets/cliente.png" alt="Cliente"><!-- círculo de 68px, superpuesto sobre la esquina inferior izq. de la captura -->
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

## Logo del header

`.brand` (header) es una foto de perfil visual compuesta por
`.brand__logo` (imagen) + `.brand__text` (nombre + tagline apilados) en
fila. El logo activo es `assets/logo/logo_ok.png` — un monograma "G"
(navy) con una flecha/check ascendente (teal), fondo hecho transparente
y recortado a su contenido real (igual que los logos de
`logos-herramientas/`, ver esa sección para el proceso). Se muestra a
36px de alto con `object-fit: contain` (`width: auto`) porque no es
cuadrado.

`assets/logo/` también tiene tres SVG sin usar por ahora, de un
monograma alternativo (círculo "G" + zigzag "M"): `gm-logo.svg` (navy/
teal, fondo claro), `gm-logo-light.svg` (blanco/teal, para fondos
oscuros como el hero) y `gm-favicon.svg` (versión cuadrada 64×64 con
fondo blanco redondeado, pensada para favicon). Quedan disponibles por
si se quiere retomar esa dirección más adelante.

**Favicon:** `assets/logo/favicon.png` — el mismo `logo_ok.png` centrado
sobre un lienzo cuadrado transparente (con ~12% de relleno) y exportado
a 512×512, referenciado en el `<head>` vía `rel="icon"` +
`rel="apple-touch-icon"`. Se generó así (en vez de partir del
`gm-favicon.svg` alterno) para mantener consistencia con el logo real
del header. Probado a escala 32px y 16px antes de usarlo — a 16px se ve
algo suave pero la "G" y el acento teal siguen siendo legibles, normal
para un favicon a ese tamaño.

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

## Foto de perfil (Sobre mí)

`assets/gilberto_mireles_ok_v2.png` — versión actualizada, más nítida
que la original (`gilbertomireles_2.png`, ya sin usar pero se deja en
el repo; `gilberto_mireles_ok.png` fue una iteración intermedia,
también sin usar), con fondo transparente real. Igual que la foto
anterior, se
apoya en que `.about__photo img` no tiene `background-color` propio —
el recorte transparente deja ver directo la mancha con parallax detrás
(`.about__photo-backdrop`), por eso **cualquier foto nueva para esta
sección debe traer el fondo ya recortado a transparencia**, no un
fondo blanco/sólido, o se va a ver como un recuadro claro flotando
sobre la mancha en vez de integrarse con ella.

## Notas de comportamiento

- El carrusel de Proyectos **no tiene auto-scroll** (se probó y competía con
  los toques/taps en botones como "Ver más" en móvil) — es 100% manual.
- Las flechas de los carruseles se ocultan en `≤768px` (el swipe táctil
  nativo ya cubre esa función).
- Todas las imágenes de logos y capturas de evidencia usan `loading="lazy"`.
- En `≤700px`, `.pcard__stack` limita el bloque de badges a ~2 filas
  (`max-height` + `overflow: hidden`) para que las tarjetas de Proyectos no
  se alarguen demasiado en móvil — si un proyecto tiene muchas
  herramientas, las que no caben en 2 filas simplemente no se muestran ahí.

## Despliegue

GitHub Pages está activo, sirviendo desde `main` / `/ (root)`:
**https://gibemireles.github.io/me/**. Al ser un sitio 100% estático sin
build step, cada push a `main` se refleja ahí directo, sin ningún
workflow adicional.

## Historial de diseño

La spec original y el plan de implementación (primera versión del sitio,
antes de las iteraciones de esta sesión) están en:

- `docs/superpowers/specs/2026-08-12-gilberto-mireles-web-design.md`
- `docs/superpowers/plans/2026-08-12-gilberto-mireles-web.md`

Sirven como referencia histórica de cómo arrancó el proyecto; el diseño
actual (colores, layout de Proyectos y Formación, carruseles) evolucionó
bastante desde ahí — este README refleja el estado actual.
