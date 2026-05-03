import { Router } from "express";
import { db } from "@workspace/db";
import {
  productsTable, insertProductSchema,
  journalPostsTable, insertJournalPostSchema,
  heroSectionsTable, insertHeroSectionSchema,
  mediaAssetsTable, insertMediaAssetSchema,
  siteSettingsTable,
} from "@workspace/db/schema";
import { eq } from "drizzle-orm";
import { requireCmsAuth } from "../middleware/cmsAuth.js";
import { createSession } from "../lib/cmsTokenStore.js";

const router = Router();

// ── Auth (public — no middleware) ────────────────────────────────────────────

router.post("/cms/auth", (req, res) => {
  const { password } = req.body as { password?: string };
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
  if (!ADMIN_PASSWORD) {
    res.status(503).json({ error: "Admin authentication is not configured on this server." });
    return;
  }
  if (typeof password === "string" && password === ADMIN_PASSWORD) {
    const token = createSession();
    res.json({ ok: true, token });
  } else {
    res.status(401).json({ error: "Invalid password" });
  }
});

// All routes below this line require a valid CMS token
router.use(requireCmsAuth);

// ── Products ─────────────────────────────────────────────────────────────────

router.get("/cms/products", async (req, res) => {
  try {
    const products = await db.select().from(productsTable).orderBy(productsTable.sortOrder);
    res.json(products);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/cms/products", async (req, res) => {
  try {
    const parsed = insertProductSchema.parse(req.body);
    const [product] = await db.insert(productsTable).values(parsed).returning();
    res.status(201).json(product);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

router.put("/cms/products/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const parsed = insertProductSchema.partial().parse(req.body);
    const [product] = await db
      .update(productsTable)
      .set({ ...parsed, updatedAt: new Date() })
      .where(eq(productsTable.id, id))
      .returning();
    if (!product) { res.status(404).json({ error: "Not found" }); return; }
    res.json(product);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

router.delete("/cms/products/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await db.delete(productsTable).where(eq(productsTable.id, id));
    res.json({ success: true });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// ── Journal Posts ────────────────────────────────────────────────────────────

router.get("/cms/journal", async (req, res) => {
  try {
    const posts = await db.select().from(journalPostsTable).orderBy(journalPostsTable.createdAt);
    res.json(posts);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/cms/journal", async (req, res) => {
  try {
    const parsed = insertJournalPostSchema.parse(req.body);
    const [post] = await db.insert(journalPostsTable).values(parsed).returning();
    res.status(201).json(post);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

router.put("/cms/journal/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const parsed = insertJournalPostSchema.partial().parse(req.body);
    const [post] = await db
      .update(journalPostsTable)
      .set({ ...parsed, updatedAt: new Date() })
      .where(eq(journalPostsTable.id, id))
      .returning();
    if (!post) { res.status(404).json({ error: "Not found" }); return; }
    res.json(post);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

router.delete("/cms/journal/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await db.delete(journalPostsTable).where(eq(journalPostsTable.id, id));
    res.json({ success: true });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// ── Hero Sections ────────────────────────────────────────────────────────────

router.get("/cms/hero", async (req, res) => {
  try {
    const sections = await db.select().from(heroSectionsTable);
    res.json(sections);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

router.put("/cms/hero/:page", async (req, res) => {
  try {
    const page = req.params.page;
    const parsed = insertHeroSectionSchema.partial().parse(req.body);
    const existing = await db.select().from(heroSectionsTable).where(eq(heroSectionsTable.page, page));
    let section;
    if (existing.length > 0) {
      [section] = await db
        .update(heroSectionsTable)
        .set({ ...parsed, updatedAt: new Date() })
        .where(eq(heroSectionsTable.page, page))
        .returning();
    } else {
      [section] = await db
        .insert(heroSectionsTable)
        .values({ page, ...parsed })
        .returning();
    }
    res.json(section);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

// ── Media Assets ─────────────────────────────────────────────────────────────

router.get("/cms/media", async (req, res) => {
  try {
    const assets = await db.select().from(mediaAssetsTable).orderBy(mediaAssetsTable.uploadedAt);
    res.json(assets);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/cms/media", async (req, res) => {
  try {
    const parsed = insertMediaAssetSchema.parse(req.body);
    const [asset] = await db.insert(mediaAssetsTable).values(parsed).returning();
    res.status(201).json(asset);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

router.delete("/cms/media/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await db.delete(mediaAssetsTable).where(eq(mediaAssetsTable.id, id));
    res.json({ success: true });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// ── Site Settings ─────────────────────────────────────────────────────────────

router.get("/cms/settings", async (req, res) => {
  try {
    const settings = await db.select().from(siteSettingsTable);
    res.json(settings);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

router.put("/cms/settings/:key", async (req, res) => {
  try {
    const key = req.params.key;
    const { value, label } = req.body as { value: string; label?: string };
    const existing = await db.select().from(siteSettingsTable).where(eq(siteSettingsTable.key, key));
    let setting;
    if (existing.length > 0) {
      [setting] = await db
        .update(siteSettingsTable)
        .set({ value, label, updatedAt: new Date() })
        .where(eq(siteSettingsTable.key, key))
        .returning();
    } else {
      [setting] = await db
        .insert(siteSettingsTable)
        .values({ key, value, label })
        .returning();
    }
    res.json(setting);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

// ── Upload presigned URL ───────────────────────────────────────────────────────

router.post("/cms/upload-url", async (req, res) => {
  try {
    const { ObjectStorageService } = await import("../lib/objectStorage.js");
    const svc = new ObjectStorageService();
    const uploadURL = await svc.getObjectEntityUploadURL();
    res.json({ uploadURL });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
