window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) loader.style.display = 'none';
});

window.addEventListener('load', function() {
  new Glider(document.querySelector('.glider'), {
    slidesToShow: 1.5,
    slidesToScroll: 1,
    draggable: true,
    scrollLock: true,
    arrows: {
      prev: '.glider-prev',
      next: '.glider-next'
    },
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3.5
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4.5
        }
      }
    ]
  });
});

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
  const kartica = document.createElement('div');
  kartica.className = 'shadow-lg rounded-xl p-4 h-full flex flex-col justify-between';
  kartica.setAttribute('data-podvrsta', machine.podvrsta);

  const description = document.createElement('p');
  description.className = 'text-sm clamp-2';
  description.textContent = machine.model;
  kartica.appendChild(description);

  const title = document.createElement('h1');
  title.className = 'mt-4 mb-2 font-bold clamp-2';
  title.textContent = machine.model;
  kartica.appendChild(title);

  const image = document.createElement('img');
  if (machine.slike && machine.slike.length > 0) {
    image.src = machine.slike[0];
  }
  image.alt = machine.model;
  kartica.appendChild(image);

  const specEntries = Object.entries(machine.specifikacije).slice(0, 3);
  specEntries.forEach(([key, value]) => {
    const specParagraph = document.createElement('p');
    specParagraph.className = 'mt-2 text-sm';
    specParagraph.innerHTML = `${key}: <span class="font-bold">${value}</span>`;
    kartica.appendChild(specParagraph);
  });

  const link = document.createElement('a');
  link.href = `masina.html?masina=${encodeURIComponent(machine.model)}`;
  link.appendChild(kartica);

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
  const kategorijeSection = document.getElementById('tarupi_categories');
  const kategorije2Section = document.getElementById('nagnuti_categories');
  if (kategorijeSection) {
    if (kategorija === 'Tarupi') {
      kategorijeSection.style.display = 'block';
    } else {
      kategorijeSection.remove();
    }
  }
  if (kategorije2Section) {
    if (kategorija === 'Nagnuti Tarupi') {
      kategorije2Section.style.display = 'block';
    } else {
      kategorije2Section.remove();
    }
  }
  fetchMachines()
    .then(machinesData => {
      const filteredMachines = filterMachines(machinesData, kategorija);
      renderMachines(gridContainer, filteredMachines);
    })
    .catch(error => {
      console.error("Error fetching machines.json:", error);
    });
}

initMachinesDisplay();
