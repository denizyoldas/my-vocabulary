## My Vocabulary

A minimal, elegant vocabulary manager built with React, TypeScript, Vite, and Tailwind CSS. Add words with meanings and example sentences, search your list, and practice with built‑in flashcards. Data is saved in your browser via localStorage.

### Features

- **Add words**: Word, meaning, and example sentence with inline validation
- **Search**: Filter by word or meaning
- **Flashcards**: Flip to reveal meaning and example, next/restart controls, progress bar
- **Persistent storage**: Saved locally in the browser using `localStorage`
- **Responsive UI**: Tailwind CSS and `lucide-react` icons

### Tech Stack

- **React 18** + **TypeScript**
- **Vite 5** for fast dev and build
- **Tailwind CSS 3** for styling
- **lucide-react** for icons

### Requirements

- **Node.js ≥ 18**
- npm, pnpm, or yarn

### Getting Started

```bash
# Install dependencies
npm install

# Start the dev server (default: http://localhost:5173)
npm run dev
```

### Available Scripts

- **dev**: Start Vite dev server
  - `npm run dev`
- **build**: Production build to `dist/`
  - `npm run build`
- **preview**: Preview the production build locally
  - `npm run preview`
- **lint**: Run ESLint
  - `npm run lint`

### Project Structure

```text
my-vocabulary/
  ├─ src/
  │  ├─ components/
  │  │  ├─ AddWordModal.tsx       # Modal to add a new word
  │  │  ├─ FlashcardModal.tsx     # Flashcard practice modal
  │  │  └─ WordCard.tsx           # Displays a saved word
  │  ├─ hooks/
  │  │  └─ useVocabulary.ts       # Local state + localStorage persistence
  │  ├─ App.tsx                   # Main UI and layout
  │  ├─ main.tsx                  # App bootstrap
  │  ├─ index.css                 # Tailwind styles
  │  └─ types.ts                  # Shared TypeScript types
  ├─ index.html                   # Vite entry HTML
  ├─ tailwind.config.js           # Tailwind config
  ├─ postcss.config.js            # PostCSS config
  ├─ vite.config.ts               # Vite config
  └─ package.json
```

### How It Works

- Words are stored in `localStorage` under the key `vocabulary-words`.
- The `useVocabulary` hook handles loading, saving, adding, and deleting words.
- `AddWordModal` validates inputs; `WordCard` shows details; `FlashcardModal` provides practice flow.

### Deployment

1. Build the app:
   ```bash
   npm run build
   ```
2. Deploy the `dist/` directory to any static host (Vercel, Netlify, GitHub Pages, etc.).

### Notes

- Data is saved per browser/profile. Clearing site data or switching browsers will reset your list.

### Roadmap Ideas

- Edit existing words
- Import/Export (JSON)
- Tags and filtering
- Spaced repetition scheduling
