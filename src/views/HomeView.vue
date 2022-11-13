<script setup lang="ts">
import QuestionBox from "@/components/QuestionBox.vue";
import Italian from "@/phrases/italian.json";
import { useStatsStore } from "@/stores/stats";
import { getRandomQuestion } from "@/utilities/question";
import { ref } from "vue";

const store = useStatsStore();

const question = ref(getRandomQuestion(Italian, store.stats)!);
const isActive = ref(true);
const questionLang = ref<keyof typeof nameToFlagEmoji>("it");
const answerLang = ref<keyof typeof nameToFlagEmoji>("en");

const nameToFlagEmoji = {
  it: "🇮🇹",
  en: "🇬🇧",
};

function nextQuestion() {
  question.value = getRandomQuestion(Italian, store.stats)!;
  isActive.value = true;
}
function markAnswer(isCorrect: boolean) {
  if (!isActive.value) return;
  store.addStats(question.value.id, isCorrect);
  isActive.value = false;
}
function switchLanguages() {
  const temp = questionLang.value;
  questionLang.value = answerLang.value;
  answerLang.value = temp;
}
</script>

<template>
  <main class="home">
    <h1>
      Learn
      <button @click="switchLanguages">
        {{ nameToFlagEmoji[questionLang] }} to {{ nameToFlagEmoji[answerLang] }}
      </button>
    </h1>
    <QuestionBox
      :question="question"
      :questionLang="questionLang"
      :answerLang="answerLang"
      :isActive="isActive"
      @next="nextQuestion"
      @correct="markAnswer(true)"
      @incorrect="markAnswer(false)"
    />
  </main>
</template>

<style scoped>
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
