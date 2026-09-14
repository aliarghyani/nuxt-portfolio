import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: '**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string(),
        tags: z.array(z.string()),
        image: z.string().optional(),
        socialTitle: z.string().optional(),
        author: z.string().optional(),
        draft: z.boolean().optional(),
        updatedAt: z.string().optional()
      })
    })
  }
})

