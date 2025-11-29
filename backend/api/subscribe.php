<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Include DB connection
include_once __DIR__ . "/../db.php";

if (!$conn) {
    echo json_encode(["success" => false, "message" => "Database connection failed"]);
    exit;
}

// Get POST data
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['email']) || !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["success" => false, "message" => "Invalid email"]);
    exit;
}

$email = $data['email'];
$phone = isset($data['phone']) ? $data['phone'] : null;
$channel = isset($data['preferredChannel']) ? $data['preferredChannel'] : 'email';

try {
    // Check for existing subscriber
    $check = $conn->prepare("SELECT SubscriberID FROM Subscribers WHERE Email = ?");
    $check->execute([$email]);

    if ($check->rowCount() > 0) {
        echo json_encode(["success" => false, "message" => "This email is already subscribed."]);
        exit;
    }

    // Insert new subscriber
    $stmt = $conn->prepare("INSERT INTO Subscribers (Email, Phone, PreferredChannel) VALUES (?, ?, ?)");
    $stmt->execute([$email, $phone, $channel]);

    echo json_encode(["success" => true, "message" => "Subscribed successfully!"]);

} catch (PDOException $e) {
    // Log the real error on server for debugging
    error_log("Subscribe Error: " . $e->getMessage());

    // Return a generic safe message to client
    echo json_encode([
        "success" => false,
        "message" => "Something went wrong. Please try again later."
    ]);
}
