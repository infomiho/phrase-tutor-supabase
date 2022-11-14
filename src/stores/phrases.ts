import { getPhrases } from "@/services/phrases";
import { defineStore } from "pinia";
import { ref } from "vue";
import type { Question } from "@/models/question";

export const usePhrasesStore = defineStore("phrases", () => {
  const phrases = ref<Question[]>([]);
  const isLoading = ref(false);

  async function fetchPhrases(): Promise<void> {
    try {
      isLoading.value = true;
      const phrasesDto = await getPhrases();
      const questions: Question[] = phrasesDto.map((phraseDto) => ({
        id: phraseDto.id,
        group: phraseDto.group,
        translations: {
          en: phraseDto.translations_en,
          it: phraseDto.translations_it,
        },
      }));
      phrases.value = questions;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    fetchPhrases,
    phrases,
    isLoading,
  };
});
