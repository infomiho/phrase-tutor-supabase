<script setup lang="ts">
import Italian from "@/phrases/italian.json";
import { useStatsStore } from "@/stores/stats";
import { computed } from "vue";
const store = useStatsStore();

const data = computed(() => {
  return Italian.map((question) => {
    const stats = store.stats[question.id];
    return {
      ...question,
      stats: {
        total: stats?.total || 0,
        correctPercentage: stats
          ? Math.floor((stats.correct / stats.total) * 10000) / 100
          : 0,
      },
    };
  });
});
</script>

<template>
  <div class="stats">
    <h1>Stats</h1>
    <p>
      Red background means a low percentage, and the new tag means it's still
      not practiced.
    </p>
    <table>
      <thead>
        <tr>
          <th>Phrase</th>
          <th>Percentage</th>
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
            {{ question.translations.en }}
            <span v-if="question.stats.total === 0" class="new-tag">New</span>
          </td>
          <td>{{ question.stats.correctPercentage }}%</td>
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
</style>
