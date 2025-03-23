let quizData = [];
let currentIndex = 0;
let score = 0;
let selected = [];
let currentQuizData = [];

function startQuiz() {
  const count = parseInt(document.getElementById('questionCount').value);
  document.querySelector('.setup-container').style.display = 'none';
  document.getElementById('quiz').style.display = 'block';
  
  let shuffledQuestions = [...quizData];
  for (let i = shuffledQuestions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledQuestions[i], shuffledQuestions[j]] = [shuffledQuestions[j], shuffledQuestions[i]];
  }
  currentQuizData = shuffledQuestions.slice(0, count);
  currentIndex = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  const container = document.getElementById('quiz');
  if (currentIndex >= currentQuizData.length || !currentQuizData[currentIndex]) {
    const percentage = ((score / currentQuizData.length) * 100).toFixed(1);
  container.innerHTML = `
    <div class="results-container">
      <h3>Quiz terminé !</h3>
      <p class="score-percentage">Votre score: ${percentage}%</p>
    </div>
  `;
    return;
  }
  const q = currentQuizData[currentIndex];
  selected = [];

  let html = `<div class="question">${q.question}</div><ul class="choices">`;
  q.choices.forEach((choice, i) => {
    html += `<li><label><input type="checkbox" name="choice" value="${i}"> ${choice}</label></li>`;
  });
  html += '</ul><div class="button-group"><button class="btn check-btn" onclick="checkAnswer()">Vérifier</button><button class="btn next-btn" onclick="nextQuestion()" style="display: none;">Suivant</button></div>';
  container.innerHTML = html;
}

function checkAnswer() {
  const checkboxes = document.querySelectorAll('input[name="choice"]:checked');
  const selectedAnswers = Array.from(checkboxes).map(cb => parseInt(cb.value));
  
  const correctAnswers = currentQuizData[currentIndex].correct_answers;
  const isCorrect = correctAnswers.length === selectedAnswers.length &&
    correctAnswers.every(val => selectedAnswers.includes(val));

  showFeedback(isCorrect);
}

function showFeedback(isCorrect) {
  const container = document.getElementById('quiz');
  const correctAnswers = currentQuizData[currentIndex].correct_answers;
  const selectedAnswers = Array.from(document.querySelectorAll('input[name="choice"]:checked')).map(cb => parseInt(cb.value));
  
  document.querySelectorAll('li').forEach((li, index) => {
    if (correctAnswers.includes(index)) {
      li.classList.add('correct');
    }
    if (selectedAnswers.includes(index) && !correctAnswers.includes(index)) {
      li.classList.add('incorrect');
    }
  });

  if (isCorrect) {
    score++;
  }

  container.querySelector('.next-btn').style.display = 'inline-block';
  container.querySelector('.check-btn').style.display = 'none';
}

function nextQuestion() {
  const container = document.getElementById('quiz');
  currentIndex++;
  container.querySelector('.next-btn').style.display = 'none';
  container.querySelector('.check-btn').style.display = 'inline-block';
  showQuestion();
}

document.addEventListener('DOMContentLoaded', function() {
  const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 10000);

fetch('qcmm_quiz.json', { signal: controller.signal })
  .then(res => {
    document.getElementById('loading').style.display = 'block';
    if (!res.ok) throw new Error('Erreur HTTP ' + res.status);
    return res.json().then(data => {
    if (!Array.isArray(data)) {
      throw new Error('Format de données invalide');
    }
    data.forEach((q, index) => {
      if (!q.question || !q.choices || !q.correct_answers) {
        throw new Error(`Question ${index + 1} manque des propriétés requises`);
      }
      if (!Array.isArray(q.choices) || q.choices.length === 0) {
        throw new Error(`Question ${index + 1}: les choix doivent être un tableau non vide`);
      }
      if (!Array.isArray(q.correct_answers) || q.correct_answers.some(a => a < 0 || a >= q.choices.length)) {
        throw new Error(`Question ${index + 1}: réponses correctes invalides`);
      }
    });
    return data;
  });
  })
  .then(data => {
    quizData = data;
    document.querySelector('.setup-container').style.display = 'block';
  })
  .catch(err => {
    let errorMsg = 'Erreur de chargement : ';
    if (err instanceof TypeError) {
      errorMsg += 'Problème réseau';
    } else if (err.message.startsWith('HTTP')) {
      errorMsg += err.message;
    } else {
      errorMsg += err.message.includes('aborted') ? 'Timeout du serveur' : 
      (err.message.includes('invalid') || err.message.startsWith('Question') ? err.message : 'Format JSON invalide');
    }
    document.getElementById('errors').textContent = errorMsg;
    document.getElementById('errors').style.display = 'block';
  })
  .finally(() => {
    document.getElementById('loading').style.display = 'none';
  });
});