

let currentQuestion = 0;
let hasAnswered = false;
let botsAnswered = false;
let oldNum = 1;
let currentStats = [
    id = 1,
    name = "Self",
    total = 0,
    correct = 0,
    incorrect = 0,
    elo = 0
];

let botsData = [];
let botNames = [
    'Quinten',
    'Jesse',
    'Jasper',
    'Jelle',
    'Joris',
    'Jeroen',
    'Jordy',
    'Jordi',
    'Johan',
    'Jelle',
    'Horsefighter',
    'Bart',
    'Kanye West',
    'Amber',
    'Bart',
    'Bram',
    'Boris',
    'Ali',

    'Achmed',
    'Abdullah',
    'Kees',
    'Gerrit',
    'Henk',
    'Jan',
    'Klaas',
];

const timeMultiplier = 0.02;

function finishAnswer(selectedAnswerIndex) {
    const currentData = questionsData[currentQuestion];
    const correctAnswer = currentData.correctAnswer;
    const isCorrect = correctAnswer === currentData.answers[selectedAnswerIndex];
    showModal(isCorrect ? "feedbackModal-correct" : "feedbackModal-incorrect", isCorrect ? null : correctAnswer);
    currentQuestion++;
    if (currentQuestion < questionsData.length) updateQuestionContent(currentQuestion);
    else endQuiz();
};

// Helper functions
function showModal(modalId, incorrectAnswer = null) {
    const modal = document.getElementById(modalId);
    modal.style.display = "block";

    if (incorrectAnswer) document.getElementById("incorrectFeedback").innerHTML = `False, ${incorrectAnswer}`;
    setTimeout(() => {
        modal.style.display = "none";
        startCountdown(60);
    }, 2500);
};

function updateQuestionContent(questionIndex) {
    const questionData = questionsData[questionIndex];
    document.getElementById("questionText").textContent = questionData.question;
    questionData.answers.forEach((answer, index) => updateOrCreateButton(`answerText-${index}`, answer));
    for (let i = questionData.answers.length; i < 4; i++) removeButton(`answerText-${i}`);
};

function updateOrCreateButton(buttonId, text) {
    let button = document.getElementById(buttonId);

    if (!button) {
        button = document.createElement("button");
        button.id = buttonId;
        button.className = "answerTile";
        button.setAttribute("onClick", `answered(${buttonId.split("-")[1]})`);
        document.getElementById("answerRow").appendChild(button);
    }

    button.textContent = text;
};

function removeButton(buttonId) {
    const button = document.getElementById(buttonId);
    if (button) button.remove();
};

function endQuiz() {
    setTimeout(() => {
        document.getElementById("time").style.opacity = "0%";
        const modal = document.getElementById("endModal");
        modal.style.display = "block";

        const bot = botsData[0];
        document.getElementById("endFeedback").innerHTML = `
            ${bot.total} questions answered <br>
            ${bot.correct} correct <br>
            ${bot.incorrect} incorrect
        `;

        setTimeout(() => {
            window.location.href = `php/updateStats.php?elo=${bot.elo}`;
        }, 5000);
    }, 2500);
};


function answered(num) {
    stopCountdown();
    if (!hasAnswered) {
        hasAnswered = true;
        botsAnswered = false;

        document.getElementById("answerText-" + num).style.backgroundColor = "gray";
        oldNum = num;
    }
}

let clockInterval;
const fullDashArray = 440;

function startCountdown(totalSeconds) {
    let remainingSeconds = totalSeconds;
    let secondsElement = document.getElementById('seconds');
    let ss = document.getElementById('ss');
    let secDot = document.getElementById('sec_dot');
    document.getElementById("time").style.opacity = "100%";
    let botIndex = 0;
    hasAnswered = false;
    let answerInterveral = setInterval(() => {
        if (botIndex < botsData.length) {
            const bot = botsData[botIndex];

            if (bot.name !== "Player") {
                bot.total++;
                if (Math.random() > 0.5) {
                    bot.correct++;
                } else {
                    bot.incorrect++;
                }

                console.log(`${bot.name}: ${bot.correct > bot.total - bot.correct}`);
            }

            botIndex++;
        } else {
            clearInterval(answerInterveral);
            setTimeout(() => {
                let personalWait = setInterval(() => {
                    if (hasAnswered) {
                        clearInterval(personalWait);
                        document.getElementById("answerText-" + oldNum + "").style.backgroundColor = "#ffffff";
                        finishAnswer(oldNum);
                    }
                }, 500);
            }, 2000);
        }
    }, Math.random() * 1000 * timeMultiplier);

    clockInterval = setInterval(() => {
        remainingSeconds--;
        secondsElement.innerHTML = remainingSeconds;

        const dashOffset = fullDashArray - (fullDashArray * remainingSeconds) / totalSeconds;
        ss.style.strokeDashoffset = dashOffset;
        secDot.style.transform = `rotate(${(fullDashArray - dashOffset) / fullDashArray * 360}deg)`;
        secDot.style.transition = "transform 1.0s linear";

        if (remainingSeconds == 0) {
            clearInterval(clockInterval);
            answered(-1);
        }
    }, 11000);
}

function stopCountdown() {
    document.getElementById("time").style.opacity = "0%";
    clearInterval(clockInterval);
}



function initBots() {
    const desiredBotCount = Math.floor(Math.random() * 10) + 15;
    let currentBotCount = 0;
    botsData.push({
        id: 0,
        name: "Player",
        total: 0,
        correct: 0,
        incorrect: 0,
        elo: 0
    });
    const botInterval = setInterval(() => {
        currentBotCount = botsData.length;
        if (currentBotCount < desiredBotCount) {
            const randomName = botNames[Math.floor(Math.random() * botNames.length)];
            botsData.push({
                id: currentBotCount,
                name: randomName,
                total: 0,
                correct: 0,
                incorrect: 0,
                elo: 0
            });
            document.getElementById('wait-text').innerHTML = `${currentBotCount} Players`;
        } else {
            document.getElementById('wait-description').innerHTML = "Quiz starting...";
            clearInterval(botInterval);
            setTimeout(() => {
                startCountdown(60);
                document.getElementById('main-container').style.display = "block";
                document.getElementById('wait-container').style.display = "none";
            }, 2500 * timeMultiplier);
        }
    }, Math.floor(1000) * timeMultiplier);
}

window.onload = function () {
    initBots()
};