'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'

const BUCKET_NAME = 'media'
const UPLOAD_FOLDER = 'uploads'
const IMAGE_EXTENSIONS = new Set([
    'avif',
    'gif',
    'jpeg',
    'jpg',
    'png',
    'svg',
    'webp',
])

type StorageListItem = {
    id: string | null
    name: string
    created_at: string
    updated_at: string
    last_accessed_at: string | null
    metadata: {
        size?: number
        mimetype?: string
    } | null
}

type MediaImage = {
    name: string
    path: string
    url: string
    size: number
    createdAt: string
}

type StatusMessage = {
    type: 'success' | 'error'
    text: string
} | null

function isImageFile(file: StorageListItem) {
    const mimetype = file.metadata?.mimetype
    if (mimetype?.startsWith('image/')) {
        return true
    }

    const extension = file.name.split('.').pop()?.toLowerCase()
    return extension ? IMAGE_EXTENSIONS.has(extension) : false
}

function sanitizeFileName(fileName: string) {
    const trimmed = fileName.trim().toLowerCase()
    return trimmed.replace(/[^a-z0-9._-]+/g, '-').replace(/-+/g, '-')
}

function formatFileSize(bytes: number) {
    if (!bytes) {
        return '0 B'
    }

    const units = ['B', 'KB', 'MB', 'GB']
    const unitIndex = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1)
    const value = bytes / 1024 ** unitIndex

    return `${value.toFixed(value >= 10 || unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`
}

function formatUploadDate(value: string) {
    if (!value) {
        return 'Unknown'
    }

    return new Intl.DateTimeFormat(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short',
    }).format(new Date(value))
}

