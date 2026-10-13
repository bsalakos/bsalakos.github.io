const trigger = document.querySelector('.lightbox-trigger');
const modal = document.getElementById('image-modal');

if (trigger && modal) {
  trigger.addEventListener('click', () => {
    modal.classList.add('active');
  });

  modal.addEventListener('click', () => {
    modal.classList.remove('active');
  });
}
