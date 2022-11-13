import JSConfetti from "js-confetti";

const jsConfetti = new JSConfetti();

export function showConfetti() {
  jsConfetti.addConfetti();
}
