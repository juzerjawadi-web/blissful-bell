# ANTIGRAVITY BUILD PROMPT — "Our Little Universe" · Pass 2: New Sections & Cards

> Paste this whole file into the **Antigravity app (Agent Manager)**, model **Gemini 3.1 Pro**, agentic/planning mode, with the repo `blissful-bell` open as the workspace.

---

## 0 · YOUR ROLE

You are a senior product designer + front-end engineer. You are extending an existing, *finished-feeling* personal website — not scaffolding a new one. The bar is: **every new section must look like it was always there.** If a section you build could be dropped into any other website, you have failed the brief.

This is a real gift from one real person to another. Restraint beats decoration. No stock-photo energy, no lorem ipsum, no emoji as icons, no generic "Discover Our Story" marketing voice.

**Work in planning mode first.** Produce a plan, list the files you will create and edit, then build. Do not begin editing until the plan is written.

---

## 1 · REPO FACTS — VERIFY, DON'T ASSUME

These are true as of this prompt. Confirm each by reading the file before you rely on it.

| Fact | Value |
|---|---|
| Framework | **Next.js 16.3.0**, App Router, `src/` directory |
| React | **19.2.8** |
| Styling | **Tailwind CSS v4** — configured via `@theme inline` inside `src/app/globals.css`. **There is no `tailwind.config.js`. Do not create one.** |
| Animation | **`framer-motion` ^13.1.0** — import as `import { motion } from "framer-motion"`. **Do not migrate to the `motion` package. Do not add GSAP, Locomotive, Lenis, AOS, or any second animation library.** |
| Icons | **`lucide-react`** ^1.31.0 only |
| Utils | `cn()` from `@/lib/utils` (clsx + tailwind-merge) |
| Path alias | `@/*` → `./src/*` |
| shadcn/ui | **NOT initialised — there is no `components.json`.** See §2.A. |

> ⚠️ **Next.js 16 caveat:** this version has breaking changes vs. your training data. Before writing any Next-specific code (routing, metadata, image, fonts, caching), read the relevant guide in `node_modules/next/dist/docs/`. `AGENTS.md` in the repo root says the same. Heed it.

### Existing structure — do not duplicate these

```
src/app/page.tsx          →  HeroSection · OurStoryTimeline · LittleThingsCards · PickABubble
src/app/lab/page.tsx      →  LoveNameMaker · LoveSync · MessageGenerator · LabAudioPlayer · MemoryBubble
src/app/vault/page.tsx    →  VaultHero · LoveByMood · LoveLibrary(01) · SongVault(02) · PoetryRoom(03)
                             LetterArchive(04) · LoveTimeline(06) · ForYouRecommendations(07) · SecretArchive
src/app/layout.tsx        →  BackgroundLayer · CustomCursor · Navigation · fonts
src/app/template.tsx      →  page transition (blur + scale)
src/components/global/    →  GlassCard · BackgroundAudio · BackgroundLayer · CustomCursor · Navigation
src/data/vault.ts         →  BOOKS · SONGS · POEMS · LETTERS (+ types)
```

**Do not rewrite, restyle, or "improve" any existing component.** The only permitted edits to existing files are listed explicitly in §5. If you think an existing file needs changing beyond that, say so in your report — don't do it.

### Assets that already exist in `/public`

`hair_flowing.mp4` · `rain.mp4` · `love.mp4` · `Modifying_hair_and_eyes_animation_202608111636.mp4` · `sajni_re.mp3` · `0820-01_1787195948749.mp3` · `voice.ogg` · `juzer-and-durriya.png` · `boy.png` · `girl.png` · `1760869483602.jpg` · `20260208_073639.jpg` · `20260503_202503.jpg` · `IMG_20260602_130344.jpg` · `IMG_20260616_000622_684.webp` · `IMG_20260629_225155.jpg` · `IMG_20260630_120523.jpg`

**Never reference an image path that is not in that list.** No placeholder services, no Unsplash, no AI-generated filler. If a card wants a photo and none is free, design the card to work *without* one.

---

## 2 · MANDATORY SKILLS — USE ALL THREE

