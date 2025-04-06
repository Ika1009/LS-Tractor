// machines.js

function getQueryParam(key) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(key);
}

function fetchMachines(url = 'masine.json') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`Network error: ${response.status}`);
    return response.json();
  });
}

function filterMachines(machines, kategorija) {
  if (!kategorija) return machines;
  return machines.filter(machine =>
    machine.vrsta.toLowerCase().includes(kategorija.toLowerCase())
  );
}

function createMachineCard(machine) {
  const card = document.createElement('div');
  card.className = 'shadow-lg rounded-xl p-4 h-full flex flex-col justify-between';

  const description = document.createElement('p');
  description.className = 'text-sm clamp-2';
  description.textContent = machine.model;
  card.appendChild(description);

  const title = document.createElement('h1');
  title.className = 'mt-4 mb-2 font-bold clamp-2';
  title.textContent = machine.model;
  card.appendChild(title);

  const image = document.createElement('img');
  if (machine.slike && machine.slike.length > 0) {
    image.src = machine.slike[0];
  }
  image.alt = machine.model;
  card.appendChild(image);

  const specEntries = Object.entries(machine.specifikacije).slice(0, 3);
  specEntries.forEach(([key, value]) => {
    const specParagraph = document.createElement('p');
    specParagraph.className = 'mt-2 text-sm';
    specParagraph.innerHTML = `${key}: <span class="font-bold">${value}</span>`;
    card.appendChild(specParagraph);
  });

  // Kreiramo link koji vodi na masina.html sa URL enkodovanim imenom modela
  const link = document.createElement('a');
  link.href = `masina.html?masina=${encodeURIComponent(machine.model)}`;
  link.appendChild(card);

  return link;
}

function renderMachines(container, machines) {
  container.innerHTML = "";
  machines.forEach(machine => {
    const cardLink = createMachineCard(machine);
    container.appendChild(cardLink);
  });
}

function initMachinesDisplay() {
  const machinesSection = document.getElementById('machine_section');
  if (!machinesSection) {
    console.error("Element with id 'machine_section' not found.");
    return;
  }
  let gridContainer = machinesSection.querySelector('.grid');
  if (!gridContainer) {
    gridContainer = document.createElement('div');
    gridContainer.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 items-stretch';
    machinesSection.appendChild(gridContainer);
  }
  const kategorija = getQueryParam('vrsta');
  fetchMachines()
    .then(machinesData => {
      const filteredMachines = filterMachines(machinesData, kategorija);
      renderMachines(gridContainer, filteredMachines);
    })
    .catch(error => {
      console.error("Error fetching machines.json:", error);
    });
}

console.log("MASINE");
initMachinesDisplay();
