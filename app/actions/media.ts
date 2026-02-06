'use server'

import { createClient } from '@/lib/supabase/server'

export interface MediaFile {
    name: string
    url: string
    createdAt: string
    size: number
}

export async function getMediaFiles(): Promise<MediaFile[]> {
    const supabase = await createClient()

    // Skip auth check for local admin panel
    /*
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        throw new Error('Unauthorized')
    }
    */

    const { data, error } = await supabase.storage.from('Media').list('uploads', {
        limit: 100,
        offset: 0,
        sortBy: { column: 'created_at', order: 'desc' },
    })

    if (error) {
        console.error('Error listing media:', error)
        return []
    }

    console.log('getMediaFiles: Found files:', data?.length)

    if (!data) return []

    // Get public URL for each file
    return data.map((file) => {
        const { data: { publicUrl } } = supabase.storage.from('Media').getPublicUrl(`uploads/${file.name}`)
        return {
            name: file.name,
            url: publicUrl,
            createdAt: file.created_at,
            size: file.metadata?.size || 0
        }
    })
}
