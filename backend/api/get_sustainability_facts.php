<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

include_once __DIR__ . "/../db.php";

try {
    $stmt = $conn->prepare("SELECT FactID, Title, Description, Category, Source FROM SustainabilityFacts WHERE IsActive = 1 ORDER BY CreatedAt DESC");
    $stmt->execute();
    $facts = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(["success" => true, "facts" => $facts]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>
