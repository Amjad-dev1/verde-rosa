<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

session_start();

if (isset($_SESSION["UserID"])) {
    echo json_encode([
        "logged_in" => true,
        "user" => [
            "UserID" => $_SESSION["UserID"],
            "FullName" => $_SESSION["FullName"],
            "Email" => $_SESSION["Email"],
            "Phone" => $_SESSION["Phone"] ?? null
        ]
    ]);
} else {
    echo json_encode(["logged_in" => false]);
}
?>
