# PRODUCT REQUIREMENTS DOCUMENT
## Mubeen Ayomide Kolade — IT Support Analyst Portfolio
### Version 2.0 | Full Build Specification

---

## OVERVIEW

Build a complete, production-grade personal portfolio website for **Mubeen Ayomide Kolade**, an IT Support Analyst based in Basildon, Essex, UK. The portfolio must be delivered as two fully self-contained files:

| File | Stack |
|------|-------|
| `mubeen-portfolio.html` | Pure HTML + CSS + Vanilla JS (no frameworks, no build tools) |
| `mubeen-portfolio.jsx` | Single-file React component (hooks only, no external state libraries) |

Both files must open and run correctly by themselves in any modern browser with zero setup.

---

## DESIGN DIRECTION

### Aesthetic: Green Radar NOC (Network Operations Center)
The visual language is a **military-grade Network Operations Center terminal** — think cybersecurity ops room meets radar control station. Dark phosphor-green on near-black. Monospace fonts everywhere. Scanline overlay on the full page. The hero is a live radar screen pulled directly from the reference image provided.

### Theme Switching
- **Auto only** — NO manual toggle button
- Uses CSS `prefers-color-scheme` media query
- Dark mode: phosphor green on black (primary)
- Light mode: deep forest green on off-white (same vibe, daylight-readable)
- Every color token must respond correctly in both modes

---

## COLOR TOKENS

Define all colors as CSS custom properties (`--token-name`) at `:root` level, with a `@media (prefers-color-scheme: light)` override block.

### Dark Mode (Default)
```
--bg:       #000a00    /* page background */
--bg2:      #020f02    /* navbar, alt sections */
--card:     #040f04    /* card backgrounds */
--border:   #0d2e0d    /* default borders */
--border2:  #1a4a1a    /* hover/active borders */
--green:    #00ff41    /* primary accent, headings, glow */
--green2:   #00cc33    /* secondary green */
--green3:   #007a1f    /* muted green, dividers */
--cyan:     #00ffcc    /* info highlights, subheadings */
--amber:    #ffaa00    /* warnings, dates */
--red:      #ff3333    /* errors, critical alerts */
--text:     #d0f0d0    /* body text */
--muted:    #3a6b3a    /* labels, placeholders */
```

### Light Mode Override
```
--bg:       #f0fff0
--bg2:      #e4f7e4
--card:     #ffffff
--border:   #b8deb8
--border2:  #7ec87e
--green:    #0a7c0a
--green2:   #0d9e0d
--green3:   #4ab84a
--cyan:     #007755
--amber:    #b87700
--red:      #cc1111
--text:     #1a3a1a
--muted:    #5a8a5a
```

---

## TYPOGRAPHY

Load from Google Fonts:
```
https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@400;600;700&family=Source+Sans+3:wght@300;400;600&display=swap
```

| Role | Font | Weight |
|------|------|--------|
| Logo, labels, code, badges, all mono text | Share Tech Mono | Regular |
| Section headings, company names, card titles | Rajdhani | 600–700 |
| Body paragraphs, descriptions | Source Sans 3 | 300–400 |

**NEVER use:** Arial, Inter, Roboto, system-ui, or any generic fallback as the primary font.

---

## GLOBAL STYLES

- `body::before` — Fixed full-page scanline overlay using `repeating-linear-gradient` (subtle, horizontal, 3px pitch). Pointer-events: none. Z-index: 9999.
- Scrollbar: 5px wide, `--bg2` track, `--green3` thumb, 3px border-radius.
- `scroll-behavior: smooth` on `html`.
- No horizontal overflow on `body`.

---

## PAGE STRUCTURE

```
<nav>              Fixed top navigation
<section#hero>     Full-viewport NOC Radar landing screen  ← PRIMARY FOCUS
<section#about>    About Me
<section#skills>   Technical Skills
<section#experience> Work Experience
<section#certs>    Certifications
<section#education> Education
<section#contact>  Contact + Form
<footer>           Credit line
```

Section dividers between each section: `1px` line using `linear-gradient(90deg, --green3, transparent)`.

---

## SECTION 1: NAVBAR

