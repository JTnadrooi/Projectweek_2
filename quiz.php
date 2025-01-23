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
        <div id="main-container" style="display:none">
            <div class="subcontainer-quiz">
                <div class="textQuestionTitle" id="questionText"><?php echo $questionsData[0]['question'] ?></div>
            </div>
            <div id="botsAnswered" title="Bots answered">
                0 ANSWERED
            </div>
            <div class="quizTileContainer">
                <div class="answerRow">
                    <button class="answerTile" onClick="playerAnswer(0)" id="answerText-0"><?php echo $questionsData[0]['answers'][0] ?></button>
                    <button class="answerTile" onClick="playerAnswer(1)" id="answerText-1"><?php echo $questionsData[0]['answers'][1] ?></button>
                </div>
                <div class="answerRow" id="answerRow">
                    <?php if (isset($questionsData[0]['answers'][2])) { ?>
                        <button class="answerTile" onClick="playerAnswer(2)" id="answerText-2"><?php echo $questionsData[0]['answers'][2] ?></button>
                    <?php } ?>

                    <?php if (isset($questionsData[0]['answers'][3])) { ?>
                        <button class="answerTile" onClick="playerAnswer(3)" id="answerText-3"><?php echo $questionsData[0]['answers'][3] ?></button>
                    <?php } ?>
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
        <div id="wait-container">
            <div id="wait-block">
                <div id="wait-text">0 Players</div>
                <div id="wait-description">Waiting for more players...</div>
            </div>
        </div>
    </div>
    <div id="bottomIconContainer"></div>
    <!-- Modal content -->
    <div id="feedbackModal-correct" class="modal" style="display:none">
        <div class="modal-content">
            <img src="media/correct.png" alt="">
            <p>Splendid! </p>

            <!-- make this put here by js, so i dont hav to do some weird stuff with double ids  -->
            <div>
                <h1 id="leaderHeader">Top 3</h1>
                <div id="quizLeaderboard">
                    <div id="e1" class="quizLeaderboardEntry">BOT1</div>
                    <div id="e2" class="quizLeaderboardEntry">REALPLAYER</div>
                    <div id="e3" class="quizLeaderboardEntry">NOTABOT</div>
                </div>
            </div>
        </div>
    </div>
    </div>
    <div id="feedbackModal-incorrect" class="modal" style="display:none">
        <!-- Modal content -->
        <div class="modal-content">
            <img src="media/incorrect.png" alt="">
            <p id="incorrectFeedback"></p>
        </div>
    </div>

    <div id="endModal" class="modal" style="display:none">
        <!-- Modal content -->
        <div class="modal-content">
            <p id="endFeedback">Feedback: 8/10</p>
        </div>
    </div>
</body>

</html>

<?php
echo '<script> let questionsData = ' . json_encode($questionsData) . '</script>';
?>