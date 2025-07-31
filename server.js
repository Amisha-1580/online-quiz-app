const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;

const quizQuestions = [
    { question: "Which language runs in a web browser?", options: ["JavaScript", "Python"], answer: "JavaScript" },
    { question: "What does HTML stand for?", options: ["HyperText Markup Language", "HighText Machine Language"], answer: "HyperText Markup Language" },
    { question: "Which is a backend framework?", options: ["React", "Node.js"], answer: "Node.js" },
    { question: "Which CSS framework is used for responsive design?", options: ["Bootstrap", "Laravel"], answer: "Bootstrap" },
    { question: "Which language is used for styling web pages?", options: ["HTML", "CSS"], answer: "CSS" }
];

app.use(express.static(path.join(__dirname, 'public')));

app.get('/quiz-data', (req, res) => {
    const shuffled = quizQuestions.sort(() => 0.5 - Math.random());
    res.json(shuffled);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
