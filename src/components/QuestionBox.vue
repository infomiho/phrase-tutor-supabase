<script setup lang="ts">
import type { Question } from "@/models/question";
import { ref, type PropType } from "vue";
import Sound from "@/assets/sound.svg";

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
  showAnswer();
}
function incorrect() {
  emit("incorrect");
  showAnswer();
}

function next() {
  isAnswerVisible.value = false;
  emit("next");
}
</script>

<template>
  <div class="question-box">
    <div class="question-box__question">
      Please translate:
      <div class="question-box__foreign">
        {{ question.translations[questionLang] }}
        <!-- <button @click="say" class="play"><img :src="Sound" alt=""></button> -->
      </div>
    </div>
    <button @click="correct" class="button correct" :disabled="!isActive">
      I knew it
    </button>
    <button @click="incorrect" class="button incorrect" :disabled="!isActive">
      Nope
    </button>
    <div v-if="isAnswerVisible" class="question-box__answer">
      {{ question.translations[answerLang] }}
    </div>
    <button v-if="isAnswerVisible" @click="next" class="button">Next</button>
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
.play {
  /* rounded play button */
  background-color: #fff;
  border-radius: 50%;
  border: 1px solid #333;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0.2rem;
}
.button:disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>
