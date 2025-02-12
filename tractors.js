document.addEventListener('DOMContentLoaded', function() {
    // Fetch and combine both JSON files
    Promise.all([
        fetch('tractors_data.json').then(res => res.json()),
        fetch('tractors_older_data.json').then(res => res.json())
    ])
    .then(data => {
        const tractors = data.flat();
        const urlParams = new URLSearchParams(window.location.search);
        const modelParam = urlParams.get('model');
        
        // Find matching tractor(s)
        const selectedTractors = tractors.filter(t => t.model.includes(modelParam));
        
        if (selectedTractors.length === 0) {
            console.error('Tractor not found');
            return;
        }

        // Populate main content
        populateMainContent(selectedTractors[0]);
        
        // Populate specifications table
        if (selectedTractors.length >= 2) {
            populateSpecsTable(selectedTractors[0], selectedTractors[1]);
        }
    })
    .catch(error => console.error('Error loading data:', error));
});

function populateMainContent(tractor) {
    // Update page title
    document.title = tractor.model;
    
    // Update main heading
    document.querySelector('h2').textContent = tractor.model;
    
    // Update description
    document.querySelector('section p').textContent = tractor.description;
    
    // Update main image
    const mainImg = document.querySelector('section img');
    mainImg.src = tractor.images[0];
    mainImg.alt = tractor.model;
    
    // Update video if available
    if (tractor.video) {
        const iframe = document.querySelector('iframe');
        iframe.src = tractor.video;
    }
}

function populateSpecsTable(variant1, variant2) {
    const specMapping = {
        'Proizvođač': 'engine.manufacturer',
        'Tip': 'engine.type',
        'Model': 'engine.model',
        'Snaga': 'engine.power',
        'Broj cilindra': 'engine.cylinders',
        'Zapremina cilindra (cm³)': 'engine.displacement',
        'Kapacitet rezervoara za gorivo (l)': 'engine.fuel_tank_capacity',
        'Baterija (V)': 'engine.battery',
        'Max. brzina i obrtni moment motora (ot./min./Nm)': 'engine.max_rpm_and_torque',
        'Emisiona klasa': 'engine.emission_class',
        'Tip menjača': 'transmission.type'
    };

    document.querySelectorAll('tbody tr').forEach(row => {
        const keyCell = row.querySelector('td:first-child');
        if (!keyCell) return;
        
        const specKey = keyCell.textContent.trim();
        const propPath = specMapping[specKey];
        
        if (propPath) {
            const [val1, val2] = [getNestedValue(variant1, propPath), getNestedValue(variant2, propPath)];
            const cells = row.querySelectorAll('td:not(:first-child)');
            
            if (cells.length >= 2) {
                cells[0].textContent = val1 || '-';
                cells[1].textContent = val2 || '-';
            }
        }
    });
}

function getNestedValue(obj, path) {
    return path.split('.').reduce((o, p) => o?.[p], obj);
}