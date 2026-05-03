export interface Ingredient {
  name: string;
  benefit: string;
}

export interface ClinicalResult {
  metric: string;
  value: string;
}

export interface ClinicalResults {
  duration: string;
  results: ClinicalResult[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  collection: string;
  technologies?: string;
  step?: string;
  truth?: string;
  description?: string;
  texture?: string;
  usage?: string;
  imageSrc: string;
  fullPrice: number;
  refillPrice?: number;
  subscriptionPrice?: number;
  subscriptionSavings?: number;
  benefits?: string[];
  keyIngredients?: Ingredient[];
  clinicalResults?: ClinicalResults;
  whoItsFor?: string;
  ageRange?: string;
}
