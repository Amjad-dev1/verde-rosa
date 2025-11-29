<?php
header("Content-Type: application/json");

// Connection settings
$serverName = "localhost";          // or "localhost\SQLEXPRESS" if using SQL Server Express
$database = "VerdeRosaDB";               // change to your database name

try {
    // PDO connection using Windows Authentication (Integrated Security)
    $conn = new PDO("sqlsrv:Server=$serverName;Database=$database;TrustServerCertificate=true;", null, null);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // echo json_encode(["success" => true, "message" => "Connected to SQL Server"]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Connection failed: " . $e->getMessage()]);
    exit;
}
?>