These are paid tools. Output that doesn't visibly use them is a failed build.

### 2.A · 21st.dev — component skeletons

**Step 1 — bootstrap shadcn (required, it is not set up).** Before any registry pull, create `components.json` at the repo root matching this project (Tailwind v4, no config file, `src/` layout, existing `cn`):

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

Run `npx shadcn@latest add <url>` once against a trivial component to confirm the bootstrap works **before** pulling the real ones. If the CLI tries to rewrite `globals.css` tokens, **reject that change** — the palette in §3 is locked.

**Step 2 — MCP (optional, best effort).** Antigravity 2.0 reads MCP config from `~/.gemini/config/mcp_config.json` or workspace-local `.agents/mcp_config.json`:

```json
{
  "mcpServers": {
    "21st": {
      "command": "npx",
      "args": ["-y", "@21st-dev/magic@latest"],
      "env": { "API_KEY": "${API_KEY_21ST}" }
    }
  }
}
```

`API_KEY_21ST` comes from the shell environment — **never write the key into the file.** `npx -y @21st-dev/cli@latest install antigravity` is **not a valid command**; `antigravity` is not a supported client. If the server doesn't come up, skip to Step 3 and keep building.

**Step 3 — pull blocks by registry URL** (works with or without MCP):

```bash
npx shadcn@latest add "https://21st.dev/r/<author>/<component-slug>"
```

**Do not guess author/slug pairs.** Search 21st.dev (via MCP, or browse the site) and copy the exact registry URL shown on the component's page. If a block you want doesn't exist, hand-build it to the same standard and say so in your report.

**Blocks to source for this pass:** infinite marquee / scrolling logos row · bento grid · flip card or card-stack · horizontal scroll section · animated stat / counter band · accordion or FAQ · footer.

**Sourcing rule — obey this verbatim:**

> 21st.dev supplies the **skeleton and motion**. The project's design system supplies the **tokens, content and behaviour**. Lift structure, never palette, never copy, never imagery.
> **A 21st.dev component left on its default palette is a build failure** — re-token every one.

### 2.B · ui-ux-pro-max — design QA

Run these before you write CSS, and again before you report done:

```bash
py -3 "$HOME/.claude/skills/ui-ux-pro-max/scripts/search.py" "glassmorphism dark immersive" --domain style
py -3 "$HOME/.claude/skills/ui-ux-pro-max/scripts/search.py" "scroll reveal stagger parallax" --domain gsap
py -3 "$HOME/.claude/skills/ui-ux-pro-max/scripts/search.py" "focus visible keyboard modal dialog" --domain ux
py -3 "$HOME/.claude/skills/ui-ux-pro-max/scripts/search.py" "suspense streaming bundle" --stack nextjs
```

Two standing overrides, already decided — do not re-litigate them:

- **Ignore any palette the tool returns.** Its romantic/wedding palettes are built for light backgrounds and its dark palette is a fintech blue. The palette in §3 wins.
- **Translate every GSAP snippet into Framer Motion.** The `gsap` domain is the best source of *timing and choreography* in the skill; take the intent, not the API.

Everything else from the skill — contrast, focus, touch targets, reduced-motion, responsive breakpoints — is binding. Its pre-delivery checklist is folded into §8.

### 2.C · motion-framer — all animation

Every animation in this pass is Framer Motion. Use the real API surface, not CSS keyframes bolted on:

`motion.*` · `variants` + `staggerChildren` · `whileInView` + `viewport={{ once: true, margin }}` · `whileHover` / `whileTap` · `AnimatePresence` (with `mode="wait"` where a swap is exclusive) · `layoutId` for shared-element transitions · `useScroll` + `useTransform` for scroll-linked values · `useMotionValue` + `useSpring` for pointer-follow tilt · `useReducedMotion` on every non-trivial section.

Match the existing house easing: `[0.22, 1, 0.36, 1]` for reveals, springs at roughly `{ stiffness: 60–300, damping: 12–30 }` for interaction. Study `OurStoryTimeline.tsx` and `PickABubble.tsx` — copy their rhythm.

