import fs from 'fs'
import path from 'path'

const DIR = path.join(process.cwd(), 'data', 'json')

export function readData<T = unknown>(resource: string): T {
  const file = path.join(DIR, `${resource}.json`)
  return JSON.parse(fs.readFileSync(file, 'utf8')) as T
}

export function writeData(resource: string, data: unknown): void {
  const file = path.join(DIR, `${resource}.json`)
  fs.writeFileSync(file, JSON.stringify(data, null, 2))
}

export const RESOURCES = ['personal', 'content', 'socials', 'about', 'skills', 'projects', 'experience'] as const
export type Resource = typeof RESOURCES[number]
