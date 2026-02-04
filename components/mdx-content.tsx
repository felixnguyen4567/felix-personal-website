import { MDXRemote } from 'next-mdx-remote/rsc'
import React from 'react'

const components = {
    h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h1 {...props} className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4" />,
    h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h2 {...props} className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-4 mt-8" />,
    h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h3 {...props} className="scroll-m-20 text-2xl font-semibold tracking-tight mb-4 mt-6" />,
    p: (props: React.HTMLAttributes<HTMLParagraphElement>) => <p {...props} className="leading-7 [&:not(:first-child)]:mt-6" />,
    ul: (props: React.HTMLAttributes<HTMLUListElement>) => <ul {...props} className="my-6 ml-6 list-disc [&>li]:mt-2" />,
    code: (props: React.HTMLAttributes<HTMLElement>) => <code {...props} className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold" />,
}

export function MDXContent({ source }: { source: string }) {
    return (
        <div className="mdx-content">
            <MDXRemote source={source} components={components} />
        </div>
    )
}