- Position: fixed top, full width, height 52px
- Background: `--bg2` at 93% opacity + `backdrop-filter: blur(12px)`
- Bottom border: `1px solid --border`
- Left: Logo text `[ MAK_PORTFOLIO ]` in Share Tech Mono, `--green`, letter-spacing 0.12em
- Right: Nav links — HOME · ABOUT · SKILLS · EXPERIENCE · CERTS · EDUCATION · CONTACT
  - Font: Share Tech Mono, 10px, `--muted`, letter-spacing 0.1em
  - Hover: color transitions to `--green`
- Mobile (<768px): hide nav links (hamburger optional, links can just hide)

---

## SECTION 2: HERO — NOC RADAR SCREEN ⬅ MOST IMPORTANT

This is the entire first screen the visitor sees. It must look exactly like the reference NOC radar image. It occupies `100vh` minus the navbar.

### Layout: 3-Column Grid
```
[ LEFT LOG PANEL ]  [ CENTER RADAR CANVAS ]  [ RIGHT PANELS ]
      220px                   1fr                  220px
```

### 2a. Top Title Bar (above the 3-col grid)
- Centered, font: Share Tech Mono
- Line 1: `IT SUPPORT ANALYST` — large (clamp 20px–38px), `--green`, letter-spacing 0.2em, green text-shadow glow
- Line 2: `[ NETWORK OPERATIONS CENTER — ACTIVE SCAN ]` — small (clamp 9px–13px), `--green3`, letter-spacing 0.15em

### 2b. Left Panel — System Log
- Border-right: `1px solid --border`
- Panel title: `> SYSTEM LOG` in Share Tech Mono 10px, `--green`
- Live scrolling log feed — entries added one-by-one every ~900ms via JavaScript
- Each log entry:
  - Level badge: `[INFO]` in `--green2`, `[WARN]` in `--amber`, `[ERROR]` in `--red`
  - Timestamp + message in `--muted`, Share Tech Mono 9px
  - Bottom border separator between entries
- Blinking cursor block at the bottom (CSS `animation: blink 1s step-end infinite`)
- Log entries (loop through these, then restart):
```
[INFO]  00:01:14  User login: admin
[WARN]  00:01:22  High CPU on SRV-02
[INFO]  00:01:35  Backup completed OK
[ERROR] 00:01:41  VPN tunnel dropped
[INFO]  00:01:52  Ticket #4821 opened
[WARN]  00:02:03  Disk usage >80%
[INFO]  00:02:11  Patch applied: KB9921
[ERROR] 00:02:19  Firewall rule deny
[INFO]  00:02:28  Port scan blocked
[INFO]  00:02:34  Switch SW-01 online
[WARN]  00:02:44  Memory leak detected
[INFO]  00:02:55  DNS resolved OK
[INFO]  00:03:07  NTP sync success
[ERROR] 00:03:14  Auth fail x3: 10.0.4
[INFO]  00:03:22  Ticket #4822 closed
```

### 2c. Center Panel — Radar Canvas (CORE ANIMATION)

Render on an HTML5 `<canvas>` element using `requestAnimationFrame`. Canvas resizes to fit its container (square, max ~560px). Full 360° rotation every ~4 seconds.

**Draw in this order each frame:**

1. **Radial background glow** — `createRadialGradient` from center, dark green to transparent
2. **5 concentric rings** — evenly spaced, `rgba(0,180,50,0.18)` stroke, 1px
3. **Crosshairs** — horizontal + vertical lines through center, same color
4. **Diagonal lines** — at 45° and 135°, same color
5. **Degree labels** — 0°, 45°, 90°, 135°, 180°, 225°, 270°, 315° placed just outside outermost ring, Share Tech Mono 9px, `--green3`
6. **Sweep trail** — fading wedge behind sweep line: loop 60 steps back, each step fills a thin arc slice with `rgba(0,255,65, opacity)` where opacity fades from 0.35 → 0 as you go further back
7. **Sweep line** — bright line from center to edge at current angle, `--green`, 1.5px, with green shadow blur
8. **Blips** — 7 fixed nodes placed at specific polar coordinates (angle + radius fraction):

| Label   | Angle (rad) | Radius | Color     |
|---------|-------------|--------|-----------|
| FW-MAIN | 0.6         | 0.52   | `#00ffcc` |
| SW-01   | 1.8         | 0.38   | `#00ff41` |
| PC-14   | 2.5         | 0.68   | `#00ff41` |
| SRV-02  | 3.4         | 0.55   | `#00ff41` |
| AP-07   | 4.1         | 0.42   | `#00ff41` |
| THREAT  | 1.1         | 0.30   | `#ff3333` |
| WARN    | 5.2         | 0.60   | `#ffaa00` |

