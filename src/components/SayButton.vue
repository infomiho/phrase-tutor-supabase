<script setup lang="ts">
import type { Question } from "@/models/question";
import type { PropType } from "vue";

const props = defineProps({
  question: {
    type: Object as PropType<Question>,
    required: true,
  },
  lang: {
    type: String as PropType<keyof Question["translations"]>,
    required: true,
  },
});

function say() {
  const audioURL = new URL(
    `../assets/it/${props.question.id}.mpeg`,
    import.meta.url
  ).href;
  const audio = new Audio(audioURL);
  audio.play();
}
</script>

<template>
  <button @click="say" class="play" v-if="lang === 'it'"></button>
</template>

<style scoped>
.play {
  background-color: #fff;
  background-image: url("../assets/sound.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 70%;
  border-radius: 50%;
  border: 1px solid #333;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 30px;
  width: 30px;
}

.play img {
  max-width: 100%;
}
</style>
