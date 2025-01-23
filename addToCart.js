// Helper function to get cart from localStorage
const getCart = () => JSON.parse(localStorage.getItem('cart')) || [];

// Helper function to save cart to localStorage
const saveCart = (cart) => localStorage.setItem('cart', JSON.stringify(cart));

// Function to add a product to the cart
const addToCart = (productId, productName, productPrice, productImage, productQuantity) => {
    let cart = getCart();
    
    // Check if product is already in the cart
    const existingProduct = cart.find(item => item.id === productId);
    
    if (existingProduct) {
        // Increase the quantity if product is already in the cart
        existingProduct.quantity += productQuantity;
    } else {
        // Add new product to the cart
        const newProduct = {
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: productQuantity
        };
        cart.push(newProduct);
    }

    // Save updated cart to localStorage
    saveCart(cart);
};

// Function to display cart in the console (or update a cart section on the page)
const displayCart = () => {
    const cart = getCart();
    console.log('Cart:', cart); // You can replace this with actual DOM manipulation to show the cart
};

// Function to display the custom Add to Cart popup
const showAddToCartPopup = (productName) => {
    const popup = document.getElementById('add-to-cart-popup');
    const productNameElement = document.getElementById('popup-product-name');

    // Update the product name in the popup
    productNameElement.textContent = `${productName} je dodat u korpu!`;

    // Show the popup
    popup.classList.remove('hidden');

    // Close the popup when clicking "Continue Shopping"
    document.getElementById('close-popup').addEventListener('click', () => {
        popup.classList.add('hidden');
    });
};

// Function to attach event listeners to "Add to Cart" buttons
const initAddToCartButtons = () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart'); // Assumes a class on each "Add to Cart" button
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.dataset.id;
            const productName = button.dataset.name;
            const productPrice = button.dataset.price;
            const productImage = button.dataset.image;
            const quantityInput = document.querySelector(`.quantity`);
            const productQuantity = parseInt(quantityInput.value); // Get quantity from input

            // Ensure valid quantity
            if (isNaN(productQuantity) || productQuantity <= 0) {
                alert('Please enter a valid quantity.');
                return;
            }

            addToCart(productId, productName, productPrice, productImage, productQuantity);
            
            // Show the custom popup instead of alert
            showAddToCartPopup(productName);
        });
    });
};

// Call this function on page load to ensure the cart is set up
document.addEventListener('DOMContentLoaded', () => {
    initAddToCartButtons();
    displayCart(); // Optionally call this if you want to show the cart immediately on page load
});

