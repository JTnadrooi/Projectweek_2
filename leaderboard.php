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


$bots = [
    ['username' => 'Ivo', 'elo' => 10000],
    ['username' => 'Reda', 'elo' => 9000000000000000],
    ['username' => 'Jordan', 'elo' => 200],
    ['username' => 'BIGXTHAPLUG', 'elo' => 100],
    ['username' => 'Alem', 'elo' => 10],
    ['username' => 'Rik', 'elo' => 10000000000000],
];


if ($elo !== false) {
    $leaderboard = array_merge($bots, [['username' => 'elo', 'elo' => $elo]]);
} else {
    $leaderboard = $bots;
}


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
        <div id="mainDisplay">
            <div id="sideIconContainer"></div>
            <div id="masterQuizContainer">
                <h1 id="leaderboard_h1">RANKINGS</h1>
                <div class="leaderboard-container">
                     <?php foreach ($leaderboard as $index => $entry): ?>
                        <p id="name" class="rank-<?php echo $index +    1; ?>">
                            <?php echo htmlspecialchars($entry['username']); ?> 
                            <?php echo htmlspecialchars($entry['elo']); ?>
                        </p>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
    </div>
    <script src="js/lib/asitdebug.js"></script>
    <script src="js/main.js"></script>
</body>
</html>



