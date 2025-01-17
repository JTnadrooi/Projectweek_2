<?php
session_start();
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    include 'db-connect.php';
    $password = $_POST["wachtwoord"];
    $email = $_POST["email"];

    if ($_POST["submit"] == "Registreren") {
        $stmt = $conn->prepare("insert into q_users (email, password, accountType) values (:email, :password, 'user')");
        $stmt->execute(['email' => $email, 'password' => $password]);
        header('Location: ../index.php?registratieSucces');
    } else {
        $stmt = $conn->prepare("select id, accountType from q_users where email = :email AND password = :password");
        $stmt->execute(['email' => $email, 'password' => $password]);
        $listArray = $stmt->fetchAll();
        if ($listArray) {
            $_SESSION["accountData"] = $listArray[0];
            header('Location: ../index.php');
        } else {
            header('Location: ../index.php?inlogFailed');
        }
    }

}