/**
 * Extracts the first image URL from markdown content
 * Supports both markdown image syntax ![alt](url) and HTML <img> tags
 */
export function extractFirstImageFromContent(content: string | null): string | null {
    if (!content) return null;

    // Match markdown image syntax: ![alt](url)
    const markdownImageRegex = /!\[.*?\]\((.*?)\)/;
    const markdownMatch = content.match(markdownImageRegex);
    if (markdownMatch && markdownMatch[1]) {
        return markdownMatch[1];
    }

    // Match HTML img tags: <img src="url" />
    const htmlImageRegex = /<img[^>]+src=["']([^"']+)["']/i;
    const htmlMatch = content.match(htmlImageRegex);
    if (htmlMatch && htmlMatch[1]) {
        return htmlMatch[1];
    }

    return null;
}

/**
 * Gets the cover image for a post, falling back to the first image in content
 */
export function getPostCoverImage(post: { coverImageUrl: string | null; content_en: string | null }): string | null {
    // If coverImageUrl is set, use it
    if (post.coverImageUrl) {
        return post.coverImageUrl;
    }

    // Otherwise, try to extract the first image from content
    return extractFirstImageFromContent(post.content_en);
}
