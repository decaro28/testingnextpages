// src/server/db.ts
import pg from "pg";

declare global {
  // eslint-disable-next-line no-var
  var __pgPool: pg.Pool | undefined;
}

/**
 * Single cached Pool (same spirit as server/db.js in your template). :contentReference[oaicite:4]{index=4}
 * Works in dev + avoids re-creating pools in serverless hot reload scenarios.
 */
export function pool(): pg.Pool {
  if (globalThis.__pgPool) return globalThis.__pgPool;

  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL missing (server)");

  const p = new pg.Pool({
    connectionString: url,
    // Neon commonly requires TLS; simplest setting from your template. :contentReference[oaicite:5]{index=5}
    ssl: { rejectUnauthorized: false },
  });

  p.on("error", (err) => {
    console.error("[db] unexpected idle client error", err);
  });

  globalThis.__pgPool = p;
  return p;
}
