let currentQuestion = 0;

let currentStats = [
    total = 0,
    correct = 0,
    incorrect = 0
]

function answered(num) {
    stopCountdown();
    if (questionsData[currentQuestion].correctAnswer == questionsData[currentQuestion].answers[num]) {
        currentStats[0]++;
        currentStats[1]++;
        let modal = document.getElementById("feedbackModal-correct");
        modal.style.display = "block";
        setTimeout(() => {
            modal.style.display = "none";
            startCountdown(60);
        }, 5000);
    } else {
        currentStats[0]++;
        currentStats[2]++;
        let modal = document.getElementById("feedbackModal-incorrect");
        incorrectFeedback = document.getElementById("incorrectFeedback");
        incorrectFeedback.innerHTML = "Fout, " + questionsData[currentQuestion].correctAnswer;
        modal.style.display = "block";
        setTimeout(() => {
            modal.style.display = "none";
            startCountdown(60);
        }, 5000);
    }
    currentQuestion++;

    if (currentQuestion < questionsData.length) {
        document.getElementById("answerText-0").innerHTML = questionsData[currentQuestion].answers[0];
        document.getElementById("answerText-1").innerHTML = questionsData[currentQuestion].answers[1];
        document.getElementById("answerText-2").innerHTML = questionsData[currentQuestion].answers[2];
        document.getElementById("answerText-3").innerHTML = questionsData[currentQuestion].answers[3];
        document.getElementsByClassName("textQuestionTitle")[0].innerHTML = questionsData[currentQuestion].question;
    } else {
        alert("Je hebt alle vragen ingevuld, je hebt " + currentStats[1] + " van de " + currentStats[0] + " vragen goed beantwoord.");
        window.location.href = `index.php`;
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
    }, 1000); 
}

function stopCountdown() {
    document.getElementById("time").style.opacity = "0%";
    clearInterval(interval);
}

window.onload = function () {
    startCountdown(60); 
};