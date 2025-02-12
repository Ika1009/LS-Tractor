// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Fetch both JSON files
    Promise.all([
        fetch('tractors1.json').then(res => res.json()),
        fetch('tractors2.json').then(res => res.json())
    ])
    .then(([data1, data2]) => {
        const combinedData = [...data1, ...data2];
        const urlParams = new URLSearchParams(window.location.search);
        const modelParam = urlParams.get('model');
        
        // Find the selected tractor
        const selectedTractor = combinedData.find(tractor => 
            tractor.model.replace(/\s+/g, '+') === modelParam
        );

        if (selectedTractor) {
            populateTractorData(selectedTractor);
        } else {
            console.error('Tractor not found');
            // Handle error or redirect
        }
    })
    .catch(error => console.error('Error loading data:', error));

    function populateTractorData(tractor) {
        // Update basic info
        document.title = tractor.model;
        document.querySelector('h2').textContent = tractor.model;
        document.querySelector('p').textContent = tractor.description;

        // Update images
        const mainImage = document.querySelector('.grid-cols-1 img');
        mainImage.src = tractor.images[0];
        mainImage.alt = tractor.model;

        const thumbnails = document.querySelectorAll('.grid-cols-4 img');
        tractor.images.forEach((img, index) => {
            if (thumbnails[index]) {
                thumbnails[index].src = img;
                thumbnails[index].alt = tractor.model;
            }
        });

        // Update features
        const featureElements = document.querySelectorAll('.grid-cols-1.sm\\:grid-cols-2 div');
        tractor.features.forEach((feature, index) => {
            if (featureElements[index]) {
                const featureParts = feature.split(':');
                const title = featureParts[0].trim();
                const description = featureParts[1]?.trim() || '';
                
                const img = featureElements[index].querySelector('img');
                const h2 = featureElements[index].querySelector('h2');
                const p = featureElements[index].querySelector('p');

                if (img) img.alt = title;
                if (h2) h2.textContent = title;
                if (p) p.textContent = description;
            }
        });

        // Update specifications table
        const specs = tractor.specifications;
        const tableRows = document.querySelectorAll('tbody tr');
        
        // Engine
        updateRow(tableRows, 'Proizvođač', specs.engine.manufacturer);
        updateRow(tableRows, 'Tip', specs.engine.type);
        updateRow(tableRows, 'Model', specs.engine.model);
        updateRow(tableRows, 'Snaga', specs.engine.power);
        updateRow(tableRows, 'Broj cilindra', specs.engine.cylinders);
        updateRow(tableRows, 'Zapremina cilindra (cm³)', specs.engine.displacement);
        updateRow(tableRows, 'Kapacitet rezervoara za gorivo (l)', specs.engine.fuel_tank_capacity);
        updateRow(tableRows, 'Baterija (V)', specs.engine.battery);
        updateRow(tableRows, 'Max. brzina i obrtni moment motora (ot./min./Nm)', specs.engine.max_rpm_and_torque);
        updateRow(tableRows, 'Emisiona klasa', specs.engine.emission_class);

        // Transmission
        updateRow(tableRows, 'Tip', specs.transmission.type, 'Menjač');
        updateRow(tableRows, 'Blokada diferencijala', specs.transmission.differential_lock);
        updateRow(tableRows, 'Pogon', specs.transmission.drive);
        updateRow(tableRows, 'Upravljanje', specs.transmission.steering);
        updateRow(tableRows, 'Maksimalna brzina (km/h)', specs.transmission.max_speed);
        updateRow(tableRows, 'Kočnice', specs.transmission.brakes);

        // TBZ i PTO
        updateRow(tableRows, 'Zadnji PTO (ot./min.)', specs.tbz_and_pto.rear_pto);
        updateRow(tableRows, 'Srednji PTO (ot./min.)', specs.tbz_and_pto.mid_pto);
        updateRow(tableRows, 'TBZ kategorija', specs.tbz_and_pto.tbz_category);
        updateRow(tableRows, 'Sila podizanja zadnje hidraulike (kg)', specs.tbz_and_pto.rear_hydraulic_lift_capacity);
        updateRow(tableRows, 'Performanse hidraulične pumpe (l/min.)', specs.tbz_and_pto.hydraulic_pump_capacity);

        // Dimensions and weight
        updateRow(tableRows, 'Dužina (mm)', specs.dimensions_and_weight.length);
        updateRow(tableRows, 'Širina (mm)', specs.dimensions_and_weight.width);
        updateRow(tableRows, 'Visina (mm)', specs.dimensions_and_weight.height);
        updateRow(tableRows, 'Međuosovinsko rastojanje (mm)', specs.dimensions_and_weight.wheelbase);
        updateRow(tableRows, 'Visina prelaza (mm)', specs.dimensions_and_weight.ground_clearance);
        updateRow(tableRows, 'Prečnik rotacije - unutrašnji (mm)', specs.dimensions_and_weight.turning_radius);
        updateRow(tableRows, 'Najveći ugao okretanja točkova (°)', specs.dimensions_and_weight.max_steering_angle);
        updateRow(tableRows, 'Težina (kg)', specs.dimensions_and_weight.weight);
        updateRow(tableRows, 'Gume (prednje / zadnje)', specs.dimensions_and_weight.tires_front_rear);

        // Update price
        const priceRow = document.querySelector('.bg-white.border-t-\\[3px\\] td');
        if (priceRow) {
            priceRow.textContent = specs.price;
        }
    }

    function updateRow(rows, label, value, section = '') {
        const row = Array.from(rows).find(tr => 
            tr.querySelector('td:first-child')?.textContent.trim() === label &&
            (section === '' || tr.previousElementSibling?.querySelector('td')?.textContent === section)
        );
        
        if (row) {
            const cells = row.querySelectorAll('td');
            if (cells.length >= 3) {
                cells[1].textContent = value;
                cells[2].textContent = value;
            }
        }
    }
});