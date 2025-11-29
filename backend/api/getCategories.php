<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include_once __DIR__ . "/../db.php"; // your working PDO connection

try {
    $sql = "SELECT DISTINCT Category FROM Products WHERE Category IS NOT NULL";
    $stmt = $conn->prepare($sql);
    $stmt->execute();

    $categories = [];

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $categories[] = [
            "name" => $row["Category"]
        ];
    }

    echo json_encode([
        "success" => true,
        "data" => $categories
    ]);

} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "error" => $e->getMessage()
    ]);
}
