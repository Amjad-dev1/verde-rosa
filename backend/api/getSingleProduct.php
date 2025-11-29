<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include_once __DIR__ . "/../db.php";

$productId = $_GET['id'] ?? null;
if (!$productId) {
    echo json_encode(["success" => false, "error" => "Product ID required"]);
    exit;
}

try {
    $sql = "SELECT ProductID, ProductName, Description, Price, Stock, Category FROM Products WHERE ProductID = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$productId]);

    $product = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($product) {
        echo json_encode(["success" => true, "product" => $product]);
    } else {
        echo json_encode(["success" => false, "error" => "Product not found"]);
    }

} catch (Exception $e) {
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
