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
        { id: '0e0ab3ea-7fb4-4c5b-936a-6175d19b897e', url: '/images/covers/journal-darwin.png' },
        { id: '66fc9bbe-3453-464e-b63b-007b214e2c6d', url: '/images/covers/news-waymo.png' },
        { id: '1f18c489-0a1b-4589-a66e-c3568f985598', url: '/images/covers/news-openai.png' },
        { id: '43a00c42-dd17-4860-9298-b7689f14fad1', url: '/images/covers/news-anthropic.png' },
        { id: 'a8d8600b-07bd-485a-ab9a-f6d56029712a', url: '/images/covers/journal-future-work.png' },
        { id: 'a3b0697f-a720-4e6b-b694-7f9fe31c02a1', url: '/images/covers/journal-ai-agents.png' }
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
