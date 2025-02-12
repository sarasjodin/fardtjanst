// HUVUDMENYN
// aria-expanded ändras dynamiskt - är "false" från start
// Blir true när menyn öppnas och återställs till false när menyn stängs
// Menyn stängs även när man klickar utanför och återställer aria-expanded="false"
// Förbättrad tillgänglighet, skärmläsare meddelar om menyn är öppen eller stängd

document.addEventListener('DOMContentLoaded', () => {
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const nav = document.querySelector('.nav');
  const dropdownToggles = document.querySelectorAll('.dropdown > a');

  // Toggle menu visibility och aria-expanded
  hamburgerMenu.addEventListener('click', () => {
    const isExpanded = hamburgerMenu.getAttribute('aria-expanded') === 'true';

    hamburgerMenu.setAttribute('aria-expanded', !isExpanded);
    nav.classList.toggle('active');
  });

  // Stäng menyn när man klickar utanför
  document.addEventListener('click', (event) => {
    if (!hamburgerMenu.contains(event.target) && !nav.contains(event.target)) {
      nav.classList.remove('active');
      hamburgerMenu.setAttribute('aria-expanded', 'false'); // Återställ aria-expanded

      document
        .querySelectorAll('.dropdown-menu')
        .forEach((menu) => menu.classList.remove('active'));

      document
        .querySelectorAll('.dropdown')
        .forEach((dropdown) => dropdown.classList.remove('open')); // Stäng dropdown-pilar
    }
  });
});

// Skärmläsare vet status med aria-expanded="false" på knappen
// Lagt till aria-controls="myBookings" på knappen för att koppla ihop knapp och innehåll
// Lagt till unik id på .collapsible-content för JavaScript och skärmläsare.
// JavaScript och CSS laddas för att göra collapsible responsiv och tillgänglig

document.addEventListener('DOMContentLoaded', function () {
  const collapsibles = document.querySelectorAll('.collapsible-header');

  collapsibles.forEach((header) => {
    header.addEventListener('click', function () {
      toggleCollapsible(this);
    });

    // Lägg till tangentbordsnavigering (Enter + Space)
    header.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleCollapsible(this);
      }
    });
  });

  function toggleCollapsible(clickedHeader) {
    const content = clickedHeader.nextElementSibling;
    const isExpanded = clickedHeader.getAttribute('aria-expanded') === 'true';

    // Stäng alla andra collapsibles (om du vill att bara en ska vara öppen i taget)
    document
      .querySelectorAll('.collapsible-content')
      .forEach((otherContent) => {
        if (otherContent !== content) {
          otherContent.classList.remove('active');
          otherContent.style.maxHeight = '0';
          otherContent.previousElementSibling.setAttribute(
            'aria-expanded',
            'false'
          );
        }
      });

    // Öppna/stäng den klickade collapsible-sektionen
    if (isExpanded) {
      clickedHeader.setAttribute('aria-expanded', 'false');
      content.classList.remove('active');
      content.style.maxHeight = '0';
    } else {
      clickedHeader.setAttribute('aria-expanded', 'true');
      content.classList.add('active');
      content.style.maxHeight = content.scrollHeight + 'px';
    }
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('login-form');
  if (!loginForm) {
    return;
  }
  loginForm.addEventListener('submit', function (event) {
    event.preventDefault();
    alert('Bokning genomförd!');
  });
});

function openTab(event, tabId) {
  // Hämta alla flikar och paneler
  const tabs = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.tab-content');

  // Loopa igenom flikarna och uppdatera attribut
  tabs.forEach((tab) => {
    tab.classList.remove('active');
    tab.setAttribute('aria-selected', 'false');
  });

  // Loopa igenom panelerna och uppdatera attribut
  panels.forEach((panel) => {
    panel.classList.remove('active');
    panel.setAttribute('aria-hidden', 'true');
  });

  // Aktivera vald flik och panel
  document.getElementById(tabId).classList.add('active');
  document.getElementById(tabId).setAttribute('aria-hidden', 'false');
  event.currentTarget.classList.add('active');
  event.currentTarget.setAttribute('aria-selected', 'true');
}