Each blip behavior:
- When sweep passes its angle (diff < 0.08 rad): `alpha = 1`
- Each subsequent frame: `alpha -= 0.004` (slow fade)
- When alpha > 0, draw:
  - Two pulse rings (radii 14px and 22px, scaled to canvas size), stroke in `blipColor + alpha hex`
  - Filled dot (5px radius), `blipColor`, with shadow glow
  - Label text to upper-right of dot, Share Tech Mono bold, `blipColor`

9. **Center dot** — solid 6px circle, `--cyan`, with cyan shadow glow

**Light mode:** swap all greens to darker equivalents (use `window.matchMedia` check inside draw loop)

### 2d. Right Column — Three Stacked Panels

**Panel 1: Active Tickets**
- Title: `> ACTIVE TICKETS` Share Tech Mono 10px `--green`
- 5 ticket rows, each with:
  - Colored status dot (with matching box-shadow glow)
  - Ticket ID in ticket color, Share Tech Mono bold 9px
  - Issue description in `--muted`, Share Tech Mono 8px
  - Priority badge (border + text in ticket color, background at 13% opacity)

| ID    | Issue            | Color     | Priority |
|-------|------------------|-----------|----------|
| #4821 | VPN timeout      | `#ff3333` | CRIT     |
| #4822 | Printer offline  | `#00cc33` | LOW      |
| #4823 | Email sync fail  | `#ffaa00` | MED      |
| #4824 | RAM upgrade      | `#00ffcc` | LOW      |
| #4825 | FW rule conflict | `#ff3333` | HIGH     |

**Panel 2: Net Statistics**
- Title: `> NET STATISTICS`
- 4 rows with key/value layout:

| Key          | Value  | Color     |
|--------------|--------|-----------|
| LATENCY      | 12ms   | `--green2` |
| PACKET LOSS  | 0.3%   | `--amber`  |
| UPTIME       | 99.97% | `--green2` |
| OPEN PORTS   | 14     | `--cyan`   |

**Panel 3: Host Info**
- Title: `> HOST INFO`
- 3 rows:
  - HOST: NOC-WORKSTATION-01
  - IP: 192.168.1.100
  - MAC: A4:C3:F0:12:88:EE

### 2e. Bottom Status Bar
- Height 38px, background `--bg2` at 95% opacity, top border `--border`
- 4 items spaced across full width, Share Tech Mono 9px:
  - `STATUS:` → `ALL SYSTEMS OPERATIONAL` (--green)
  - `TICKETS:` → `5 OPEN | 12 RESOLVED TODAY` (--amber)
  - `SCAN:` → `172.16.0.0/24 IN PROGRESS` (--cyan)
  - `ANALYST:` → `ONLINE` (--green)

### 2f. Scroll CTA
- Centered, absolute-positioned above bottom bar
- Text: `SCROLL TO EXPLORE` + down arrow `↓`
- CSS `bobble` animation (translateY oscillation, 2s loop)
- Clicking scrolls smoothly to `#about`
- Hidden on mobile

### Mobile Hero (<900px)
- Hide left log panel and right column
- Show only: title bar + radar canvas + bottom bar
- Radar canvas scales to fit full width

---

## SECTION 3: ABOUT

**Layout:** 2-column grid (text left, stat cards right)

**Left — Bio Text (3 paragraphs):**
> Dynamic IT professional with a BSc in Cyber Security from Caleb University, Lagos. Experienced in troubleshooting IT issues, network maintenance, cloud computing, and delivering quality customer support across fast-paced environments.

> Holding CompTIA IT Fundamentals (ITF+) certification and hands-on experience with Microsoft 365, Networking, Ethical Hacking, and Cloud Computing fundamentals — backed by real-world experience spanning healthcare administration and travel operations.

> Skilled in problem-solving, multitasking, and communication. Eager to bring transferable technical and interpersonal skills to a dedicated IT Support role.

**Right — 4 Stat Cards (2×2 grid):**

