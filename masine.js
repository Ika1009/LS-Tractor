// machines.js

// Sample data array of machines
const machines = [
    {
      "model": "Mobilna rampa za utovar i istovar sa parapetima koji se brzo skidaju RAMP10T (isključeno iz besplatne dostave) – GUME ZA TRAKTORSKE POLjOPRIVREDNE MAŠINE",
      "specifikacije": {
        "Težina": "2900 kg",
        "Nosivost": "10000 kg",
        "Širina": "2100 mm",
        "Dužina": "11150 mm",
        "Visina": "1100 mm",
        "Slope length": "7000 mm",
        "Platform length": "3000 mm",
        "back plate length": "750 mm",
        "Length of edge": "400 mm",
        "Debljina oboda": "14 mm",
        "Pover distribution": "Ručna hidraulična pumpa i ruka",
        "Height adjustment range": "1100-1800mm",
        "Main beam": "Pravougaona greda 160 * 80 * 5 mm",
        "Hidraulic cilinder": "Φ80 * Φ50 (2 kom.)",
        "Hidraulic oil line": "32MPa",
        "Guma": "600-9"
      },
      "sviđa mi se": [
        "images/slika_310_0.jpg",
        "images/slika_310_1.jpg",
        "images/slika_310_2.jpg",
        "images/slika_310_3.jpg",
        "images/slika_310_4.jpg",
        "images/slika_310_5.jpg",
        "images/slika_310_6.jpg",
        "images/slika_310_7.jpg",
        "images/slika_310_8.jpg",
        "images/slika_310_9.jpg",
        "images/slika_310_10.jpg",
        "images/slika_310_11.jpg",
        "images/slika_310_12.jpg",
        "images/slika_310_13.jpg",
        "images/slika_310_14.jpg"
      ]
    },
    {
      "model": "ER Netvork Installation Ripper - POLjOPRIVREDNE MAŠINE TRAKTOR GUME",
      "specifikacije": {
        "Težina": "58 kg",
        "Konji": "12-40 KS",
        "Širina": "640 mm",
        "Dužina": "500 mm",
        "Visina": "1100 mm",
        "Vorking Depth": "500 mm",
        "Prečnik gume": "50 mm"
      },
      "sviđa mi se": [
        "images/slika_311_0.jpg",
        "images/slika_311_1.jpg",
        "images/slika_311_2.jpg",
        "images/slika_311_3.jpg",
        "images/slika_311_4.jpg",
        "images/slika_311_5.jpg",
        "images/slika_311_6.jpg",
        "images/slika_311_7.jpg",
        "images/slika_311_8.jpg",
        "images/slika_311_9.jpg",
        "images/slika_311_10.jpg",
        "images/slika_311_11.jpg",
        "images/slika_311_12.jpg",
        "images/slika_311_13.jpg",
        "images/slika_311_14.jpg",
        "images/slika_311_15.jpg",
        "images/slika_311_16.jpg"
      ]
    }
  ];
  
  // Wait for the DOM to load before inserting the elements
  document.addEventListener('DOMContentLoaded', () => {
    // Select the container where machine cards will be appended.
    // Make sure your HTML contains an element with the id "machine_section"
    const machinesContainer = document.getElementById('machine_section');
    if (!machinesContainer) {
      console.error("Container not found. Please ensure there's an element with id 'machine_section' in your HTML.");
      return;
    }
  
    // Iterate through each machine and create its card
    machines.forEach(machine => {
      // Create the card container
      const card = document.createElement('div');
      card.className = 'shadow-lg rounded-xl p-4';
  
      // Create a description element (using model as description here)
      const description = document.createElement('p');
      description.className = 'text-sm';
      description.textContent = machine.model;
  
      // Create the title element (machine model)
      const title = document.createElement('h1');
      title.className = 'mt-4 mb-2 font-bold';
      title.textContent = machine.model;
  
      // Create the image element using the first image from "sviđa mi se"
      const image = document.createElement('img');
      image.src = machine["sviđa mi se"][0]; // first image
      image.alt = machine.model;
  
      // Append the basic elements to the card
      card.appendChild(description);
      card.appendChild(title);
      card.appendChild(image);
  
      // Get the first three specifications from the machine's "specifikacije"
      const specEntries = Object.entries(machine.specifikacije).slice(0, 3);
      specEntries.forEach(([key, value]) => {
        const specParagraph = document.createElement('p');
        specParagraph.className = 'mt-2 text-sm';
        // Set innerHTML so that the value is in a span with the "font-bold" class
        specParagraph.innerHTML = `${key}: <span class="font-bold">${value}</span>`;
        card.appendChild(specParagraph);
      });
  
      // Append the complete card to the container
      machinesContainer.appendChild(card);
    });
  });
  