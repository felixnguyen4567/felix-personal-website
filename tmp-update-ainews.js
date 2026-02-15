const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DIRECT_URL,
        },
    },
});

async function main() {
    const updates = [
        { id: '84b6abfe-be48-47a7-9ba9-cef033a61895', url: '/images/covers/news-gemini-flash.png' },
        { id: '4d8fd98d-9114-4303-8cf8-a82a5ac81e13', url: '/images/covers/news-o3-mini.png' },
        { id: '42951c65-a892-462e-a755-76c46e0f99e4', url: '/images/covers/news-claude-computer.png' }
    ];

    for (const update of updates) {
        await prisma.post.update({
            where: { id: update.id },
            data: { coverImageUrl: update.url }
        });
        console.log(`Updated ${update.id} to ${update.url}`);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
