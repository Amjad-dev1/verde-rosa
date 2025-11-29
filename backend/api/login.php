<?php
// CORS

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

// Preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

session_start();
include_once __DIR__ . "/../db.php";

// Read JSON
$data = json_decode(file_get_contents("php://input"), true);

$email = $data["email"] ?? null;
$password = $data["password"] ?? null;

if (!$email || !$password) {
    echo json_encode(["success" => false, "message" => "Missing fields"]);
    exit;
}

try {
    $sql = "SELECT UserID, FullName, Email, PasswordHash FROM Users WHERE Email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$email]);

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user || !password_verify($password, $user["PasswordHash"])) {
        echo json_encode(["success" => false, "message" => "Invalid email or password"]);
        exit;
    }

    // Set session
    $_SESSION["UserID"] = $user["UserID"];
    $_SESSION["FullName"] = $user["FullName"];
    $_SESSION["Email"] = $user["Email"];

    echo json_encode([
        "success" => true,
        "message" => "Login successful",
        "user" => [
            "id" => $user["UserID"],
            "fullname" => $user["FullName"],
            "email" => $user["Email"]
        ]
    ]);

} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
