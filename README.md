# Sales Order Register

A standalone tool for capturing customer orders as they come in — customer, product,
cartons, priority, and preferred shipping date — so nothing gets missed or relies on
verbal "it's urgent" claims. This is intentionally separate from Abagold's main
paperless/production-records project for now; it doesn't touch can production data,
which stays in Syspro.

It's a single self-contained file (`index.html`) — no build step, no server, no
external database. Open it in any browser and it works, saving to that browser's
local storage.

## Storage

Orders are saved with `localStorage`, in the browser you're using. They are **not**
shared between devices or browsers — this is deliberately kept small and simple.

## Hosting it "online" so it's reachable from anywhere

Push this folder to a repo and host `index.html` as a static file (e.g. Render static
site, GitHub Pages). No server-side component is needed.
