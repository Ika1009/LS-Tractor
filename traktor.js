document.addEventListener('DOMContentLoaded', function() {
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
        const titleElement = document.querySelector('h1');
        if (titleElement) {
            titleElement.textContent = tractor.model;
            console.log('Updated title:', tractor.model);
        }

        const titleElement2 = document.querySelector('h2');
        if (titleElement2) {
            titleElement2.textContent = tractor.model;
            console.log('Updated title 2:', tractor.model);
        }
        
        const descriptionElement = document.querySelector('section.bg-gray-100 p');
        if (descriptionElement) {
            descriptionElement.innerHTML = tractor.description;
            console.log('Updated description');
        }
        
        const mainImage = document.querySelector('section.bg-gray-100 .grid-cols-1 img');
        if (mainImage) {
            mainImage.src = tractor.images[0];
            mainImage.alt = tractor.model;
            console.log('Updated main image:', tractor.images[0]);
        }

        const thumbnailsContainer = document.querySelector('section.bg-gray-100 .grid.grid-cols-2.md\\:grid-cols-4');

        if (thumbnailsContainer) {
            thumbnailsContainer.innerHTML = '';

            tractor.images.forEach((img, index) => {
                if (index === 0) {
                    return;
                }

                const anchorElement = document.createElement('a');
                anchorElement.href = img; 
                anchorElement.target = "_blank"; 

                const imgElement = document.createElement('img');
                imgElement.className = "w-full aspect-[4/3] object-contain rounded-lg cursor-pointer";
                imgElement.src = img;
                imgElement.alt = `${tractor.model} - Image ${index + 1}`;

                imgElement.onload = function () {
                    anchorElement.setAttribute("data-pswp-width", imgElement.naturalWidth);
                    anchorElement.setAttribute("data-pswp-height", imgElement.naturalHeight);
                };

                anchorElement.appendChild(imgElement);
                thumbnailsContainer.appendChild(anchorElement);
            });

            console.log('Updated thumbnails with new images');
        }
        
        const featureContainer = document.querySelector('section.bg-gray-100 .grid-cols-1.sm\\:grid-cols-2');
        if (featureContainer) {
            featureContainer.innerHTML = tractor.features.map((feature, index) => `
                <div class="mb-8">
                    <img class="w-full cursor-pointer" 
                         src="${tractor.feature_images[index] || 'default-image.webp'}" 
                         alt="Feature ${index + 1}">
                    <h2 class="mt-2 font-bold">${feature.split(':')[0]}</h2>
                    <p class="mt-4">${feature.split(':')[1] || ''}</p>
                </div>
            `).join('');
            console.log('Updated feature images');
        }
        
        const specs = tractor.specifications;
        const specMappings = {
            engine: {
                section: 'Motor',
                keys: {
                    manufacturer: 'Proizvođač',
                    type: 'Tip',
                    model: 'Model',
                    power: 'Snaga',
                    cylinders: 'Broj cilindra',  
                    displacement: 'Zapremina cilindra (cm³)',  
                    fuel_tank_capacity: 'Kapacitet rezervoara za gorivo (l)', 
                    battery: 'Baterija (V)',  
                    max_rpm_and_torque: 'Max. brzina i obrtni moment motora (ot./min./Nm)', 
                    emission_class: 'Emisiona klasa'  
                }
            },
            transmission: {
                section: 'Menjač',
                keys: {
                    type: 'Tip',
                    differential_lock: 'Blokada diferencijala',  
                    drive: 'Pogon',
                    steering: 'Upravljanje',
                    max_speed: 'Maksimalna brzina (km/h)',
                    brakes: 'Kočnice'
                }
            },
            tbz_and_pto: {
                section: 'TBZ i PTO',
                keys: {
                    rear_pto: 'Zadnji PTO (ot./min.)',  
                    mid_pto: 'Srednji PTO (ot./min.)', 
                    tbz_category: 'TBZ kategorija',  
                    rear_hydraulic_lift_capacity: 'Sila podizanja zadnje hidraulike (kg)',  
                    hydraulic_pump_capacity: 'Performanse hidraulične pumpe (l/min.)'  
                }
            },
            dimensions_and_weight: {
                section: 'Dimenzije i težina',
                keys: {
                    length: 'Dužina (mm)',
                    width: 'Širina (mm)',
                    height: 'Visina (mm)',
                    wheelbase: 'Međuosovinsko rastojanje (mm)',
                    ground_clearance: 'Visina prelaza (mm)', 
                    turning_radius: 'Prečnik rotacije - unutrašnji (mm)',  
                    max_steering_angle: 'Najveći ugao okretanja točkova (°)', 
                    weight: 'Težina (kg)',
                    tires_front_rear: 'Gume (prednje / zadnje)'
                }
            }
        };

        Object.entries(specMappings).forEach(([category, mapping]) => {
            const sectionHeader = Array.from(document.querySelectorAll('tr')).find(tr => 
                tr.querySelector('td')?.textContent.trim() === mapping.section
            );
            
            if (sectionHeader && specs[category]) {
                console.log(`Updating ${mapping.section} specs`);
                Object.entries(mapping.keys).forEach(([jsonKey, label]) => {
                    if (specs[category][jsonKey]) {
                        updateRow(label, specs[category][jsonKey], mapping.section);
                    }
                });
            }
        });
    }

    function updateRow(label, value, section) {
        const rows = document.querySelectorAll('tbody tr');
        
        const sectionHeader = Array.from(rows).find(tr => {
            const td = tr.querySelector('td:first-child');
            return td && td.textContent.trim() === section;
        });

        if (!sectionHeader) {
            console.warn(`Section header not found: ${section}`);
            return;
        }

        let currentRow = sectionHeader.nextElementSibling;
        while (currentRow && !currentRow.querySelector('td[colspan]')) {
            const firstTd = currentRow.querySelector('td:first-child');
            if (firstTd && firstTd.textContent.trim() === label) {
                const cells = currentRow.querySelectorAll('td');
                if (cells.length >= 3) {
                    cells[1].textContent = value;
                    cells[2].textContent = value;
                    console.log(`Updated ${label}: ${value}`);
                    return;
                }
            }
            currentRow = currentRow.nextElementSibling;
        }

        console.warn(`Row not found for: ${label} (Section: ${section})`);
    }

    var lightbox = new PhotoSwipeLightbox({
        gallery: '.gallery',
        children: 'a',
        pswpModule: PhotoSwipe 
      });
      lightbox.init();
});

document.addEventListener("DOMContentLoaded", function () {
    const dropdownButton = document.getElementById("mega-menu-full-dropdown-button");
    const dropdownMenu = document.getElementById("mega-menu-full-dropdown");

    dropdownButton.addEventListener("click", function () {
        dropdownMenu.classList.toggle("hidden");
    });
    
    document.addEventListener("click", function (event) {
        if (!dropdownButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.add("hidden");
        }
    });
});
