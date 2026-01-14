// src/app/api/db-time/route.ts
import { pool } from "@/server/db";
import { jsonError } from "@/server/api";

export async function GET() {
  try {
    const r = await pool().query("select now() as now"); // matches your template route. :contentReference[oaicite:8]{index=8}
    return Response.json({ now: r.rows[0].now });
  } catch (e) {
    console.error("[api] /api/db-time error:", e);
    return jsonError(e);
  }
}
