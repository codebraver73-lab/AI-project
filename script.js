/**
 * ============================================
 * IQ-TEEN - Main JavaScript File
 * Handles: Preloader, Navigation, Quiz Logic,
 * Results, Confetti, Floating Background
 * ============================================
 */

// ==========================================
// PRELOADER
// ==========================================

/**
 * Initializes the preloader and hides it after content loads
 */
function initPreloader() {
  const preloader = document.querySelector('.preloader');
  if (!preloader) return;

  window.addEventListener('load', function () {
    setTimeout(function () {
      preloader.classList.add('hidden');
    }, 1200);
  });
}

// ==========================================
// FLOATING BACKGROUND SYMBOLS
// ==========================================

/**
 * Creates animated floating academic symbols in the background
 */
function initFloatingBackground() {
  const container = document.querySelector('.floating-bg');
  if (!container) return;

  const symbols = [
    '\u03C0', '\u222B', '\u221A', '\u2211', '\u0394', '\u03B1', '\u03B2',
    '\u221E', '\u2248', '\u2260', '\u00B1', '\u00F7', '\u00D7',
    'H\u2082O', 'CO\u2082', 'NaCl', 'Fe', 'Au', 'DNA',
    'E=mc\u00B2', 'F=ma', 'V=IR'
  ];

  // Create 20 floating symbols with random positions and delays
  for (var i = 0; i < 20; i++) {
    var span = document.createElement('span');
    span.className = 'symbol';
    span.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    span.style.left = Math.random() * 100 + '%';
    span.style.fontSize = (1 + Math.random() * 1.5) + 'rem';
    span.style.animationDuration = (15 + Math.random() * 20) + 's';
    span.style.animationDelay = (Math.random() * 15) + 's';
    container.appendChild(span);
  }
}

// ==========================================
// NAVIGATION
// ==========================================

/**
 * Initializes navbar scroll effect and mobile hamburger menu
 */