| Icon | Label | Value |
|------|-------|-------|
| 🎓 | DEGREE | BSc Cyber Security — Caleb University |
| 📍 | LOCATION | Basildon, Essex, UK |
| 💼 | EXPERIENCE | 2+ Years Across Sectors |
| 🏅 | CERTIFICATION | CompTIA ITF+ Certified |

Card style: `--card` bg, `--border` border, 10px border-radius. Hover: border → `--green3`, box-shadow glow.

**Animations:** Section fades up on scroll-into-view (IntersectionObserver, threshold 0.12, translateY 24px → 0).

---

## SECTION 4: SKILLS

**Layout:** 2-column grid

**Group 1 — // TECHNICAL STACK**
IT Support & Troubleshooting · Networking & Security · Cloud Computing · Microsoft 365 · Ethical Hacking · Cybersecurity Fundamentals · CompTIA ITF+ · Microsoft Office Suite · Data Entry · Computer Hardware Setup

**Group 2 — // CORE COMPETENCIES**
Customer Relationship Mgmt · Communication · Problem Solving · Multitasking · Travel Ticketing · Administrative Tasks · Health Monitoring · Documentation

**Badge style:** Share Tech Mono 10px, `--green` text, `--green3` border (1px), 4px radius, 6px/14px padding, subtle green bg tint. Hover: border → `--green`, green box-shadow glow, brighter bg tint.

---

## SECTION 5: WORK EXPERIENCE

**Layout:** Vertical timeline (left line + cards to the right)

Timeline line: `position: absolute`, left edge, `linear-gradient(to bottom, --green3, transparent)`, 1px wide.

**Node dots:** Absolute-positioned circles at each entry, `--green` fill with green glow.

**Entry 1:**
- Date: 2025 — PRESENT (in `--amber`)
- Location: Fort Road, Tilbury, Essex, UK
- Company: LERA HEALTHCARE LIMITED
- Role: `> ROLE: Healthcare Assistant` (in `--cyan`)
- Duties:
  - Mobility and physical support for patients
  - Personal care assistance and hygiene support
  - Administrative and environmental task management
  - Emotional and social support for service users
  - Health monitoring, observation and reporting

**Entry 2:**
- Date: 2023 — 2025
- Location: Island, Lagos, Nigeria
- Company: GLOBAL KAZ CO & TRAVEL & TOUR LTD
- Role: `> ROLE: Operating Ticket Officer`
- Duties:
  - Planned and organized flight tickets, transportation and accommodations
  - Handled customer queries, complaints and issue resolution
  - Researched destinations, pricing, weather conditions and reviews

**Card style:** `--card` bg, `--border` border, `--green3` left accent border (3px), border-radius `0 10px 10px 0`. Hover: left border → `--green`, translateX(4px).

Bullet style: `>` character in `--green3` as pseudo-bullet, no list-style.

---

## SECTION 6: CERTIFICATIONS

**Layout:** 3-column grid (2-col on tablet, 1-col on mobile)

6 cards total — all issued by **CUL Technologies of Caleb University / CompTIA Authorized Partner**:

| Icon | Certificate Name |
|------|-----------------|
| 🗄️ | Introduction to Databases and Software Development |
| ☁️ | Microsoft 365 Introduction |
| 🔗 | Introduction to Networking, Security and Maintenance |
| 🖥️ | IT Fundamentals (ITF+) — Setting up & Using Computers |
| 🌐 | Cloud Computing Fundamentals |
| 🏅 | CompTIA IT Fundamentals (ITF+) — Computer Basics |

**Card style:** `--card` bg, `--border` border, 10px radius. Hover: border → `--green3`, translateY(-3px), green box-shadow glow, radial inner glow overlay.

---

## SECTION 7: EDUCATION

**Layout:** 2-column grid (1-col on mobile)

**Card 1:**
- Icon: 🎓
- Degree: BSc. Cyber Security
- School: Caleb University
- Year: 2022
- Location: Imota, Lagos, Nigeria

**Card 2:**
- Icon: 📜
- Degree: West African Secondary School Certificate (WASSCE)
- School: Frontrunner City College
- Year: 2017 — 2022
- Location: Ikorodu, Lagos, Nigeria

**Card style:** `--card` bg, `--border` border, 12px radius. Hover: border → `--green3`.

---

## SECTION 8: CONTACT

**Layout:** 2-column grid (1-col on mobile)

**Left — Contact Info Cards (4 cards):**

