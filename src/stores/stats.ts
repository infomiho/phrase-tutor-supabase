import { reactive, computed, ref } from "vue";
import { defineStore } from "pinia";

export type QuestionStats = Record<
  number,
  { total: number; correct: number; incorrect: number }
>;

export const useStatsStore = defineStore("stats", () => {
  const stats = reactive<QuestionStats>({});
  const summary = ref({ total: 0, correctPercentage: 0 });

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
    summary.value = calculateSummary(stats);
  }

  return { stats, addStats, summary };
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
