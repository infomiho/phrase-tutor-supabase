<script setup lang="ts">
import { computed, onMounted } from "vue";
import { RouterView, RouterLink } from "vue-router";
import { useGeneralStore } from "./stores/general";
import { useStatsStore } from "./stores/stats";
import { usePhrasesStore } from "@/stores/phrases";
import { getFullURL } from "./utilities/audio";

const store = useStatsStore();
const generalStore = useGeneralStore();
const phrasesStore = usePhrasesStore();

const summary = computed(() => store.summary);

function unlockAudio() {
  const audioURL = getFullURL(1, "it");
  const sound = new Audio(audioURL);

  sound.play();
  sound.pause();
  sound.currentTime = 0;

  document.body.removeEventListener("click", unlockAudio);
  document.body.removeEventListener("touchstart", unlockAudio);
}

document.body.addEventListener("click", unlockAudio);
document.body.addEventListener("touchstart", unlockAudio);

onMounted(() => {
  phrasesStore.fetchPhrases();
});
</script>

<template>
  <header>
    <div class="header__title">
      <router-link to="/">
        <h2>Phrase Tutor</h2>
      </router-link>
    </div>
    <div class="header__side">
      {{ summary.total }} times played / {{ summary.correctPercentage }}%
      success
      <router-link to="/stats">View stats</router-link>
    </div>
  </header>

  <div class="intro" v-if="generalStore.isIntroVisible">
    <p>
      Hey, welcome to Phrase Tutor. Let's learn Italian language by learning the
      96 phrases we prepared.
    </p>
    <p>
      The system will first ask you all of the phrases. Then it will prioritise
      the phrases you didn't know. Just keep hitting next until you are 100%
      correct 😊
    </p>
    <p>
      <strong>Quick tutorial:</strong> when you see a phrase, try to remember
      the translation. If you know it, hit "I knew it", otherwise hit "Nope".
    </p>
    <div>
      <button @click="generalStore.dismissIntro" class="dismiss">Got it</button>
    </div>
  </div>

  <RouterView />

  <footer>
    <p>
      Made with ❤️ by
      <a href="https://ilakovac.com" target="_blank">Miho</a>
    </p>
  </footer>
</template>

<style scoped>
header {
  padding: 1rem 0;
}

.header__title {
  margin-bottom: 1rem;
}

h2 {
  background-color: #00abb3;
  color: #fff;
  display: inline-block;
  font-weight: 700;
  padding: 0.5rem 1rem;
  font-size: 1rem;
}

@media (min-width: 768px) {
  header {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    padding: 1rem 0 2rem;
  }

  h2 {
    font-size: 1.5rem;
  }
}

.intro {
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 1rem;
  margin: 0 auto 1rem;
  max-width: 800px;
}

.intro p + p {
  margin-top: 1rem;
}

button.dismiss {
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
}

button.dismiss:hover {
  background-color: #eee;
}

footer {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #ccc;
  text-align: center;
}
</style>