| Icon | Label | Value |
|------|-------|-------|
| 📧 | EMAIL | kolademubeen04@gmail.com |
| 📞 | PHONE | +44 7491 474676 |
| 📍 | ADDRESS | 106 Lincoln Road, Basildon, Essex SS14 3RA |
| 🔗 | LINKEDIN | linkedin.com/in/mubeen-kolade-b82424342 |

Email, phone, and LinkedIn should be anchor tags. Address is plain text.

**Right — Contact Form:**
- Fields: Name, Email, Message (textarea)
- Labels: `// NAME`, `// EMAIL`, `// MESSAGE` in Share Tech Mono 9px `--muted`
- Input style: `--card` bg, `--border` border, 6px radius, Share Tech Mono 12px, `--text`. Focus: border → `--green3`, green box-shadow glow.
- Submit button: `>_ SEND MESSAGE` — transparent bg, `--green3` border, `--green` text. Hover: green tint bg, border → `--green`, green glow.

---

## SECTION 9: FOOTER

Flex row, space-between, `--border` top border, 28px padding.

- Left: `Designed & built for ` + **Mubeen Ayomide Kolade** (in `--green`)
- Right: `> Built with purpose.` + **Shipped with pride.** (in `--green`)
- Font: Share Tech Mono 10px `--muted`

---

## ANIMATIONS SUMMARY

| Element | Animation |
|---------|-----------|
| Full page | Scanline overlay (CSS, fixed, z-index 9999) |
| Hero radar | Canvas `requestAnimationFrame`, continuous 360° sweep |
| Log feed | JS `setTimeout` chain, entry added every 900ms |
| Blinking cursor | CSS `blink` keyframe, 1s step-end |
| Scroll CTA | CSS `bobble` keyframe, 2s ease-in-out |
| All sections | `IntersectionObserver` fade-up (opacity 0→1, translateY 24px→0, 0.7s ease) |
| Skill badges | CSS hover: border glow, bg tint |
| Timeline cards | CSS hover: translateX(4px), left border color |
| Cert cards | CSS hover: translateY(-3px), box-shadow, radial glow pseudo |
| Nav links | CSS hover: color transition |
| CTA buttons | JS mouseenter/mouseleave: bg, border, shadow toggle |
| Status dot | CSS `pulse` keyframe: scale + opacity oscillation |

---

## RESPONSIVE BREAKPOINTS

| Breakpoint | Changes |
|------------|---------|
| < 600px | Single column everything; certs grid 1-col |
| < 768px | Hide nav links; about/skills/edu/contact go 1-col |
| < 900px | Hide log panel + right column in hero; radar fills width |
| 900–1024px | Hero 3-col works; other sections 2-col where applicable |
| > 1024px | Full layout as specified |

---

## TECHNICAL RULES

- **HTML file:** Everything inside one `.html` file — all CSS in `<style>`, all JS in `<script>`. No external dependencies except the Google Fonts `<link>`. Must open directly in a browser.
- **React file:** Single `.jsx` file. All styles as inline JS objects or a `<style>` tag injected via JSX. Use only React hooks (`useState`, `useEffect`, `useRef`). No Tailwind, no CSS modules, no external component libraries. Must work as a drop-in React component with a default export.
- No jQuery. No Bootstrap. No Tailwind.
- Canvas must resize responsively on window resize.
- All interactive elements must have hover states.
- All sections must have scroll-triggered fade-up animations.
- Form does not need a backend — button can be non-functional visually.

---

## CLIENT DATA REFERENCE

| Field | Value |
|-------|-------|
| Full Name | Mubeen Ayomide Kolade |
| Role | IT Support Analyst |
| Email | kolademubeen04@gmail.com |
| Phone | +447491474676 |
| Address | 106 Lincoln Road, Basildon, Essex SS14 3RA |
| LinkedIn | linkedin.com/in/mubeen-kolade-b82424342 |
| Degree | BSc Cyber Security, Caleb University (2022) |
| Secondary | WASSCE, Frontrunner City College (2017–2022) |
| Current Job | Healthcare Assistant, Lera Healthcare Ltd (2025–Present) |
| Previous Job | Operating Ticket Officer, Global Kaz Co (2023–2025) |
| Certifications | 6x CUL Technologies / CompTIA Authorized Partner |

---

*End of PRD — Version 2.0*
