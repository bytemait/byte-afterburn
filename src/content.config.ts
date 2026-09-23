import { defineCollection, reference } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

const groups = defineCollection({
  loader: file('src/content/groups.yaml'),
  schema: z.object({
    order: z.number(),
    kind: z.enum(['chapter', 'alumni']),
    title: z.string(),
    heading: z.string().optional(),
    eyebrow: z.string().optional(),
    note: z.string().optional(),
    description: z.string().optional(),
  }),
});

const members = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/members' }),
  schema: z.object({
    name: z.string(),
    short: z.string().optional(),
    role: z.string(),
    group: reference('groups'),
    status: z.enum(['core', 'department', 'alumni']),
    order: z.number().optional(),
    photo: z.string().optional(),
    quote: z.string().optional(),
    tier: z.enum(['lead', 'inner', 'outer']).optional(),
    batch: z.string().optional(),
    portfolio: z.url().optional(),
    linkedin: z.url().optional(),
    github: z.url().optional(),
    twitter: z.string().optional(),
    contributions: z
      .array(
        z.object({
          title: z.string(),
          description: z.string().optional(),
          url: z.url().optional(),
        }),
      )
      .default([]),
    awards: z
      .array(
        z.object({
          title: z.string(),
          date: z.string().optional(),
          detail: z.string().optional(),
          url: z.url().optional(),
        }),
      )
      .default([]),
    projects: z.array(reference('projects')).default([]),
    achievements: z.array(reference('achievements')).default([]),
    career: z
      .array(
        z.object({
          org: z.string(),
          title: z.string(),
          period: z.string(),
        }),
      )
      .default([]),
    publications: z
      .array(
        z.object({
          title: z.string(),
          venue: z.string(),
          url: z.url().optional(),
        }),
      )
      .default([]),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number().optional(),
    links: z
      .object({
        github: z.url().optional(),
        live: z.url().optional(),
      })
      .default({}),
    images: z.array(z.string()).default([]),
    stack: z.array(z.string()).default([]),
    tools: z.array(z.string()).default([]),
    domains: z.array(z.string()).default([]),
    contributors: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
  }),
});

const events = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/events' }),
  schema: z.object({
    name: z.string(),
    type: z.string(),
    date: z.coerce.date(),
    time: z.string(),
    venue: z.string(),
    shortSummary: z.string().optional(),
    shortDescription: z.string(),
    agenda: z
      .array(
        z.object({
          time: z.string(),
          title: z.string(),
          detail: z.string().optional(),
        }),
      )
      .default([]),
    whoCanAttend: z.array(z.string()).default([]),
    ctaLabel: z.string().optional(),
    image: z.string().optional(),
    gallery: z.array(z.string()).default([]),
    registration: z.url().optional(),
  }),
});

const achievements = defineCollection({
  loader: file('src/content/achievements.yaml'),
  schema: z.object({
    name: z.string(),
    tags: z.array(z.string()),
    description: z.string(),
    image: z.string(),
    link: z.string().optional(),
    featured: z.boolean().default(false),
    projects: z.array(reference('projects')).default([]),
    members: z.array(reference('members')).default([]),
    events: z.array(reference('events')).default([]),
  }),
});

export const collections = { groups, members, projects, events, achievements };
