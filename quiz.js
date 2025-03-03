function startQuiz(quizData, bookTitle) {
    const chapterSelect = document.getElementById('chapter-select');
    const quizInfo = document.getElementById('quiz-info');
    const questionContainer = document.getElementById('question-container');
    const questionText = document.getElementById('question-text');
    const optionsList = document.getElementById('options-list');
    const submitBtn = document.getElementById('submit-btn');
    const nextBtn = document.getElementById('next-btn');
    const feedback = document.getElementById('feedback');
    const bookTitleElement = document.getElementById('book-title');
    const chapterTitle = document.getElementById('chapter-title');
    const questionNumber = document.getElementById('question-number');
    const totalQuestions = document.getElementById('total-questions');
    const scoreDisplay = document.getElementById('score');

    let currentChapter = 0;
    let currentQuestion = 0;
    let score = 0;

    // Remplir le menu déroulant des chapitres
    quizData.chapters.forEach((chapter, index) => {
        const option = document.createElement('option');
        option.value = index; // Corrigé : "option.value" au lieu de "option mulloption.value"
        option.textContent = chapter.chapter;
        chapterSelect.appendChild(option);
    });

    chapterSelect.addEventListener('change', () => {
        currentChapter = parseInt(chapterSelect.value);
        currentQuestion = 0;
        score = 0;
        scoreDisplay.textContent = score;
        loadQuestion();
    });

    function loadQuestion() {
        const chapter = quizData.chapters[currentChapter];
        const question = chapter.questions[currentQuestion];

        bookTitleElement.textContent = bookTitle;
        chapterTitle.textContent = chapter.chapter;
        questionNumber.textContent = currentQuestion + 1;
        totalQuestions.textContent = chapter.questions.length;
        questionText.textContent = question.question;

        optionsList.innerHTML = '';
        question.options.forEach((option, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <input type="radio" name="option" id="option${index}" value="${option}">
                <label for="option${index}">${option}</label>
            `;
            optionsList.appendChild(li);
        });

        submitBtn.disabled = true;
        nextBtn.disabled = true;
        feedback.textContent = '';

        document.querySelectorAll('input[name="option"]').forEach(input => {
            input.addEventListener('change', () => {
                submitBtn.disabled = false;
            });
        });
    }

    function checkAnswer() {
        const selectedOption = document.querySelector('input[name="option"]:checked').value;
        const correctAnswer = quizData.chapters[currentChapter].questions[currentQuestion].correctAnswer;
        const explanation = quizData.chapters[currentChapter].questions[currentQuestion].explanation;

        if (selectedOption === correctAnswer) {
            score += 10;
            scoreDisplay.textContent = score;
            feedback.textContent = `Correct ! ${getEncouragement()} Explication : ${explanation}`;
            feedback.style.color = 'green';
        } else {
            feedback.textContent = `Incorrect. La bonne réponse était : "${correctAnswer}". Explication : ${explanation}`;
            feedback.style.color = 'red';
        }

        submitBtn.disabled = true;
        nextBtn.disabled = false;
    }

    function getEncouragement() {
        const messages = [
            "Bravo, tu es sur la bonne voie !",
            "Excellent travail, continue comme ça !",
            "Super, tu maîtrises bien !",
            "Génial, quelle perspicacité !"
        ];
        return messages[Math.floor(Math.random() * messages.length)];
    }

    submitBtn.addEventListener('click', checkAnswer);

    nextBtn.addEventListener('click', () => {
        currentQuestion++;
        const chapter = quizData.chapters[currentChapter];
        if (currentQuestion < chapter.questions.length) {
            loadQuestion();
        } else {
            feedback.textContent = `Quiz terminé ! Votre score final est de ${score} points.`;
            nextBtn.disabled = true;
        }
    });

    // Charger la première question
    loadQuestion();
}
