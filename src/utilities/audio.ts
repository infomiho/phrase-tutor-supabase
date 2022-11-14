import { SUPABASE_URL } from "@/config";
import type { Langauges } from "@/models/question";

export function getFullURL(id: number | string, lang: Langauges): string {
  return `${SUPABASE_URL}/storage/v1/object/public/phrases-tutor-files/${lang}/${id}.mp3`;
}
