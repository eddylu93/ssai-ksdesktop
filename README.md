# ssai-ksdesktop

T05 walking skeleton for the SSAI 快手监控 desktop client. The app is a Tauri 2.x + React 18 + TypeScript 5 single-page desktop UI that only reads structured data from `ssai-server`.

## Prerequisites

- Node.js 20+
- `npm` or `pnpm`
- Rust 1.75+ for Tauri builds

## Development

1. Copy `.env.example` to `.env`.
2. Set `VITE_SERVER_URL` if your `ssai-server` is not running on `http://127.0.0.1:8080`.
3. Install dependencies:

```bash
npm install
```

4. Start the desktop app:

```bash
npm run tauri dev
```

If `ssai-server` is not available, the window should still open and render an error state instead of crashing.

## Build

```bash
npm run tauri build
```

## Server Dependency

This client does not call Kuaishou APIs directly and does not embed secrets. It depends on `ssai-server` for advertiser and snapshot data:

- `GET /api/advertisers`
- `GET /api/advertisers/:id/snapshot/latest`

The default server URL is configured through `VITE_SERVER_URL` in `.env`.
