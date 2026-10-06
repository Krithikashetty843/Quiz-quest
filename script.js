// Elements
const startBtn = document.getElementById('start-btn');
const quizBox = document.getElementById('quiz-box');
const questionText = document.getElementById('question-text');
const optionsBox = document.getElementById('options');
const feedback = document.getElementById('feedback');
const timerEl = document.getElementById('timer');
const nextBtn = document.getElementById('next-btn');
const resultBox = document.getElementById('result-box');
const scoreSummary = document.getElementById('score-summary');
const restartBtn = document.getElementById('restart-btn');
const reviewBtn = document.getElementById('review-btn');
const reviewBox = document.getElementById('review-box');
const reviewList = document.getElementById('review-list');
const reviewFilter = document.getElementById('review-filter');
const leaderboard = document.getElementById('leaderboard');
const usernameInput = document.getElementById('username');
const categorySelect = document.getElementById('category-select');
const difficultySelect = document.getElementById('difficulty-select');
const questionCountSelect = document.getElementById('question-count');
const questionNumber = document.getElementById('question-number');
const soundToggle = document.getElementById('sound-toggle');

// Data
let currentQuestion = 0;
let questions = [];
let score = 0;
let timer;
let timeLeft = 10;
let answered = false;
let reviewData = [];
let soundOn = true;


