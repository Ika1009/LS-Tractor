<?php

$servername = "localhost";
$username = "tvojluks_admin";  
$password = "Miloskralj2005";     
$dbname = "tvojluks_webshop"; 

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

?>