export default function AdminMediaPage() {
    const supabase = useMemo(() => createClient(), [])
    const inputRef = useRef<HTMLInputElement>(null)
    const [images, setImages] = useState<MediaImage[]>([])
    const [loading, setLoading] = useState(true)
    const [uploading, setUploading] = useState(false)
    const [dragActive, setDragActive] = useState(false)
    const [deletingPath, setDeletingPath] = useState<string | null>(null)
    const [copiedPath, setCopiedPath] = useState<string | null>(null)
    const [status, setStatus] = useState<StatusMessage>(null)

    const loadImages = useCallback(async () => {
        setLoading(true)
        setStatus(null)

        try {
            const listImages = async (folder: string): Promise<MediaImage[]> => {
                const { data, error } = await supabase.storage.from(BUCKET_NAME).list(folder, {
                    limit: 1000,
                    offset: 0,
                    sortBy: { column: 'created_at', order: 'desc' },
                })

                if (error) {
                    throw error
                }

                const entries = (data ?? []) as StorageListItem[]
                const nestedImages = await Promise.all(
                    entries
                        .filter((entry) => !entry.metadata)
                        .map((entry) => listImages(folder ? `${folder}/${entry.name}` : entry.name))
                )

                const currentImages = entries.filter((entry) => entry.metadata && isImageFile(entry)).map((file) => {
                    const path = folder ? `${folder}/${file.name}` : file.name
                    const {
                        data: { publicUrl },
                    } = supabase.storage.from(BUCKET_NAME).getPublicUrl(path)

                    return {
                        name: file.name,
                        path,
                        url: publicUrl,
                        size: file.metadata?.size ?? 0,
                        createdAt: file.created_at,
                    }
                })

                return [...currentImages, ...nestedImages.flat()]
            }

            const allImages = await listImages('')
            setImages(allImages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
        } catch (error) {
            console.error('Failed to load media library:', error)
            setStatus({ type: 'error', text: 'Failed to load media library.' })
        } finally {
            setLoading(false)
        }
    }, [supabase])

    useEffect(() => {
        loadImages()
    }, [loadImages])

    const uploadFiles = async (files: FileList | File[]) => {
        const imageFiles = Array.from(files).filter((file) => file.type.startsWith('image/'))
        if (imageFiles.length === 0) {
            setStatus({ type: 'error', text: 'Choose at least one image file to upload.' })
            return
        }

        setUploading(true)
        setStatus(null)

        try {
            for (const file of imageFiles) {
                const filePath = `${UPLOAD_FOLDER}/${Date.now()}-${sanitizeFileName(file.name)}`
                const { error } = await supabase.storage.from(BUCKET_NAME).upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: false,
                    contentType: file.type,
                })

                if (error) {
                    throw error
                }
            }

            setStatus({
                type: 'success',
                text: imageFiles.length === 1 ? 'Image uploaded.' : `${imageFiles.length} images uploaded.`,
            })
            await loadImages()
        } catch (error) {
            console.error('Upload failed:', error)
            setStatus({ type: 'error', text: 'Upload failed. Please try again.' })
        } finally {
            setUploading(false)
            if (inputRef.current) {
                inputRef.current.value = ''
            }
        }
    }

    const handleCopy = async (image: MediaImage) => {
        try {
            await navigator.clipboard.writeText(image.url)
            setCopiedPath(image.path)
            window.setTimeout(() => setCopiedPath(null), 1800)
        } catch (error) {
            console.error('Copy failed:', error)
            setStatus({ type: 'error', text: 'Could not copy the image URL.' })
        }
    }

    const handleDelete = async (image: MediaImage) => {
        const confirmed = window.confirm(`Delete "${image.name}" from the media library?`)
        if (!confirmed) {
            return
        }

        setDeletingPath(image.path)
        setStatus(null)

        try {
            const { error } = await supabase.storage.from(BUCKET_NAME).remove([image.path])
            if (error) {
                throw error
            }

            setImages((currentImages) => currentImages.filter((item) => item.path !== image.path))
            setStatus({ type: 'success', text: 'Image deleted.' })
        } catch (error) {
            console.error('Delete failed:', error)
            setStatus({ type: 'error', text: 'Delete failed. Please try again.' })
        } finally {
            setDeletingPath(null)
        }
    }

    return (
        <div className="space-y-6 py-10">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Media Library</h1>
                    <p className="mt-1 text-sm text-muted-foreground">Manage uploaded images from Supabase Storage.</p>
                </div>
                <Button variant="outline" onClick={loadImages} disabled={loading || uploading}>
                    Refresh
                </Button>
            </div>

            <section
                className={`rounded-lg border border-white/10 bg-white/5 p-6 shadow-sm backdrop-blur transition-colors dark:bg-white/5 ${
                    dragActive ? 'border-primary/70 bg-primary/10' : ''
                }`}
                onDragEnter={(event) => {
                    event.preventDefault()
                    setDragActive(true)
                }}
                onDragOver={(event) => {
                    event.preventDefault()
                    setDragActive(true)
                }}
                onDragLeave={(event) => {
                    event.preventDefault()
                    setDragActive(false)
                }}
                onDrop={(event) => {
                    event.preventDefault()
                    setDragActive(false)
                    uploadFiles(event.dataTransfer.files)
                }}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(event) => {
                        if (event.target.files) {
                            uploadFiles(event.target.files)
                        }
                    }}
                />
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-lg font-semibold">Upload Images</h2>
                        <p className="text-sm text-muted-foreground">Drag images here, or choose files from your device.</p>
                    </div>
                    <Button type="button" onClick={() => inputRef.current?.click()} disabled={uploading}>
                        {uploading ? 'Uploading...' : 'Choose Images'}
                    </Button>
                </div>
            </section>

            {status && (
                <div
                    className={`rounded-md border px-4 py-3 text-sm ${
                        status.type === 'success'
                            ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                            : 'border-destructive/30 bg-destructive/10 text-destructive'
                    }`}
                    role="status"
                >
                    {status.text}
                </div>
            )}

            {loading ? (
                <div className="rounded-lg border border-white/10 bg-white/5 p-10 text-center text-sm text-muted-foreground backdrop-blur">
                    Loading media...
                </div>
            ) : images.length === 0 ? (
                <div className="rounded-lg border border-dashed border-white/15 bg-white/5 p-10 text-center text-sm text-muted-foreground backdrop-blur">
                    No images found in the media bucket.
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {images.map((image) => (
                        <article
                            key={image.path}
                            className="overflow-hidden rounded-lg border border-white/10 bg-white/5 shadow-sm backdrop-blur"
                        >
                            <div className="relative aspect-video overflow-hidden bg-black/20">
                                <Image
                                    src={image.url}
                                    alt={image.name}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                />
                            </div>
                            <div className="space-y-4 p-4">
                                <div className="min-w-0">
                                    <h2 className="truncate text-base font-semibold" title={image.name}>
                                        {image.name}
                                    </h2>
                                    <p className="mt-1 truncate text-xs text-muted-foreground" title={image.path}>
                                        {image.path}
                                    </p>
                                </div>

                                <dl className="grid grid-cols-2 gap-3 text-sm">
                                    <div>
                                        <dt className="text-xs uppercase text-muted-foreground">Size</dt>
                                        <dd className="font-medium">{formatFileSize(image.size)}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-xs uppercase text-muted-foreground">Uploaded</dt>
                                        <dd className="font-medium">{formatUploadDate(image.createdAt)}</dd>
                                    </div>
                                </dl>

                                <div className="flex gap-2">
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        size="sm"
                                        className="flex-1"
                                        onClick={() => handleCopy(image)}
                                    >
                                        {copiedPath === image.path ? 'Copied' : 'Copy URL'}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => handleDelete(image)}
                                        disabled={deletingPath === image.path}
                                    >
                                        {deletingPath === image.path ? 'Deleting...' : 'Delete'}
                                    </Button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    )
}
