// Content collections with strict Zod schemas. Every entry is validated at build time.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const faq = z.object({ q: z.string().min(8), a: z.string().min(20) });

const services = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/services' }),
  schema: z.object({
    title: z.string().min(5),
    order: z.number().int().positive(),
    lead: z.string().min(40),
    // Answer-first capsule for search and AI extraction: 40–60 words.
    capsule: z.string().min(200).max(420),
    why: z.array(z.string().min(10)).min(1),
    scope: z.array(z.string().min(5)).min(2),
    outcomes: z.array(z.string().min(5)).min(2),
    cta: z.string().min(8),
    enquiryCategory: z.enum(['kubernetes', 'vmware', 'sovereign', 'iac', 'finops', 'gcc', 'general']),
    diagram: z.object({ title: z.string(), caption: z.string(), steps: z.array(z.string()).min(3) }),
    faqs: z.array(faq).min(2),
  }),
});

const industries = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/industries' }),
  schema: z.object({
    title: z.string().min(5),
    order: z.number().int().positive(),
    lead: z.string().min(40),
    points: z.array(z.string().min(10)).min(2),
    cta: z.string().min(8),
    enquiryCategory: z.enum(['kubernetes', 'vmware', 'sovereign', 'iac', 'finops', 'gcc', 'general']),
  }),
});

export const collections = { services, industries };
