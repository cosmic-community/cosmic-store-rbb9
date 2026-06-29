// lib/blocks.ts
// Fetches all reusable content blocks from Cosmic and resolves {{block-name /}} tokens
import { cosmic, hasStatus } from '@/lib/cosmic'

export interface Block {
  name: string
  title: string
  content: string
  editor: string
}

export async function getBlocks(): Promise<Block[]> {
  try {
    const response = await (cosmic as any).blocks.find()
    return (response.blocks ?? []) as Block[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    console.error('Failed to fetch blocks:', error)
    return []
  }
}

/**
 * Replace all {{block-name /}} tokens in a rich-text string
 * with the resolved block content.
 */
export function resolveBlocks(content: string, blocks: Block[]): string {
  const blockMap = new Map(blocks.map((b) => [b.name, b.content]))
  return content.replace(/\{\{([\w-]+)\s*\/\}\}/g, (_match, name: string) => {
    return blockMap.get(name) ?? ''
  })
}
