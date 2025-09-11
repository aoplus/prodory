export interface Product {
  id: string;
  title: string;
  tagline: string;
  shortDescription: string;
  longDescription: string;
  features: string[];
  delivery: string;
  value: string;
  pricingNote: string;
  stage: "service" | "productized" | "saas";
  industries: string[];
  description?: string; // Keep this optional for backward compatibility if some old data is still using it
  pricingTier?: string; // Keep this optional for backward compatibility
}

export interface Solution {
  id: string;
  title: string;
  description: string;
  useCases: string[];
  image: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  isFeatured?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  content: string;
  image: string;
}

export interface Bundle {
    id: string;
    title: string;
    description: string;
    products: string[];
}