---

## 3 · LOCKED DESIGN SYSTEM — DO NOT INVENT TOKENS

Already defined in `src/app/globals.css`. **Read it. Extend it only if §5 tells you to.**

**Palette** (Tailwind classes: `bg-pastel-pink`, `text-pastel-lavender`, …)

| Token | Hex | Use |
|---|---|---|
| `--color-pastel-pink` | `#FFB6D9` | primary accent, hearts, active state |
| `--color-pastel-lavender` | `#C9B6FF` | secondary accent, vault |
| `--color-pastel-blue` | `#A9D8FF` | dates, meta labels |
| `--color-pastel-peach` | `#FFC6A5` | warmth accent |
| `--color-pastel-mint` | `#B8F2D0` | rare, success/unlock |
| `--color-pastel-yellow` | `#FFE7A8` | sparkle, highlight |
| background | `#000000` | pure black, never a lighter grey |
| foreground | `#FFFFFF` | at opacity steps only |

Accents live at **low opacity** (`/50`, `/60`, `/10` for glows). Full-strength pastel fills are off-brand — the existing site never uses one.

**Text opacity ladder** — use these exact steps, nothing between:
`text-white` (headings only) · `text-white/90` (body emphasis) · `text-white/80` · `text-white/70` (body) · `text-white/50` (sub-labels) · `text-white/40` (tertiary, ≥14px only).

**Typography**

| Role | Font | Classes |
|---|---|---|
| Section headings | Playfair Display | `font-serif ... font-light tracking-wide`, `text-3xl md:text-5xl` |
| Display / hero | Cormorant Garamond | `font-[var(--font-cormorant)]` |
| Body | Inter | default |
| Micro-labels | Manrope | `font-[var(--font-manrope)]` |

The house sub-label pattern, used everywhere — keep it: `text-white/50 tracking-widest text-xs uppercase`.

**Surfaces** — three utilities already exist. Use them; do not write new `backdrop-filter` CSS.

- `glass-card` — default card, `rounded-[2.5rem]`
- `glass-bubble` — pill/circle, `rounded-full`
- `glass-panel` — large expanded surface, `rounded-[3rem]`, heaviest blur

Prefer the `<GlassCard>` component (`@/components/global/GlassCard`) over raw utilities. It accepts `variant="card" | "bubble"`, `interactive` (adds hover lift + brightness spring), `className`, and all motion props.

**Section rhythm** — every section on this site follows: `py-32` · centered heading block with `mb-16` to `mb-24` · content `max-w-4xl` (home) or `max-w-6xl` (vault) · `mx-auto` · `px-4`. Match it.

---

## 4 · ENGINEERING RULES

1. **`"use client"`** on every component using hooks, motion, or events. Page files stay server components where possible.
2. **Hydration safety — this is the #1 way you will break this site.** Never call `Math.random()`, `new Date()`, or read `window` during render. Generate randomness inside `useEffect` after mount and gate rendering on an `isMounted` flag — copy the exact pattern from `HeroSection.tsx`. Live counters must render a stable server value first, then start ticking on mount.
3. **One concern per file.** New components go in `src/components/home/`, `src/components/lab/`, `src/components/vault/`. No component over ~250 lines.
4. **All copy lives in `src/data/personal.ts`** (new file) — typed, exported consts. Zero hard-coded strings inside components. This file is the one place Juzer edits later; treat it as the product.
5. **Z-index:** `LittleThingsCards` renders a full-screen hover preview at `z-[9999]`, and `Navigation` sits at `z-50`. New sections stay at `z-10`; modals/expanded panels use `z-40`. **Nothing new may exceed `z-40`.**
6. **Images:** `next/image` only, with real `alt`. No `<img>`.
7. **Video/audio:** `playsInline muted loop` for ambient video. Never autoplay audio without a user gesture — `BackgroundAudio.tsx` already owns the audio-unlock behaviour; read it before touching sound.
8. **TypeScript strict.** No `any`, no `@ts-ignore`, no unused imports. `npm run lint` must pass clean.
9. **No new dependencies** beyond what a 21st.dev registry pull brings in. If a block wants a heavy dep, drop the block.
10. **`prefers-reduced-motion`:** every section calls `useReducedMotion()`; when true, render the final state immediately — no infinite loops, no parallax, no scrub. Content must remain fully readable and usable.

