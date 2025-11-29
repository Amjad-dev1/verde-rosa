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
$cartItemId = $_POST['cart_item_id'] ?? null;

if (!$cartItemId) {
    echo json_encode(["success" => false, "error" => "Cart item ID required"]);
    exit;
}

try {
    // Verify the cart item belongs to the user
    $sql = "SELECT ci.CartItemID FROM CartItems ci
            JOIN Carts c ON ci.CartID = c.CartID
            WHERE ci.CartItemID = ? AND c.UserID = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$cartItemId, $userId]);
    $item = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$item) {
        echo json_encode(["success" => false, "error" => "Cart item not found or doesn't belong to user"]);
        exit;
    }

    // Remove the cart item
    $sql = "DELETE FROM CartItems WHERE CartItemID = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$cartItemId]);

    echo json_encode(["success" => true, "message" => "Item removed from cart"]);

} catch (Exception $e) {
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
