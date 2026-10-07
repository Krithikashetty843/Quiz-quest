const express = require('express');

const app = express();

const PORT = 5000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Quiz Quest backend is running!'
  });
});
app.get('/api/questions', (req, res) => {
  const questions = [
    {
      id: 1,
      question: 'What does HTML stand for?',
      options: [
        'Hyper Text Markup Language',
        'High Text Machine Language',
        'Hyperlinks Text Mark Language',
        'Home Tool Markup Language'
      ],
      answer: 0,
      difficulty: 'easy',
      category: 'programming'
    },
    {
      id: 2,
      question: 'Which language is used for styling web pages?',
      options: [
        'HTML',
        'CSS',
        'Java',
        'Python'
      ],
      answer: 1,
      difficulty: 'easy',
      category: 'programming'
    }
  ];

  res.json(questions);
});

app.listen(PORT, () => {
  console.log(`Quiz Quest server running on http://localhost:${PORT}`);
});