document.addEventListener('DOMContentLoaded', function () {
  let today = new Date();
  let formattedDate = today.toISOString().split('T')[0]; // YYYY-MM-DD format

  // Hämta alla datumfält som ska förifyllas i både Tab1 och Tab2
  const dateFields = [
    'start-date-tab1',
    'end-date-tab1', // Start och slutdatum för enkel resa (Tab 1)
    'start-date-tab2',
    'end-date-tab2', // Start och slutdatum för tur och retur (Tab 2)
    'start-date-coming-tab1',
    'end-date-coming-tab1', // Schemalagd bokning för Tab 1
    'start-date-coming-tab2',
    'end-date-coming-tab2' // Schemalagd bokning för Tab 2
  ];

  // Loopa igenom och sätt dagens datum
  dateFields.forEach((id) => {
    let field = document.getElementById(id);
    if (field) {
      field.value = formattedDate;
      field.setAttribute('min', formattedDate); // Begränsa valet till dagens datum och framåt
    }
  });
});

// Visar eller döljer inputfältet för egen adress i dropdown
function toggleCustomInput(selectId, inputId) {
  let selectElement = document.getElementById(selectId);
  let customInput = document.getElementById(inputId);

  if (selectElement.value === 'custom') {
    customInput.style.display = 'block';
  } else {
    customInput.style.display = 'none';
    customInput.value = ''; // Rensa fältet om det döljs
  }
}

function toggleTimeControl(tab, type) {
  if (tab === 'tab1') {
    if (type === 'from') {
      document.getElementById('to-time-control-tab1').checked = false;
    } else {
      document.getElementById('from-time-control-tab1').checked = false;
    }
  } else if (tab === 'tab2') {
    if (type === 'from-outward') {
      document.getElementById('to-time-control-outward-tab2').checked = false;
    } else if (type === 'to-outward') {
      document.getElementById('from-time-control-outward-tab2').checked = false;
    } else if (type === 'from-return') {
      document.getElementById('to-time-control-return-tab2').checked = false;
    } else {
      document.getElementById('from-time-control-return-tab2').checked = false;
    }
  }
}

// Aktiverar eller inaktiverar start- och slutdatum baserat på val i dropdown
document.addEventListener('DOMContentLoaded', function () {
  // Kontrollera att elementen finns innan funktionen körs
  if (document.getElementById('booking-frequency-tab1')) {
    setupRecurringBooking('tab1');
  }
  if (document.getElementById('booking-frequency-tab2')) {
    setupRecurringBooking('tab2');
  }
});

function setupRecurringBooking(tab) {
  let bookingFrequency = document.getElementById(`booking-frequency-${tab}`);
  let intervalItem = document
    .getElementById(`interval-${tab}`)
    ?.closest('.item');
  let startDateItem = document
    .getElementById(`start-date-coming-${tab}`)
    ?.closest('.item');
  let endDateItem = document
    .getElementById(`end-date-coming-${tab}`)
    ?.closest('.item');
  let startDate = document.getElementById(`start-date-coming-${tab}`);
  let endDate = document.getElementById(`end-date-coming-${tab}`);

  // Om något av elementen saknas, avsluta funktionen
  if (
    !bookingFrequency ||
    !intervalItem ||
    !startDateItem ||
    !endDateItem ||
    !startDate ||
    !endDate
  ) {
    console.warn(`Vissa element saknas för ${tab}, funktionen avbryts.`);
    return;
  }

  function toggleRecurringBooking() {
    if (bookingFrequency.value === 'recurring') {
      intervalItem.style.display = 'block';
      startDateItem.style.display = 'block';
      endDateItem.style.display = 'block';

      startDate.disabled = false;
      endDate.disabled = false;
      startDate.classList.remove('disabled');
      endDate.classList.remove('disabled');
    } else {
      intervalItem.style.display = 'none';
      startDateItem.style.display = 'none';
      endDateItem.style.display = 'none';

      startDate.disabled = true;
      endDate.disabled = true;
      startDate.classList.add('disabled');
      endDate.classList.add('disabled');
      startDate.value = '';
      endDate.value = '';
    }
  }

  // Startläge: Dölj allt och inaktivera start/slutdatum
  intervalItem.style.display = 'none';
  startDateItem.style.display = 'none';
  endDateItem.style.display = 'none';

  startDate.disabled = true;
  endDate.disabled = true;
  startDate.classList.add('disabled');
  endDate.classList.add('disabled');

  // Lägg till event listener för dropdown
  bookingFrequency.addEventListener('change', toggleRecurringBooking);
}

// Hämta aktuellt datum i format YYYY-MM-DD
const today = new Date().toISOString().split('T')[0];

// Sätt dagens datum som standardvärde för både start- och slutdatum
document.getElementById('start-date').value = today;
document.getElementById('end-date').value = today;

// Sätt min-värdet så att användaren inte kan välja ett tidigare datum
document.getElementById('start-date').setAttribute('min', today);
document.getElementById('end-date').setAttribute('min', today);

// Funktion för att formatera tid till HH:MM
function formatTime(date) {
  return date.toTimeString().slice(0, 5); // Tar bara "HH:MM" från fulla tidsformatet
}

