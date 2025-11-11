// Quiz Data (JSON format)
const quizData = {
    general: [
        {
            question: "What is the capital of France?",
            options: ["London", "Berlin", "Paris", "Madrid"],
            correct: 2
        },
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Venus", "Mars", "Jupiter", "Saturn"],
            correct: 1
        },
        {
            question: "Who painted the Mona Lisa?",
            options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
            correct: 2
        },
        {
            question: "What is the largest ocean on Earth?",
            options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            correct: 3
        },
        {
            question: "In which year did World War II end?",
            options: ["1943", "1944", "1945", "1946"],
            correct: 2
        },
        {
            question: "What is the smallest country in the world?",
            options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
            correct: 1
        },
        {
            question: "Who wrote 'Romeo and Juliet'?",
            options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
            correct: 1
        },
        {
            question: "What is the chemical symbol for gold?",
            options: ["Go", "Gd", "Au", "Ag"],
            correct: 2
        },
        {
            question: "How many continents are there?",
            options: ["5", "6", "7", "8"],
            correct: 2
        },
        {
            question: "What is the speed of light?",
            options: ["299,792 km/s", "150,000 km/s", "500,000 km/s", "1,000,000 km/s"],
            correct: 0
        }
    ],
    science: [
        {
            question: "What is the chemical formula for water?",
            options: ["H2O", "CO2", "O2", "H2O2"],
            correct: 0
        },
        {
            question: "How many bones are in the human body?",
            options: ["196", "206", "216", "226"],
            correct: 1
        },
        {
            question: "What is the hardest natural substance on Earth?",
            options: ["Gold", "Iron", "Diamond", "Titanium"],
            correct: 2
        },
        {
            question: "What does DNA stand for?",
            options: ["Deoxyribonucleic Acid", "Dynamic Nuclear Acid", "Digital Native Acid", "Dual Nucleotide Acid"],
            correct: 0
        },
        {
            question: "At what temperature does water boil (in Celsius)?",
            options: ["90°C", "100°C", "110°C", "120°C"],
            correct: 1
        },
        {
            question: "What planet is closest to the Sun?",
            options: ["Venus", "Earth", "Mercury", "Mars"],
            correct: 2
        },
        {
            question: "What is the powerhouse of the cell?",
            options: ["Nucleus", "Mitochondria", "Ribosome", "Chloroplast"],
            correct: 1
        },
        {
            question: "How many elements are in the periodic table?",
            options: ["98", "108", "118", "128"],
            correct: 2
        },
        {
            question: "What gas do plants absorb from the atmosphere?",
            options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
            correct: 2
        },
        {
            question: "What is the largest organ in the human body?",
            options: ["Heart", "Brain", "Liver", "Skin"],
            correct: 3
        }
    ],
    history: [
        {
            question: "Who was the first President of the United States?",
            options: ["Thomas Jefferson", "George Washington", "Abraham Lincoln", "John Adams"],
            correct: 1
        },
        {
            question: "In which year did the Titanic sink?",
            options: ["1910", "1911", "1912", "1913"],
            correct: 2
        },
        {
            question: "Who discovered America in 1492?",
            options: ["Marco Polo", "Christopher Columbus", "Ferdinand Magellan", "Vasco da Gama"],
            correct: 1
        },
        {
            question: "What year did the Berlin Wall fall?",
            options: ["1987", "1988", "1989", "1990"],
            correct: 2
        },
        {
            question: "Who was known as the Iron Lady?",
            options: ["Margaret Thatcher", "Indira Gandhi", "Golda Meir", "Angela Merkel"],
            correct: 0
        },
        {
            question: "Which ancient wonder of the world still exists?",
            options: ["Hanging Gardens of Babylon", "Great Pyramid of Giza", "Colossus of Rhodes", "Lighthouse of Alexandria"],
            correct: 1
        },
        {
            question: "Who painted the ceiling of the Sistine Chapel?",
            options: ["Leonardo da Vinci", "Raphael", "Michelangelo", "Donatello"],
            correct: 2
        },
        {
            question: "In which year did India gain independence?",
            options: ["1945", "1946", "1947", "1948"],
            correct: 2
        },
        {
            question: "Who was the first man on the moon?",
            options: ["Buzz Aldrin", "Neil Armstrong", "Yuri Gagarin", "John Glenn"],
            correct: 1
        },
        {
            question: "Which empire was ruled by Julius Caesar?",
            options: ["Greek Empire", "Persian Empire", "Roman Empire", "Ottoman Empire"],
            correct: 2
        },
        {
            question: "What year did World War I begin?",
            options: ["1912", "1913", "1914", "1915"],
            correct: 2
        }
    ]
};

