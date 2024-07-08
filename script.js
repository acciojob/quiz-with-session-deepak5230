const questions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        correct: "Paris"
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correct: "4"
    },
    {
        question: "What is the capital of Spain?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        correct: "Madrid"
    },
    {
        question: "What is 3 + 3?",
        options: ["5", "6", "7", "8"],
        correct: "6"
    },
    {
        question: "What is the capital of Germany?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        correct: "Berlin"
    }
];

const quizContainer = document.getElementById('quiz-container');
const submitButton = document.getElementById('submit-btn');
const resultDiv = document.getElementById('result');

// Function to render the quiz
function renderQuiz() {
    quizContainer.innerHTML = '';
    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';

        const questionText = document.createElement('p');
        questionText.textContent = q.question;
        questionDiv.appendChild(questionText);

        q.options.forEach(option => {
            const optionLabel = document.createElement('label');
            const optionInput = document.createElement('input');
            optionInput.type = 'radio';
            optionInput.name = `question-${index}`;
            optionInput.value = option;
            optionInput.checked = getSavedAnswer(index) === option;

            optionInput.addEventListener('change', () => {
                saveAnswer(index, option);
            });

            optionLabel.appendChild(optionInput);
            optionLabel.appendChild(document.createTextNode(option));
            questionDiv.appendChild(optionLabel);
            questionDiv.appendChild(document.createElement('br'));
        });

        quizContainer.appendChild(questionDiv);
    });
}

// Function to save the answer in session storage
function saveAnswer(questionIndex, answer) {
    let progress = JSON.parse(sessionStorage.getItem('progress')) || {};
    progress[questionIndex] = answer;
    sessionStorage.setItem('progress', JSON.stringify(progress));
}

// Function to get the saved answer from session storage
function getSavedAnswer(questionIndex) {
    let progress = JSON.parse(sessionStorage.getItem('progress')) || {};
    return progress[questionIndex];
}

// Function to calculate and display the score
function calculateScore() {
    let progress = JSON.parse(sessionStorage.getItem('progress')) || {};
    let score = 0;

    questions.forEach((q, index) => {
        if (progress[index] === q.correct) {
            score++;
        }
    });

    localStorage.setItem('score', score);
    resultDiv.textContent = `Your score is ${score} out of 5.`;
}

// Event listener for the submit button
submitButton.addEventListener('click', calculateScore);

// Render the quiz on page load
renderQuiz();