---

## 5 · THE BUILD

Seven pieces. **Build in this order** and commit-check after each. Copy is written and final — use it **verbatim**, do not "improve" it, do not add copy of your own invention.

---

### S1 · `SinceTheBeginning` — live counter band → HOME

`src/components/home/SinceTheBeginning.tsx` · insert on `src/app/page.tsx` **between `<HeroSection />` and `<OurStoryTimeline />`**

**Purpose:** the first thing after the hero should be a fact, not a feeling. A quiet, always-moving number.

**Structure:** heading block, then a row of four `GlassCard`s (2×2 on mobile, 1×4 from `md`), then a closing line.

- Heading: `Since The Beginning`
- Sub-label: `AND STILL COUNTING`
- Cards — value on top (`text-4xl md:text-6xl font-serif text-white`), label below (`text-white/50 tracking-widest text-[10px] uppercase`):

| Value | Label |
|---|---|
| computed | `DAYS` |
| computed | `HOURS` |
| computed | `MINUTES` |
| computed | `HEARTBEATS` |

- Closing line, centered, `text-white/70 font-light`, `mt-16`:
  `That's a lot of good morning texts. Not one day I'd give back.`

**Logic:** export `RELATIONSHIP_START` from `personal.ts` as a top-of-file, clearly-commented ISO constant:

```ts
// ⚠️ CONFIRM THIS DATE — placeholder derived from the "August 2024" entry in OurStoryTimeline.
export const RELATIONSHIP_START = "2024-08-01T00:00:00+05:30";
```

Heartbeats = elapsed minutes × 72. Minutes tick every 60s; seconds are deliberately **not** shown — a per-second counter reads like a countdown timer and cheapens the section.

**Motion:** digits animate on mount with a Framer Motion counter (animate a `useMotionValue` from 0 → target over 1.6s, ease `[0.22, 1, 0.36, 1]`, `useTransform` to a locale-formatted string). Fire it with `whileInView`, `once: true`. Cards stagger in at 0.08s. When a value increments later, the changed digit block cross-fades via `AnimatePresence` — no slot-machine roll.
Reduced motion: render final numbers immediately, no count-up.

---

### S2 · `OpenWhen` — sealed envelope cards → HOME

`src/components/home/OpenWhen.tsx` · insert **after `<OurStoryTimeline />`**

**Purpose:** the emotional centre of this pass. Six letters; Durriya opens whichever one fits the day. The copy is addressed to her directly — keep it in second person.

**Structure:** heading, then a 3-column grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`, `gap-6`) of six sealed cards.

- Heading: `Open When…`
- Sub-label: `SIX LETTERS. OPEN THE ONE YOU NEED.`

**Sealed card:** `GlassCard interactive`, aspect ratio ~4/3, centered. A `lucide-react` `Mail` icon at `text-pastel-pink/50` above the label. Label in `font-serif text-white/90 text-lg`, lowercase exactly as written. Below it, `text-white/40 text-[10px] tracking-[0.2em] uppercase`: `OPEN`.

**Open interaction:** click → card flips on `rotateY` (3D, `perspective: 1200`) and the letter opens into a centered `glass-panel` overlay at `z-40` — reuse the exact expanded-panel treatment from `PickABubble.tsx` (X button top-right, `rounded-[2.5rem]`, internal gradient sheen, `font-serif text-lg md:text-xl leading-[2] whitespace-pre-wrap`). Close on X, on backdrop click, and on `Escape`. Use `layoutId` so the card morphs into the panel rather than cross-fading.

**The six letters** — `label` → `body` (`\n\n` between paragraphs):

**1 · `when you miss me`**
```
I'm probably missing you harder, just quieter about it.

Put on Sajni Re. Go sit somewhere you can see the sky.

I'm under the same one, thinking about you, counting down to the next time I see your face.

