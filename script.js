// Game State
let currentState = 'start'; // start, q1, q2, q3, bdsk

// DOM Elements
const startBtn = document.getElementById('startBtn');
const questionContainer = document.getElementById('questionContainer');
const questionText = document.getElementById('questionText');
const answerBtns = document.getElementById('answerBtns');
const modal = document.getElementById('customModal');
const modalMessage = document.getElementById('modalMessage');
const modalTitle = document.getElementById('modalTitle');
const bdskModal = document.getElementById('bdskModal');

// Event Listeners
startBtn.addEventListener('click', startGame);
document.getElementById('bdskYesBtn').addEventListener('click', showStatisticsModal);

// Start Game
function startGame() {
    startBtn.style.display = 'none';
    questionContainer.classList.remove('hidden');
    currentState = 'q1';
    showQuestion('TUMI KI ABHIGYAN ER G MARTEL CHAO?');
}

// Show Question with Yes/No buttons
function showQuestion(question) {
    questionText.textContent = question;
    
    // Clear previous buttons
    answerBtns.innerHTML = '';
    
    // Create Yes button
    const yesBtn = document.createElement('button');
    yesBtn.textContent = 'YES';
    yesBtn.classList.add('answer-btn', 'yes');
    yesBtn.onclick = () => handleAnswer('yes');
    
    // Create No button
    const noBtn = document.createElement('button');
    noBtn.textContent = 'NO';
    noBtn.classList.add('answer-btn', 'no');
    noBtn.onclick = () => handleAnswer('no');
    
    // Add buttons to container
    answerBtns.appendChild(yesBtn);
    answerBtns.appendChild(noBtn);
}

// Handle Answers
function handleAnswer(answer) {
    switch(currentState) {
        case 'q1':
            if(answer === 'yes') {
                showModal('Good boy! You know the ball! 🎉', '🎯 RESULT');
            } else {
                currentState = 'q2';
                showQuestion('ARE YOU A GANDU?');
            }
            break;
            
        case 'q2':
            // Both YES and NO go to same next question
            currentState = 'q3';
            showQuestion('ARE YOU SURE YOU DON\'T WANT TO G GYAN?');
            break;
            
        case 'q3':
            if(answer === 'yes') {
                showModal('You are a good boy! 😇', '✨ MESSAGE');
                resetGame();
            } else {
                // Show BDSK modal
                questionContainer.classList.add('hidden');
                bdskModal.classList.remove('hidden');
            }
            break;
    }
}

// Show Custom Modal
function showModal(message, title = '⚠️ MESSAGE') {
    modalMessage.textContent = message;
    modalTitle.textContent = title;
    modal.classList.remove('hidden');
}

// Close Modal
function closeModal() {
    modal.classList.add('hidden');
    if(currentState !== 'q3' && currentState !== 'bdsk') {
        resetGame();
    }
}

// Show Statistics Modal (final popup)
function showStatisticsModal() {
    bdskModal.classList.add('hidden');
    showModal(
        'Our statistics says 100% people want to g the one and only gyan! 📊', 
        '📈 STATISTICS'
    );
    resetGame();
}

// Reset Game
function resetGame() {
    setTimeout(() => {
        startBtn.style.display = 'inline-flex';
        questionContainer.classList.add('hidden');
        bdskModal.classList.add('hidden');
        currentState = 'start';
    }, 1000);
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target === modal) {
        closeModal();
    }
    if (event.target === bdskModal) {
        // Don't close BDSK modal when clicking outside
        // They MUST press YES
    }
}