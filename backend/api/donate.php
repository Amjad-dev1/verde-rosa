<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

include_once __DIR__ . "/../db.php";

$data = json_decode(file_get_contents("php://input"), true);
$userId = $data['userId'] ?? null;
$amount = $data['amount'] ?? null;
$treesPlanted = $data['treesPlanted'] ?? 1;

if (!$userId || !$amount || $amount <= 0) {
    echo json_encode(["success" => false, "message" => "Invalid input data"]);
    exit;
}

try {
    $stmt = $conn->prepare("INSERT INTO Donations (UserID, Amount, TreesPlanted) VALUES (?, ?, ?)");
    $stmt->execute([$userId, $amount, $treesPlanted]);

    echo json_encode(["success" => true, "message" => "Donation recorded successfully"]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>
