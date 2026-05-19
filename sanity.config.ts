import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemas'
import { structure } from './src/sanity/structure'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  name: 'tvah',
  title: 'Tustin Village Animal Hospital',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: {
        origin:
          typeof window === 'undefined'
            ? process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
            : window.location.origin,
        previewMode: { enable: '/api/draft' },
      },
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
})
