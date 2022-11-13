import type { Question } from "@/models/question";
import type { QuestionStats } from "@/stores/stats";

export function getRandomQuestion(
  questions: Question[],
  stats: QuestionStats
): Question | null {
  // Do roulette wheel selection
  // Based on following score formula:
  // score = (incorrect / total) * 100 + 1
  // score = 100 if total = 0

  // Assign score to each question
  const questionsWithScore = questions.map((question) => {
    const questionStats = stats[question.id];
    const score = questionStats
      ? (questionStats.incorrect / questionStats.total) * 100 + 1
      : 100;
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