Miss me all you want — just don't do it alone. Call me. I'll pick up.
```

**2 · `when you're angry at me`**
```
You're allowed to be. I'd much rather you tell me than swallow it and go quiet.

I'm not going anywhere while you're angry. That's the whole point of me.

So say the entire thing. All of it. I'll listen before I defend myself, I promise.

And when you're done, I'll still be here. Probably with food.
```

**3 · `when you can't sleep`**
```
Don't scroll. Text me instead — even if it's 3am, even if it's nothing.

Close your eyes and I'll tell you about that house we keep planning. The kitchen where you'll stand behind me and say I'm using too much masala.

You'll be right. I'll do it anyway.

Sleep, Duuri. I'll be here in the morning.
```

**4 · `when you feel like you're not enough`**
```
Whoever put that thought in your head doesn't know you the way I do.

I've seen you tired, unfiltered, at your absolute worst — and I still chose you on every single one of those days.

You are not too much. You are not too little. You are exactly the person I keep coming back to, on purpose.

Read this again tomorrow if you need to. It'll still be true.
```

**5 · `when you're proud of yourself`**
```
GOOD. Now tell me. Right now. In full detail, don't skip the boring parts.

I want the whole story — what you did, what it took, who doubted it.

I've watched you do hard things quietly and never once ask anyone to clap.

So this is me clapping. Loudly. Embarrassingly. In public.
```

**6 · `when you need to laugh`**
```
Chunnari Chunnari.

The chicken I burnt. The face you made at it. The fact that you ate it anyway.

Me, trying very hard to be romantic, and you laughing before I even finish the sentence.

We are not a serious couple and thank god for that.
```

---

### S3 · `Reasons` — dual marquee wall → HOME

`src/components/home/Reasons.tsx` · insert **after `<LittleThingsCards />`**

**Purpose:** volume. `LittleThings` is nine precious cards; this is twenty-four throwaway ones, and the throwaway-ness is the point.

**Structure:** heading, then two full-bleed rows of small pill cards scrolling in opposite directions.

- Heading: `Reasons`
- Sub-label: `IN NO PARTICULAR ORDER`

**Rows:** row 1 scrolls left, row 2 scrolls right, ~40s and ~52s per loop. Each pill is `glass-bubble`-styled, `px-6 py-4`, `whitespace-nowrap`, `text-white/70 text-sm`. Duplicate the array once for a seamless loop. Mask both edges with a horizontal gradient fade to black (`mask-image` or an overlay gradient), so pills dissolve rather than clip.

**Interaction:** hovering **any** pill pauses **both** rows and lifts that pill (`whileHover={{ y: -6, scale: 1.04 }}`). Clicking a pill expands it into a `glass-panel` line at the section's centre, `font-serif text-2xl md:text-4xl text-white/90`, replacing whatever was there — `AnimatePresence mode="wait"`.
Reduced motion: no marquee. Render all 24 as a static wrapped flex grid.

**The 24 reasons:**
```
You laugh before the joke lands.
You eat what I cook even when I've clearly ruined it.
You say my name like it's two separate words.
You send voice notes instead of typing.
You remember things I only said once.
You're soft with people who can't do anything for you.
You get genuinely excited about small food.
You argue with me about the AC temperature.
You fall asleep mid-sentence.
You still get shy sometimes.
You never make me perform being okay.
You call at odd hours for no reason at all.
You save the last bite for me.
You make plans six years ahead.
You cry at advertisements.
You're stubborn in exactly the right places.
You forgive faster than I deserve.
You dance when you think nobody's watching.
You tell me when I'm wrong.
You're the loudest person in the room and also the kindest.
You send me photos of dogs on the street.
You take forever to get ready and it is always worth it.
You say "we" without thinking about it.
You picked me too.
```

---

### S4 · `ADayWithYou` — horizontal scroll strip → HOME

`src/components/home/ADayWithYou.tsx` · insert **after `<Reasons />`**, before `<PickABubble />`

**Purpose:** the site has no horizontal movement anywhere. This adds one, once, and never again.

