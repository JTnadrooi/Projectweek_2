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

        if (questionsData[currentQuestion].answers[3] != undefined) {
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
        setInterval(() => {
            document.getElementById("time").style.opacity = "0%";
            let modal = document.getElementById("endModal");
            modal.style.display = "block";
            document.getElementById("endFeedback").innerHTML = currentStats[0] + " vragen beantwoord <br>" + currentStats[1] + " goed <br>" + currentStats[2] + " fout";
            setInterval(() => {
                window.location.href = "index.php";
            }, 5000);
        }, 5000);
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