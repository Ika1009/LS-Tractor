<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dodaj proizvod</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100">
    <div class="container mx-auto mt-10">
        <h1 class="text-3xl font-bold mb-6">Dodaj novi proizvod</h1>

        <!-- Form to Add Product -->
        <form action="add_product.php" method="POST" enctype="multipart/form-data" class="bg-white p-6 rounded shadow-md">
            <div class="mb-4">
                <label for="product_name" class="block text-sm font-medium text-gray-700">Ime proizvoda</label>
                <input type="text" name="product_name" id="product_name" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" required>
            </div>

            <div class="mb-4">
                <label for="product_price" class="block text-sm font-medium text-gray-700">Cena</label>
                <input type="number" name="product_price" id="product_price" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" required>
            </div>

            <div class="mb-4">
                <label for="discountedPrice" class="block text-sm font-medium text-gray-700">Cena na popustu</label>
                <input type="number" step="0.01" id="discountedPrice" name="discountedPrice" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" required>
            </div>

            <div class="mb-4">
                <label for="product_description" class="block text-sm font-medium text-gray-700">Opis</label>
                <textarea name="product_description" id="product_description" rows="4" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" required></textarea>
            </div>

            <div class="mb-4">
                <label for="shortDescription" class="block text-sm font-medium text-gray-700">Kratki opis</label>
                <input type="text" id="shortDescription" name="shortDescription" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" required>
            </div>

            <div class="mb-4">
                <label for="dimensions" class="block text-sm font-medium text-gray-700">Dimenzije</label>
                <input type="text" id="dimensions" name="dimensions" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" required>
            </div>

            <div class="mb-4">
                <label for="color" class="block text-sm font-medium text-gray-700">Boja</label>
                <input type="text" id="color" name="color" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" required>
            </div>

            <div class="mb-4">
                <label for="material" class="block text-sm font-medium text-gray-700">Materijal</label>
                <input type="text" id="material" name="material" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" required>
            </div>

            <div class="mb-4">
                <label for="product_images" class="block text-sm font-medium text-gray-700">Slike</label>
                <input type="file" name="product_images[]" id="product_images" multiple class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" required>
            </div>           

            <button type="submit" name="submit" class="bg-blue-500 text-white p-2 rounded">Dodaj</button>
        </form>
    </div>
</body>
</html>
