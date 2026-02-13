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
 * Checks if a URL is a valid web image URL (not a local path or MEDIA: prefix)
 */
function isValidImageUrl(url: string): boolean {
    if (!url) return false;
    // Filter out MEDIA: prefixed paths from automation API
    if (url.startsWith('MEDIA:')) return false;
    // Filter out local filesystem paths
    if (url.startsWith('/home/') || url.startsWith('/Users/') || url.startsWith('C:\\')) return false;
    // Must be a valid http(s) URL or relative path starting with /
    return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/');
}

/**
 * Gets the cover image for a post, falling back to the first image in content
 */
export function getPostCoverImage(post: { coverImageUrl: string | null; content_en: string | null }): string | null {
    // If coverImageUrl is set and valid, use it
    if (post.coverImageUrl && isValidImageUrl(post.coverImageUrl)) {
        return post.coverImageUrl;
    }

    // Otherwise, try to extract the first image from content
    const contentImage = extractFirstImageFromContent(post.content_en);
    if (contentImage && isValidImageUrl(contentImage)) {
        return contentImage;
    }

    return null;
}
