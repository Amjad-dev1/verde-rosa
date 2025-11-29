<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

include_once __DIR__ . "/../db.php";
session_start();

if (!isset($_SESSION["UserID"])) {
    echo json_encode(["success" => false, "message" => "Not logged in"]);
    exit;
}

$userId = $_SESSION["UserID"];

try {
    $stmt = $conn->prepare("SELECT * FROM Addresses WHERE UserID = ?");
    $stmt->execute([$userId]);
    $address = $stmt->fetch(PDO::FETCH_ASSOC);

    echo json_encode(["success" => true, "address" => $address]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>
