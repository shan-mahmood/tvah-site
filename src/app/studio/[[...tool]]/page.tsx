/**
 * Sanity Studio mounted inside the Next.js app at /studio.
 * Editors visit /studio in the browser to log in and edit content.
 */
import Studio from './Studio'

export const dynamic = 'force-static'
export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  return <Studio />
}