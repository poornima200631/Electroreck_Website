# Electroreck Society Website

**Technical Society of the Electrical Engineering Department, NIT Kurukshetra**

A complete, responsive, and visually rich website for Electroreck Society — built with HTML5, CSS3, and Vanilla JavaScript, faithfully matching the official Figma design.

---

## 🚀 Running Locally

### Option 1 — Simple (no install)
Open `index.html` directly in your browser (double-click the file).

### Option 2 — Served (recommended, avoids any CORS quirks)
```bash
# Requires Node.js
npx serve .
# then open http://localhost:3000
```

---

## 📁 Project Structure

```
Electroreck_Website/
├── index.html          ← Full website (single page)
├── css/
│   └── style.css       ← Complete Figma-faithful stylesheet
├── js/
│   └── main.js         ← All interactivity (filter, modal, nav)
└── assets/
    └── logo.svg        ← Society logo (SVG, gold bolt motif)
```

---

## ✨ Features

| Feature | Status |
|---------|--------|
| Sticky glass navbar | ✅ |
| Mobile hamburger menu | ✅ |
| Scroll-spy (navbar solidifies) | ✅ |
| Hero section with animated rings | ✅ |
| 4 Event cards (Advanza, DigiSpark, Electrica, Vichwaan) | ✅ |
| Event filter (All / Technical / Cultural / Sports) | ✅ |
| Registration modal with pre-filled event name | ✅ |
| Form validation (name, email, roll, dept, year, terms) | ✅ |
| Success state after valid submission | ✅ |
| About section with feature grid | ✅ |
| Footer with social links | ✅ |
| Responsive: Desktop / Tablet / Mobile | ✅ |
| Accessibility (ARIA labels, roles, focus management) | ✅ |

---

## ⚠️ Placeholders to Update

Before final submission, update in `index.html`:

1. **Event dates** — search `TBD — Update before submission`
2. **Social media links** — find `.social-link` `href="#"` and replace with real URLs
3. **Contact email** — `ee@nitkkr.ac.in` in the footer

---

## 🚢 Deploying to GitHub Pages

```bash
# 1. Create a new repository on GitHub named "Electroreck_Website"
#    (go to github.com → New repository)

# 2. Link and push (replace YOUR_USERNAME):
git remote add origin https://github.com/YOUR_USERNAME/Electroreck_Website.git
git branch -M main
git commit -m "feat: complete Electroreck Society website"
git push -u origin main

# 3. On GitHub:
#    Settings → Pages → Source: Deploy from branch → main / (root) → Save

# 4. Your live URL will be:
#    https://YOUR_USERNAME.github.io/Electroreck_Website/
```

### Alternative: Netlify (drag & drop — fastest)
1. Go to [netlify.com/drop](https://app.netlify.com/drop)
2. Drag and drop the `Electroreck_Website` folder
3. Get an instant live URL

---

## 🎨 Design Reference

Figma prototype: https://ditch-quest-84039321.figma.site/

**Design tokens used:**
- Fonts: `Space Grotesk` (body) · `Syncopate` (headings)
- Black: `#050505` · Charcoal: `#111` · Gold: `#f5b942` · Muted: `#929292`

---

## 📝 Note on Registration

This website has **no backend**. Form submissions show a success screen client-side only — no data is saved or emailed. This is disclosed to the user in the modal and footer.
