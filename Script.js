document.addEventListener('DOMContentLoaded', () => {
    nextButton.classList.add('hide'); 
});

const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('questionContainer');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answerButtons');
const progressBar = document.getElementById('progress-bar');

const quizAppElement = document.getElementById('quiz');
const resultsElement = document.createElement('div');
resultsElement.setAttribute('id', 'results');
resultsElement.classList.add('results', 'hide');
quizAppElement.appendChild(resultsElement);

let shuffledQuestions, currentQuestionIndex;
let score = 0;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    updateProgressBar();
    setNextQuestion();
});

function startGame() {
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    updateProgressBar();
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', () => selectAnswer(button));
        answerButtonsElement.appendChild(button);
    });
}

function selectAnswer(selectedButton) {
    Array.from(answerButtonsElement.children).forEach(button => {
        button.disabled = true;
        setStatusClass(button, button.dataset.correct);
    });

    const correct = selectedButton.dataset.correct;
    if (correct) {
        score++;
    }
    setStatusClass(selectedButton, correct);

    setTimeout(() => {
        if (shuffledQuestions.length > currentQuestionIndex + 1) {
            nextButton.classList.remove('hide');
        } else {
            concludeQuiz();
        }
    }, 1000);
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function concludeQuiz() {
    questionContainerElement.classList.add('hide');
    nextButton.classList.add('hide');

    resultsElement.classList.remove('hide');
    resultsElement.innerHTML = `
        <h2>Quiz Completed!</h2>
        <p>Your score: ${score} out of ${shuffledQuestions.length}</p>
        <button onclick="restartQuiz()">Restart Quiz</button>
    `;
    quizAppElement.appendChild(resultsElement);
}

function restartQuiz() {
    resultsElement.classList.add('hide');
    score = 0;
    currentQuestionIndex = 0;
    updateProgressBar();
    startGame();
}

const questions = [
    {
        question: 'What time is SOTU?',
        answers: [
            { text: '10 am on Saturdays', correct: false },
            { text: '10 am on Mondays', correct: false },
            { text: '9am on Mondays', correct: true },
            { text: '9am on Wednesdays', correct: false }
        ]
    },
    {
        question: 'Which course is not taught in Learnable?',
        answers: [
            { text: 'Front-End', correct: false },
            { text: 'Cybersecurity', correct: true },
            { text: 'Product Design', correct: false },
            { text: 'Web 3', correct: false }
        ]
    },
    {
        question: 'Learnable is Easy',
        answers: [
            { text: 'Very True', correct: false },
            { text: 'Omo', correct: true },
            { text: 'True', correct: false },
            { text: 'Kinda', correct: false }
        ]
    },
    {
        question: 'Learnable is worth it',
        answers: [
            { text: 'Very True', correct: true },
            { text: 'Not True', correct: false },
            { text: 'Maybe', correct: false },
            { text: 'It Depends', correct: false }
        ]
    }
];
