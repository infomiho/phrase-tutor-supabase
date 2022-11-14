<script setup lang="ts">
import type { Question } from "@/models/question";
import { computed, type PropType } from "vue";

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

const audioURL = computed(
  () => new URL(`../assets/it/${props.question.id}.mp3`, import.meta.url).href
);

const audio = computed(() => new Audio(audioURL.value));

function say() {
  // If audio is playing, stop it and play it again
  if (!audio.value.paused) {
    audio.value.currentTime = 0;
  }
  audio.value.play();
}
</script>

<template>
  <template v-if="lang === 'it'">
    <!-- <audio v-if="onMobileSafari" :src="audioURL" controls></audio> -->
    <button @click="say" class="play"></button>
  </template>
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
