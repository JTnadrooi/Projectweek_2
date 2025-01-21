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
    <title>Quizza</title>
    <link rel="stylesheet" href="css/style.css">
    <script src="js/lib/asitdebug.js"></script>
    <script src="js/main.js"></script>
    <script src="js/quiz.js"></script>
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
            <p>Splendid! </p>
        </div>
    </div>
    <div id="feedbackModal-incorrect" class="modal" style="display:none">
        <!-- Modal content -->
        <div class="modal-content">
            <img src="media/incorrect.png" alt="">
            <p id="incorrectFeedback"></p>
        </div>
    </div>
</body>

</html>

<?php
echo '<script> let questionsData = ' . json_encode($questionsData) . '</script>';
?>