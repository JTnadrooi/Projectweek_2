<?php
session_start();

include 'php/db-connect.php'; 
include 'php/functions.php';

if (!isset($conn)) {
    die('Database connection is not correctly set up.');
}

if (!isset($_SESSION['accountData'])) {
    header('Location: index.php');
    exit;
}


$stmt = $conn->prepare('SELECT elo FROM q_users WHERE id = :user_id');
$stmt->execute(['user_id' => $_SESSION['accountData']['id']]);
$elo = $stmt->fetchColumn();


$leaderboard = getLeaderboard();

usort($leaderboard, function($a, $b) {
    return $b['elo'] - $a['elo'];
});
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <title>Leaderboard</title>
</head>
<body>
    <div id="page">
        <div id="topContainer">
            <div id="logo">QUIZZA</div>
            <div id="iconsContainer"></div>
        </div>
        <div id="accountContainer">
            <img src="media/icons/account.png" alt="accountIcon" width="30px">
            <h1>
                <?php if (isset($_SESSION['accountData'])) { echo getEmailById($_SESSION['accountData']['id']); } ?>
            </h1>

            <button class="accountDropDownButton" id="logoutButton">LOGOUT</button>
        </div>
        <div id="mainDisplay">
            <div id="sideIconContainer"></div>
            <div id="masterQuizContainer">
                <div class="leaderboard-container">
                    <?php foreach ($leaderboard as $entry): ?>
                        <p><?php echo htmlspecialchars($entry['email']); ?> <?php echo htmlspecialchars($entry['elo']); ?></p>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
    </div>
    <script src="js/lib/asitdebug.js"></script>
    <script src="js/main.js"></script>
</body>
</html>



