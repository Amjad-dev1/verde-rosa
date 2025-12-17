<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

include_once __DIR__ . "/../db.php";

$data = json_decode(file_get_contents("php://input"), true);
$userId = $data['userId'] ?? null;
$amount = $data['amount'] ?? null;

if (!$userId || !$amount || $amount <= 0) {
    echo json_encode(["success" => false, "message" => "Invalid input data"]);
    exit;
}

// Business rule: $10 per tree
if ($amount < 10) {
    echo json_encode([
        "success" => false,
        "message" => "Minimum donation is $10 to plant 1 tree 🌱"
    ]);
    exit;
}

try {
    $stmt = $conn->prepare("INSERT INTO Donations (UserID, Amount) VALUES (?, ?)");
    $stmt->execute([$userId, $amount]);

    echo json_encode(["success" => true, "message" => "Donation recorded successfully"]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}

?>
