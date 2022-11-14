import { supabase } from "./supabase";

export async function getPhrases(): Promise<PhraseDto[]> {
  const { data, error } = await supabase.from("phrases").select("*");
  if (error) {
    console.log(error);
    return [];
  }
  return data;
}

type PhraseDto = {
  id: number;
  group: string;
  translations_en: string;
  translations_it: string;
};
