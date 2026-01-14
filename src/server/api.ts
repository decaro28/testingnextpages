// src/server/api.ts
export function jsonError(err: unknown) {
  const status =
    typeof (err as any)?.status === "number" && Number.isInteger((err as any).status)
      ? (err as any).status
      : 500;

  const message = (err as any)?.message ? String((err as any).message) : "Unknown error";

  return Response.json({ error: message }, { status });
}
