import { MDXRemote } from 'next-mdx-remote/rsc'
import React from 'react'
import Image from 'next/image'

const components = {
    // --- Headings ---
    h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h1 {...props} className="text-4xl lg:text-5xl font-display font-bold tracking-tight text-text-main mb-6 mt-12 first:mt-0" />
    ),
    h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h2 {...props} className="text-2xl lg:text-3xl font-display font-semibold tracking-tight text-text-main mb-4 mt-12 first:mt-0 pb-3 border-b border-border-light" />
    ),
    h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h3 {...props} className="text-xl lg:text-2xl font-display font-semibold tracking-tight text-text-main mb-3 mt-8" />
    ),
    h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h4 {...props} className="text-lg font-display font-semibold tracking-tight text-text-main mb-2 mt-6" />
    ),

    // --- Paragraphs ---
    p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
        <p {...props} className="text-base lg:text-lg leading-[1.8] text-text-main/90 mb-6" />
    ),

    // --- Links ---
    a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
        <a
            {...props}
            className="text-primary font-medium underline decoration-primary/30 underline-offset-[3px] hover:decoration-primary transition-all duration-200"
            target={props.href?.startsWith('http') ? '_blank' : undefined}
            rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        />
    ),

    // --- Blockquotes ---
    blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
        <blockquote
            {...props}
            className="my-8 border-l-4 border-primary/60 bg-primary/[0.04] dark:bg-primary/[0.08] rounded-r-xl px-6 py-5 text-text-main/80 italic [&>p]:mb-0 [&>p]:text-base"
        />
    ),

    // --- Lists ---
    ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
        <ul {...props} className="my-6 ml-1 space-y-2 [&>li]:relative [&>li]:pl-6 list-none" />
    ),
    ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => (
        <ol {...props} className="my-6 ml-1 space-y-2 list-none counter-reset-item" />
    ),
    li: (props: React.HTMLAttributes<HTMLLIElement>) => (
        <li
            {...props}
            className="text-base lg:text-lg leading-[1.8] text-text-main/90 mdx-li"
        />
    ),

    // --- Code ---
    code: (props: React.HTMLAttributes<HTMLElement>) => {
        const isInline = !props.className?.includes('language-')
        if (isInline) {
            return (
                <code
                    {...props}
                    className="relative rounded-md bg-primary/[0.08] dark:bg-primary/[0.15] px-[0.4rem] py-[0.2rem] font-mono text-[0.88em] font-medium text-primary break-words"
                />
            )
        }
        return <code {...props} className={`${props.className || ''} font-mono text-sm`} />
    },
    pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
        <pre
            {...props}
            className="my-8 overflow-x-auto rounded-xl bg-[#1e1e2e] dark:bg-[#11111b] text-[#cdd6f4] p-6 text-sm leading-relaxed font-mono shadow-lg border border-white/[0.06]"
        />
    ),

    // --- Horizontal Rule ---
    hr: () => (
        <div className="my-12 flex items-center justify-center gap-3">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-border-light to-transparent" />
            <span className="text-meta text-xs">✦</span>
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-border-light to-transparent" />
        </div>
    ),

    // --- Tables ---
    table: (props: React.HTMLAttributes<HTMLTableElement>) => (
        <div className="my-8 overflow-x-auto rounded-xl border border-border-light shadow-sm">
            <table {...props} className="w-full text-sm text-left" />
        </div>
    ),
    thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
        <thead {...props} className="bg-primary/[0.05] dark:bg-primary/[0.1] text-xs uppercase tracking-wider text-text-muted font-display" />
    ),
    th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
        <th {...props} className="px-5 py-3.5 font-semibold text-text-main/80 border-b border-border-light" />
    ),
    td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
        <td {...props} className="px-5 py-3.5 text-text-main/80 border-b border-border-light last:border-b-0" />
    ),
    tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
        <tr {...props} className="transition-colors hover:bg-primary/[0.02] dark:hover:bg-primary/[0.05]" />
    ),

    // --- Images ---
    img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
        const { alt, ...rest } = props
        const src = props.src as string | undefined
        if (!src) return null

        // Use Next.js Image for optimization if possible
        if (src.startsWith('/') || src.startsWith('http')) {
            return (
                <figure className="my-10">
                    <div className="overflow-hidden rounded-xl shadow-md border border-border-light">
                        {src.startsWith('/') ? (
                            <Image
                                src={src}
                                alt={alt || ''}
                                width={800}
                                height={450}
                                className="w-full h-auto object-cover"
                            />
                        ) : (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={src} alt={alt || ''} className="w-full h-auto object-cover" {...rest} />
                        )}
                    </div>
                    {alt && alt !== '' && (
                        <figcaption className="mt-3 text-center text-sm text-meta italic">
                            {alt}
                        </figcaption>
                    )}
                </figure>
            )
        }

        // Fallback
        // eslint-disable-next-line @next/next/no-img-element
        return <img src={src} alt={alt || ''} className="my-8 rounded-xl max-w-full" {...rest} />
    },

    // --- Strong / Emphasis ---
    strong: (props: React.HTMLAttributes<HTMLElement>) => (
        <strong {...props} className="font-bold text-text-main" />
    ),
    em: (props: React.HTMLAttributes<HTMLElement>) => (
        <em {...props} className="italic text-text-main/80" />
    ),
}

export function MDXContent({ source }: { source: string }) {
    return (
        <div className="mdx-content">
            <MDXRemote source={source} components={components} />
        </div>
    )
}
