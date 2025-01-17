<?php 

function getQuestionsData($questionId) {
    include 'db-connect.php'; 
    $sql = "SELECT * FROM q_quiz WHERE id = :id";
    $stmt = $conn->prepare($sql);
    $stmt->execute(['id' => $questionId]);
    $quizData = $stmt->fetch(PDO::FETCH_ASSOC); 

    if ($quizData) { // Check of data bestaat, zo niet dan wordt je terug gestuurd naar de home page met een errror code
        $questionsData = json_decode($quizData['questions'], true); // Omdat het een string is decode je het naar een array
        return $questionsData; // Stuur alle data terug naar de quizpagina
    } else {
        header('Location: index.php?error=noQuiz');
    }

    $conn = null;
}

function checkLogin() {
    session_start();
    if (!isset($_SESSION['accountData'])) {
        return false;
    } else {
        include 'db-connect.php';
        $stmt = $conn->prepare("select id from q_users where id = :id");
        $stmt->execute(['id' => $_SESSION['accountData']['id']]);
        $listArray = $stmt->fetchAll();
        if (!$listArray) {
            return false;
        } else {
            return true;
        }
        
    }
}

?>
