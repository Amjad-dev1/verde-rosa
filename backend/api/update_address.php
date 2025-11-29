<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

include_once __DIR__ . "/../db.php";
session_start();

if (!isset($_SESSION["UserID"])) {
    echo json_encode(["success" => false, "message" => "Not logged in"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$fullname = $data['FullName'] ?? "";
$phone = $data['Phone'] ?? "";
$province = $data['Province'] ?? "";
$area = $data['Area'] ?? "";
$zip = $data['ZipCode'] ?? "";
$addressLine = $data['AddressLine'] ?? "";

$userId = $_SESSION["UserID"];

try {
    // Check if address exists
    $stmt = $conn->prepare("SELECT * FROM Addresses WHERE UserID = ?");
    $stmt->execute([$userId]);
    $existing = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($existing) {
        $stmt = $conn->prepare("UPDATE Addresses SET FullName=?, Phone=?, Province=?, Area=?, ZipCode=?, AddressLine=? WHERE UserID=?");
        $stmt->execute([$fullname, $phone, $province, $area, $zip, $addressLine, $userId]);
    } else {
        $stmt = $conn->prepare("INSERT INTO Addresses (UserID, FullName, Phone, Province, Area, ZipCode, AddressLine) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$userId, $fullname, $phone, $province, $area, $zip, $addressLine]);
    }

    echo json_encode(["success" => true, "message" => "Address saved"]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>
