<?php

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

$_SESSION['accountData'] = null;
session_destroy();
header('Location: ../index.php');