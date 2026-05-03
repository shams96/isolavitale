import type { Request, Response, NextFunction } from "express";
import { isValidSession } from "../lib/cmsTokenStore.js";

if (!process.env.ADMIN_PASSWORD) {
  if (process.env.NODE_ENV === "production") {
    console.error("FATAL: ADMIN_PASSWORD environment variable is required in production.");
    process.exit(1);
  } else {
    console.warn("WARNING: ADMIN_PASSWORD is not set. Set it before deploying to production.");
  }
}

export function requireCmsAuth(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const token = auth.slice(7);
  if (!isValidSession(token)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}