const categories = {

  programming: {
    easy: [
      {
        q: "What does HTML stand for?",
        o: [
          "Hyperlinks and Text Markup Language",
          "Hyper Text Markup Language",
          "Home Tool Markup Language",
          "Hyperlinking Textual Markup Language"
        ],
        a:1,
        e: "HTML stands for Hyper Text Markup Language, which is used to create web pages."
      },
      {
        q: "Which language is used for styling web pages?",
        o: ["HTML", "JQuery", "CSS", "XML"],
        a: 2,
        e: "CSS (Cascading Style Sheets) is used to style and layout web pages."
      },
      {
        q: "Inside which HTML element do we put JavaScript?",
        o: ["<js>", "<javascript>", "<script>", "<code>"],
        a: 2,
        e: "JavaScript code is placed inside the <script> tag in HTML."
      },
      {
        q: "Which company developed JavaScript?",
        o: ["Mozilla", "Netscape", "Google", "Microsoft"],
        a: 1,
        e: "JavaScript was developed by Netscape Communications."
      },
      {
        q: "Which tag is used to link an external CSS file?",
        o: ["<style>", "<css>", "<link>", "<script>"],
        a: 2,
        e: "The <link> tag is used to link external CSS files to HTML documents."
      },
      {
        q: "What does CSS stand for?",
        o: [
          "Creative Style Sheets",
          "Computer Style Sheets",
          "Cascading Style Sheets",
          "Colorful Style Sheets"
        ],
        a: 2,
        e: "CSS stands for Cascading Style Sheets."
      },
      
      {
        q: "Which symbol is used for comments in JavaScript?",
        o: ["//", "/* */", "#", "<!-- -->"],
        a: 0,
        e: "In JavaScript, '//' is used for single-line comments."
      },
      {
        q: "Which method can be used to find an element by its ID in JavaScript?",
        o: [
          "getElementByClass()",
          "getElementById()",
          "querySelectorAll()",
          "getElementsByName()"
        ],
        a: 1,
        e: "The getElementById() method returns the element with the specified ID."
      },
      {
        q: "What does JSON stand for?",
        o: [
          "JavaScript Object Notation",
          "Java Source Open Network",
          "JavaScript Open Notation",
          "Java Standard Output Network"
        ],
        a: 0,
        e: "JSON is a lightweight format for storing and transporting data."
      },
      
      {
        q: "What is the default port for HTTP?",
        o: ["80", "443", "8080", "21"],
        a: 0,
      e: "Port 80 is the default port for HTTP traffic."
      }
    ],
    moderate: [
      {
        q: "What does the 'this' keyword refer to in JavaScript inside a method?",
        o: [
          "The global object",
          "The method",
          "The object that owns the method",
          "None of these"
        ],
        a: 2,
        e: "'this' refers to the object that owns the method in JavaScript."
      },
      {
        q: "Which of these is not a JavaScript data type?",
        o: ["Number", "Undefined", "Float", "Boolean"],
        a: 2,
        e: "JavaScript does not have a distinct 'Float' type; all numbers are of type Number."
      },
      {
        q: "Which method is used to add one or more elements to the end of an array in JavaScript?",
        o: ["push()", "pop()", "shift()", "unshift()"],
        a: 0,
        e: "The push() method adds one or more elements to the end of an array."
      },
      {
        q: "How do you create a function in JavaScript?",
        o: [
          "function = myFunction()",
          "function:myFunction()",
          "function myFunction()",
          "create function myFunction()"
        ],
        a: 2,
        e: "Functions are created in JavaScript using the 'function' keyword followed by the name."
      },
      {
        q: "What is the output of 'typeof NaN' in JavaScript?",
        o: ["number", "NaN", "undefined", "object"],
        a:0,
        e: "In JavaScript, 'NaN' is considered a number type."
      },
      {
        q: "What does AJAX stand for?",
        o: [
          "Asynchronous JavaScript and XML",
          "Advanced Java Application",
          "Applied Java and XHTML",
          "Asynchronous Java Application"
        ],
        a: 0,
        e: "AJAX allows asynchronous web page updates without reloading."
      },
      {
        q: "Which of the following is a JavaScript data structure that stores key-value pairs?",
        o: ["Array", "Set", "Map", "String"],
        a: 2,
        e: "Map stores key-value pairs and remembers insertion order."
      },
      
      {
        q: "What is event bubbling in JavaScript?",
        o: [
          "Event propagates from the target element up to the ancestors",
          "Event propagates from the window to the target element",
          "Events are cancelled",
          "Events are triggered only once"
        ],
        a:0,
        e: "Event bubbling means an event propagates from the innermost target to outer elements."
      },
      
      {
        q: "What does the CSS 'z-index' property control?",
        o: [
          "Stack order of elements",
          "Font size",
          "Text color",
          "Element position"
        ],
        a: 0,
        e: "'z-index' controls the vertical stacking order of overlapping elements."
      },
      {
        q: "Which JavaScript method converts a string to an integer?",
        o: ["parseInt()", "parseFloat()", "toString()", "toInteger()"],
        a: 0,
        e: "parseInt() converts a string to an integer number."
      }
    ],
    difficult: [
      {
        q: "Which function is used to serialize an object into a JSON string in JavaScript?",
        o: ["parse()", "stringify()", "convert()", "serialize()"],
        a: 1,
        e: "JSON.stringify() converts a JavaScript object to a JSON string."
      },
      {
        q: "What is a closure in JavaScript?",
        o: [
          "A function having access to the parent scope",
          "A variable",
          "An if statement",
          "None of the above"
        ],
        a: "0",
        e: "A closure is a function that retains access to its outer scope even after the outer function has closed."
      },
      {
        q: "Which JavaScript method is used to debounce a function?",
        o: ["setTimeout()", "clearTimeout()", "debounce()", "bind()"],
        a: 0,
        e: "Debouncing is implemented using setTimeout to delay function execution."
      },
      {
        q: "What is the event loop in JavaScript?",
        o: [
          "A mechanism to handle asynchronous callbacks",
          "A way to loop through events",
          "A function that runs repeatedly",
          "None of the above"
        ],
        a: 0,
        e: "The event loop processes asynchronous callbacks in JavaScript's single-threaded environment."
      },
      {
        q: "Which of the following is NOT a JavaScript framework?",
        o: ["Angular", "React", "Django", "Vue"],
        a: 2,
        e: "Django is a Python web framework, not JavaScript."
      },
      {
        q: "What is the output of '0 == false' in JavaScript?",
        o: ["true", "false", "undefined", "TypeError"],
        a: 0,
        e: "The loose equality operator '==' converts types before comparing."
      },

      {
        q: "What is the difference between '==' and '===' in JavaScript?",
        o: [
          "'==' compares value and type, '===' compares value only",
          "'==' compares value only, '===' compares value and type",
          "They are the same",
          "None of the above"
        ],
        a: 1,
        e: "'==' allows type coercion; '===' requires both value and type equality."
      },
      {
        q: "Which method creates a new array with all elements passing a test?",
        o: ["map()", "filter()", "reduce()", "forEach()"],
        a: 1,
        e: "filter() returns a new array with elements that satisfy the condition."
      },
      
      {
        q: "What does Promise.all() do?",
        o: [
          "Waits for all promises to resolve or any to reject",
          "Executes promises sequentially",
          "Cancels all promises",
          "None of the above"
        ],
        a: 0,
        e: "Promise.all() returns a single Promise that resolves when all of the promises resolve."
      },
      {
        q: "Which operator is used for optional chaining in JavaScript?",
        o: ["?.", "&&", "||", "?:"],
        a: 0,
        e: "Optional chaining operator (?.) allows safe property access."
      }
    ]
  },
  science: {
    easy: [
      {
        q: "What planet is known as the Red Planet?",
        o: ["Venus", "Earth", "Mars", "Jupiter"],
        a: 2,
        e: "Mars is called the Red Planet due to its reddish appearance."
      },
      
      {
        q: "Which gas do plants absorb from the atmosphere?",
        o: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Helium"],
        a: 2,
        explanation: "Plants absorb carbon dioxide for photosynthesis."
      },
      {
        q: "What is the center of an atom called?",
        o: ["Electron", "Proton", "Nucleus", "Neutron"],
        a: 2,
        e: "The nucleus is the center of an atom, containing protons and neutrons."
      },
      {
        q: "What force pulls objects towards the Earth?",
        o: ["Magnetism", "Gravity", "Friction", "Electricity"],
        a: 1,
        e: "Gravity is the force that attracts objects towards Earth."
      },
      {
        q: "Which organ pumps blood through the body?",
        o: ["Lungs", "Brain", "Heart", "Kidneys"],
        a: 2,
        e: "The heart pumps blood throughout the body."
      },
      {
        q: "What is the chemical symbol for Gold?",
        o: ["Au", "Ag", "Gd", "Go"],
        a: 0,
        e: "The chemical symbol for Gold is Au."
      },
      {
        q: "What is the boiling point of water at sea level?",
        o: ["90°C", "100°C", "110°C", "120°C"],
        a: 1,
        e: "Water boils at 100 degrees Celsius at sea level."
      },
      {
        q: "Which planet is the largest in the solar system?",
        o: ["Earth", "Saturn", "Jupiter", "Neptune"],
        a: 2,
        e: "Jupiter is the largest planet in the solar system."
      },
      {
        q: "What type of energy comes from the sun?",
        o: ["Thermal", "Solar", "Nuclear", "Mechanical"],
        a: 1,
        e: "Energy from the sun is called solar energy."
      },
      {
        q: "Which organ is responsible for filtering blood?",
        o: ["Liver", "Kidneys", "Heart", "Lungs"],
        a: 1,
        e: "Kidneys filter waste from the blood."
      }
    ],
    moderate: [
      {
        q: "What is the chemical formula of table salt?",
        o: ["NaCl", "KCl", "Na2SO4", "CaCl2"],
        a: 0,
        e: "Table salt is chemically sodium chloride (NaCl)."
      },
      {
        q: "What type of bond involves the sharing of electron pairs between atoms?",
        o: ["Ionic bond", "Covalent bond", "Hydrogen bond", "Metallic bond"],
        a: 1,
        e: "Covalent bonds share electron pairs between atoms."
      },
      {
        q: "Which organelle is known as the powerhouse of the cell?",
        o: ["Nucleus", "Mitochondria", "Ribosome", "Chloroplast"],
        a: 1,
        e: "Mitochondria produce energy (ATP) for the cell."
      },
      {
        q: "What is the acceleration due to gravity on Earth?",
        o: ["9.8 m/s²", "10 m/s²", "9.8 km/s²", "9.8 cm/s²"],
        a: 0,
        e: "The standard acceleration due to gravity is 9.8 meters per second squared."
      },
      {
        q: "Which blood cells help fight infections?",
        o: ["Red blood cells", "White blood cells", "Platelets", "Plasma"],
        a: 1,
        e: "White blood cells are part of the immune system."
      },
      
      {
        q: "What is the process by which plants lose water vapor through leaves?",
        o: ["Transpiration", "Respiration", "Photosynthesis", "Evaporation"],
        a: 0,
        e: "Transpiration is the loss of water vapor through plant leaves."
      },
      {
        q: "What kind of energy transformation occurs in a battery-powered flashlight?",
        o: [
          "Chemical to electrical to light",
          "Electrical to chemical to light",
          "Mechanical to electrical",
          "Light to chemical"
        ],
        a: 0,
        e: "Chemical energy in the battery converts to electrical, then light."
      },
      
      {
        q: "Which particles determine the atomic number of an element?",
        o: ["Neutrons", "Protons", "Electrons", "Photons"],
        a: 1,
        e: "Atomic number equals the number of protons in an atom."
      },
      {
        q: "What is the speed of light in vacuum?",
        o: [
          "3 × 10^8 m/s",
          "3 × 10^6 m/s",
          "3 × 10^5 km/s",
          "3 × 10^3 km/s"
        ],
        a: 0,
        e: "Light travels at approximately 3 × 10^8 meters per second in vacuum."
      },
      {
        q: "Which vitamin is important for blood clotting?",
        o: ["Vitamin K", "Vitamin C", "Vitamin D", "Vitamin B12"],
        a: 0,
        e: "Vitamin K plays a key role in blood clotting."
      }
    ],
    difficult: [
      {
        q: "What is the Heisenberg Uncertainty Principle about?",
        o: [
          "Position and velocity of a particle cannot both be precisely known",
          "Energy and mass are equivalent",
          "Electrons orbit the nucleus in fixed paths",
          "Light behaves only as a wave"
        ],
        a: 0,
        e: "Heisenberg's principle states that measuring one property affects the certainty of the other."
      },
      {
        q: "What type of radiation has the shortest wavelength?",
        o: ["Gamma rays", "X-rays", "Ultraviolet", "Radio waves"],
        a: 0,
        e: "Gamma rays have the shortest wavelength and highest energy."
      },
      {
        q: "Which law explains the relationship between voltage, current, and resistance?",
        o: ["Ohm's Law", "Newton's Law", "Faraday's Law", "Hooke's Law"],
        a: 0,
        e: "Ohm's Law states V = IR (Voltage = Current × Resistance)."
      },
      {
        q: "What is the main gas involved in the process of photosynthesis?",
        o: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Methane"],
        a: 1,
        e: "Photosynthesis converts carbon dioxide and water into glucose and oxygen."
      },
      {
        q: "Which particle in the atom has no electrical charge?",
        o: ["Proton", "Electron", "Neutron", "Photon"],
        a: 2,
        e: "Neutrons are neutral particles in the nucleus."
      },
      {
        q: "What is the function of the Golgi apparatus in cells?",
        o: [
          "Protein modification and packaging",
          "Energy production",
          "DNA storage",
          "Lipid synthesis"
        ],
        a: 0,
        e: "Golgi apparatus modifies, sorts, and packages proteins for transport."
      },
      {
        q: "Which biome is characterized by very low temperatures and little precipitation?",
        o: ["Desert", "Tundra", "Rainforest", "Savanna"],
        a: 1,
        e: "Tundra is a cold, dry biome with permafrost soil."
      },
      {
        q: "What is the term for a solution with pH less than 7?",
        o: ["Neutral", "Acidic", "Basic", "Alkaline"],
        a: 1,
        e: "Solutions with pH less than 7 are acidic."
      },
      
      {
        q: "What is the name of the process where cells divide to produce two identical daughter cells?",
        o: ["Meiosis", "Mitosis", "Binary Fission", "Budding"],
        a: 1,
        e: "Mitosis is the process of cell division producing identical daughter cells."
      },
      
      {
        q: "What is the approximate age of the Earth?",
        o: [
          "4.5 billion years",
          "4.5 million years",
          "450 million years",
          "45 billion years"
        ],
        a: 0,
        e: "The Earth is about 4.5 billion years old."
      }
      
    ]
  },
  history: {
    easy: [
  {
    q: "Who was the first President of the United States?",
    o: ["Thomas Jefferson", "George Washington", "John Adams", "Abraham Lincoln"],
    a: 1,
    e: "George Washington served as the first President of the United States from 1789 to 1797 and is often called the 'Father of His Country'."
  },
  {
    q: "Which ancient civilization built the pyramids in Egypt?",
    o: ["Romans", "Greeks", "Mesopotamians", "Egyptians"],
    a: 3,
    e: "The ancient Egyptians built the pyramids as tombs for their pharaohs, with the Great Pyramid of Giza being one of the most famous."
  },
  {
    q: "Which ship famously sank in 1912 after hitting an iceberg?",
    o: ["Lusitania", "Titanic", "Britannic", "Queen Mary"],
    a: 1,
    e: "The RMS Titanic was a British passenger liner that sank in the North Atlantic Ocean in 1912, leading to over 1,500 deaths."
  },
  {
    q: "In which country did the Olympic Games originate?",
    o: ["Italy", "Greece", "France", "China"],
    a: 1,
    e: "The ancient Olympic Games began in Olympia, Greece, in 776 BCE as a festival to honor Zeus."
  },
  {
    q: "What wall divided East and West Berlin during the Cold War?",
    o: ["Great Wall", "Berlin Wall", "Iron Curtain", "Checkpoint Charlie"],
    a: 1,
    e: "The Berlin Wall was built in 1961 to prevent East Germans from fleeing to West Berlin, and it became a symbol of the Cold War."
  },
  {
    q: "What famous event occurred in America on July 4, 1776?",
    o: ["End of Civil War", "Declaration of Independence", "Boston Tea Party", "First presidential election"],
    a: 1,
    e: "On July 4, 1776, the American colonies declared independence from Britain with the adoption of the Declaration of Independence."
  },
  {
    q: "Who was the famous queen of ancient Egypt known for her beauty and alliances with Rome?",
    o: ["Cleopatra", "Nefertiti", "Hatshepsut", "Isis"],
    a: 0,
    e: "Cleopatra VII was the last active ruler of the Ptolemaic Kingdom of Egypt and formed political alliances with Julius Caesar and Mark Antony."
  },
  {
    q: "Which war was fought between the North and South regions of the United States?",
    o: ["World War I", "Civil War", "Revolutionary War", "Korean War"],
    a: 1,
    e: "The U.S. Civil War (1861–1865) was fought between the Union (North) and the Confederacy (South) mainly over slavery and states' rights."
  },
  {
    q: "Who discovered America in 1492?",
    o: ["Amerigo Vespucci", "Ferdinand Magellan", "Christopher Columbus", "Marco Polo"],
    a: 2,
    e: "Christopher Columbus, sailing under the Spanish flag, landed in the Americas in 1492, marking the beginning of European exploration."
  },
  {
    q: "Which famous speech begins with 'Four score and seven years ago'?",
    o: ["I Have a Dream", "Gettysburg Address", "Declaration of Independence", "Farewell Address"],
    a: 1,
    e: "The Gettysburg Address was delivered by President Abraham Lincoln in 1863 during the American Civil War to honor fallen soldiers."
  }
],
moderate: [
  {
    q: "Who was the first Emperor of the Roman Empire?",
    o: ["Julius Caesar", "Augustus", "Nero", "Tiberius"],
    a: 1,
    e: "Augustus, originally known as Octavian, became the first Roman Emperor in 27 BCE, marking the end of the Roman Republic."
  },
  {
    q: "What major event is considered the start of the French Revolution?",
    o: ["The execution of Louis XVI", "The storming of the Bastille", "The Tennis Court Oath", "The Reign of Terror"],
    a: 1,
    e: "The storming of the Bastille on July 14, 1789, symbolized the uprising against the monarchy and is widely regarded as the beginning of the French Revolution."
  },
  {
    q: "Who was the U.S. President during the Great Depression and World War II?",
    o: ["Herbert Hoover", "Harry S. Truman", "Franklin D. Roosevelt", "Woodrow Wilson"],
    a: 2,
    e: "FDR served four terms from 1933 to 1945 and led the country through the Great Depression and most of WWII."
  },
  {
    q: "What was the main purpose of the Marshall Plan?",
    o: ["To fund American military", "To reconstruct Europe post-WWII", "To establish NATO", "To expand the U.S. economy"],
    a: 1,
    e: "The Marshall Plan was a U.S. initiative that provided aid to rebuild European economies after WWII to prevent the spread of communism."
  },
  {
    q: "What historical document was signed in 1215 limiting the powers of the English monarch?",
    o: ["Bill of Rights", "Treaty of Versailles", "Magna Carta", "Habeas Corpus Act"],
    a: 2,
    e: "The Magna Carta, signed by King John in 1215, is a foundational document establishing the principle that everyone is subject to the law."
  },
  {
    q: "During which conflict was the Battle of Stalingrad fought?",
    o: ["World War I", "World War II", "Crimean War", "Russo-Japanese War"],
    a: 1,
    e: "The Battle of Stalingrad (1942–1943) was a turning point in WWII, marking a major Soviet victory against Nazi Germany."
  },
  {
    q: "Which revolution led to the end of the Russian monarchy in 1917?",
    o: ["October Revolution", "February Revolution", "Industrial Revolution", "Cultural Revolution"],
    a: 1,
    e: "The February Revolution in 1917 led to the abdication of Tsar Nicholas II and the end of the Romanov dynasty."
  },
  {
    q: "What year did the Berlin Wall fall?",
    o: ["1985", "1987", "1989", "1991"],
    a: 2,
    e: "The Berlin Wall fell on November 9, 1989, symbolizing the end of the Cold War and the beginning of German reunification."
  },
  {
    q: "What ancient trade route connected China to the Mediterranean?",
    o: ["Spice Route", "Amber Road", "Silk Road", "Tea-Horse Road"],
    a: 2,
    e: "The Silk Road was a network of trade routes linking China and the West, used from the 2nd century BCE to the 18th century."
  },
  {
    q: "Which U.S. civil rights leader delivered the famous “I Have a Dream” speech?",
    o: ["Malcolm X", "Rosa Parks", "Frederick Douglass", "Martin Luther King Jr."],
    a: 3,
    e: "Martin Luther King Jr. delivered the iconic speech during the March on Washington in 1963, advocating for racial equality and justice."
  }
],
difficult: [
  {
    q: "What was the primary cause of the Thirty Years' War in Europe?",
    o: ["Territorial expansion", "Religious conflict", "Colonial rivalry", "Economic depression"],
    a: 1,
    e: "The Thirty Years' War (1618–1648) began as a religious conflict between Protestant and Catholic states in the fragmented Holy Roman Empire, later evolving into a broader political struggle."
  },
  {
    q: "Which treaty ended World War I and imposed harsh penalties on Germany?",
    o: ["Treaty of Versailles", "Treaty of Paris", "Treaty of Tordesillas", "Treaty of Ghent"],
    a: 0,
    e: "Signed in 1919, the Treaty of Versailles formally ended WWI and held Germany responsible for the war, requiring reparations and territorial losses."
  },
  {
    q: "Who led the Indian independence movement using nonviolent civil disobedience?",
    o: ["Subhas Chandra Bose", "Jawaharlal Nehru", "Sardar Patel", "Mahatma Gandhi"],
    a: 3,
    e: "Mahatma Gandhi was a key figure in India's struggle for independence, known for his philosophy of nonviolence (ahimsa) and mass civil disobedience campaigns."
  },
  {
    q: "Which empire was ruled by Suleiman the Magnificent at its height?",
    o: ["Mongol Empire", "Ottoman Empire", "Roman Empire", "Persian Empire"],
    a: 1,
    e: "Suleiman the Magnificent ruled the Ottoman Empire from 1520 to 1566, leading it through a golden age of territorial expansion, legal reform, and cultural development."
  },
  {
    q: "What was the significance of the Edict of Milan issued in 313 CE?",
    o: ["It banned Christianity in the Roman Empire", "It ended the persecution of Christians", "It established the Catholic Church", "It divided the Roman Empire"],
    a: 1,
    e: "The Edict of Milan, issued by Constantine I and Licinius, granted religious tolerance throughout the Roman Empire and marked the end of state-sponsored persecution of Christians."
  },
  {
    q: "Who was the leader of the Bolsheviks during the Russian Revolution of 1917?",
    o: ["Joseph Stalin", "Leon Trotsky", "Vladimir Lenin", "Nicholas II"],
    a: 2,
    e: "Vladimir Lenin led the Bolsheviks during the October Revolution of 1917, establishing a communist government and founding the Soviet Union."
  },
  {
    q: "Which civilization developed cuneiform, one of the earliest systems of writing?",
    o: ["Egyptian", "Phoenician", "Sumerian", "Greek"],
    a: 2,
    e: "The Sumerians, who lived in ancient Mesopotamia, are credited with developing cuneiform script around 3400 BCE, primarily for administrative and accounting purposes."
  },
  {
    q: "What was the main goal of the Congress of Vienna (1814–1815)?",
    o: ["To punish France", "To promote democracy", "To restore the balance of power in Europe", "To abolish monarchies"],
    a: 2,
    e: "The Congress of Vienna aimed to reestablish conservative order and balance of power after the Napoleonic Wars by redrawing Europe's political map."
  },
  {
    q: "What event marked the beginning of the American Revolutionary War?",
    o: ["The Boston Tea Party", "The signing of the Declaration of Independence", "The Battle of Lexington and Concord", "The Siege of Yorktown"],
    a: 2,
    e: "Fought on April 19, 1775, the Battles of Lexington and Concord marked the start of the American Revolutionary War between the American colonists and British troops."

  },
  {
    q: "Who was the longest-reigning British monarch before Queen Elizabeth II?",
    o: ["Queen Victoria", "King George III", "Queen Elizabeth I", "King Henry VIII"],
    a: 0,
    e: "Queen Victoria reigned from 1837 to 1901, overseeing a period of industrial progress, colonial expansion, and cultural transformation known as the Victorian Era."
  }
]

  },
math:{
    easy: [
  {
    q: "What is 5 + 3?",
    o: ["6", "7", "8", "9"],
    a: 2,
    e: "5 + 3 equals 8."
  },
  {
    q: "What is the value of π (pi) approximately?",
    o: ["2.14", "3.14", "4.14", "5.14"],
    a: 1,
    e: "Pi is approximately equal to 3.14."
  },
  {
    q: "What is 10 multiplied by 2?",
    o: ["12", "18", "20", "22"],
    a: 2,
    e: "10 × 2 equals 20."
  },
  {
    q: "What is the square of 4?",
    o: ["8", "12", "16", "20"],
    a: 2,
    e: "4 squared (4²) is 16."
  },
  {
    q: "What is 15 divided by 3?",
    o: ["3", "4", "5", "6"],
    a: 2,
    e: "15 divided by 3 equals 5."
  },
  {
    q: "What is the next number in the sequence: 2, 4, 6, 8, ...?",
    o: ["9", "10", "11", "12"],
    a: 1,
    e: "The sequence increases by 2 each time, so the next number is 10."
  },
  {
    q: "What is the perimeter of a square with side length 5 units?",
    o: ["10", "15", "20", "25"],
    a: 2,
    e: "Perimeter of a square = 4 × side = 4 × 5 = 20 units."
  },
  {
    q: "What is the sum of the angles in a triangle?",
    o: ["90 degrees", "180 degrees", "270 degrees", "360 degrees"],
    a: 1,
    e: "The sum of interior angles in any triangle is always 180 degrees."
  },
  {
    q: "What is 7 minus 4?",
    o: ["1", "2", "3", "4"],
    a: 2,
    e: "7 - 4 equals 3."
  },
  {
    q: "Which number is a prime number?",
    o: ["4", "6", "9", "7"],
    a: 3,
    e: "7 is a prime number as it is only divisible by 1 and itself."
  }
  
],
moderate: [
  {
    q: "What is the value of √64?",
    o: ["6", "7", "8", "9"],
    a: 2,
    e: "The square root of 64 is 8 because 8 × 8 = 64."
  },
  {
    q: "If a triangle has sides 3 cm, 4 cm, and 5 cm, what type of triangle is it?",
    o: ["Equilateral", "Isosceles", "Scalene", "Right-angled"],
    a: 3,
    e: "A triangle with sides 3, 4, and 5 satisfies the Pythagorean theorem, making it right-angled."
  },
  {
    q: "What is 15% of 200?",
    o: ["20", "25", "30", "35"],
    a: 2,
    e: "15% of 200 = (15/100) × 200 = 30."
  },
  {
    q: "What is the next number in the sequence: 2, 4, 6, 8, ...?",
    o: ["9", "10", "11", "12"],
    a: 1,
    e: "The sequence increases by 2 each time, so the next number is 10."
  },
  {
    q: "What is the perimeter of a square with side length 5 units?",
    o: ["10", "15", "20", "25"],
    a: 2,
    e: "Perimeter of a square = 4 × side = 4 × 5 = 20 units."
  },
  {
    q: "What is the sum of the angles in a triangle?",
    o: ["90 degrees", "180 degrees", "270 degrees", "360 degrees"],
    a: 1,
    e: "The sum of interior angles in any triangle is always 180 degrees."
  },
  {
    q: "Solve for x: 2x + 5 = 13",
    o: ["3", "4", "5", "6"],
    a: 1,
    e: "2x + 5 = 13 → 2x = 8 → x = 4."
  },
  {
    q: "What is the area of a circle with radius 7 units? (Use π ≈ 3.14)",
    o: ["154", "144", "164", "174"],
    a: 0,
    e: "Area = π × r² = 3.14 × 7² = 3.14 × 49 = 153.86 ≈ 154."
  },
  {
    q: "What is the next number in the sequence: 2, 6, 12, 20, ...?",
    o: ["26", "30", "32", "36"],
    a: 1,
    e: "Sequence is n² + n: 1²+1=2, 2²+2=6, 3²+3=12, 4²+4=20, so next is 5²+5=30."
  },
  {
    q: "If a rectangle’s length is 10 and width is 5, what is its diagonal length?",
    o: ["11", "12", "13", "14"],
    a: 0,
    e: "Diagonal = √(length² + width²) = √(10² + 5²) = √(100 + 25) = √125 ≈ 11.18."
  }
  
  
  
],
difficult: [
  {
    q: "What is the derivative of f(x) = 3x² + 5x - 7?",
    o: ["3x + 5", "6x + 5", "6x - 5", "3x² + 5"],
    a: 1,
    e: "The derivative of 3x² is 6x, and the derivative of 5x is 5, so f'(x) = 6x + 5."
  },
  {
    q: "Evaluate the integral ∫ (2x + 3) dx.",
    o: ["x² + 3x + C", "x² + 3 + C", "x² + 3x", "2x² + 3x + C"],
    a: 0,
    e: "The integral of 2x is x², and the integral of 3 is 3x, plus the constant C."
  },
  {
    q: "If the matrix A = [[1, 2], [3, 4]], what is det(A)?",
    o: ["-2", "-5", "2", "5"],
    a: 0,
    e: "det(A) = (1 × 4) - (2 × 3) = 4 - 6 = -2."
  },
  {
    q: "What is the next number in the sequence: 2, 6, 12, 20, ...?",
    o: ["26", "30", "32", "36"],
    a: 1,
    e: "Sequence is n² + n: 1²+1=2, 2²+2=6, 3²+3=12, 4²+4=20, so next is 5²+5=30."
  },
  {
    q: "Solve the equation: 2x² - 4x - 6 = 0",
    o: ["x = 3 or x = -1", "x = 2 or x = -3", "x = 3 or x = 1", "x = -3 or x = 1"],
    a: 0,
    e: "Using quadratic formula: x = [4 ± √(16 + 48)] / 4 = [4 ± 8] / 4 → x = 3 or -1."
  },
  {
    q: "What is the sum of the first 20 terms of the arithmetic sequence 3, 7, 11, ...?",
    o: ["400", "410", "420", "820"],
    a: 3,
    e: "Sum = n/2 × (first term + last term). Last term = 3 + (20-1)*4 = 79. Sum = 20/2 × (3 + 79) = 10 × 82 = 820." 
  },
  {
    q: "Find the roots of the equation x² + 4x + 13 = 0",
    o: ["-2 + 3i, -2 - 3i", "-2 + 2i, -2 - 2i", "2 + 3i, 2 - 3i", "2 + 2i, 2 - 2i"],
    a: 0,
    e: "Discriminant = 16 - 52 = -36, so roots are complex: (-4 ± √-36)/2 = -2 ± 3i."
  },
  {
    q: "What is the limit of (sin x)/x as x approaches 0?",
    o: ["0", "1", "Infinity", "Does not exist"],
    a: 1,
    e: "The limit lim(x→0) (sin x)/x = 1, a standard trigonometric limit."
  },
  {
    q: "If f(x) = e^(2x), what is f'(x)?",
    o: ["2e^(2x)", "e^(2x)", "2xe^(2x)", "e^x"],
    a: 0,
    e: "Derivative of e^(2x) is 2e^(2x) by chain rule."
  },
  {
    q: "What is the sum of the infinite geometric series 5 + 2.5 + 1.25 + ...?",
    o: ["10", "12", "15", "20"],
    a: 0,
    e: "Sum = a / (1 - r) = 5 / (1 - 0.5) = 5 / 0.5 = 10."
  }
]
}
};
  
  // Init category options
