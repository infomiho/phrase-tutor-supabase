<script setup lang="ts">
import QuestionBox from "@/components/QuestionBox.vue";
import Italian from "@/phrases/italian.json";
import { useStatsStore } from "@/stores/stats";
import { getRandomQuestion } from "@/utilities/question";
import { ref } from "vue";
import JSConfetti from "js-confetti";
import { useGeneralStore } from "@/stores/general";

const jsConfetti = new JSConfetti();

const store = useStatsStore();
const generalStore = useGeneralStore();

const question = ref(getRandomQuestion(Italian, store.stats)!);
const isActive = ref(true);

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
  if (isCorrect && Math.random() < 0.1) {
    jsConfetti.addConfetti();
  }
  store.addStats(question.value.id, isCorrect);
  isActive.value = false;
}
</script>

<template>
  <main class="home">
    <div class="content">
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
