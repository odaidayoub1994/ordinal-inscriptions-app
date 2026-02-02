# Ordinal Inscriptions App

A Bitcoin Ordinals lookup and exploration app. Search for inscriptions by wallet address and view detailed metadata including content previews, attributes, and genesis transaction info.

## Tech Stack

- **Framework:** Next.js 14 (App Router), React 18, TypeScript
- **UI:** Material-UI 5, Emotion
- **State Management:** TanStack React Query 5
- **HTTP Client:** Axios
- **External API:** [Xverse API](https://api-3.xverse.app)

## Project Structure

```
app/
├── layout.tsx                    # Root layout
├── page.tsx                      # Home — address search & results
├── providers.tsx                 # React Query provider
├── globals.css                   # Global styles (dark theme)
└── inscription/[id]/page.tsx     # Inscription detail view

hooks/
├── useOrdinals.ts                # Hook for fetching ordinals by address
└── useInscription.ts             # Hooks for inscription data & image validation

services/
└── api.ts                        # Axios instance & API functions

types/
└── types.ts                      # TypeScript interfaces

utils/
└── helpers.ts                    # Text formatting utilities
```

## Getting Started

### Prerequisites

- Node.js 20+

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

## Features

- Search Bitcoin Ordinal inscriptions by wallet address
- View inscription list with truncated IDs
- Detailed view with image preview (when content is an image)
- Inscription metadata: number, ID, owner, output value, content type, location, genesis transaction
