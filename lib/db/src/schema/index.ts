import { pgTable, text, serial, integer, boolean, timestamp, jsonb, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

// ── Products ────────────────────────────────────────────────────────────────
export const productsTable = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  collection: text("collection").notNull().default("laboratory"),
  technologies: text("technologies"),
  step: text("step"),
  description: text("description"),
  texture: text("texture"),
  usage: text("usage"),
  fullPrice: real("full_price").notNull().default(0),
  refillPrice: real("refill_price").notNull().default(0),
  subscriptionPrice: real("subscription_price"),
  imageUrl: text("image_url"),
  benefits: jsonb("benefits").$type<string[]>().default([]),
  keyIngredients: jsonb("key_ingredients").$type<{ name: string; benefit: string }[]>().default([]),
  clinicalResults: jsonb("clinical_results"),
  whoItsFor: text("who_its_for"),
  isActive: boolean("is_active").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertProductSchema = createInsertSchema(productsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof productsTable.$inferSelect;

// ── Journal Posts ────────────────────────────────────────────────────────────
export const journalPostsTable = pgTable("journal_posts", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt"),
  body: text("body"),
  category: text("category").default("Cellular Science"),
  author: text("author").default("The Isola Vitale Atelier"),
  imageUrl: text("image_url"),
  readTime: integer("read_time").default(6),
  isPublished: boolean("is_published").notNull().default(false),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertJournalPostSchema = createInsertSchema(journalPostsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertJournalPost = z.infer<typeof insertJournalPostSchema>;
export type JournalPost = typeof journalPostsTable.$inferSelect;

// ── Hero Sections ────────────────────────────────────────────────────────────
export const heroSectionsTable = pgTable("hero_sections", {
  id: serial("id").primaryKey(),
  page: text("page").notNull().unique(),
  headline: text("headline"),
  subheadline: text("subheadline"),
  bodyCopy: text("body_copy"),
  ctaLabel: text("cta_label"),
  ctaHref: text("cta_href"),
  imageUrl: text("image_url"),
  videoUrl: text("video_url"),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertHeroSectionSchema = createInsertSchema(heroSectionsTable).omit({ id: true, updatedAt: true });
export type InsertHeroSection = z.infer<typeof insertHeroSectionSchema>;
export type HeroSection = typeof heroSectionsTable.$inferSelect;

// ── Media Assets ────────────────────────────────────────────────────────────
export const mediaAssetsTable = pgTable("media_assets", {
  id: serial("id").primaryKey(),
  filename: text("filename").notNull(),
  objectPath: text("object_path").notNull(),
  mimeType: text("mime_type"),
  sizeBytes: integer("size_bytes"),
  altText: text("alt_text"),
  uploadedAt: timestamp("uploaded_at").notNull().defaultNow(),
});

export const insertMediaAssetSchema = createInsertSchema(mediaAssetsTable).omit({ id: true, uploadedAt: true });
export type InsertMediaAsset = z.infer<typeof insertMediaAssetSchema>;
export type MediaAsset = typeof mediaAssetsTable.$inferSelect;

// ── Site Settings ─────────────────────────────────────────────────────────
export const siteSettingsTable = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  value: text("value"),
  label: text("label"),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertSiteSettingSchema = createInsertSchema(siteSettingsTable).omit({ id: true, updatedAt: true });
export type InsertSiteSetting = z.infer<typeof insertSiteSettingSchema>;
export type SiteSetting = typeof siteSettingsTable.$inferSelect;
