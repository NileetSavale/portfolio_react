import { supabase } from './supabase'
import { createClient } from '@supabase/supabase-js'

export const RESOURCES = ['personal', 'content', 'socials', 'about', 'skills', 'projects', 'experience', 'gallery'] as const
export type Resource = typeof RESOURCES[number]

function adminClient() {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!)
}

export async function readData<T = unknown>(resource: Resource): Promise<T> {
  const { data, error } = await supabase
    .from('portfolio_data')
    .select('data')
    .eq('resource', resource)
    .single()
  if (error) throw new Error(`Failed to read ${resource}: ${error.message}`)
  return data.data as T
}

export async function writeData(resource: Resource, value: unknown): Promise<void> {
  const { error } = await adminClient()
    .from('portfolio_data')
    .upsert({ resource, data: value }, { onConflict: 'resource' })
  if (error) throw new Error(`Failed to write ${resource}: ${error.message}`)
}
