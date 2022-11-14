<script setup lang="ts">
import { useStatsStore } from "@/stores/stats";
import { usePhrasesStore } from "@/stores/phrases";
import { computed } from "vue";
import { showConfetti } from "@/utilities/confetti";
import ContentLoader from "@/components/ContentLoader.vue";

const store = useStatsStore();
const phrasesStore = usePhrasesStore();

const questions = computed(() => phrasesStore.phrases);

const data = computed(() => {
  return questions.value
    .map((question) => {
      const stats = store.stats[question.id];
      return {
        ...question,
        stats: {
          total: stats?.total || 0,
          correctPercentage:
            stats && stats.total > 0
              ? Math.floor((stats.correct / stats.total) * 10000) / 100
              : null,
        },
      };
    })
    .sort((a, b) => {
      if (a.stats.correctPercentage === null) {
        return 1;
      }
      if (b.stats.correctPercentage === null) {
        return -1;
      }
      return a.stats.correctPercentage - b.stats.correctPercentage;
    });
});

function clearStats() {
  store.clearStats();
  showConfetti();
}
</script>

<template>
  <div class="stats">
    <p class="summary">
      <strong
        >{{ store.summary.total }} phrases played /
        {{ store.summary.correctPercentage }}% success</strong
      >
    </p>
    <p>
      If you want to restart, you can
      <button class="a" @click="clearStats">delete your stats</button>.
    </p>
    <ContentLoader v-if="phrasesStore.isLoading" />
    <template v-else>
      <div class="stats-boxes">
        <div
          v-for="question in data"
          :key="question.id"
          :class="{
            low:
              question.stats.correctPercentage !== null &&
              question.stats.correctPercentage < 50 &&
              question.stats.total !== 0,
          }"
          class="stats-box"
        >
          <div class="stats-box-phrase">
            <div class="stats-box-phrase__phrase">
              {{ question.translations.it }}
              <span v-if="question.stats.total === 0" class="new-tag">New</span>
            </div>
            <div class="stats-box-phrase__translations">
              {{ question.translations.en }}
            </div>
          </div>
          <div
            class="stats-box-details"
            v-if="question.stats.correctPercentage !== null"
          >
            {{ question.stats.correctPercentage }}%
            <span v-if="question.stats.correctPercentage > 70">✨</span>
          </div>
        </div>
      </div>
    </template>
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
  background-color: #00b300;
  color: #fff;
  padding: 0.1rem 0.25rem;
  border-radius: 0.25rem;
  font-size: 0.5em;
  margin-left: 0.25rem;
  white-space: nowrap;
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

.summary {
  font-size: 1.25rem;
}

.stats-boxes {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 0.5rem;
}

.stats-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-radius: 0.25rem;
  background-color: #fff;
  border: 3px solid #eee;
  transition: background 0.2s ease-in-out;
}

.stats-box:hover {
  background-color: #f5f5f5;
}

.stats-box-phrase {
  flex: 1;
  margin-right: 1rem;
}

.stats-box-phrase__phrase {
  font-size: 1.25rem;
  font-weight: 700;
  display: flex;
  align-items: center;
}

.stats-box-phrase__translations {
  color: #666;
}

.stats-box-details {
  font-size: 1.25rem;
  font-weight: bold;
  color: #333;
}

.stats-box.low {
  background-color: rgba(255, 0, 0, 0.05);
  border-color: rgba(255, 0, 0, 0.1);
}
</style>
