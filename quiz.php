<?php
    include 'php/functions.php';
    $quizId = $_GET['quizid'];
    $questionsData = getQuestionsData($quizId);
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
                <button onClick="answered(1)"><?php echo $questionsData[0]['answers'][0] ?></button>
                <button onClick="answered(2)"><?php echo $questionsData[0]['answers'][1] ?></button>
                <button onClick="answered(3)"><?php echo $questionsData[0]['answers'][2] ?></button>
                <button onClick="answered(4)"><?php echo $questionsData[0]['answers'][3] ?></button>
            </div>
        </div>
    </div>
    <div id="bottomIconContainer"></div>
</body>

</html>

<?php 
    echo '<script> let questionsData = ' . json_encode($questionsData) . '</script>';
?>

<script>
    function answered() {
        console.log(questionsData[0]['correctAnswer']);
        if (questionsData[0]['correctAnswer'] == 1) {
            alert('Correct!');
        } else {
            alert('Incorrect!');
        }
    }
</script>