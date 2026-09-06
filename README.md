# Aneesh Albert & Nanda Rajan — Wedding Invitation

A luxury, mobile-first cinematic digital wedding invitation web application.

- **Couple**: Aneesh Albert & Nanda Rajan
- **Date**: 5 October 2026 at 4:00 PM IST
- **Venue**: St. Joseph Malankara Catholic Church, Punalur
- **Google Maps**: [https://maps.app.goo.gl/kZm5MFy6tTdUcsYd6](https://maps.app.goo.gl/kZm5MFy6tTdUcsYd6)

---

## Features

- **Cinematic Minimalist Visual Identity**: Warm ivory/soft cream background (`#FAF7F2`), champagne gold accents, muted taupe, and soft sage details with subtle paper & film grain overlay.
- **Blended Hero Portrait**: Soft radial feathered couple portrait seamlessly dissolving into the parchment canvas.
- **Accurate Countdown Timer**: Timezone-accurate ticker counting down to 5 October 2026, 4:00 PM IST (`Asia/Kolkata`).
- **One-Tap Add to Calendar**: Direct Google Calendar link + instant RFC 5545 `.ics` file generator for iPhone (Apple Calendar) & Outlook.
- **Ambient Music Controller**: Browser autoplay compliant audio player with `♫` / soundbars visualizer, play, pause, mute, and session persistence.
- **Floating Petal Particle System**: Lightweight HTML5 canvas rendering delicate floating petals with `prefers-reduced-motion` compliance.
- **WhatsApp & Social Media Open Graph Preview**: 1200×630 px preview card with safe central framing.
- **Centralized Configuration**: All details, schedule, audio, and images can be edited in `src/config/weddingConfig.js`.

---

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Deployment

### Vercel / Netlify
1. Import this repository.
2. Build command: `npm run build`
3. Output directory: `dist`

### GitHub Pages
1. Go to repository **Settings** → **Pages**.
2. Under **Build and deployment**, select **GitHub Actions** or deploy from branch.
