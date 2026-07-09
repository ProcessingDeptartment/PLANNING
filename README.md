# Sales Order Register

A standalone tool for capturing customer orders as they come in — customer, product,
cartons, priority, and preferred shipping date — so nothing gets missed or relies on
verbal "it's urgent" claims. This is intentionally separate from Abagold's main
paperless/production-records project for now; it doesn't touch can production data,
which stays in Syspro.

It's a single self-contained file (`index.html`) — no build step, no server required
to just try it out. Open it in any browser and it works, saving to that browser's
local storage.

## Connecting shared (online) storage — Supabase

By default, orders are only saved in the browser you're using (not shared with other
devices). To make it a real shared register everyone can see from anywhere:

1. Sign up at [supabase.com](https://supabase.com) and create a new project (free
   tier is enough). Save the database password somewhere safe.
2. Once it's provisioned, open the **SQL Editor** and run:

   ```sql
   create table kv_store (
     key text primary key,
     value text not null,
     shared boolean not null default true,
     updated_at timestamptz not null default now()
   );

   alter table kv_store enable row level security;

   create policy "allow anon select" on kv_store for select using (true);
   create policy "allow anon insert" on kv_store for insert with check (true);
   create policy "allow anon update" on kv_store for update using (true);
   ```

3. Go to **Settings → API** and copy:
   - The **Project URL** (e.g. `https://xxxxxxxx.supabase.co`)
   - The **`anon` `public`** API key (not the `service_role` one)
4. Open `index.html` and fill in the two constants near the top of the first
   `<script>` block:

   ```js
   const SUPABASE_URL = 'https://xxxxxxxx.supabase.co';
   const SUPABASE_ANON_KEY = 'ey....';
   ```

5. Reload the page. The banner at the top will switch from "Not yet connected" to
   "Connected to shared storage" once both values are filled in correctly.

**Security note:** the `anon` key is visible in the page source — that's normal for
Supabase's client-side model, but it does mean anyone who has this page (and that key)
can read/write orders under the policy above. There's no login system yet, so treat
this the same as you would a shared spreadsheet: fine for internal order intake, not a
place for anything sensitive.

## Hosting it "online" so it's reachable from anywhere

Once Supabase is connected, the `index.html` file itself still needs to be reachable
from your phone/other devices. Easiest free option: push this folder to a GitHub repo
and turn on **GitHub Pages** (Settings → Pages → deploy from the `main` branch) — you'll
get a public URL like `https://<username>.github.io/<repo>/` that works from anywhere.