document.addEventListener('DOMContentLoaded', function () {
  function formatTime(date) {
    return date.toTimeString().slice(0, 5); // HH:MM format (HH:MM)
  }

  const now = new Date();
  const travelDuration = 30 * 60000; // Restid = 30 minuter
  const returnDelay = 4 * 60 * 60000; // Hemresan startar 4 timmar efter ankomst

  // Tab 1: Enkelresa
  const startTimeTab1 = new Date(now.getTime() + 45 * 60000); // Starttid: Nu + 45 min
  const endTimeTab1 = new Date(startTimeTab1.getTime() + travelDuration); // Sluttid: Start + 30 min

  // Tab 2: Tur- och returresa
  const startTimeOutward = new Date(now.getTime() + 45 * 60000); // Starttid: Nu + 45 min
  const endTimeOutward = new Date(startTimeOutward.getTime() + travelDuration); // Sluttid: Start + 30 min

  const startTimeReturn = new Date(endTimeOutward.getTime() + returnDelay); // Hemresan börjar 4h efter ankomst
  const endTimeReturn = new Date(startTimeReturn.getTime() + travelDuration); // Hemresan tar samma tid som utresan

  // Hanterar alla tidsfält
  const timeFields = [
    // Enkelresa (Tab 1)
    { start: 'start-time-tab1', end: 'end-time-tab1' },
    // Tur- och returresa (Tab 2)
    { start: 'start-time-outward', end: 'end-time-outward' },
    { start: 'start-time-return', end: 'end-time-return' }
  ];

  // Sätter tiderna för enkelresor och tur-retur
  timeFields.forEach((field) => {
    let startField = document.getElementById(field.start);
    let endField = document.getElementById(field.end);

    if (startField && endField) {
      if (field.start.includes('return')) {
        // Hantera hemresan
        startField.value = formatTime(startTimeReturn);
        startField.setAttribute('min', formatTime(endTimeOutward));

        endField.value = formatTime(endTimeReturn);
        endField.setAttribute('min', formatTime(startTimeReturn));
      } else if (field.start.includes('outward')) {
        // Hantera utresan
        startField.value = formatTime(startTimeOutward);
        startField.setAttribute('min', formatTime(now));

        endField.value = formatTime(endTimeOutward);
        endField.setAttribute('min', formatTime(startTimeOutward));
      } else {
        // Hantera enkelresan
        startField.value = formatTime(startTimeTab1);
        startField.setAttribute('min', formatTime(now));

        endField.value = formatTime(endTimeTab1);
        endField.setAttribute('min', formatTime(startTimeTab1));
      }
    }
  });
});

// Specialfordon
document.addEventListener('DOMContentLoaded', function () {
  // Hämta checkboxarna via deras ID för båda tabbarna
  const wheelchairCheckboxTab1 = document.getElementById('wheelchair-tab1');
  const specialVehicleCheckboxTab1 = document.getElementById(
    'special-vehicle-tab1'
  );

  const wheelchairCheckboxTab2 = document.getElementById('wheelchair-tab2');
  const specialVehicleCheckboxTab2 = document.getElementById(
    'special-vehicle-tab2'
  );

  // Funktion som uppdaterar specialfordonsstatus
  function updateSpecialVehicle(wheelchairCheckbox, specialVehicleCheckbox) {
    if (wheelchairCheckbox.checked) {
      specialVehicleCheckbox.checked = true; // Aktivera specialfordon
    } else {
      specialVehicleCheckbox.checked = false; // Avmarkera specialfordon
    }
  }

  // Lyssna på förändringar i rullstols-checkboxarna
  if (wheelchairCheckboxTab1) {
    wheelchairCheckboxTab1.addEventListener('change', function () {
      updateSpecialVehicle(wheelchairCheckboxTab1, specialVehicleCheckboxTab1);
    });
  }

  if (wheelchairCheckboxTab2) {
    wheelchairCheckboxTab2.addEventListener('change', function () {
      updateSpecialVehicle(wheelchairCheckboxTab2, specialVehicleCheckboxTab2);
    });
  }
});

