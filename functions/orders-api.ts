import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { attachDatabasePool } from '@neon/functions';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 5 });
attachDatabasePool(pool);

const app = new Hono();
app.use('*', cors());

app.get('/kv', async (c) => {
  const key = c.req.query('key');
  if (!key) return c.json({ error: 'key required' }, 400);
  const { rows } = await pool.query('select value from kv_store where key = $1', [key]);
  return c.json({ value: rows[0]?.value ?? null });
});

app.post('/kv', async (c) => {
  const { key, value } = await c.req.json();
  if (!key || typeof value !== 'string') return c.json({ error: 'key and value required' }, 400);
  await pool.query(
    `insert into kv_store (key, value, updated_at) values ($1, $2, now())
     on conflict (key) do update set value = excluded.value, updated_at = now()`,
    [key, value]
  );
  return c.json({ ok: true });
});

export default app;
