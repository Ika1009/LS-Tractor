<?php
include 'db_connect.php'; // Connect to your database

// Fetch all products
$sql = "SELECT proizvodi.id_proizvoda, proizvodi.naziv, proizvodi.cena_bez_popusta, proizvodi.cena_sa_popustom, slike.url_slike
          FROM proizvodi
          LEFT JOIN slike ON proizvodi.id_proizvoda = slike.id_proizvoda
          GROUP BY proizvodi.id_proizvoda";
$result = $conn->query($sql);

$products = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
}

echo json_encode($products);
