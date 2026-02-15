/**
 * Estimates reading time for a given text content.
 * Assumes average reading speed of 200 words per minute.
 */
export function getReadingTime(content: string | null): string {
    if (!content) return '1 min read'

    const words = content.trim().split(/\s+/).length
    const minutes = Math.max(1, Math.ceil(words / 200))
    return `${minutes} min read`
}
