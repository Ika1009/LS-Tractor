<?php
// Database connection
$servername = "localhost";
$username = "tvojluks_admin";  // Adjust to your MySQL username
$password = "Miloskralj2005";      // Adjust to your MySQL password
$dbname = "tvojluks_webshop";  // Adjust to your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