**Structure:** a tall sticky section (`h-[300vh]`) whose inner track pins and translates on `x` as you scroll — `useScroll` on the container, `useTransform(scrollYProgress, [0, 1], ["2%", "-72%"])`. Six cards in a row, `min-w-[80vw] md:min-w-[38vw]`, `gap-8`.

- Heading (sticky, above the track): `A Day With You`
- Sub-label: `TWENTY-FOUR HOURS, ROUGHLY`

**Card:** `GlassCard` — timestamp in `text-pastel-blue/80 text-xs tracking-[0.2em] font-[var(--font-manrope)]`, title in `font-serif text-xl md:text-2xl text-white`, body in `text-white/70 font-light leading-relaxed`.

| Time | Title | Body |
|---|---|---|
| `07:14` | Good morning | You take nine minutes to reply and I check the phone eleven times. |
| `11:30` | A voice note about nothing | Forty seconds long. No actual topic. Best part of the morning. |
| `14:00` | The lunch call | Half of it is just chewing. Neither of us minds. |
| `18:45` | Kya kar rahi ho | "Nothing." Same as yesterday. Still the best conversation of the day. |
| `21:30` | Kitchen chaos | I cook, you supervise, something burns, we eat it anyway. |
| `01:12` | One more thing | We both said goodnight over an hour ago. |

A thin progress line under the track fills with `scrollYProgress` — `bg-gradient-to-r from-white to-pastel-pink`, matching the vertical line in `OurStoryTimeline`.
**Mobile:** below `md`, drop the pin entirely — render a normal vertical stack. Do not ship a scroll-jacked strip on a phone.
Reduced motion: same vertical stack at all widths.

---

### S5 · `AskMeAnything` — question cards → LAB

`src/components/lab/AskMeAnything.tsx` · add to `src/app/lab/page.tsx` **after `<MemoryBubble />`**, inside the existing `max-w-6xl` flow, preceded by the same `pt-16 border-t border-white/10` divider treatment already used there.

**Purpose:** `MessageGenerator` gives random output. This gives *specific* answers to the specific questions that actually get asked.

**Structure:** heading, then a 2-column grid (`grid-cols-1 md:grid-cols-2`, `gap-6`) of eight question cards. Click expands the answer inline within the card — accordion behaviour, one open at a time, `AnimatePresence` + `height: auto`.

- Heading: `Ask Me Anything`
- Sub-label: `TAP A QUESTION. I ANSWERED HONESTLY.`

Question in `font-serif text-white/90 text-lg`, a `ChevronDown` from lucide rotating 180° on open, answer in `text-white/70 font-light leading-relaxed pt-6 border-t border-white/10 mt-6`.

**The eight:**

| Question | Answer |
|---|---|
| Do you still find me pretty? | More than at the start, which is unfair, because I've built up no immunity at all. You walk in and I lose track of whatever I was saying. |
| What if I change? | Then I'll learn the new you. That isn't a threat to me, that's the actual plan. I didn't sign up for one fixed version of a person. |
| What do you love that I hate about myself? | The way you overthink everything. I know it exhausts you. But it comes from the same place as how carefully you love people, and I'm not going to ask you to lose it. |
| Will you get bored of me? | You have never once been the same person two weeks running. Bored is genuinely not the risk here. |
| What actually scares you? | Not fights. Not distance. Just the idea of some version of my life where I don't get to tell you things first. |
| What's your favourite thing about us? | That none of it is performed. We're not an impressive couple. We're just easy with each other, and easy turns out to be rare. |
| What happens when we fight? | We will. We do. I care far more about how fast we find our way back than about whether we get there. |
| Do you think about the future? | Constantly, and in far too much detail. Ask me about the kitchen sometime. |

---

### S6 · `TimeCapsule` — locked letters → VAULT

`src/components/vault/TimeCapsule.tsx` · add to `src/app/vault/page.tsx` **after `<ForYouRecommendations />`, before `<SecretArchive />`**, wrapped in the same `max-w-6xl mx-auto px-4` + gradient divider pattern the neighbouring sections use.

**Purpose:** the vault holds things already written. This holds things **not yet allowed to be read** — the only section on the site with a future tense.

