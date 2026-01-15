// src/server/api.ts
export function jsonError(err: unknown) {
  const errRecord =
    typeof err === "object" && err !== null ? (err as Record<string, unknown>) : null;

  const statusValue = errRecord?.status;
  const status =
    typeof statusValue === "number" && Number.isInteger(statusValue) ? statusValue : 500;

  const messageValue = errRecord?.message;
  const message = messageValue ? String(messageValue) : "Unknown error";

  return Response.json({ error: message }, { status });
}
