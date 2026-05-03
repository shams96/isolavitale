import { Router, type IRouter } from "express";
import healthRouter from "./health";
import checkoutRouter from "./checkout";
import cmsRouter from "./cms";
import storageRouter from "./storage";

const router: IRouter = Router();

router.use(healthRouter);
router.use(checkoutRouter);
router.use(storageRouter);
router.use(cmsRouter);

export default router;
