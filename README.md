# NullAI

A modern AI tools directory. Browse, search, and explore useful AI tools for videos, images, coding, productivity and more.

**Live:** [nullaii.netlify.app](https://nullaii.netlify.app/)

## Features

- **AI Tools Directory** — Browse a curated collection of AI tools organized by category
- **Real-Time Search** — Search across tool names, descriptions, categories, features, login methods, and more
- **Dynamic Categories** — Filter tools by category (AI Videos, AI Images, Coding, AI Audio, AI Writing, AI Productivity, AI Design, Other)
- **Dark / Light Mode** — Theme toggle with system preference detection and persistence
- **Sorting** — Sort tools alphabetically (A–Z, Z–A) or by default order
- **Tool Details** — Click any tool card to view full details in a modal
- **Responsive Design** — Works on desktop, tablet, and mobile

## Roadmap

- **Bookmarks** — Save favourite AI tools to your local browser (coming soon)

## Tech Stack

- **React 18** — UI framework
- **Vite** — Build tool and dev server
- **Tailwind CSS 3** — Utility-first styling with dark mode support
- **Axios** — HTTP client for API requests
- **React Icons** — Icon library
- **JSON Server** — Local development API

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/nullhackers/nullai.git
   cd nullai
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root:

   ```env
   VITE_API_URL=http://localhost:5000
   ```

### Development

Start the local JSON server and the Vite dev server in two terminals:

```bash
# Terminal 1 — API
npm run server

# Terminal 2 — Frontend
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
```

The build output is in the `dist/` directory. The production build uses `VITE_API_URL` from `.env.production`.

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Base URL of the NullAI API | `http://localhost:5000` (dev) or `https://nullaidb.onrender.com` (prod) |

## Contact

- Twitter: [@nullhackers](https://twitter.com/nullhackers)
