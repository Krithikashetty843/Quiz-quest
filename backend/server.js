const express = require('express');

const app = express();

const PORT = 5000;

app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/', (req, res) => {
  res.json({
    message: 'Quiz Quest backend is running!'
  });
});
app.get('/api/questions', (req, res) => {
  
const questions = [
  // PROGRAMMING — EASY
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
    options: ['HTML', 'CSS', 'Java', 'Python'],
    answer: 1,
    difficulty: 'easy',
    category: 'programming'
  },
  {
    id: 3,
    question: 'Which language runs in a web browser?',
    options: ['C', 'JavaScript', 'SQL', 'C++'],
    answer: 1,
    difficulty: 'easy',
    category: 'programming'
  },
  {
    id: 4,
    question: 'Which HTML tag creates a hyperlink?',
    options: ['<link>', '<a>', '<href>', '<p>'],
    answer: 1,
    difficulty: 'easy',
    category: 'programming'
  },
  {
    id: 5,
    question: 'Which data type stores true or false?',
    options: ['String', 'Number', 'Boolean', 'Array'],
    answer: 2,
    difficulty: 'easy',
    category: 'programming'
  },

  // PROGRAMMING — MODERATE
  {
    id: 6,
    question: 'Which keyword declares a constant in JavaScript?',
    options: ['var', 'let', 'const', 'static'],
    answer: 2,
    difficulty: 'moderate',
    category: 'programming'
  },
  {
    id: 7,
    question: 'Which data structure follows FIFO?',
    options: ['Stack', 'Queue', 'Tree', 'Graph'],
    answer: 1,
    difficulty: 'moderate',
    category: 'programming'
  },
  {
    id: 8,
    question: 'What does SQL stand for?',
    options: [
      'Structured Query Language',
      'Simple Question Language',
      'Standard Quick Language',
      'System Query Logic'
    ],
    answer: 0,
    difficulty: 'moderate',
    category: 'programming'
  },

  // PROGRAMMING — DIFFICULT
  {
    id: 9,
    question: 'Which algorithmic technique uses overlapping subproblems?',
    options: [
      'Dynamic programming',
      'Linear search',
      'Bubble sort',
      'Binary search'
    ],
    answer: 0,
    difficulty: 'difficult',
    category: 'programming'
  },
  {
    id: 10,
    question: 'What is the average time complexity of hash table lookup?',
    options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'],
    answer: 2,
    difficulty: 'difficult',
    category: 'programming'
  },

  // SCIENCE — EASY
  {
    id: 11,
    question: 'Which planet is known as the Red Planet?',
    options: ['Earth', 'Mars', 'Venus', 'Jupiter'],
    answer: 1,
    difficulty: 'easy',
    category: 'science'
  },
  {
    id: 12,
    question: 'What gas do plants absorb from the atmosphere?',
    options: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Hydrogen'],
    answer: 2,
    difficulty: 'easy',
    category: 'science'
  },
  {
    id: 13,
    question: 'What is the chemical formula for water?',
    options: ['CO2', 'H2O', 'O2', 'NaCl'],
    answer: 1,
    difficulty: 'easy',
    category: 'science'
  },

  // SCIENCE — MODERATE
  {
    id: 14,
    question: 'Which part of a cell contains most of its genetic material?',
    options: ['Ribosome', 'Nucleus', 'Cell membrane', 'Cytoplasm'],
    answer: 1,
    difficulty: 'moderate',
    category: 'science'
  },
  {
    id: 15,
    question: 'What is the approximate speed of light in a vacuum?',
    options: [
      '300,000 km/s',
      '30,000 km/s',
      '3,000 km/s',
      '300 km/s'
    ],
    answer: 0,
    difficulty: 'moderate',
    category: 'science'
  },

  // SCIENCE — DIFFICULT
  {
    id: 16,
    question: 'Which particle has a negative electric charge?',
    options: ['Proton', 'Neutron', 'Electron', 'Photon'],
    answer: 2,
    difficulty: 'difficult',
    category: 'science'
  },

  // MATH — EASY
  {
    id: 17,
    question: 'What is 12 × 8?',
    options: ['84', '96', '108', '88'],
    answer: 1,
    difficulty: 'easy',
    category: 'math'
  },
  {
    id: 18,
    question: 'What is the square root of 81?',
    options: ['7', '8', '9', '10'],
    answer: 2,
    difficulty: 'easy',
    category: 'math'
  },
  {
    id: 19,
    question: 'What is 25% of 200?',
    options: ['25', '40', '50', '75'],
    answer: 2,
    difficulty: 'easy',
    category: 'math'
  },

  // MATH — MODERATE
  {
    id: 20,
    question: 'Solve: 2x + 6 = 16. What is x?',
    options: ['4', '5', '6', '8'],
    answer: 1,
    difficulty: 'moderate',
    category: 'math'
  },
  {
    id: 21,
    question: 'What is the sum of the first 10 positive integers?',
    options: ['45', '50', '55', '60'],
    answer: 2,
    difficulty: 'moderate',
    category: 'math'
  },

  // MATH — DIFFICULT
  {
    id: 22,
    question: 'What is the derivative of x²?',
    options: ['x', '2x', 'x²', '2'],
    answer: 1,
    difficulty: 'difficult',
    category: 'math'
  },

  // HISTORY — EASY
  {
    id: 23,
    question: 'Who was the first Prime Minister of India?',
    options: [
      'Mahatma Gandhi',
      'Jawaharlal Nehru',
      'Sardar Patel',
      'Dr. Rajendra Prasad'
    ],
    answer: 1,
    difficulty: 'easy',
    category: 'history'
  },
  {
    id: 24,
    question: 'In which year did India gain independence?',
    options: ['1942', '1945', '1947', '1950'],
    answer: 2,
    difficulty: 'easy',
    category: 'history'
  },
  {
    id: 25,
    question: 'Which ancient civilization built the pyramids at Giza?',
    options: ['Roman', 'Egyptian', 'Greek', 'Mesopotamian'],
    answer: 1,
    difficulty: 'easy',
    category: 'history'
  },

  // HISTORY — MODERATE
  {
    id: 26,
    question: 'Who founded the Maurya Empire?',
    options: [
      'Ashoka',
      'Chandragupta Maurya',
      'Harsha',
      'Akbar'
    ],
    answer: 1,
    difficulty: 'moderate',
    category: 'history'
  },

  // HISTORY — DIFFICULT
  {
    id: 27,
    question: 'The French Revolution began in which year?',
    options: ['1776', '1789', '1815', '1848'],
    answer: 1,
    difficulty: 'difficult',
    category: 'history'
  }
];


  res.json(questions);
});

app.listen(PORT, () => {
  console.log(`Quiz Quest server running on http://localhost:${PORT}`);
});