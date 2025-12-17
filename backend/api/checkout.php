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
$addressId = $_POST['address_id'] ?? null;

if (!$addressId) {
    echo json_encode(["success" => false, "error" => "Address ID required"]);
    exit;
}

try {
    $sql = "SELECT ci.CartItemID, ci.Quantity, p.ProductID, p.ProductName, p.Price
            FROM CartItems ci
            JOIN Carts c ON ci.CartID = c.CartID
            JOIN Products p ON ci.ProductID = p.ProductID
            WHERE c.UserID = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$userId]);
    $items = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (empty($items)) {
        echo json_encode(["success" => false, "error" => "Cart is empty"]);
        exit;
    }

    $total = 0;
    foreach ($items as $item) {
        $total += $item['Price'] * $item['Quantity'];
    }

    $sql = "INSERT INTO Orders (UserID, AddressID, OrderDate, TotalAmount, Status, IsPOD, PODStatus)
            VALUES (?, ?, GETDATE(), ?, 'Pending', 1, 'Pending')";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$userId, $addressId, $total]);
    $orderId = $conn->lastInsertId();

    foreach ($items as $item) {
        $sql = "INSERT INTO OrderItems (OrderID, ProductID, Quantity, UnitPrice)
                VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$orderId, $item['ProductID'], $item['Quantity'], $item['Price']]);
    }

    $sql = "DELETE ci FROM CartItems ci
            JOIN Carts c ON ci.CartID = c.CartID
            WHERE c.UserID = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$userId]);

    echo json_encode(["success" => true, "message" => "Order placed successfully", "order_id" => $orderId]);

} catch (Exception $e) {
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
