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
$productId = $_POST['product_id'] ?? null;
$quantity = $_POST['quantity'] ?? 1;

if (!$productId) {
    echo json_encode(["success" => false, "error" => "Product ID required"]);
    exit;
}

try {
    $sql = "SELECT CartID FROM Carts WHERE UserID = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$userId]);
    $cart = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$cart) {
        $sql = "INSERT INTO Carts (UserID) VALUES (?)";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$userId]);
        $cartId = $conn->lastInsertId();
    } else {
        $cartId = $cart['CartID'];
    }

    $sql = "SELECT CartItemID, Quantity FROM CartItems WHERE CartID = ? AND ProductID = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$cartId, $productId]);
    $item = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($item) {
        $newQuantity = $item['Quantity'] + $quantity;
        $sql = "UPDATE CartItems SET Quantity = ? WHERE CartItemID = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$newQuantity, $item['CartItemID']]);
    } else {
        // Add new item
        $sql = "INSERT INTO CartItems (CartID, ProductID, Quantity) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$cartId, $productId, $quantity]);
    }

    echo json_encode(["success" => true, "message" => "Item added to cart"]);

} catch (Exception $e) {
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
