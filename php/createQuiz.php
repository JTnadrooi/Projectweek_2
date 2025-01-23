<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    include 'db-connect.php';
    
    $input = file_get_contents("php://input");
    $data = json_decode($input, true);
    header('Content-Type: application/json');
    header('Location: ../index.php');
    if (isset($data["quiz"])) {
        $quiz = json_encode($data["quiz"]); 
        $stmt = $conn->prepare("INSERT INTO q_quiz (title, questions) VALUES (:title, :questions)");
        $stmt->execute(['title' => "quiz", 'questions' => $quiz]);
        $conn = null;
    } 
}
