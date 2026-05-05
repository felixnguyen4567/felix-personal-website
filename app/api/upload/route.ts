import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: NextRequest) {
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.AUTOMATION_API_KEY}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
        return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    const { error } = await supabase.storage.from('Media').upload(filePath, file);

    if (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data: { publicUrl } } = supabase.storage.from('Media').getPublicUrl(filePath);

    return NextResponse.json({ url: publicUrl }, { status: 200 });
}
