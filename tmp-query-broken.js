const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DIRECT_URL,
        },
    },
});

async function main() {
    const posts = await prisma.post.findMany({
        where: {
            coverImageUrl: {
                contains: 'supabase.co'
            }
        },
        select: {
            id: true,
            title_en: true,
            coverImageUrl: true,
            slug: true,
            type: true
        }
    });
    console.log(JSON.stringify(posts, null, 2));
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
