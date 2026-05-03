import { Router, type IRouter } from "express";
import healthRouter from "./health";
import checkoutRouter from "./checkout";
import storageRouter from "./storage";
import { logger } from "../lib/logger";

const router: IRouter = Router();

router.use(healthRouter);
router.use(checkoutRouter);
router.use(storageRouter);

// CMS routes depend on @workspace/db which requires DATABASE_URL at import time.
// Guard the require so the server starts cleanly when no database is provisioned.
if (process.env.DATABASE_URL) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const cmsRouter = require("./cms").default;
  router.use(cmsRouter);
} else {
  logger.warn("DATABASE_URL is not set — CMS routes disabled");
  router.all("/cms/*path", (_req, res) => {
    res.status(503).json({ error: "CMS features require DATABASE_URL to be configured." });
  });
}

export default router;
