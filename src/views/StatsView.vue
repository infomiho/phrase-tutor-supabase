<script setup lang="ts">
import Italian from "@/phrases/italian.json";
import { useStatsStore } from "@/stores/stats";
import { computed, ref } from "vue";
import { showConfetti } from "@/utilities/confetti";
import type { Langauges } from "@/models/question";

const store = useStatsStore();

const lang = ref<Langauges>("en");

const data = computed(() => {
  return Italian.map((question) => {
    const stats = store.stats[question.id];
    return {
      ...question,
      stats: {
        total: stats?.total || 0,
        correctPercentage:
          stats && stats.total > 0
            ? Math.floor((stats.correct / stats.total) * 10000) / 100
            : 0,
      },
    };
  });
});

function switchLang() {
  if (lang.value === "en") {
    lang.value = "it";
  } else {
    lang.value = "en";
  }
}

function clearStats() {
  store.clearStats();
  showConfetti();
}
</script>

<template>
  <div class="stats">
    <h1>Stats</h1>
    <p>
      Red background means a low percentage, and the new tag means it's still
      not practiced.
    </p>
    <p>
      If you want to restart, you can
      <button class="a" @click="clearStats">delete your stats</button>.
    </p>
    <table>
      <thead>
        <tr>
          <th>
            Phrase
            <button @click="switchLang" class="switch">Switch lang</button>
          </th>
          <th>Success</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="question in data"
          :key="question.id"
          :class="{
            low:
              question.stats.correctPercentage < 50 &&
              question.stats.total !== 0,
          }"
        >
          <td>
            {{ question.translations[lang] }}
            <span v-if="question.stats.total === 0" class="new-tag">New</span>
          </td>
          <td>
            {{ question.stats.correctPercentage }}%
            <span v-if="question.stats.correctPercentage > 70">✨</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
h1 {
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
}
p {
  margin-bottom: 1rem;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  padding: 0.5rem;
}
thead th {
  background-color: #00abb3;
  color: #fff;
  text-align: left;
}
tr.low {
  background-color: #ffcccc;
}
.new-tag {
  /* green */
  background-color: #00b300;
  color: #fff;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  margin-left: 0.5rem;
}
button.a {
  /* like a link */
  background-color: transparent;
  border: none;
  font-size: inherit;
  padding: 0;
  cursor: pointer;
}
button.switch {
  background: rgba(255, 255, 255, 0.5);
  border: none;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  color: #333;
  margin-left: 0.25rem;
  cursor: pointer;
}
</style>
