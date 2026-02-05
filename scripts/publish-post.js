// Native fetch available in Node.js 18+

// API Configuration
const API_URL = 'http://localhost:3000/api/automation';
const API_KEY = process.env.AUTOMATION_API_KEY || 'sb_secret_2zpzAUmwAwY2vrm4-kWqwA_xSUrGReP';

async function publishPost() {
    // Get arguments from command line
    const args = process.argv.slice(2);

    if (args.length < 3) {
        console.error('Usage: node scripts/publish-post.js "Title" "Slug" "Content" [Type] [Published]');
        console.log('Example: node scripts/publish-post.js "My Title" "my-title" "# Hello World" "LOG" "true"');
        process.exit(1);
    }

    const [title, slug, content, type = 'LOG', publishedStr = 'false'] = args;
    const published = publishedStr === 'true';

    console.log(`🚀 Publishing post: "${title}"...`);

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                title_en: title,
                slug: slug,
                content_en: content,
                type: type,
                published: published
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Unknown error');
        }

        console.log('✅ Success! Post created:');
        console.log(`   ID: ${data.post.id}`);
        console.log(`   URL: http://localhost:3000/en/${type.toLowerCase()}s/${slug}`);

    } catch (error) {
        console.error('❌ Failed to publish post:', error.message);
        process.exit(1);
    }
}

publishPost();
