import { defineCollection, z } from 'astro:content'

const experience = defineCollection({
  type: 'content',
  schema: z.object({
    company: z.string(),
    title: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    location: z.string().optional(),
    order: z.number(),
  }),
})

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    client: z.string().optional(),
    url: z.string().url().optional(),
    tech: z.array(z.string()),
    order: z.number(),
  }),
})

const skills = defineCollection({
  type: 'data',
  schema: z.object({
    groups: z.array(
      z.object({
        label: z.string(),
        items: z.array(z.string()),
      })
    ),
  }),
})

const education = defineCollection({
  type: 'data',
  schema: z.object({
    institution: z.string(),
    degree: z.string(),
    year: z.number().optional(),
    order: z.number(),
  }),
})

export const collections = { experience, projects, skills, education }
