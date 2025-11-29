<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

include_once __DIR__ . "/../db.php";

$userId = $_GET['user_id'] ?? null;
if (!$userId) {
    echo json_encode(["success" => false, "message" => "Missing user ID"]);
    exit;
}

try {
    $stmt = $conn->prepare("SELECT DonationID, DonateDate, Amount FROM Donations WHERE UserID = ? ORDER BY DonateDate DESC");
    $stmt->execute([$userId]);
    $donations = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(["success" => true, "donations" => $donations]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>
