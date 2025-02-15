document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');

  const cursor = document.querySelector('.custom-cursor');
  const overlay = document.getElementById('overlay');
  const overlayImage = document.getElementById('overlay-image');
  const overlayCaption = document.getElementById('overlay-caption');
  const closeOverlayButton = document.getElementById('close-overlay');

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
    cursor.style.transform = 'scale(0.8)';
  });

  document.addEventListener('mouseleave', () => {
    cursor.style.display = 'none';
  });

  document.addEventListener('mouseenter', () => {
    cursor.style.display = 'block';
  });

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      cursor.style.width = '30px';
      cursor.style.height = '30px';
      cursor.style.background = 'url("/assets/cursor-click.png") no-repeat center center';
      cursor.style.backgroundSize = 'contain';
    } else if (e.button === 2) {
      cursor.style.width = '30px';
      cursor.style.height = '30px';
      cursor.style.background = 'url("/assets/cursor-right-click.png") no-repeat center center';
      cursor.style.backgroundSize = 'contain';
    }
  });

  document.addEventListener('mouseup', () => {
    cursor.style.width = '50px';
    cursor.style.height = '50px';
    cursor.style.background = 'url("/assets/cursor-default.png") no-repeat center center';
    cursor.style.backgroundSize = 'contain';
  });

  document.querySelectorAll('.image-grid img').forEach(img => {
    img.addEventListener('click', () => {
      overlayImage.src = img.getAttribute('data-large'); // Display the large image
      overlayCaption.textContent = img.getAttribute('data-caption'); // Display caption
      overlay.style.display = 'flex'; // Show overlay

      // Immediately show the cursor above the overlay
      cursor.style.zIndex = '10001'; // Ensure cursor stays above the overlay
      cursor.style.display = 'block'; // Show cursor immediately without delay
    });
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target === closeOverlayButton) {
      overlay.style.display = 'none'; // Hide overlay
      cursor.style.display = 'block'; // Show cursor when overlay is closed
      cursor.style.zIndex = '10001'; // Ensure the cursor is above the overlay

      // Reset cursor size and background
      cursor.style.width = '50px'; // Reset cursor size
      cursor.style.height = '50px'; // Reset cursor size
      cursor.style.background = 'url("/assets/cursor-default.png") no-repeat center center'; // Reset background image
      cursor.style.backgroundSize = 'contain'; // Reset background size
    }
  });

  closeOverlayButton.addEventListener('click', () => {
    overlay.style.display = 'none'; // Hide overlay
    cursor.style.display = 'block'; // Show cursor when overlay is closed
    cursor.style.zIndex = '10001'; // Ensure the cursor is above the overlay

    // Reset cursor size and background
    cursor.style.width = '50px'; // Reset cursor size
    cursor.style.height = '50px'; // Reset cursor size
    cursor.style.background = 'url("/assets/cursor-default.png") no-repeat center center'; // Reset background image
    cursor.style.backgroundSize = 'contain'; // Reset background size
  });

  document.querySelectorAll('.food-card').forEach(card => {
    console.log('Adding click event to food-card');
    card.addEventListener('click', () => {
      console.log('food-card clicked');
      const cardInner = card.querySelector('.food-card-inner');
      cardInner.classList.toggle('is-flipped');
      if (cardInner.classList.contains('is-flipped')) {
        cardInner.style.height = `${cardInner.scrollHeight}px`;
      } else {
        cardInner.style.height = '300px';
      }
    });
  });
});
