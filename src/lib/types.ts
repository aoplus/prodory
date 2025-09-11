export interface Product {
  id: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  pricingTier: string;
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
