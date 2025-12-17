<?php

header("Content-Type: application/json");
include("../db.php");

try {
    //Simple test query
    $stmt = $conn->query("SELECT GETDATE() AS CurrentTime");
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    echo json_encode([
        "success" => true,
        "message" => "Database connection is working!",
        "data" => $result
    ]);
} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => "Connection failed: " . $e->getMessage()
    ]);
}
?>
