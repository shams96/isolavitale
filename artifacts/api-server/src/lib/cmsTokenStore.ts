import { randomUUID } from "crypto";

const activeSessions = new Set<string>();

export function createSession(): string {
  const token = randomUUID();
  activeSessions.add(token);
  return token;
}

export function isValidSession(token: string): boolean {
  return activeSessions.has(token);
}

export function revokeSession(token: string): void {
  activeSessions.delete(token);
}
