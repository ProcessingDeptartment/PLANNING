# Sales Order Register

A standalone tool for capturing customer orders as they come in — customer, product,
cartons, priority, and preferred shipping date — so nothing gets missed or relies on
verbal "it's urgent" claims. This is intentionally separate from Abagold's main
paperless/production-records project for now; it doesn't touch can production data,
which stays in Syspro.

`index.html` is a single self-contained page — no build step for the front end.

## Storage

Shared storage lives in a small [Neon Function](https://neon.com/docs/compute/functions/overview)
(`functions/orders-api.ts`) backed by its own Postgres database (a tiny `kv_store`
table). Everyone who opens the page reads and writes the same data, so orders show up
on every device. There's no login system, so treat it like a shared spreadsheet — fine
for internal order intake, not a place for anything sensitive.

If the API is unreachable, the page falls back to that browser's `localStorage` so it
still works, just not shared until the connection comes back.

The API's URL is set as `API_URL` near the top of the first `<script>` block in
`index.html`.

### Redeploying the API after changing `functions/orders-api.ts`

```bash
npm install
neon deploy --env .env.local
```

(`neon link` once per machine to connect to the `Sales Order Register` Neon project;
`neon env pull` refreshes `.env.local` with `DATABASE_URL` if needed.)

## Hosting the page

Pushed to GitHub, deployed on Render as a static site — no server-side component is
needed for the front end itself, only for the API above.
