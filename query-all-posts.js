const fs = require('fs');
const path = require('path');

// Manually parse env.local
const envPath = path.join(__dirname, '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const parts = line.split('=');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const val = parts.slice(1).join('=').trim().replace(/^["']|["']$/g, '');
      process.env[key] = val;
    }
  });
}

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
        orderBy: {
            createdAt: 'desc'
        },
        take: 10,
        select: {
            id: true,
            title_en: true,
            slug: true,
            type: true,
            published: true,
            createdAt: true
        }
    });
    console.log('Recent 10 posts in Supabase:');
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