for (const cat in categories) {
  const opt = document.createElement('option');
  opt.value = cat;
  opt.textContent = cat;
  categorySelect.appendChild(opt);
}
soundToggle.onclick = () => {
  soundOn = !soundOn;
  soundToggle.textContent = soundOn ? '🔊' : '🔇';
  soundToggle.title = soundOn ? 'Turn sound off' : 'Turn sound on';
};

function playSound(type) {
  if (!soundOn) return;

  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    const audioContext = new AudioContextClass();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.value = type === 'correct' ? 800 : 250;

    gain.gain.setValueAtTime(0.15, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.001,
      audioContext.currentTime + 0.2
    );

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.2);

    oscillator.onended = () => audioContext.close();
  } catch (error) {
    console.error('Sound playback failed:', error);
  }
}


startBtn.onclick = () => {
  const category = categorySelect.value;
  const difficulty = difficultySelect.value;
  const qCount = parseInt(questionCountSelect.value);
  const username = usernameInput.value.trim() || 'Anonymous';

  if (!category || !difficulty || !qCount) return alert('Please select all options');

   questions = categories[category][difficulty].slice(0, qCount);
  currentQuestion = 0;
  score = 0;
  reviewData = [];
  document.querySelector('header').classList.add('hidden');
  quizBox.classList.remove('hidden');
  resultBox.classList.add('hidden');
  reviewBox.classList.add('hidden');
  showQuestion();
};