function toggleRecurringBooking() {
  const bookingFrequency = document.getElementById('booking-frequency');
  const intervalItem = document.getElementById('interval')?.closest('.item');
  const startDateItem = document
    .getElementById('start-date-coming')
    ?.closest('.item');
  const endDateItem = document
    .getElementById('end-date-coming')
    ?.closest('.item');

  if (!bookingFrequency || !intervalItem || !startDateItem || !endDateItem) {
    return;
  }

  if (bookingFrequency.value === 'recurring') {
    intervalItem.style.display = 'block';
    startDateItem.style.display = 'block';
    endDateItem.style.display = 'block';

    startDateItem.querySelector('input').disabled = false;
    endDateItem.querySelector('input').disabled = false;
  } else {
    intervalItem.style.display = 'none';
    startDateItem.style.display = 'none';
    endDateItem.style.display = 'none';

    startDateItem.querySelector('input').disabled = true;
    endDateItem.querySelector('input').disabled = true;
    startDateItem.querySelector('input').value = '';
    endDateItem.querySelector('input').value = '';
  }
}

// Kör funktionen vid sidladdning
document.addEventListener('DOMContentLoaded', function () {
  toggleRecurringBooking(); // Startvärde
  const bookingFrequency = document.getElementById('booking-frequency');
  if (bookingFrequency) {
    bookingFrequency.addEventListener('change', toggleRecurringBooking);
  }
});

function confirmDelete() {
  if (confirm('Är du säker på att du vill avboka denna resa?')) {
    // Logik för att ta bort bokningen
    alert('Bokningen har avbokats.');
  }
}

document.addEventListener('DOMContentLoaded', function () {
  // Hämta knapparna
  const singleTripButton = document.getElementById('book-single-trip');
  const roundTripButton = document.getElementById('book-round-trip');

  // Skapa en ARIA-live region för att läsa upp bekräftelsen
  const liveRegion = document.createElement('div');
  liveRegion.setAttribute('aria-live', 'polite');
  liveRegion.setAttribute('role', 'status');
  liveRegion.style.position = 'absolute';
  liveRegion.style.left = '-9999px'; // Döljer visuellt men skärmläsaren ser det
  document.body.appendChild(liveRegion);

  // Funktion för att visa bekräftelse
  function showConfirmation(message) {
    liveRegion.textContent = message; // Läser upp texten via skärmläsare
    alert(message); // Visuell bekräftelse för användare utan skärmläsare
  }

  // Lyssna på klick för Enkelresa
  if (singleTripButton) {
    singleTripButton.addEventListener('click', function (event) {
      event.preventDefault(); // Förhindrar att formuläret skickas (kan tas bort om du vill att det skickas)
      showConfirmation('Din enkelresa har bokats!');
    });
  }

  // Lyssna på klick för Tur- och Returresa
  if (roundTripButton) {
    roundTripButton.addEventListener('click', function (event) {
      event.preventDefault(); // Förhindrar att formuläret skickas (kan tas bort om du vill att det skickas)
      showConfirmation('Din tur- och returresa har bokats!');
    });
  }
});

document.addEventListener('DOMContentLoaded', function () {
  // Hämta formulären
  const formTab1 = document.getElementById('booking-form-tab1');
  const formTab2 = document.getElementById('booking-form-tab2');

  // Hämta knapparna
  const singleTripButtonTab1 = document.getElementById('book-single-trip-tab1');
  const roundTripButtonTab2 = document.getElementById('book-round-trip-tab2');

  // Skapa en ARIA-live region för skärmläsare
  const liveRegion = document.createElement('div');
  liveRegion.setAttribute('aria-live', 'polite');
  liveRegion.setAttribute('role', 'status');
  liveRegion.style.position = 'absolute';
  liveRegion.style.left = '-9999px';
  document.body.appendChild(liveRegion);

  // Funktion för att visa bekräftelse
  function showConfirmation(message) {
    liveRegion.textContent = message; // Skärmläsare läser upp texten
    alert(message); // Visuell bekräftelse
  }

  // Lyssna på inskickning av formulär i Tab 1 (Enkelresa)
  if (formTab1 && singleTripButtonTab1) {
    formTab1.addEventListener('submit', function (event) {
      event.preventDefault(); // Förhindra sidomladdning
      showConfirmation('Din enkelresa har bokats!');
    });
  }

  // Lyssna på inskickning av formulär i Tab 2 (Tur och Returresa)
  if (formTab2 && roundTripButtonTab2) {
    formTab2.addEventListener('submit', function (event) {
      event.preventDefault(); // Förhindra sidomladdning
      showConfirmation('Din tur- och returresa har bokats!');
    });
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const menuButton = document.querySelector('.hamburger-menu');
  const navMenu = document.querySelector('.nav');

  menuButton.addEventListener('click', function () {
    navMenu.classList.toggle('active');

    // Ändra aria-expanded för tillgänglighet
    const expanded =
      menuButton.getAttribute('aria-expanded') === 'true' || false;
    menuButton.setAttribute('aria-expanded', !expanded);
  });
});
