const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// --- CONFIGURATION ---
// 1. Get these from your .env
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jtuggwhfuoifcidjyipk.supabase.co';
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_b9Whh7V_umuLLYDBffbd3A_MSVTwhpp';

// 2. SERVICE ROLE KEY (Required for server-side bypass of RLS)
// You must get this from Supabase Dashboard > Project Settings > API
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const BUCKET_NAME = 'Media';

// Check for Service Role Key
if (!SERVICE_ROLE_KEY) {
    console.error('❌ Error: SUPABASE_SERVICE_ROLE_KEY is missing.');
    console.error('>> Please export it in your terminal or add to .env file.');
    console.error('>> Get it from: https://supabase.com/dashboard/project/jtuggwhfuoifcidjyipk/settings/api');
    process.exit(1);
}

// Initialize Supabase Client (Service Role)
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

async function uploadImage(filePath) {
    try {
        console.log(`\n🚀 Starting upload for: ${filePath}`);

        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }

        const fileBuffer = fs.readFileSync(filePath);
        const fileName = path.basename(filePath);
        const fileExt = path.extname(filePath).substring(1); // e.g. jpg

        // Generate unique path in bucket
        const destinationPath = `uploads/${Date.now()}-${fileName}`;

        console.log(`• Uploading to bucket: ${BUCKET_NAME}`);
        console.log(`• Destination: ${destinationPath}`);

        const { data, error } = await supabase.storage
            .from(BUCKET_NAME)
            .upload(destinationPath, fileBuffer, {
                contentType: `image/${fileExt === 'jpg' ? 'jpeg' : fileExt}`,
                upsert: false
            });

        if (error) {
            console.error('❌ Upload failed:', error);
            throw error;
        }

        // Get Public URL
        const { data: { publicUrl } } = supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(destinationPath);

        console.log('✅ Upload successful!');
        console.log('🔗 Public URL:', publicUrl);

        return publicUrl;

    } catch (err) {
        console.error('❌ Unexpected error:', err.message);
    }
}

// --- USAGE ---
// Run: node debug-storage.js <path-to-image>
// Example: node debug-storage.js ./public/images/felix.jpg

const imagePath = process.argv[2];

if (imagePath) {
    uploadImage(imagePath);
} else {
    console.log('ℹ️  Usage: node debug-storage.js <path-to-image>');
    console.log('   Example: node debug-storage.js ./public/images/felix.jpg');
}