function showQuestion() {
  answered = false;
  feedback.textContent = '';
  nextBtn.classList.add('hidden');
  const q = questions[currentQuestion];
  questionNumber.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  questionText.textContent = q.q;
  optionsBox.innerHTML = '';
  q.o.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.onclick = () => selectAnswer(btn, idx);
    optionsBox.appendChild(btn);
  });
  timeLeft = 10;
  timerEl.textContent = timeLeft;
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      feedback.textContent = `Time's up! ${q.e}`;
      showCorrectAnswer();
      recordAnswer(null);
      nextBtn.classList.remove('hidden');
    }
  }, 1000);
}

function selectAnswer(btn, idx) {
  if (answered) return;
  answered = true;
  clearInterval(timer);
  const q = questions[currentQuestion];
  const isCorrect = idx === q.a;
  btn.classList.add(isCorrect ? 'correct' : 'wrong');
  if (!isCorrect) {
    const correctBtn = optionsBox.children[q.a];
    correctBtn.classList.add('correct');
  }
  feedback.textContent = q.e;
  playSound(isCorrect ? 'correct' : 'wrong');
  if (isCorrect) score++;
  recordAnswer(idx);
  nextBtn.classList.remove('hidden');
}

function showCorrectAnswer() {
  const q = questions[currentQuestion];
  const correctBtn = optionsBox.children[q.a];
  correctBtn.classList.add('correct');
}

