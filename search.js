document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.getElementById('searchButton');

    // Function to generate all possible variations of a word with Serbian Latin replacements
    function generateVariations(text) {
        const charMap = {
            'c': ['c', 'č', 'ć'],
            's': ['s', 'š'],
            'z': ['z', 'ž'],
            'dj': ['dj', 'đ'],
            'd': ['d', 'đ'],
            'C': ['C', 'Č', 'Ć'],
            'S': ['S', 'Š'],
            'Z': ['Z', 'Ž'],
            'D': ['D', 'Đ']
        };

        let variations = [''];

        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const nextTwoChars = text.slice(i, i + 2);

            // Handle 'dj' as a special case
            if (nextTwoChars === 'dj' || nextTwoChars === 'DJ') {
                const newVariations = [];
                charMap['dj'].forEach(replacement => {
                    variations.forEach(variation => {
                        newVariations.push(variation + replacement);
                    });
                });
                variations = newVariations;
                i++;
                continue;
            }

            const replacements = charMap[char] || [char];
            const newVariations = [];

            replacements.forEach(replacement => {
                variations.forEach(variation => {
                    newVariations.push(variation + replacement);
                });
            });

            variations = newVariations;
        }

        return variations;
    }

    searchButton.addEventListener('click', (event) => {
        event.preventDefault();
        let query = searchInput.value.trim();

        if (query) {
            const queryVariations = generateVariations(query);

            // Redirect with the first variation in the URL
            window.location.href = `shop-full-width.php?query=${encodeURIComponent(queryVariations[0])}`;
        }
    });
});