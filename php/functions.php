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
    if (session_status() == PHP_SESSION_NONE) {
        session_start();
    }
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

function updateData() {
    if (!isset($_SESSION['accountData'])) {
        return;
    }
    include 'db-connect.php';
    $stmt = $conn->prepare("select id, accountType from q_users where id = :id");
    $stmt->execute(['id' => $_SESSION['accountData']['id']]);
    $listArray = $stmt->fetchAll();
    
    if ($listArray) {
        $_SESSION['accountData'] = $listArray[0];
    } 
    $conn = null;
}

function getQuizzes() {
    include 'db-connect.php';
    $stmt = $conn->prepare("select * from q_quiz");
    $stmt->execute();
    $listArray = $stmt->fetchAll();
    $conn = null;
    return $listArray;
}

function getEmailById($id) {
    include 'db-connect.php';
    $stmt = $conn->prepare("select email from q_users where id = :id");
    $stmt->execute(['id' => $id]);
    $listArray = $stmt->fetchAll();
    $conn = null;
    return $listArray[0]['email'];
}

function getLeaderboard() {
    include 'db-connect.php';
    $stmt = $conn->prepare("select email, elo from q_users order by elo desc limit 10");
    $stmt->execute();
    $listArray = $stmt->fetchAll();
    $conn = null;
    return $listArray;
}

function getEloById($id) {
    include 'db-connect.php';
    $stmt = $conn->prepare("select elo from q_users where id = :id");
    $stmt->execute(['id' => $id]);
    $listArray = $stmt->fetchAll();
    $conn = null;
    return $listArray[0]['elo'];
}

?>
