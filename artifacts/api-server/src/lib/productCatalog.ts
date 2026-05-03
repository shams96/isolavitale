const SUBSCRIPTION_DISCOUNT = 0.20;

interface CatalogEntry {
  name: string;
  fullPrice: number;
  refillPrice: number;
}

const CATALOG: ReadonlyMap<string, CatalogEntry> = new Map([
  // Laboratory Collection
  ["cellular-essence",     { name: "THE CELLULAR ESSENCE",     fullPrice: 280, refillPrice: 240 }],
  ["barrier-cream",        { name: "THE BARRIER CREAM",        fullPrice: 220, refillPrice: 200 }],
  ["shield-spf-50",        { name: "THE SHIELD SPF 50",        fullPrice: 180, refillPrice: 190 }],
  ["nocturnal-treatment",  { name: "THE NOCTURNAL TREATMENT",  fullPrice: 320, refillPrice: 240 }],
  ["atmospheric-mist",     { name: "THE ATMOSPHERIC MIST",     fullPrice: 140, refillPrice:  85 }],
  ["purification-cleanser",{ name: "THE PURIFICATION CLEANSER",fullPrice: 120, refillPrice:  75 }],
  ["ocular-complex",       { name: "THE OCULAR COMPLEX",       fullPrice: 380, refillPrice: 165 }],
  // Daily Collection
  ["vitality-essence",     { name: "THE VITALITY ESSENCE",     fullPrice: 160, refillPrice: 240 }],
  ["comfort-cream",        { name: "THE COMFORT CREAM",        fullPrice: 180, refillPrice: 200 }],
  ["daylight-spf-30",      { name: "THE DAYLIGHT SPF 30",      fullPrice: 120, refillPrice: 190 }],
  ["evening-care",         { name: "THE EVENING CARE",         fullPrice: 140, refillPrice: 120 }],
  ["preparation-toner",    { name: "THE PREPARATION TONER",    fullPrice: 100, refillPrice:  85 }],
  ["gentle-cleanser",      { name: "THE GENTLE CLEANSER",      fullPrice:  85, refillPrice:  65 }],
  ["radiant-eye-gel",      { name: "THE RADIANT EYE GEL",      fullPrice: 200, refillPrice: 180 }],
  // Cellular Chronos Collection
  ["clarity-gel",          { name: "THE CLARITY GEL",          fullPrice:  95, refillPrice:  80 }],
  ["prevention-essence",   { name: "THE PREVENTION ESSENCE",   fullPrice: 130, refillPrice: 110 }],
  ["intervention-serum",   { name: "THE INTERVENTION SERUM",   fullPrice: 240, refillPrice: 200 }],
  ["restoration-cream",    { name: "THE RESTORATION CREAM",    fullPrice: 290, refillPrice: 240 }],
]);

export interface ResolvedLineItem {
  name: string;
  unitAmountCents: number;
  quantity: number;
  variant: string;
}

export function resolveLineItem(
  id: string,
  quantity: number,
  variant: "Signature Vessel" | "Refill Cartridge",
  isSubscription: boolean,
): ResolvedLineItem | null {
  const entry = CATALOG.get(id);
  if (!entry) return null;

  const basePrice = variant === "Refill Cartridge" ? entry.refillPrice : entry.fullPrice;
  const price = isSubscription ? Math.round(basePrice * (1 - SUBSCRIPTION_DISCOUNT)) : basePrice;

  const label = isSubscription
    ? `${variant} · Subscribe & Save 20%`
    : variant;

  return {
    name: entry.name,
    unitAmountCents: price * 100,
    quantity,
    variant: label,
  };
}
