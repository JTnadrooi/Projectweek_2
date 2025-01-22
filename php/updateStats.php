<?php

session_start();

include 'db-connect.php';
include 'functions.php';

if (isset($_GET['elo'])) {
    $currentElo = getEloById($_SESSION['accountData']['id']);
    $elo = $currentElo + $_GET['elo'];
    if (isset($_SESSION['accountData']['id'])) {
        $userId = $_SESSION['accountData']['id'];
        $stmt = $conn->prepare("UPDATE q_users SET elo = :elo WHERE id = :userId");
        $stmt->execute(['elo' => $elo, 'userId' => $userId]);
        $conn = null;
        echo json_encode(['status' => 'success']);
        header('Location: ../index.php');
    } else {
        echo json_encode(['status' => 'error', 'message' => 'User ID not found in session.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'ELO parameter missing.']);
}

?>