- Heading: `08 — The Time Capsule` (match the exact numbered-heading style of `01 — The Library`)
- Sub-label: `SOME THINGS AREN'T READY YET`

**Structure:** grid of six cards, `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`, `gap-6`.

**Locked card:** a lucide `Lock` icon in `text-pastel-lavender/50`; the title readable; the body rendered **blurred and unselectable** (`blur-sm select-none pointer-events-none opacity-40`); a live countdown beneath in `text-pastel-blue/80 text-xs tracking-[0.2em]` — `237 DAYS 04 HRS`. Hovering a locked card nudges it and shows `NOT YET` in place of the countdown.

**Unlocked card:** `Unlock` icon in `text-pastel-mint/60`, blur removed, full text readable, `UNLOCKED` label. First unlock after mount plays a one-time reveal — blur 8px→0, opacity 0.4→1, 1.2s, ease `[0.22, 1, 0.36, 1]`.

Unlock rule: `unlocksAt` ISO date in the past → unlocked. `unlocksAt: null` → **manual**, permanently locked, countdown replaced by the literal text `WHEN IT HAPPENS`.

**The six capsules** (all dates marked ⚠️ for Juzer to set — put them at the top of the array with a comment):

| Title | `unlocksAt` | Body |
|---|---|---|
| Open on our first anniversary | `⚠️ set date` | A year of you. I'm writing this before I know how it went, and I'm still sure it was worth it. |
| Open when we live in the same city | `null` | No more calculating the distance before I make a plan. I've been waiting to write the rest of this one in person. |
| Open on your next birthday | `⚠️ set date` | Another year of you existing, which is still the single best thing that's happened to me. |
| Open the day we get married | `null` | I have had this sentence ready for a long time. It's the only thing in here I already know the ending of. |
| Open after our first real fight | `null` | We survived it. That's the whole letter. Everything else is detail. |
| Open in 2035 | `2035-01-01T00:00:00+05:30` | Hello from a much younger, much more anxious version of me. I hope I was right about you. I was very sure. |

Add the type + array to **`src/data/personal.ts`**, not `vault.ts` — `vault.ts` is curated public content (books, songs), this is private.

---

### S7 · `Footer` — closing → GLOBAL

`src/components/global/Footer.tsx` · render in `src/app/layout.tsx` **inside `<body>`, after `<main>`**

**Purpose:** the site currently just stops. Every page needs an ending.

**Structure:** centered, `py-24`, a hairline `border-t border-white/5` above, then:

