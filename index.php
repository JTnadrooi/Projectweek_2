<?php
    include 'php/db-connect.php';
    include 'php/functions.php';
?>

<!DOCTYPE html>
<html>

<head>
    <title>
        Quizza
    </title>
    <link rel="stylesheet" href="css/style.css">

    <!-- The main script. -->
    <script src="js/lib/asitdebug.js"></script>
    <script src="js/main.js"></script>
    <meta charset="utf8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        @font-face {
            font-family: mainFont;
            src: url('smollerMono.ttf');
        }
    </style>
</head>

<body>
    <div id="page">
        <div id="topContainer">
            <div id="logo">QUIZZA</div>
            <input type="text" id="searchBar" placeholder="Search.." oninput="handleSearchInput(event)">
            <div id="iconsContainer"></div>
        </div>
        <div id="mainDisplay">
            <div id="sideIconContainer"></div>
            <div id="masterQuizContainer">
                <div class="subcontainer">
                    <div>CREATE</div>
                    <div class="homeTitleContainer">
                        <div class="quizTile" id="question-create">+</div>
                        <div class="quizTile" id="personal-1">Persoonlijk 1</div>
                        <div class="quizTile" id="personal-2">Persoonlijk 2</div>
                    </div>
                </div>
                <div class="subcontainer">
                    <div>EXPLORE</div>
                    <div class="homeTitleContainer">
                        <div class="quizTile" id="question-1">Automerken</div>
                        <div class="quizTile" id="question-2">Films</div>
                        <div class="quizTile" id="question-3">Vlaggen</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>

</html>