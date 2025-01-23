<?php

// Include your database connection
include 'db_connect.php'; // Assuming your connection is set up in this file

// Get the POST data from the request
$data = json_decode(file_get_contents("php://input"), true);

// Check if the email is provided
if (!isset($data['email'])) {
    echo json_encode(['success' => false, 'error' => 'Email is required']);
    exit;
}

$email = $data['email'];

try {
    // Prepare an SQL statement to insert the email into the database
    $stmt = $conn->prepare("INSERT INTO mejl_lista (email) VALUES (?)");
    $stmt->bind_param("s", $email);
    $stmt->execute();

    echo json_encode(['success' => true]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