function initNavigation() {
  var navbar = document.querySelector('.navbar');
  var hamburger = document.querySelector('.hamburger');
  var mobileMenu = document.querySelector('.mobile-menu');

  // Add scrolled class on scroll for shadow effect
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Toggle mobile menu
  if (hamburger && mobileMenu) {/*To create the X sign when the nav bar on the mobile menu is activated*/ 
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');/* gives the nav bar a flex display*/
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when a link is clicked
    var mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
}

// ==========================================
// QUIZ DATA - All questions organized by subject and level
// ==========================================

var quizData = {

  // ----- MATHS -----
  'maths-level1': {
    title: 'Maths - Level I (Easy)',
    subject: 'maths',
    questions: [
      { q: 'What is 15 + 27?', answers: ['42'] },
      { q: 'What is 8 \u00D7 7?', answers: ['56'] },
      { q: 'What is 100 \u00F7 4?', answers: ['25'] },
      { q: 'What is the square root of 64?', answers: ['8'] },
      { q: 'What is 3\u00B2 + 4\u00B2?', answers: ['25'] },
      { q: 'What is 50% of 200?', answers: ['100'] },
      { q: 'What is the perimeter of a square with side 5 cm (in cm)?', answers: ['20'] },
      { q: 'What is 1/2 + 1/4? (Write as a fraction)', answers: ['3/4'] },
      { q: 'How many degrees are in a right angle?', answers: ['90'] },
      { q: 'What is the next prime number after 7?', answers: ['11'] }
    ]
  },

  'maths-level2': {
    title: 'Maths - Level II (Hard)',
    subject: 'maths',
    questions: [
      { q: 'What is the derivative of x\u00B3?', answers: ['3x2', '3x^2', '3x\u00B2'] },
      { q: 'What is the value of log\u2081\u2080(1000)?', answers: ['3'] },
      { q: 'Solve: 2x + 5 = 15. What is x?', answers: ['5'] },
      { q: 'What is sin(90\u00B0)?', answers: ['1'] },
      { q: 'What is the sum of interior angles of a hexagon (in degrees)?', answers: ['720'] },
      { q: 'If f(x) = x\u00B2 \u2212 4, what is f(3)?', answers: ['5'] },
      { q: 'What is the discriminant of x\u00B2 + 4x + 4 = 0?', answers: ['0'] },
      { q: 'What is 5! (5 factorial)?', answers: ['120'] },
      { q: 'What is the area of a circle with radius 7? (Use \u03C0 \u2248 22/7)', answers: ['154'] },
      { q: 'What is the value of \u221A(144)?', answers: ['12'] }
    ]
  },

  // ----- PHYSICS -----
  'physics-level1': {
    title: 'Physics - Level I (Easy)',
    subject: 'physics',
    questions: [
      { q: 'What is the SI unit of force?', answers: ['newton', 'n'] },
      { q: 'What is the acceleration due to gravity on Earth (in m/s\u00B2)?', answers: ['9.8', '9.81', '10'] },
      { q: 'What type of energy does a moving object have?', answers: ['kinetic', 'kinetic energy'] },
      { q: 'What device measures electric current?', answers: ['ammeter'] },
      { q: 'What is the SI unit of energy?', answers: ['joule', 'j'] },
      { q: 'How many colors are in a rainbow?', answers: ['7', 'seven'] },
      { q: 'What is the formula for speed?', answers: ['distance/time', 'd/t', 'distance divided by time', 's=d/t'] },
      { q: 'What planet has the strongest gravity in our solar system?', answers: ['jupiter'] },
      { q: 'Sound cannot travel through what?', answers: ['vacuum', 'space', 'a vacuum'] },
      { q: 'What is the SI unit of temperature?', answers: ['kelvin', 'k'] }
    ]
  },

  'physics-level2': {
    title: 'Physics - Level II (Hard)',
    subject: 'physics',
    questions: [
      { q: 'What is the formula for kinetic energy?', answers: ['1/2mv2', '1/2mv^2', '0.5mv2', '0.5mv^2', 'ke=1/2mv2'] },
      { q: 'What is Ohm\'s law formula?', answers: ['v=ir', 'v = ir'] },
      { q: 'What is the unit of electrical resistance?', answers: ['ohm', '\u03A9'] },
      { q: 'What is the SI unit of power?', answers: ['watt', 'w'] },
      { q: 'What is Newton\'s second law formula?', answers: ['f=ma', 'f = ma'] },
      { q: 'What type of lens is used to correct myopia (near-sightedness)?', answers: ['concave', 'concave lens', 'diverging', 'diverging lens'] },
      { q: 'What is the escape velocity of Earth (in km/s)?', answers: ['11.2', '11.186'] },
      { q: 'What is the unit of frequency?', answers: ['hertz', 'hz'] },
      { q: 'What is the speed of sound in air approximately (in m/s)?', answers: ['343', '340', '330'] },
      { q: 'What is the formula for gravitational potential energy?', answers: ['mgh', 'pe=mgh'] }
    ]
  },

  // ----- CHEMISTRY -----
  'chemistry-level1': {
    title: 'Chemistry - Level I (Easy)',
    subject: 'chemistry',
    questions: [
      { q: 'What is the chemical symbol for water?', answers: ['h2o'] },
      { q: 'What is the atomic number of Carbon?', answers: ['6'] },
      { q: 'What gas do plants absorb from the air?', answers: ['co2', 'carbon dioxide'] },
      { q: 'What is the pH of pure water?', answers: ['7'] },
      { q: 'What is the chemical symbol for Gold?', answers: ['au'] },
      { q: 'How many elements are in the periodic table (approx)?', answers: ['118'] },
      { q: 'What is the chemical formula for table salt?', answers: ['nacl'] },
      { q: 'What gas makes up most of Earth\'s atmosphere?', answers: ['nitrogen', 'n2'] },
      { q: 'What is the chemical symbol for Iron?', answers: ['fe'] },
      { q: 'What state of matter has a fixed shape and volume?', answers: ['solid'] }
    ]
  },

  'chemistry-level2': {
    title: 'Chemistry - Level II (Hard)',
    subject: 'chemistry',
    questions: [
      { q: 'What is Avogadro\'s number (to 3 significant figures, \u00D710\u00B2\u00B3)?', answers: ['6.022', '6.02'] },
      { q: 'What is the molecular formula of glucose?', answers: ['c6h12o6'] },
      { q: 'What type of bond forms between Na and Cl?', answers: ['ionic', 'ionic bond'] },
      { q: 'What is the oxidation state of Oxygen in most compounds?', answers: ['-2'] },
      { q: 'What is the IUPAC name of CH\u2083COOH?', answers: ['ethanoic acid', 'acetic acid'] },
      { q: 'What is the molar mass of CO\u2082 (in g/mol)?', answers: ['44'] },
      { q: 'What is the electronic configuration of Sodium (atomic number 11)?', answers: ['2,8,1', '2 8 1'] },
      { q: 'What is the strongest type of intermolecular force?', answers: ['hydrogen bonding', 'hydrogen bond', 'h-bonding', 'ion-dipole'] },
      { q: 'What is the process where a solid turns directly into gas?', answers: ['sublimation'] },
      { q: 'What is the chemical formula for sulfuric acid?', answers: ['h2so4'] }
    ]
  },

  // ----- BIOLOGY -----
  'biology-level1': {
    title: 'Biology - Level I (Easy)',
    subject: 'biology',
    questions: [
      { q: 'What is known as the "powerhouse of the cell"?', answers: ['mitochondria', 'mitochondrion'] },
      { q: 'What pigment makes plants green?', answers: ['chlorophyll'] },
      { q: 'How many chambers does the human heart have?', answers: ['4', 'four'] },
      { q: 'What is the largest organ of the human body?', answers: ['skin'] },
      { q: 'What protein carries oxygen in the blood?', answers: ['hemoglobin', 'haemoglobin'] },
      { q: 'What is the basic unit of life?', answers: ['cell'] },
      { q: 'What type of cell division produces two identical cells?', answers: ['mitosis'] },
      { q: 'How many pairs of chromosomes do humans have?', answers: ['23'] },
      { q: 'What is the process by which plants make food?', answers: ['photosynthesis'] },
      { q: 'What part of the plant absorbs water from soil?', answers: ['roots', 'root'] }
    ]
  },

  'biology-level2': {
    title: 'Biology - Level II (Hard)',
    subject: 'biology',
    questions: [
      { q: 'What enzyme breaks down starch in the mouth?', answers: ['amylase', 'salivary amylase'] },
      { q: 'What is the name of the sugar found in DNA?', answers: ['deoxyribose'] },
      { q: 'What organelle is responsible for protein synthesis?', answers: ['ribosome', 'ribosomes'] },
      { q: 'What is the longest bone in the human body?', answers: ['femur'] },
      { q: 'What vitamin is produced when skin is exposed to sunlight?', answers: ['vitamin d', 'd', 'vit d'] },
      { q: 'What is the scientific name for the voice box?', answers: ['larynx'] },
      { q: 'How many base pairs make up a codon in mRNA?', answers: ['3', 'three'] },
      { q: 'What type of blood vessel carries blood away from the heart?', answers: ['artery', 'arteries'] },
      { q: 'What is the functional unit of the kidney?', answers: ['nephron'] },
      { q: 'What is the name of the process of cell eating?', answers: ['phagocytosis'] }
    ]
  }
};

// ==========================================
// QUIZ RENDERING
// ==========================================

/**
 * Renders quiz questions into the page based on quizConfig
 */
function initQuiz() {
  // Check if this page has a quiz configuration
  if (typeof window.quizConfig === 'undefined') return;

  var config = window.quizConfig;
  var quizId = config.subject + '-level' + config.level;
  var data = quizData[quizId];

  if (!data) {
    console.error('Quiz data not found for: ' + quizId);
    return;
  }

  // Set the quiz title
  var titleEl = document.getElementById('quiz-title');
  if (titleEl) titleEl.textContent = data.title;

  // Render questions into the container
  var container = document.getElementById('quiz-questions');
  if (!container) return;

  container.innerHTML = '';

  data.questions.forEach(function (item, index) {
    var card = document.createElement('div');
    card.className = 'question-card';
    card.setAttribute('data-subject', data.subject);

    card.innerHTML =
      '<div class="question-number">' + (index + 1) + '</div>' +
      '<p class="question-text">' + item.q + '</p>' +
      '<input type="text" class="question-input" ' +
      'placeholder="Type your answer here..." ' +
      'data-index="' + index + '" autocomplete="off">' +
      '<p class="error-message">This field is required</p>';

    container.appendChild(card);
  });

  // Initialize progress bar and validation
  initProgressBar(data.questions.length);
  initValidation(quizId);
}

// ==========================================
// PROGRESS BAR
// ==========================================

/**
 * Updates progress bar as user fills in answers
 * @param {number} totalQuestions - Total number of questions/* It is called a JSDoc comment. It is used to describe the function and its parameters in a structured way.
 */
function initProgressBar(totalQuestions) {
  var fillBar = document.querySelector('.progress-bar-fill');
  var progressText = document.querySelector('.progress-text');

  if (!fillBar || !progressText) return;

  // Update progress when inputs change
  document.addEventListener('input', function (e) {
    if (!e.target.classList.contains('question-input')) return;

    var inputs = document.querySelectorAll('.question-input');
    var filled = 0;

    inputs.forEach(function (input) {
      if (input.value.trim() !== '') {
        filled++;
        input.classList.add('filled');
        input.classList.remove('error');
        // Hide error message
        var errorMsg = input.nextElementSibling;
        if (errorMsg) errorMsg.classList.remove('visible');
      } else {
        input.classList.remove('filled');
      }
    });

    // Update the progress bar width and text
    var percent = Math.round((filled / totalQuestions) * 100);
    fillBar.style.width = percent + '%';
    progressText.textContent = filled + ' of ' + totalQuestions + ' answered (' + percent + '%)';
  });
}

// ==========================================
// VALIDATION & SUBMISSION
// ==========================================

/**
 * Sets up form validation and submit handling
 * @param {string} quizId - The quiz identifier (e.g., 'maths-level1')
 */
function initValidation(quizId) {
  var submitBtn = document.getElementById('submit-btn');
  if (!submitBtn) return;

  submitBtn.addEventListener('click', function () {
    var inputs = document.querySelectorAll('.question-input');
    var allFilled = true;

    // Check each input for empty values
    inputs.forEach(function (input) {
      var errorMsg = input.nextElementSibling;
      if (input.value.trim() === '') {
        allFilled = false;
        input.classList.add('error');
        if (errorMsg) errorMsg.classList.add('visible');
      } else {
        input.classList.remove('error');
        if (errorMsg) errorMsg.classList.remove('visible');
      }
    });

    // If any field is empty, show a warning and stop
    if (!allFilled) {
      // Scroll to first error
      var firstError = document.querySelector('.question-input.error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstError.focus();
      }
      return;
    }

    // Calculate the score
    calculateScore(quizId, inputs);
  });
}

/**
 * Calculates the user's score and stores it
 * @param {string} quizId - Quiz identifier
 * @param {NodeList} inputs - All answer input elements
 */
function calculateScore(quizId, inputs) {
  var data = quizData[quizId];
  var correct = 0;
  var total = data.questions.length;

  inputs.forEach(function (input, index) {
    var userAnswer = input.value.trim().toLowerCase().replace(/\s+/g, ' ');
    var acceptedAnswers = data.questions[index].answers;

    // Check if user answer matches any accepted answer
    var isCorrect = acceptedAnswers.some(function (ans) {
      return userAnswer === ans.toLowerCase();
    });

    if (isCorrect) correct++;
  });

  // Store results in localStorage
  var results = {
    quizId: quizId,
    subject: data.subject,
    title: data.title,
    correct: correct,
    total: total,
    percentage: Math.round((correct / total) * 100),
    timestamp: new Date().toISOString()
  };

  localStorage.setItem('iqteen-results', JSON.stringify(results));

  // Redirect to results page
  window.location.href = 'results.html';
}

// ==========================================
// RESULTS PAGE
// ==========================================

/**
 * Displays the quiz results on the results page
 */
function initResults() {
  var resultsCard = document.querySelector('.results-card');
  if (!resultsCard) return;

  // Get stored results
  var stored = localStorage.getItem('iqteen-results');
  if (!stored) {
    // No results found, show message
    resultsCard.innerHTML =
      '<span class="emoji">&#x1F914;</span>' +
      '<h2 class="results-message">No Results Found</h2>' +
      '<p class="results-detail">You haven\'t taken a quiz yet. Go back and try one!</p>' +
      '<div class="results-actions">' +
      '<a href="index.html" class="btn btn-primary">Go to Home</a>' +
      '</div>';
    return;
  }

  var results = JSON.parse(stored);
  var percent = results.percentage;

  // Determine score class and message
  var scoreClass, message, emoji;
  if (percent >= 90) {
    scoreClass = 'genius';
    message = 'Genius Level &#x1F9E0;';
    emoji = '&#x1F3C6;';
  } else if (percent >= 70) {
    scoreClass = 'excellent';
    message = 'Excellent Work &#x1F4AA;';
    emoji = '&#x1F31F;';
  } else if (percent >= 50) {
    scoreClass = 'good';
    message = 'Good Effort &#x1F44D;';
    emoji = '&#x1F44F;';
  } else {
    scoreClass = 'low';
    message = 'Keep Practicing &#x1F4DA;';
    emoji = '&#x1F4AA;';
  }

  // Determine which button class to use based on subject
  var btnClass = 'btn-' + results.subject;

  // Build the retry link
  var levelNum = results.quizId.split('level')[1];/*The split() method splits a string into an array of substrings based on a specified separator. In this case, it splits the quizId string at the word "level" and returns the part after it.*/ 
  var retryLink = results.subject + '-level' + levelNum + '.html';

  // Render results
  resultsCard.innerHTML =
    '<span class="emoji">' + emoji + '</span>' +
    '<div class="score-circle ' + scoreClass + '">' +
    '<span class="score-value">' + percent + '%</span>' +
    '<span class="score-label">Score</span>' +
    '</div>' +
    '<h2 class="results-message">' + message + '</h2>' +
    '<p class="results-detail">You got <strong>' + results.correct + '</strong> out of <strong>' + results.total + '</strong> questions correct in <strong>' + results.title + '</strong></p>' +
    '<div class="results-actions">' +
    '<a href="' + retryLink + '" class="btn ' + btnClass + '">Retry Quiz</a>' +
    '<a href="index.html" class="btn btn-outline">Back to Home</a>' +
    '</div>';

  // Show confetti if score >= 80%
  if (percent >= 80) {
    launchConfetti();
  }
}

// ==========================================
// CONFETTI ANIMATION
// ==========================================

/**
 * Launches a colorful confetti celebration animation
 */
function launchConfetti() {
  var container = document.createElement('div');
  container.className = 'confetti-container';
  document.body.appendChild(container);

  var colors = ['#3b82f6', '#f97316', '#a855f7', '#22c55e', '#ef4444', '#eab308', '#ec4899'];
  var shapes = ['circle', 'square'];

  // Create 80 confetti pieces
  for (var i = 0; i < 80; i++) {
    var piece = document.createElement('div');
    piece.className = 'confetti-piece';

    var color = colors[Math.floor(Math.random() * colors.length)];
    var shape = shapes[Math.floor(Math.random() * shapes.length)];
    var size = 6 + Math.random() * 10;

    piece.style.left = Math.random() * 100 + '%';
    piece.style.width = size + 'px';
    piece.style.height = size + 'px';
    piece.style.backgroundColor = color;
    piece.style.borderRadius = shape === 'circle' ? '50%' : '2px';
    piece.style.animationDelay = (Math.random() * 2) + 's';
    piece.style.animationDuration = (2 + Math.random() * 2) + 's';

    container.appendChild(piece);
  }

  // Remove confetti after 5 seconds
  setTimeout(function () {
    container.remove();
  }, 5000);
}

// ==========================================
// INITIALIZATION - Run on every page
// ==========================================

document.addEventListener('DOMContentLoaded', function () {/*Dom content loaded means Run this function when the HTML document has been fully loaded and parsed*/
  initPreloader();
  initFloatingBackground();
  initNavigation();
  initQuiz();
  initResults();
});
