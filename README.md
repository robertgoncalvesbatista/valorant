# Valorant Explorer

A Next.js client for browsing playable Valorant agents and maps through the public Valorant API.

## Features

- Selectable map list with a featured map preview.
- Playable agent gallery with portraits and role gradients.
- Agent-detail dialog with agent and role descriptions, plus ability details.
- Map previews with API descriptions and selected callout names.
- Loading presentation based on API response state.

The interface is in Portuguese and is intended to remain a focused data explorer rather than a marketing page.

## Stack

- Next.js 15 and React 19
- TypeScript
- Tailwind CSS
- styled-components
- Valorant API

## Getting Started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Commands

```bash
npm run dev
npm run lint
npm run build
npm run start
```

No test runner or formatter is currently configured.

## API

The application consumes:

- `https://valorant-api.com/v1/maps`
- `https://valorant-api.com/v1/agents?isPlayableCharacter=true`

It displays agent and role descriptions, all returned abilities, map descriptions,
and selected map callouts alongside the existing portraits and map artwork.
The API-facing data shapes are defined in `src/domain/map.ts` and `src/domain/agent.ts`.
