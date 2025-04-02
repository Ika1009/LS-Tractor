// machine-details.js

document.addEventListener('DOMContentLoaded', () => {
  const machineId = getQueryParam('masina');
  if (!machineId) {
    console.error("No machine query parameter provided.");
    return;
  }

  fetchMachines()
    .then(machines => {
      console.log('Fetched machines:', machines);
      // Pronalazimo mašinu čiji model odgovara dobijenom query parametru
      const machine = machines.find(m => m?.model?.toLowerCase() === machineId.toLowerCase());
      if (!machine) {
        console.error("Machine not found.");
        return;
      }
      renderMachineDetails(machine);
    })
    .catch(err => console.error(err));
});

function getQueryParam(key) {
  const params = new URLSearchParams(window.location.search);
  return params.get(key);
}

function fetchMachines(url = 'masine.json') {
  return fetch(url).then(res => {
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    return res.json();
  });
}

function renderMachineDetails(machine) {
  // Postavljanje naslova
  const titleElem = document.querySelector('h2.text-2xl');
  if (titleElem) titleElem.textContent = machine.model;

  // Postavljanje opisa (ako postoji)
  const descElem = document.querySelector('p.mt-6.text-base');
  if (descElem) descElem.textContent = machine.description || '';

  // Postavljanje glavne slike
  const mainImg = document.querySelector('div.flex.justify-center img');
  if (mainImg && machine.slike && machine.slike.length > 0) {
    mainImg.src = machine.slike[0];
    mainImg.alt = machine.model;
  }

  // Kreiranje galerije slika
  const galleryContainer = document.querySelector('div.gallery');
  if (galleryContainer && machine.slike) {
    galleryContainer.innerHTML = '';
    machine.slike.slice(1).forEach(src => { // Skips the first image
      const img = document.createElement('img');
      img.className = 'w-full aspect-[4/3] object-contain rounded-lg cursor-pointer';
      img.src = src;
      img.alt = machine.model;
      galleryContainer.appendChild(img);
    });
  }  

  // Kreiranje tabele sa specifikacijama
  const table = document.querySelector('table');
  if (table) {
    let tbody = table.querySelector('tbody');
    if (!tbody) {
      tbody = document.createElement('tbody');
      table.appendChild(tbody);
    }
    tbody.innerHTML = '';
    Object.entries(machine.specifikacije).forEach(([key, value]) => {
      const tr = document.createElement('tr');
      tr.className = 'odd:bg-gray-100 even:bg-white';

      const tdKey = document.createElement('td');
      tdKey.className = 'p-3 font-bold text-gray-800';
      tdKey.textContent = key;

      const tdValue = document.createElement('td');
      tdValue.className = 'p-3 text-center text-gray-800';
      tdValue.textContent = value;

      tr.appendChild(tdKey);
      tr.appendChild(tdValue);
      tbody.appendChild(tr);
    });
  }
}
