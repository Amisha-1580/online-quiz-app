let questions = [];
let currentIndex = 0;
let score = 0;

document.addEventListener('DOMContentLoaded', async () => {
    const res = await fetch('/quiz-data');
    questions = await res.json();
    loadQuestion();
});

function loadQuestion() {
    if (currentIndex < questions.length) {
        const currentQ = questions[currentIndex];
        document.getElementById('question').innerText = currentQ.question;

        const optionsDiv = document.getElementById('options');
        optionsDiv.innerHTML = '';

        currentQ.options.forEach(option => {
            const btn = document.createElement('button');
            btn.classList.add('option-btn');
            btn.innerText = option;
            btn.addEventListener('click', () => selectOption(option));
            optionsDiv.appendChild(btn);
        });
    } else {
        document.getElementById('quiz-box').style.display = 'none';
        document.getElementById('result-box').style.display = 'block';
        document.getElementById('score').innerText = `${score} / ${questions.length}`;
    }
}

function selectOption(selected) {
    const correctAnswer = questions[currentIndex].answer;
    if (selected === correctAnswer) {
        score++;
    }
    currentIndex++;
    loadQuestion();
}

document.getElementById('next-btn').addEventListener('click', () => {
    currentIndex++;
    loadQuestion();
});

document.getElementById('restart-btn').addEventListener('click', async () => {
    const res = await fetch('/quiz-data');
    questions = await res.json();
    currentIndex = 0;
    score = 0;
    document.getElementById('result-box').style.display = 'none';
    document.getElementById('quiz-box').style.display = 'block';
    loadQuestion();
});
