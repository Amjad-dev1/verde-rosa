<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

include_once __DIR__ . "/../db.php";

try {
    $stmt = $conn->prepare("SELECT TreesPlanted FROM TreeCounter");
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    echo json_encode(["success" => true, "treesPlanted" => $result['TreesPlanted'] ?? 0]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>
