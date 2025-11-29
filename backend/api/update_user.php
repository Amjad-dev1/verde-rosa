<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

session_start();
include_once __DIR__ . "/../db.php";

if (!isset($_SESSION["UserID"])) {
    echo json_encode(["success" => false, "message" => "Not logged in"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$fullname = $data['FullName'] ?? null;
$phone = $data['Phone'] ?? null;

try {
    $stmt = $conn->prepare("UPDATE Users SET FullName = ?, Phone = ? WHERE UserID = ?");
    $stmt->execute([$fullname, $phone, $_SESSION["UserID"]]);

    // Update session
    $_SESSION["FullName"] = $fullname;
    $_SESSION["Phone"] = $phone;

    // RETURN updated session data
    echo json_encode([
        "success" => true,
        "message" => "User info updated",
        "user" => [
            "UserID" => $_SESSION["UserID"],
            "Email" => $_SESSION["Email"],
            "FullName" => $_SESSION["FullName"],
            "Phone" => $_SESSION["Phone"]
        ]
    ]);

} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
