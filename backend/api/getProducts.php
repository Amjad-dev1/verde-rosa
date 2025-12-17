<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include_once __DIR__ . "/../db.php";

if (!$conn) {
    echo json_encode(["success" => false, "error" => "Database connection failed"]);
    exit;
}

try {
    $sql = "SELECT ProductID, ProductName, Description, Price, Stock, Category FROM Products";
    $stmt = $conn->prepare($sql);
    $stmt->execute();

    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "success" => true,
        "data" => $products
    ]);

} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "error" => $e->getMessage()
    ]);
}
