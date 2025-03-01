document.addEventListener('DOMContentLoaded', () => {
  const roman = document.body.getAttribute('data-roman');
  let score = parseInt(localStorage.getItem(`${roman}-score`)) || 0;
  const totalQuestions = document.querySelectorAll('.question').length;

  document.querySelectorAll('button[data-answer]').forEach(button => {
    button.addEventListener('click', () => {
      const questionId = button.getAttribute('data-question');
      const correctAnswer = button.getAttribute('data-answer');
      const explanation = button.getAttribute('data-explanation');
      const selectedAnswer = document.querySelector(`input[name="${questionId}"]:checked`);
      const resultDiv = document.getElementById(`result-${questionId}`);

      if (!selectedAnswer) {
        resultDiv.innerHTML = '<span class="error">Choisis une réponse !</span>';
        return;
      }

      const userAnswer = selectedAnswer.value;
      if (userAnswer === correctAnswer) {
        score++;
        resultDiv.innerHTML = `<span class="correct">Bravo !</span> ${explanation}`;
      } else {
        resultDiv.innerHTML = `<span class="error">Faux.</span> Réponse correcte : ${correctAnswer}. ${explanation}`;
      }
      localStorage.setItem(`${roman}-score`, score);
      updateScore(roman, score, totalQuestions);
      button.disabled = true;
    });
  });

  document.getElementById('reset-btn').addEventListener('click', () => {
    score = 0;
    localStorage.setItem(`${roman}-score`, score);
    document.querySelectorAll('.result').forEach(div => div.innerHTML = '');
    document.querySelectorAll('button[data-answer]').forEach(btn => btn.disabled = false);
    updateScore(roman, score, totalQuestions);
  });

  updateScore(roman, score, totalQuestions);
});

function updateScore(roman, score, total) {
  const scoreDiv = document.getElementById('score-final');
  const percent = Math.round((score / total) * 100);
  let message = `Score : ${score}/${total} (${percent}%) - `;
  if (percent < 50) message += "Relis bien les chapitres !";
  else if (percent < 80) message += "Pas mal, continue comme ça !";
  else message += "Excellent, tu es prêt pour le bac !";
  scoreDiv.innerHTML = message;
}
