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
