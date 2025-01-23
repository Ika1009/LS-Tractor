document.addEventListener('DOMContentLoaded', () => {
    const emailForm = document.getElementById('emailForm');
    const submitBtn = document.querySelectorAll('.search-btn')[1]; // Target the <a> tag

    submitBtn.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the default action of the <a> tag

        const emailInput = document.getElementById('email').value;

        if (!validateEmail(emailInput)) {
            showEmailPopup('Neispravan mejl', 'Unesi pravilnu mejl adresu.');
            return;
        }

        // Send the email to the server using fetch API
        fetch('submit_email.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: emailInput })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showEmailPopup('Uspešno', 'Vaša mejl adresa je uspešno zabeležena. Očekujte obaveštenja o popustima i posebnim pogodnostima!');
                emailForm.reset();
            } else {
                showEmailPopup('Greška', 'Greška: ' + data.error);
            }
        })
        .catch(error => {
            console.error('Greška:', error);
            showEmailPopup('Greška', 'Greška prilikom upisivanja mejl adrese.');
        });
    });

    // Function to validate email format
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // Function to show the custom popup
    function showEmailPopup(title, message) {
        const popup = document.getElementById('email-popup');
        const popupTitle = document.getElementById('popup-title');
        const popupMessage = document.getElementById('popup-message');
        const closePopupButton = document.getElementById('close-email-popup');

        popupTitle.textContent = title;
        popupMessage.textContent = message;
        popup.classList.remove('hidden'); // Show the popup

        closePopupButton.addEventListener('click', () => {
            popup.classList.add('hidden'); // Hide the popup when 'Close' is clicked
        });

        // Auto-hide the popup after 3 seconds
        setTimeout(() => {
            popup.classList.add('hidden');
        }, 3000);
    }
});