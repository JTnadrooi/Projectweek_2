<?php
include 'php/db-connect.php';
include 'php/functions.php';
session_start();
?>

<!DOCTYPE html>
<html>

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
    <div id="page">
        <div id="topContainer">
            <div id="logo">QUIZZA</div>
            <input type="text" id="searchBar" placeholder="Search.." oninput="handleSearchInput(event)">
            <div id="iconsContainer"></div>
        </div>
        <div id="accountContainer">
            <img src="media/icons/account.png" alt="accountIcon" width="30px">
            <h1>USERNAME</h1>
            <h2>DATA1</h2>
            <h2>DATA2</h2>
            <h2>DATA3</h2>
            <h2>DATA4</h2>
            <button class="accountDropDownButton">LOGOUT</button>
        </div>
        <div id="mainDisplay">
            <div id="sideIconContainer"></div>
            <div id="masterQuizContainer">
                <div class="subcontainer">
                    <div>CREATE</div>
                    <div class="homeTitleContainer">
                        <?php
                        $tiles = [
                            ['id' => 'question-create', 'label' => '+', 'show' => isset($_SESSION['userRole']) && $_SESSION['userRole'] === 'teacher'],
                            ['id' => 'personal-1', 'label' => '1', 'show' => !isset($_SESSION['userRole']) || $_SESSION['userRole'] !== 'teacher'],
                            ['id' => 'personal-2', 'label' => '2', 'show' => true],
                            ['id' => 'personal-3', 'label' => '3', 'show' => true],
                        ];
                        foreach ($tiles as $tile) {
                            if ($tile['show']) {
                                echo "<div class='quizTile' id='{$tile['id']}'>{$tile['label']}</div>";
                            }
                        }
                        ?>
                    </div>
                </div>
                <div class="subcontainer">
                    <div>EXPLORE</div>
                    <div class="homeTitleContainer">
                        <div class="quizTile" id="question-1">Auto</div>
                        <div class="quizTile" id="question-2">Films</div>
                        <div class="quizTile" id="question-3">Vlaggen</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <?php if (! checkLogin()) {  ?>
        <div id="loginModal" class="modal">
            <div class="modal-content">
                <h1>QUIZZA</h1>
                <form action="php/login.php" method="post">
                    <input required type="email" name="email" placeholder="example@gmail.com" style="margin-bottom: 20px;"><br>
                    <input required type="password" name="wachtwoord" placeholder="Password" style="margin-bottom: 40px;"><br>
                    <hr>
                    <p id="modalFeedback">&#8203;</p>
                    <input type="submit" class="loginButton" name="submit" value="Login" onclick="handleLogin()">
                    <input type="submit" class="registerButton" name="submit" value="Registreren" onclick="handleRegister()">
                </form>
            </div>

        </div>
    <?php } ?>
</body>

</html>