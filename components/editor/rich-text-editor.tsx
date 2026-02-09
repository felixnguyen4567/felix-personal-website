'use client'

import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableHeader } from '@tiptap/extension-table-header'
import Image from '@tiptap/extension-image'
import { Markdown } from 'tiptap-markdown'
import { Toolbar } from './toolbar'

interface RichTextEditorProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Table.configure({
                resizable: true,
            }),
            TableRow,
            TableHeader,
            TableCell,
            Image.configure({
                inline: true,
                allowBase64: true,
            }),
            Markdown.configure({
                html: false, // Force markdown output
                transformPastedText: true,
                transformCopiedText: true,
            })
        ],
        immediatelyRender: false,
        content: value,
        editorProps: {
            attributes: {
                class: 'prose dark:prose-invert max-w-none min-h-[300px] max-h-[600px] overflow-y-auto outline-none p-4 rounded-b-md border border-t-0 bg-background',
            },
        },
        onUpdate: ({ editor }) => {
            // Get markdown content
            const markdown = (editor.storage as any).markdown.getMarkdown()
            onChange(markdown)
        },
    })

    // Update editor content if value changes externally (and editor exists)
    // Note: This needs careful handling to avoid cursor jumps / loops.
    // For simple use cases (loading initial data), this useEffect might be enough
    // but often leads to issues during typing if not diffed properly.
    // Given this is an admin panel for single users, we can rely on initial load mostly.
    React.useEffect(() => {
        if (editor && value && (editor.storage as any).markdown.getMarkdown() !== value) {
            // Only update if difference is significant or on initial load to avoid typing loop
            // For now, let's assume one-way binding from form to editor is primary flow
            // and this effect mainly handles the initial load where editor content is empty.
            if (editor.getText() === '' && value) {
                editor.commands.setContent(value)
            }
        }
    }, [value, editor])

    return (
        <div className="flex flex-col border rounded-md shadow-sm">
            <Toolbar editor={editor} />
            <EditorContent editor={editor} placeholder={placeholder} />
        </div>
    )
}
