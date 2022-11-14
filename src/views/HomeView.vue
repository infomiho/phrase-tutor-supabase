<script setup lang="ts">
import QuestionBox from "@/components/QuestionBox.vue";
import ContentLoader from "@/components/ContentLoader.vue";
import { useStatsStore } from "@/stores/stats";
import { getRandomQuestion } from "@/utilities/question";
import { computed, ref, watch } from "vue";
import { useGeneralStore } from "@/stores/general";
import { showConfetti } from "@/utilities/confetti";
import { usePhrasesStore } from "@/stores/phrases";
import type { Question } from "@/models/question";

const store = useStatsStore();
const generalStore = useGeneralStore();
const phrasesStore = usePhrasesStore();

const questions = computed(() => phrasesStore.phrases);
const question = ref<Question | null>(null);
const isActive = ref(true);

watch(
  questions,
  (newQuestions) => {
    if (newQuestions.length > 0 && question.value === null) {
      question.value = getRandomQuestion(questions.value, store.stats)!;
    }
  },
  { immediate: true }
);

const nameToFlagEmoji = {
  it: "🇮🇹",
  en: "🇬🇧",
};

function nextQuestion() {
  question.value = getRandomQuestion(questions.value, store.stats)!;
  isActive.value = true;
}
function markAnswer(isCorrect: boolean) {
  if (!question.value) return;
  if (!isActive.value) return;
  if (isCorrect && Math.random() < 0.1) {
    showConfetti();
  }
  store.addStats(question.value.id, isCorrect);
  isActive.value = false;
}
</script>

<template>
  <main class="home">
    <ContentLoader v-if="phrasesStore.isLoading" />
    <div class="content" v-else>
      <h1>
        Learn
        <button @click="generalStore.switchLanguage">
          {{ nameToFlagEmoji[generalStore.questionLang] }} to
          {{ nameToFlagEmoji[generalStore.answerLang] }}
        </button>
      </h1>
      <QuestionBox
        :question="question"
        :questionLang="generalStore.questionLang"
        :answerLang="generalStore.answerLang"
        :isActive="isActive"
        @next="nextQuestion"
        @correct="markAnswer(true)"
        @incorrect="markAnswer(false)"
      />
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
}
.content {
  flex: 1;
  max-width: 800px;
}
h1 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
}
button {
  /* simple white button */
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  color: #333;
  cursor: pointer;
  font-size: inherit;
  padding: 0 0.5rem;
}
</style>
