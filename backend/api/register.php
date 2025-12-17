<?php
// CORS

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

include_once __DIR__ . "/../db.php";


$data = json_decode(file_get_contents("php://input"), true);

$fullname = $data["fullname"] ?? null;
$email = $data["email"] ?? null;
$password = $data["password"] ?? null;

if (!$fullname || !$email || !$password) {
    echo json_encode(["success" => false, "message" => "Missing required fields"]);
    exit;
}

try {
    //check if email already exists
    $check = $conn->prepare("SELECT Email FROM Users WHERE Email = ?");
    $check->execute([$email]);

    if ($check->rowCount() > 0) {
        echo json_encode(["success" => false, "message" => "Email already registered"]);
        exit;
    }

    //hash password
    $hash = password_hash($password, PASSWORD_DEFAULT);

    $sql = "INSERT INTO Users (FullName, Email, PasswordHash) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);

    $stmt->execute([$fullname, $email, $hash]);

    echo json_encode(["success" => true, "message" => "Account created successfully"]);

} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
