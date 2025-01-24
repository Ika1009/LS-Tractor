<?php

include 'db_connect.php'; 

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['email'])) {
    echo json_encode(['success' => false, 'error' => 'Morate da unesete imejl']);
    exit;
}

$email = $data['email'];

try {
    $stmt = $conn->prepare("INSERT INTO mejl_lista (email) VALUES (?)");
    $stmt->bind_param("s", $email);
    $stmt->execute();

    echo json_encode(['success' => true]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}

?>