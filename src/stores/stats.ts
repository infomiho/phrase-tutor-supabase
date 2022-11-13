import { reactive, computed, ref } from "vue";
import { defineStore } from "pinia";

export type QuestionStats = Record<
  number,
  { total: number; correct: number; incorrect: number }
>;

export const useStatsStore = defineStore("stats", () => {
  const stats = reactive<QuestionStats>(loadStats());

  function addStats(questionId: number, isCorrect: boolean) {
    const question = stats[questionId];
    if (question) {
      question.total += 1;
      if (isCorrect) {
        question.correct += 1;
      } else {
        question.incorrect += 1;
      }
    } else {
      stats[questionId] = {
        total: 1,
        correct: isCorrect ? 1 : 0,
        incorrect: isCorrect ? 0 : 1,
      };
    }
    saveStats(stats);
  }

  const summary = computed(() => calculateSummary(stats));

  function clearStats() {
    Object.keys(stats).forEach((key) => {
      const id = parseInt(key, 10);
      stats[id] = {
        total: 0,
        correct: 0,
        incorrect: 0,
      };
    });
    saveStats(stats);
  }

  return { stats, addStats, summary, clearStats };
});

function calculateSummary(stats: QuestionStats) {
  const summary = Object.values(stats).reduce(
    (acc, { total, correct, incorrect }) => {
      acc.total += total;
      acc.correct += correct;
      acc.incorrect += incorrect;
      return acc;
    },
    { total: 0, correct: 0, incorrect: 0 }
  );
  return {
    total: summary.total,
    correctPercentage:
      summary.total > 0
        ? Math.floor((summary.correct / summary.total) * 10000) / 100
        : 0,
  };
}

function saveStats(stats: QuestionStats) {
  localStorage.setItem("stats", JSON.stringify(stats));
}

function loadStats() {
  const stats = localStorage.getItem("stats");
  if (stats) {
    return JSON.parse(stats);
  }
  return {};
}