// Global Variables
let currentCategory = '';
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;
let userAnswers = [];
let timer = null;
let timeLeft = 30;
let totalTimeTaken = 0;
let timerInterval = null;
let answeredQuestions = []; // Track which questions have been answered

// Initialize particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

createParticles();

// Start Quiz
function startQuiz(category) {
    currentCategory = category;
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    totalTimeTaken = 0;
    answeredQuestions = new Array(quizData[category].length).fill(false);

    document.getElementById('welcomeScreen').style.display = 'none';
    document.getElementById('quizScreen').classList.add('active');

    document.getElementById('totalQuestions').textContent = quizData[category].length;

    loadQuestion();
    startTimer();
}

// Load Question
function loadQuestion() {
    const question = quizData[currentCategory][currentQuestionIndex];

    // Check if this question was already answered
    const isAnswered = answeredQuestions[currentQuestionIndex];

    // Only reset timer and selection if question hasn't been answered
    if (!isAnswered) {
        selectedAnswer = null;
        clearInterval(timerInterval);
        timeLeft = 30;
        startTimer();
    } else {
        // If already answered, stop the timer
        clearInterval(timerInterval);
        document.getElementById('timeLeft').textContent = '--';
    }

    // Update progress
    const progress = ((currentQuestionIndex + 1) / quizData[currentCategory].length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    document.getElementById('currentQuestion').textContent = currentQuestionIndex + 1;
    document.getElementById('qNum').textContent = currentQuestionIndex + 1;

    // Load question
    document.getElementById('questionText').textContent = question.question;

    // Load options
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';

    const letters = ['A', 'B', 'C', 'D'];
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';

        // If question is already answered, show the result and disable
        if (isAnswered) {
            optionDiv.classList.add('disabled');
            const userAnswer = userAnswers[currentQuestionIndex];

            if (userAnswer !== null) {
                if (userAnswer === index) {
                    if (index === question.correct) {
                        optionDiv.classList.add('correct');
                    } else {
                        optionDiv.classList.add('wrong');
                    }
                }
                if (index === question.correct) {
                    optionDiv.classList.add('correct');
                }
            }
        } else {
            // Only allow clicking if not answered
            optionDiv.onclick = () => selectOption(index);
        }

        optionDiv.innerHTML = `
                    <span class="option-letter">${letters[index]}</span>
                    <span class="option-text">${option}</span>
                `;
        optionsContainer.appendChild(optionDiv);
    });

    // Update next button state
    if (isAnswered || currentQuestionIndex === 0) {
        document.getElementById('nextBtn').disabled = !isAnswered;
    }

    if (currentQuestionIndex === quizData[currentCategory].length - 1) {
        document.getElementById('nextBtnText').innerHTML = 'Finish 🏁';
    } else {
        document.getElementById('nextBtnText').innerHTML = 'Next →';
    }
}

// Start Timer
function startTimer() {
    const timerElement = document.getElementById('timer');
    const timeLeftElement = document.getElementById('timeLeft');

    timerElement.classList.remove('warning');

    timerInterval = setInterval(() => {
        timeLeft--;
        timeLeftElement.textContent = timeLeft + 's';
        totalTimeTaken++;

        if (timeLeft <= 10) {
            timerElement.classList.add('warning');
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            autoSelectWrong();
        }
    }, 1000);
}

// Auto select wrong when time runs out
function autoSelectWrong() {
    // Mark as answered but with null (time out)
    userAnswers[currentQuestionIndex] = null;
    answeredQuestions[currentQuestionIndex] = true;

    const options = document.querySelectorAll('.option');
    options.forEach(opt => opt.classList.add('disabled'));

    // Show correct answer
    const question = quizData[currentCategory][currentQuestionIndex];
    options[question.correct].classList.add('correct');

    document.getElementById('nextBtn').disabled = false;
    document.getElementById('timeLeft').textContent = '0s';
}

