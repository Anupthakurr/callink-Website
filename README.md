# Callink — GSM-to-Gemini Live AI Voice Gateway

> **"Your phone number. Your AI agent. $0 telephony."**

[![Download Callink v2.1 for Windows](https://img.shields.io/badge/Download-Callink_v2.1.exe-7C3AED?style=for-the-badge&logo=windows&logoColor=white)](https://pub-fd660d9dc0a946a0b983b5f725bba3ea.r2.dev/Callink_v2.1.exe)

Callink turns any Android phone and personal SIM number into a sub-second AI voice agent. It bridges cellular calls over Bluetooth Hands-Free Profile (HFP/SCO) on a Windows PC straight into Google's Gemini Live multimodal speech-to-speech API (`gemini-3.1-flash-live-preview`).

---

## Key Features

- **$0 Telephony Markup:** No virtual numbers, no Twilio SIP trunking, and no per-minute voice server markups.
- **~800 ms Conversational Latency:** Up to 75% faster than legacy STT &rarr; LLM &rarr; TTS stacks.
- **Native Speech-to-Speech:** Direct bidirectional 16kHz PCM audio streaming over WebSockets.
- **Multilingual Auto-Detection & Code-Switching:** Hindi, English, Hinglish, Spanish, French, German, Japanese, and more.
- **Natural Barge-In:** Instant local RMS VAD muting (<40ms) + Gemini server-side semantic turn completion.
- **Dual-Track Stereo Recording:** Left channel = Caller, Right channel = AI, saved locally alongside JSON transcripts.
- **Local Web Dashboard (localhost:5000):** Live Gateway VU meters, Voice Studio, Recordings Player, Knowledge Base grounder, and AI Persona editor.
- **Windows Resilience:** Native Stay-Awake guard (`SetThreadExecutionState`) + 120ms circular SCO jitter buffer.

---

## Project Structure

```
callink-web/
├── app/
│   ├── benchmark/           # Latency breakdown & interactive pause simulator
│   ├── changelog/           # v1.0.0 release notes & roadmap
│   ├── contact/             # Commercial licensing inquiry form
│   ├── docs/                # Comprehensive setup, Phone Link pairing, barge-in tuning
│   ├── license/             # BSL 1.1 terms & 2029 MIT conversion explainer
│   ├── globals.css          # Obsidian glassmorphic design system tokens & animations
│   ├── layout.tsx           # SEO metadata, Open Graph, Twitter cards, JSON-LD schema
│   └── page.tsx             # Main landing page assembling all 13 interactive sections
├── components/
│   ├── Navbar.tsx           # Sticky glassmorphic navigation bar with mobile drawer
│   ├── Footer.tsx           # Structured site footer with legal disclaimers & credits
│   ├── ui/
│   │   └── Icons.tsx        # High-performance inline SVG icons (GitHub, Twitter/X)
│   └── sections/
│       ├── HeroSection.tsx            # Animated glass mockup, live VU meters, transcript stream
│       ├── ProblemSolutionSection.tsx # Side-by-side legacy vs Callink comparison
│       ├── DemoSection.tsx           # Custom 8:14 audio player with scrubber & channel toggle
│       ├── FeaturesSection.tsx       # 8-card bento grid of core capabilities
│       ├── HowItWorksSection.tsx     # Interactive architecture diagram with clickable nodes
│       ├── BenchmarkSection.tsx      # Stacked latency comparison bar chart & stage table
│       ├── DashboardSection.tsx      # 5-suite tabbed dashboard showcase with browser chrome
│       ├── UseCasesSection.tsx       # 6 real-world prompt & bilingual call snippet cards
│       ├── CostComparisonSection.tsx # Honest cost matrix: Callink vs Twilio/Bolna/Exotel
│       ├── QuickstartSection.tsx     # 3-tab installer (exe/bat/manual) & pairing stepper
│       ├── FAQSection.tsx            # 10-item accordion + interactive RMS slider tool
│       ├── LicenseSection.tsx        # BSL 1.1 3-column explainer (Free vs Commercial vs MIT)
│       └── CTASection.tsx            # Final conversion band: "Give your phone number a brain"
└── public/
    ├── assets/              # Call recordings & audio placeholders
    ├── robots.txt           # Search engine crawler permissions
    └── sitemap.xml          # Search engine sitemap index
```

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start Next.js development server
npm run dev

# 3. Open in browser
http://localhost:3000
```

---

## Production Build & Validation

```bash
# Build the production bundle
npm run build

# Start production server
npm run start
```

---

## Deployment

### Vercel (Recommended)
1. Push this repository to GitHub: `git push origin main`
2. Import the project into [Vercel](https://vercel.com/new).
3. Framework Preset: **Next.js**
4. Deploy!

### Netlify
1. Connect repository in [Netlify](https://app.netlify.com/).
2. Build command: `npm run build`
3. Publish directory: `.next`

---

## License

Callink is licensed under the **Business Source License 1.1 (BSL 1.1)**:
- **Free for Personal, Academic & Research Use** with attribution.
- **Commercial Use** (clinics, salons, businesses, SaaS embedding) requires a commercial agreement.
- **Irrevocably converts to the MIT License on January 1, 2029.**

Created by **Anup Thakur** &copy; 2026.
