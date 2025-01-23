

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

function finishAnswer(num) {
    if (questionsData[currentQuestion].correctAnswer == questionsData[currentQuestion].answers[num]) {
        botsData[0].correct++;
        botsData[0].total++;
        botsData[0].elo += 10;
        let modal = document.getElementById("feedbackModal-correct");
        modal.style.display = "block";
        setTimeout(() => {
            modal.style.display = "none";
            startCountdown(60);
        }, 2500);
    } else {
        botsData[0].incorrect++;
        botsData[0].total++;
        botsData[0].elo -= 10;
        let modal = document.getElementById("feedbackModal-incorrect");
        incorrectFeedback = document.getElementById("incorrectFeedback");
        incorrectFeedback.innerHTML = "False, " + questionsData[currentQuestion].correctAnswer;
        modal.style.display = "block";
        setTimeout(() => {
            modal.style.display = "none";
            startCountdown(60);
        }, 2500);
    }
    currentQuestion++;

    if (currentQuestion < questionsData.length) {
        document.getElementById("questionText").innerHTML = questionsData[currentQuestion].question;
        document.getElementById("answerText-0").innerHTML = questionsData[currentQuestion].answers[0];
        document.getElementById("answerText-1").innerHTML = questionsData[currentQuestion].answers[1];
        if (questionsData[currentQuestion].answers[2] !== undefined) {
            if (document.getElementById("answerText-2") === null) {
                let newButton = document.createElement("button");
                newButton.id = "answerText-2";
                newButton.className = "answerTile";
                newButton.setAttribute("onClick", "answered(2)");
                document.getElementById("answerRow").appendChild(newButton);
            }
            document.getElementById("answerText-2").innerHTML = questionsData[currentQuestion].answers[2];
        } else {
            if (document.getElementById("answerText-2") !== null) {
                document.getElementById("answerText-2").parentNode.removeChild(document.getElementById("answerText-2"));
            }
        }

        if (questionsData[currentQuestion].answers[3] !== undefined) {
            if (document.getElementById("answerText-3") === null) {
                let newButton = document.createElement("button");
                newButton.id = "answerText-3";
                newButton.className = "answerTile";
                newButton.setAttribute("onClick", "answered(3)");
                document.getElementById("answerRow").appendChild(newButton);
            }
            document.getElementById("answerText-3").innerHTML = questionsData[currentQuestion].answers[3];
        } else {
            if (document.getElementById("answerText-3") !== null) {
                document.getElementById("answerText-3").parentNode.removeChild(document.getElementById("answerText-3"));
            }
        }
    } else {
        setTimeout(() => {
            document.getElementById("time").style.opacity = "0%";
            let modal = document.getElementById("endModal");
            modal.style.display = "block";
            document.getElementById("endFeedback").innerHTML = botsData[0]['total'] + " vragen beantwoord <br>" + botsData[0]['correct'] + " goed <br>" + botsData[0]['incorrect'] + " fout";
            setTimeout(() => {
                window.location.href = "php/updateStats.php?elo=" + botsData[0]['elo'];
            }, 5000);
        }, 2500);
    }
}

function answered(num) {
    stopCountdown();
    if (!hasAnswered) {
        hasAnswered = true;
        botsAnswered = false;

        document.getElementById("answerText-" + num).style.backgroundColor = "gray";
        oldNum = num;
    }
}

let interval;
const fullDashArray = 440;

function startCountdown(totalSeconds) {
    let remainingSeconds = totalSeconds;
    let secondsElement = document.getElementById('seconds');
    let ss = document.getElementById('ss');
    let secDot = document.getElementById('sec_dot');
    document.getElementById("time").style.opacity = "100%";
    let botIndex = 0;
    hasAnswered = false;
    setTimeout(() => {
        let answerInterveral = setInterval(() => {
            if (botIndex < botsData.length) {
                const bot = botsData[botIndex];

                if (bot.name !== "Player") {
                    bot.total++;
                    if (Math.random() > 0.5) {
                        bot.correct++;
                        bot.elo += 10;
                    } else {
                        bot.incorrect++;
                        bot.elo -= 10;
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
        }, 200 + Math.random() * 900);
    }, 3000);
    interval = setInterval(() => {
        remainingSeconds--;
        secondsElement.innerHTML = remainingSeconds;

        const dashOffset = fullDashArray - (fullDashArray * remainingSeconds) / totalSeconds;
        ss.style.strokeDashoffset = dashOffset;
        secDot.style.transform = `rotate(${(fullDashArray - dashOffset) / fullDashArray * 360}deg)`;
        secDot.style.transition = "transform 1.0s linear";

        if (remainingSeconds == 0) {
            clearInterval(interval);
            answered(-1);
        }
    }, 11000);
}

function stopCountdown() {
    document.getElementById("time").style.opacity = "0%";
    clearInterval(interval);
}

window.onload = function () {
    // startCountdown(60);
    initBots()
};


function initBots() {
    const randomCount = Math.floor(Math.random() * 10) + 15;
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
        if (currentBotCount < randomCount) {
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
