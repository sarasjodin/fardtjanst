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

// Inloggning - Hantera Enter-tangent
document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.querySelector('.login-form');
  const errorMessage = document.getElementById('error-message');

  loginForm.addEventListener('submit', function (event) {
    const userId = document.getElementById('userid').value.trim();
    const password = document.getElementById('password').value.trim();

    if (userId === '' || password === '') {
      event.preventDefault();
      errorMessage.textContent = 'Båda fälten måste fyllas i!';
      errorMessage.style.color = 'red';
    }
  });
});
