<?php
include 'php/db-connect.php';
include 'php/functions.php';
session_start();

updateData();
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
                        <?php if (isset($_SESSION['accountData']) && $_SESSION['accountData']['accountType'] == 'teacher') { ?>
                            <div class="quizTile" id="question-create">+</div>
                        <?php } else { ?>
                            <div class="quizTile" id="personal-1">1</div>
                        <?php } ?>
                        <div class="quizTile" id="personal-2">2</div>
                        <div class="quizTile" id="personal-3">3</div>
                    </div>
                </div>
                <div class="subcontainer">
                    <div>EXPLORE</div>
                    <div class="homeTitleContainer">
                        <?php
                        $quizzes = getQuizzes();
                        foreach ($quizzes as $quiz) {
                            echo '<div class="quizTile" id="question-' . $quiz['id'] . '">' . $quiz['title'] . '</div>';
                        }
                        ?>
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
    <div id="createQuiz" class="modal" style="display:none">
        <!-- Modal content -->
        <div class="modal-content">
            <h1>QUIZZA</h1>
            <form action="php/login.php" method="post">
                <input id="emailInput" required type="email" name="email" placeholder="example@gmail.com" style="margin-bottom: 20px;"><br>
                <input id="passwordInput" required type="password" name="wachtwoord" placeholder="Password" style="margin-bottom: 40px;"><br>
                <hr>
                <input type="submit" class="loginButton" name="submit" value="Login">
                <input type="submit" class="registerButton" name="submit" value="Registreren">
            </form>
        </div>

    </div>
</body>

</html>