function recordAnswer(selectedIdx) {
  const q = questions[currentQuestion];
  reviewData.push({
    question: q.q,
    selected: selectedIdx,
    correct: q.a,
    explanation: q.e,
    options: q.o
  });
}

nextBtn.onclick = () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
};

function showResult() {
  quizBox.classList.add('hidden');
  resultBox.classList.remove('hidden');
  scoreSummary.textContent = `You scored ${score} out of ${questions.length}`;
  renderChart();
  saveToLeaderboard();
  renderLeaderboard();
}

function saveToLeaderboard() {
  const name = usernameInput.value.trim() || 'Anonymous';
  const entry = { name, score, total: questions.length };
  const data = JSON.parse(localStorage.getItem('leaderboard') || '[]');
  data.push(entry);
  localStorage.setItem('leaderboard', JSON.stringify(data.slice(-10)));
}

function renderLeaderboard() {
  leaderboard.innerHTML = '';
  const data = JSON.parse(localStorage.getItem('leaderboard') || '[]');
  data.reverse().forEach(entry => {
    const li = document.createElement('li');
    li.textContent = `${entry.name}: ${entry.score}/${entry.total}`;
    leaderboard.appendChild(li);
  });
}

function renderChart() {
  const ctx = document.getElementById('summary-chart').getContext('2d');
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Correct', 'Wrong', 'Skipped'],
      datasets: [{
        data: [score, reviewData.filter(r => r.selected !== null && r.selected !== r.correct).length, reviewData.filter(r => r.selected === null).length],
        backgroundColor: ['#2e7d32', '#c62828', '#fbc02d']
      }]
    },
    options: {
      plugins: {
        legend: {
          labels: { color: '#f5f5f5' }
        }
      }
    }
  });
}

