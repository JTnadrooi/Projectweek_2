<?php
include 'php/functions.php';
$quizId = $_GET['quizid'];
$questionsData = getQuestionsData($quizId);
include 'php/db-connect.php';
if (! checkLogin()) {
    header('Location: index.php');
}
?>



<!DOCTYPE html>
<html lang="en">

<head>
    <title>
        Quizza
    </title>
    <link rel="stylesheet" href="css/style.css">
    <script src="js/lib/asitdebug.js"></script>
    <script src="js/main.js"></script>
    <meta charset="utf8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body>
    <div id="quiz-container">
        <div id="main-container">
            <div class="subcontainer-quiz">
                <div class="textQuestionTitle"><?php echo $questionsData[0]['question'] ?></div>
            </div>
            <div class="quizTileContainer">
                <div class="answerRow">
                    <button class="answerTile" onClick="answered(0)" id="answerText-0"><?php echo $questionsData[0]['answers'][0] ?></button>
                    <button class="answerTile" onClick="answered(1)" id="answerText-1"><?php echo $questionsData[0]['answers'][1] ?></button>
                </div>
                <div class="answerRow">
                    <button class="answerTile" onClick="answered(2)" id="answerText-2"><?php echo $questionsData[0]['answers'][2] ?></button>
                    <button class="answerTile" onClick="answered(3)" id="answerText-3"><?php echo $questionsData[0]['answers'][3] ?></button>
                </div>
                <div id="time">
                    <div class="circle" style="--clr:#ff2972;">
                        <div class="dots sec_dot" id="sec_dot"></div>
                        <svg>
                            <circle cx="70" cy="70" r="70"></circle>
                            <circle cx="70" cy="70" r="70" id="ss"></circle>
                        </svg>
                        <div id="seconds">60</div>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <div id="bottomIconContainer"></div>
    <!-- Modal content -->
    <div id="feedbackModal-correct" class="modal" style="display:none">
        <div class="modal-content">
            <img src="media/correct.png" alt="">
            <p>Vraag goed! </p>
        </div>
    </div>
    <div id="feedbackModal-incorrect" class="modal" style="display:none">
        <!-- Modal content -->
        <div class="modal-content">
            <img src="media/incorrect.png" alt="">
            <p>Vraag fout. </p>
        </div>
    </div>
</body>

</html>

<?php
echo '<script> let questionsData = ' . json_encode($questionsData) . '</script>';
?>

<script>
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

    let secondsElement = document.getElementById('seconds');
    let ss = document.getElementById('ss');
    let secDot = document.getElementById('sec_dot');
    let interval;
    const fullDashArray = 440;

    function startCountdown(totalSeconds) {
        let remainingSeconds = totalSeconds;
        document.getElementById("time").style.opacity = "100%";

        interval = setInterval(() => {
            remainingSeconds--;
            secondsElement.innerHTML = remainingSeconds;

            const dashOffset = fullDashArray - (fullDashArray * remainingSeconds) / totalSeconds;
            ss.style.strokeDashoffset = dashOffset;

            // secdot has to go with offset
            secDot.style.transform = `rotate(${(fullDashArray - dashOffset) / fullDashArray * 360}deg)`;


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

    window.onload = function() {
        startCountdown(60);
    };
</script>