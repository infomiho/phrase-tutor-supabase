import type { Question } from "@/models/question";
import type { QuestionStats } from "@/stores/stats";

export function getRandomQuestion(
  questions: Question[],
  stats: QuestionStats
): Question | null {
  const questionsWithScore = questions.map((question) => {
    const questionStats = stats[question.id];
    const score =
      questionStats && questionStats.total > 0
        ? (questionStats.incorrect / questionStats.total) * 100 + 1
        : 200;
    return { question, score };
  });

  // Do roulette wheel selection
  const totalScore = questionsWithScore.reduce(
    (total, questionWithScore) => total + questionWithScore.score,
    0
  );
  const randomScore = Math.random() * totalScore;
  let currentScore = 0;
  for (const questionWithScore of questionsWithScore) {
    currentScore += questionWithScore.score;
    if (currentScore >= randomScore) {
      return questionWithScore.question;
    }
  }

  return null;
}