restartBtn.onclick = () => {
  document.querySelector('header').classList.remove('hidden');
  resultBox.classList.add('hidden');
};

reviewBtn.onclick = () => {
  reviewBox.classList.remove('hidden');
  resultBox.classList.add('hidden');
  renderReview('all');
};

reviewFilter.onchange = () => {
  renderReview(reviewFilter.value);
};

function renderReview(filter) {
  reviewList.innerHTML = '';
  reviewData.forEach((item, index) => {
    const isCorrect = item.selected === item.correct;
    const isSkipped = item.selected === null;
    if (
      filter === 'correct' && !isCorrect ||
      filter === 'wrong' && (isCorrect || isSkipped) ||
      filter === 'skipped' && !isSkipped
    ) return;

    const div = document.createElement('div');
    div.className = 'review-item';
    div.innerHTML = `<strong>Q${index + 1}: ${item.question}</strong>
      <br> Your Answer: ${item.selected !== null ? item.options[item.selected] : '<em>Skipped</em>'}
      <br> Correct Answer: ${item.options[item.correct]}
      <em>${item.explanation}</em>`;
    reviewList.appendChild(div);
  });
}
// Dark/Light Mode Toggle
const toggleBtn = document.getElementById('theme-toggle');

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  
  const isDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('quiz-theme', isDark ? 'dark' : 'light');

  
  toggleBtn.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
});


window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('quiz-theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    toggleBtn.textContent = '☀️ Light Mode';
  }
});