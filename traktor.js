// tractori.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - starting data fetch');
    
    Promise.all([
        fetch('tractors_data.json').then(res => res.json()),
        fetch('tractors_older_data.json').then(res => res.json())
    ])
    .then(([data1, data2]) => {
        console.log('Data fetched successfully', {data1, data2});
        const combinedData = [...data1, ...data2];
        const urlParams = new URLSearchParams(window.location.search);
        const modelParam = urlParams.get('model');
        
        console.log('URL Model Parameter:', modelParam);

        if (modelParam) {
            const decodedModel = decodeURIComponent(modelParam).replace(/\+/g, ' ').trim();            
            
            console.log('Decoded Model:', decodedModel);
            
            const selectedTractor = combinedData.find(tractor => 
                tractor.model.trim() === decodedModel.trim()
            );

            console.log('Selected Tractor:', selectedTractor);

            if (selectedTractor) {
                console.log('Populating data for:', selectedTractor.model);
                populateTractorData(selectedTractor);
            } else {
                console.error('Tractor not found in data');
                alert('Traktor nije pronađen');
            }
        }
    })
    .catch(error => console.error('Error loading data:', error));

    function populateTractorData(tractor) {
        // Update basic info
        const titleElement = document.querySelector('h1');
        if (titleElement) {
            titleElement.textContent = tractor.model;
            console.log('Updated title:', tractor.model);
        }

        const descriptionElement = document.querySelector('section.bg-gray-100 p');
        if (descriptionElement) {
            descriptionElement.textContent = tractor.description;
            console.log('Updated description');
        }

        // Update images
        const mainImage = document.querySelector('section.bg-gray-100 .grid-cols-1 img');
        if (mainImage) {
            mainImage.src = tractor.images[0];
            mainImage.alt = tractor.model;
            console.log('Updated main image:', tractor.images[0]);
        }

        const thumbnails = document.querySelectorAll('section.bg-gray-100 .grid-cols-4 img');
        if (thumbnails.length > 0) {
            tractor.images.forEach((img, index) => {
                if (thumbnails[index]) {
                    thumbnails[index].src = img;
                    thumbnails[index].alt = tractor.model;
                }
            });
            console.log('Updated thumbnails');
        }

        // Update features
        const featureContainer = document.querySelector('section.bg-gray-100 .grid-cols-1.sm\\:grid-cols-2');
        if (featureContainer) {
            featureContainer.innerHTML = tractor.features.map((feature, index) => `
                <div class="mb-8">
                    <img class="w-full cursor-pointer" 
                         src="assets/img/feature-${index + 1}.webp" 
                         alt="Feature ${index + 1}">
                    <h2 class="mt-2 font-bold">${feature.split(':')[0]}</h2>
                    <p class="mt-4">${feature.split(':')[1] || ''}</p>
                </div>
            `).join('');
            console.log('Updated features');
        }

        // Update specifications
        const specs = tractor.specifications;
        const specSections = {
            engine: 'Motor',
            transmission: 'Menjač',
            tbz_and_pto: 'TBZ i PTO',
            dimensions_and_weight: 'Dimenzije i težina'
        };

        Object.entries(specSections).forEach(([key, section]) => {
            const sectionHeader = Array.from(document.querySelectorAll('tr')).find(tr => 
                tr.querySelector('td')?.textContent.trim() === section
            );
            if (sectionHeader) {
                console.log(`Updating ${section} specs`);
                Object.entries(specs[key]).forEach(([specKey, value]) => {
                    updateRow(specKey, value, section);
                });
            }
        });

        // Update price
        const priceElement = document.querySelector('.bg-white.border-t-\\[3px\\] td');
        if (priceElement) {
            priceElement.textContent = specs.price;
            console.log('Updated price:', specs.price);
        }
    }

    function updateRow(label, value, section) {
        const rows = document.querySelectorAll('tbody tr');
        const row = Array.from(rows).find(tr => {
            const firstTd = tr.querySelector('td:first-child');
            return firstTd && 
                   firstTd.textContent.trim() === label &&
                   tr.previousElementSibling?.querySelector('td')?.textContent === section;
        });
        
        if (row) {
            const cells = row.querySelectorAll('td');
            if (cells.length >= 3) {
                cells[1].textContent = value;
                cells[2].textContent = value;
                console.log(`Updated ${label}: ${value}`);
            }
        } else {
            console.warn(`Row not found for: ${label}`);
        }
    }
});