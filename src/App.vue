<script setup lang="ts">
import { computed } from "vue";
import { RouterView, RouterLink } from "vue-router";
import { useGeneralStore } from "./stores/general";
import { useStatsStore } from "./stores/stats";

const store = useStatsStore();
const generalStore = useGeneralStore();
const summary = computed(() => store.summary);
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
    <div>
      <button @click="generalStore.dismissIntro" class="dismiss">Got it</button>
    </div>
  </div>

  <RouterView />
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
  margin-bottom: 1rem;
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
  margin-top: 1rem;
  cursor: pointer;
}
button.dismiss:hover {
  background-color: #eee;
}
</style>
