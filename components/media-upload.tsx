'use client'

import { useRef, useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { getMediaFiles, MediaFile } from '@/app/actions/media'
import Image from 'next/image'

interface MediaUploadProps {
    onUpload: (url: string) => void
}

export function MediaUpload({ onUpload }: MediaUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null)
    const [uploading, setUploading] = useState(false)
    const [open, setOpen] = useState(false)
    const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([])
    const [loadingFiles, setLoadingFiles] = useState(false)

    // Load files when dialog opens
    useEffect(() => {
        if (open) {
            loadMediaFiles()
        }
    }, [open])

    const loadMediaFiles = async () => {
        setLoadingFiles(true)
        try {
            const files = await getMediaFiles()
            setMediaFiles(files)
        } catch (error) {
            console.error('Failed to load media files:', error)
        } finally {
            setLoadingFiles(false)
        }
    }

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
            setOpen(false) // Close dialog on successful upload if open
            // Reload files just in case
            loadMediaFiles()
        } catch (error) {
            console.error('Upload failed:', error)
            alert('Upload failed. Please try again.')
        } finally {
            setUploading(false)
        }
    }

    const handleSelectImage = (url: string) => {
        onUpload(url)
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" type="button">
                    📷 Media Library
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Media Library</DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    <div className="flex items-center gap-4 p-4 border rounded-lg bg-slate-50 dark:bg-slate-900">
                        <span className="text-sm font-medium">Upload New:</span>
                        <input
                            ref={inputRef}
                            type="file"
                            accept="image/*,video/*"
                            onChange={handleUpload}
                            className="hidden"
                        />
                        <Button
                            type="button"
                            size="sm"
                            disabled={uploading}
                            onClick={() => inputRef.current?.click()}
                        >
                            {uploading ? 'Uploading...' : 'Choose File'}
                        </Button>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-sm font-medium text-muted-foreground">Select from Library</h3>
                        {loadingFiles ? (
                            <div className="py-8 text-center text-sm text-muted-foreground">Loading media...</div>
                        ) : mediaFiles.length === 0 ? (
                            <div className="py-8 text-center text-sm text-muted-foreground">No media files found.</div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {mediaFiles.map((file) => (
                                    <div
                                        key={file.name}
                                        className="group relative aspect-square rounded-lg border border-border-light overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                                        onClick={() => handleSelectImage(file.url)}
                                    >
                                        <Image
                                            src={file.url}
                                            alt={file.name}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 50vw, 25vw"
                                        />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                            <span className="text-white text-xs font-bold uppercase tracking-widest">Select</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