- A `Heart` icon, `text-pastel-pink/40`, `w-5 h-5`, gently pulsing (`scale: [1, 1.15, 1]`, 2s, infinite — same as the hero's `♡`)
- `font-serif text-white/80 text-lg`: `Made by Juzer. For Durriya. Only.`
- `text-white/40 text-[10px] tracking-[0.3em] uppercase mt-6`: `OUR LITTLE UNIVERSE · EST. AUGUST 2024`
- `text-white/25 text-[10px] mt-2`: `built at 2am, mostly`

Add `pb-24` clearance so the fixed mobile nav pill (`bottom-6`, `z-50`) never sits on top of the footer text.

---

## 6 · MOTION SPEC — GLOBAL

| Case | Spec |
|---|---|
| Section entrance | `initial={{ opacity: 0, y: 50 }}` → `whileInView={{ opacity: 1, y: 0 }}`, `viewport={{ once: true, margin: "-100px" }}`, `duration: 0.8`, ease `[0.22, 1, 0.36, 1]` |
| Card stagger | `staggerChildren: 0.08`, cap total run at ~1s regardless of count |
| Hover lift | spring `{ stiffness: 300, damping: 20 }` — `GlassCard interactive` already does this, prefer it |
| Ambient float | `y: [0, -10, 0]`, 4–7s, `repeat: Infinity`, `easeInOut`, **desynchronised delays** |
| Expand / collapse | `height: auto` + opacity, 0.5s, ease `[0.22, 1, 0.36, 1]` |
| Exit | ~30% faster than the matching entrance |
| Shared element | `layoutId`, spring `{ stiffness: 300, damping: 30 }` — matches the nav indicator |

Animate `transform`, `opacity`, and `filter` only. **Never animate `width`, `height`, `top`, or `left`** except through `layout` / `height: auto`. Add `willChange: "transform"` on scroll-driven layers only.

---

## 7 · ACCESSIBILITY & PERFORMANCE GATES

Non-negotiable — from the ui-ux-pro-max pre-delivery checklist:

- [ ] Body text ≥ 4.5:1 against its **actual rendered backdrop** — glass over black is fine, glass over a bright video frame is not. Check S1 and S4 specifically.
- [ ] Every interactive element is a real `<button>` or `<a>`, keyboard-reachable, with a **visible focus ring** (`focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black`). Never remove focus outlines — `CustomCursor` hides the system cursor, which makes keyboard focus the *only* affordance for some users.
- [ ] Touch targets ≥ 44×44px with ≥ 8px spacing. The `Reasons` pills and `TimeCapsule` cards are the risk.
- [ ] Icon-only controls carry `aria-label`. Decorative icons carry `aria-hidden="true"`.
- [ ] Expanding cards use `aria-expanded` + `aria-controls`. Overlays use `role="dialog"` + `aria-modal="true"`, trap focus, restore focus to the trigger on close, and close on `Escape`.
- [ ] `prefers-reduced-motion` fully honoured — see each section's note. Verify by toggling it, not by reading the code.
- [ ] No layout shift: every image and video has explicit dimensions or a reserved aspect box.
- [ ] Responsive at **375 / 768 / 1024 / 1440**. Zero horizontal body scroll at any width — `S3` and `S4` are the likely offenders.
- [ ] No emoji standing in for an icon. (The existing `♡` in hero/cards is deliberate typography — leave it.)
- [ ] `cursor-pointer` on everything clickable.

---

## 8 · VERIFICATION — RUN THIS BEFORE REPORTING DONE

Do not tell me it's finished until you have actually done all of this and can quote the output:

1. `npm run lint` → **zero** errors, zero warnings.
2. `npx tsc --noEmit` → clean.
3. `npm run build` → succeeds.
4. `npm run dev`, then **open the browser and look at every page**: `/`, `/lab`, `/vault`.
5. **Check the console on each route — zero hydration errors.** This is the most likely failure. If you see "text content did not match" or "server rendered HTML didn't match", fix it before continuing (see §4.2).
6. Scroll each page top to bottom at **375px** and **1440px**. No horizontal scrollbar. No clipped cards.
7. Click through: every `OpenWhen` envelope opens and closes (X, backdrop, Escape); every `AskMeAnything` card expands; `Reasons` pauses on hover and expands on click; `ADayWithYou` scrolls horizontally on desktop and stacks on mobile; `TimeCapsule` shows correct locked/unlocked states.
8. Toggle `prefers-reduced-motion: reduce` in devtools, reload, and confirm every section still renders complete, readable, and usable.
9. Tab through the whole home page with the keyboard. Every interactive element must show a visible focus ring and be operable with Enter/Space.
10. Screenshot each new section at 1440px and include them in your report.

---

## 9 · REPORT BACK WITH

1. Plan you followed, and anything you deviated from — with the reason.
2. **Which 21st.dev blocks you pulled** — exact registry URLs — and which you hand-built because no block fit. If the MCP server never came up, say so plainly.
3. Which ui-ux-pro-max searches you ran and what you changed as a result.
4. Files created and files edited (the edit list should be exactly: `src/app/page.tsx`, `src/app/lab/page.tsx`, `src/app/vault/page.tsx`, `src/app/layout.tsx`, plus `components.json` and `src/data/personal.ts` created).
5. Output of lint / tsc / build.
6. Screenshots from step 10.
7. **A list of every `⚠️` placeholder Juzer still has to fill in** — the relationship start date and the five capsule dates. Put this last so it's the first thing Juzer sees.

**Do not report success on a partial build.** If a section is blocked, finish every other one completely and tell me exactly which one is unfinished and why.
