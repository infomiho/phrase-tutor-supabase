<script setup lang="ts">
import { computed } from "vue";
import { RouterView, RouterLink } from "vue-router";
import { useStatsStore } from "./stores/stats";

const store = useStatsStore();
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
      Total: {{ summary.total }} Correct: {{ summary.correctPercentage }}%
      <router-link to="/stats">View stats</router-link>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  padding: 1rem 0 2rem;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
}

h2 {
  background-color: #00abb3;
  color: #fff;
  display: inline-block;
  font-weight: 700;
  padding: 0.5rem 1rem;
}
</style>
