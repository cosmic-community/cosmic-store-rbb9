// components/RichTextRenderer.tsx
// Renders resolved rich-text markdown (with embedded block content) as HTML.
// Uses a lightweight markdown parser — no external deps needed for our use case.
import React from 'react'

interface Props {
  content: string
  className?: string
}

/**
 * Very simple markdown -> HTML renderer covering the subset we use:
 * ## headings, ### headings, **bold**, *italic*, - lists, > blockquote,
 * [text](href) links, --- horizontal rules, and plain paragraphs.
 */
function markdownToHtml(md: string): string {
  const lines = md.split('\n')
  const out: string[] = []
  let inList = false
  let inBlockquote = false

  const closeList = () => {
    if (inList) { out.push('</ul>'); inList = false }
  }
  const closeBlockquote = () => {
    if (inBlockquote) { out.push('</blockquote>'); inBlockquote = false }
  }

  const inline = (text: string): string =>
    text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`(.+?)`/g, '<code>$1</code>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-accent underline hover:opacity-80">$1</a>')

  for (const raw of lines) {
    const line = raw.trimEnd()

    if (line === '' || line === '---') {
      closeList()
      closeBlockquote()
      if (line === '---') out.push('<hr class="border-gray-200 my-6" />')
      else out.push('')
      continue
    }

    if (line.startsWith('### ')) {
      closeList(); closeBlockquote()
      out.push(`<h3 class="text-xl font-bold text-ink mt-8 mb-3">${inline(line.slice(4))}</h3>`)
    } else if (line.startsWith('## ')) {
      closeList(); closeBlockquote()
      out.push(`<h2 class="text-2xl font-bold text-ink mt-10 mb-4">${inline(line.slice(3))}</h2>`)
    } else if (line.startsWith('# ')) {
      closeList(); closeBlockquote()
      out.push(`<h1 class="text-3xl font-bold text-ink mt-10 mb-4">${inline(line.slice(2))}</h1>`)
    } else if (line.startsWith('> ')) {
      closeList()
      if (!inBlockquote) { out.push('<blockquote class="border-l-4 border-accent pl-4 italic text-gray-600 my-6">'); inBlockquote = true }
      out.push(`<p>${inline(line.slice(2))}</p>`)
    } else if (line.startsWith('- ')) {
      closeBlockquote()
      if (!inList) { out.push('<ul class="list-disc list-inside space-y-1 text-gray-600 my-3">'); inList = true }
      out.push(`<li>${inline(line.slice(2))}</li>`)
    } else {
      closeList(); closeBlockquote()
      out.push(`<p class="text-gray-600 leading-relaxed my-2">${inline(line)}</p>`)
    }
  }

  closeList()
  closeBlockquote()
  return out.join('\n')
}

export default function RichTextRenderer({ content, className = '' }: Props) {
  const html = markdownToHtml(content)
  return (
    <div
      className={`prose-cosmic ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
