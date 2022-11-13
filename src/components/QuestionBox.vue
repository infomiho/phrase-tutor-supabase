<script setup lang="ts">
import type { Question } from "@/models/question";
import { ref, type PropType } from "vue";
import SayButton from "@/components/SayButton.vue";

defineProps({
  question: {
    type: Object as PropType<Question>,
    required: true,
  },
  questionLang: {
    type: String as PropType<keyof Question["translations"]>,
    required: true,
  },
  answerLang: {
    type: String as PropType<keyof Question["translations"]>,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
});

const isAnswerVisible = ref(false);
function showAnswer() {
  isAnswerVisible.value = true;
}

const emit = defineEmits(["correct", "incorrect", "next"]);

function correct() {
  emit("correct");
  next();
}
function incorrect() {
  emit("incorrect");
  next();
}

function next() {
  isAnswerVisible.value = false;
  emit("next");
}
function say() {}
</script>

<template>
  <div class="question-box">
    <div class="question-box__question">
      Please translate:
      <div class="question-box__foreign">
        {{ question.translations[questionLang] }}
        <SayButton :question="question" :lang="questionLang" />
      </div>
    </div>
    <button v-if="!isAnswerVisible" @click="showAnswer" class="button">
      Show answer
    </button>
    <template v-if="isAnswerVisible">
      <div v-if="isAnswerVisible" class="question-box__answer">
        <div class="question-box__answer__text">
          {{ question.translations[answerLang] }}
        </div>
        <SayButton :question="question" :lang="answerLang" />
      </div>
      <button @click="correct" class="button correct" :disabled="!isActive">
        I knew it
      </button>
      <button @click="incorrect" class="button incorrect" :disabled="!isActive">
        Nope
      </button>
    </template>
  </div>
</template>

<style scoped>
.question-box {
}
.question-box__question {
  background-color: #eaeaea;
  padding: 1rem;
  margin-bottom: 1rem;
}
.question-box__foreign {
  font-size: 2rem;
  font-weight: bold;
}
.question-box__answer {
  background-color: #fff;
  color: #333;
  border: 1px solid #333;
  padding: 1rem;
  margin: 1rem 0;
  display: flex;
  align-items: center;
}
.question-box__answer__text {
  margin-right: 0.5rem;
}
.button {
  background-color: #3c4048;
  color: #fff;
  border: none;
  padding: 1rem;
  border-radius: 3px;
  cursor: pointer;
}
.button.correct {
  background-color: #00abb3;
}
.button.incorrect {
  background-color: #e5cb9f;
  color: #333;
}
.button + .button {
  margin-left: 0.5rem;
}
.button:disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>
