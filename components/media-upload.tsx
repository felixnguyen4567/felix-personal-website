'use client'

import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'

interface MediaUploadProps {
    onUpload: (url: string) => void
}

export function MediaUpload({ onUpload }: MediaUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null)
    const [uploading, setUploading] = useState(false)

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)

        try {
            const formData = new FormData()
            formData.append('file', file)

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            })

            if (!res.ok) {
                throw new Error('Upload failed')
            }

            const { url } = await res.json()
            onUpload(url)
        } catch (error) {
            console.error('Upload failed:', error)
            alert('Upload failed. Please try again.')
        } finally {
            setUploading(false)
        }
    }

    return (
        <div>
            <input
                ref={inputRef}
                type="file"
                accept="image/*,video/*"
                onChange={handleUpload}
                className="hidden"
            />
            <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={uploading}
                onClick={() => inputRef.current?.click()}
            >
                {uploading ? 'Uploading...' : '📷 Upload Media'}
            </Button>
        </div>
    )
}
