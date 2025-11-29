<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

include_once __DIR__ . "/../db.php";

if (!$conn) {
    echo json_encode(["success" => false, "error" => "Database connection failed"]);
    exit;
}

session_start();

if (!isset($_SESSION["UserID"])) {
    echo json_encode(["success" => false, "error" => "User not logged in"]);
    exit;
}

$userId = $_SESSION["UserID"];

try {
    $sql = "SELECT ci.CartItemID, ci.Quantity, p.ProductID, p.ProductName, p.Price, p.Description
            FROM CartItems ci
            JOIN Carts c ON ci.CartID = c.CartID
            JOIN Products p ON ci.ProductID = p.ProductID
            WHERE c.UserID = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$userId]);

    $items = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(["success" => true, "items" => $items]);

} catch (Exception $e) {
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