// Select Option
function selectOption(index) {
    // Prevent selection if already answered
    if (answeredQuestions[currentQuestionIndex]) return;
    if (selectedAnswer !== null) return;

    selectedAnswer = index;
    const question = quizData[currentCategory][currentQuestionIndex];
    const options = document.querySelectorAll('.option');

    // Mark this question as answered
    answeredQuestions[currentQuestionIndex] = true;
    userAnswers[currentQuestionIndex] = index;

    // Disable all options immediately
    options.forEach(opt => opt.classList.add('disabled'));

    // Show selected option
    options[index].classList.add('selected');

    // Stop timer
    clearInterval(timerInterval);

    setTimeout(() => {
        if (index === question.correct) {
            options[index].classList.remove('selected');
            options[index].classList.add('correct');
            score++;
        } else {
            options[index].classList.remove('selected');
            options[index].classList.add('wrong');
            options[question.correct].classList.add('correct');
        }

        document.getElementById('nextBtn').disabled = false;
    }, 300);
}

// Next Question
function nextQuestion() {
    // Check if current question is answered
    if (!answeredQuestions[currentQuestionIndex]) return;

    if (currentQuestionIndex < quizData[currentCategory].length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        showResults();
    }
}

// Previous Question
function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

// Show Results
function showResults() {
    clearInterval(timerInterval);

    document.getElementById('quizScreen').classList.remove('active');
    document.getElementById('resultsScreen').classList.add('active');

    const totalQuestions = quizData[currentCategory].length;
    const percentage = Math.round((score / totalQuestions) * 100);
    const wrongAnswers = totalQuestions - score;

    // Update score circle
    const circumference = 2 * Math.PI * 90;
    const offset = circumference - (percentage / 100) * circumference;
    const scoreCircle = document.getElementById('scoreCircle');
    scoreCircle.style.setProperty('--dash-offset', offset);

    // Animate percentage
    animateValue('scorePercentage', 0, percentage, 1500, '%');
    animateValue('correctAnswers', 0, score, 1000);
    animateValue('wrongAnswers', 0, wrongAnswers, 1000);

    document.getElementById('totalTime').textContent = totalTimeTaken + 's';

    // Set message based on score
    let title, message;
    if (percentage >= 80) {
        title = '🏆 Outstanding!';
        message = 'You\'re a quiz master! Incredible performance!';
        createConfetti();
    } else if (percentage >= 60) {
        title = '🎉 Great Job!';
        message = 'Well done! You have good knowledge.';
    } else if (percentage >= 40) {
        title = '👍 Good Effort!';
        message = 'Not bad! Keep learning and improving.';
    } else {
        title = '💪 Keep Trying!';
        message = 'Don\'t give up! Practice makes perfect.';
    }

    document.getElementById('resultsTitle').textContent = title;
    document.getElementById('resultsMessage').textContent = message;
}

// Animate Number
function animateValue(id, start, end, duration, suffix = '') {
    const element = document.getElementById(id);
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.round(current) + suffix;
    }, 16);
}

// Create Confetti
function createConfetti() {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#00f2fe', '#43e97b'];

    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = (Math.random() * 10 + 5) + 'px';
            confetti.style.height = (Math.random() * 10 + 5) + 'px';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            confetti.style.animationDelay = (Math.random() * 0.5) + 's';

            document.body.appendChild(confetti);

            setTimeout(() => confetti.remove(), 3000);
        }, i * 30);
    }
}

// Restart Quiz
function restartQuiz() {
    document.getElementById('resultsScreen').classList.remove('active');
    startQuiz(currentCategory);
}

// Go Home
function goHome() {
    document.getElementById('resultsScreen').classList.remove('active');
    document.getElementById('quizScreen').classList.remove('active');
    document.getElementById('welcomeScreen').style.display = 'block';
    clearInterval(timerInterval);
}

// Prevent page refresh
window.addEventListener('beforeunload', (e) => {
    if (document.getElementById('quizScreen').classList.contains('active')) {
        e.preventDefault();
        e.returnValue = '';
    }
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (document.getElementById('quizScreen').classList.contains('active')) {
        if (e.key === 'Enter' && !document.getElementById('nextBtn').disabled) {
            nextQuestion();
        } else if (e.key >= '1' && e.key <= '4' && selectedAnswer === null) {
            selectOption(parseInt(e.key) - 1);
        }
    }
});