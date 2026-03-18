// Chip filter logic for Works page
document.addEventListener('DOMContentLoaded', () => {
  const chips = document.querySelectorAll('.chip');
  const items = document.querySelectorAll('.work-item');
  const grid = document.querySelector('.works-grid');

  function applyFilter(filter) {
    // Show/hide items
    items.forEach(item => {
      if (item.dataset.category === filter) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });

    // Switch grid layout: 2 columns for character-design, 3 for others
    if (filter === 'character-design') {
      grid.classList.add('grid-2');
    } else {
      grid.classList.remove('grid-2');
    }
  }

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      applyFilter(chip.dataset.filter);
    });
  });

  // Apply initial filter based on active chip
  const activeChip = document.querySelector('.chip.active');
  if (activeChip) {
    applyFilter(activeChip.dataset.filter);
  }
});
