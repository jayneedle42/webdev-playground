document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');

  const cursor = document.querySelector('.custom-cursor');
  const overlay = document.getElementById('overlay');
  const overlayImage = document.getElementById('overlay-image');
  const overlayCaption = document.getElementById('overlay-caption');
  const closeOverlayButton = document.getElementById('close-overlay');
  const socialButton = document.getElementById('social-button');
  const socialIcons = document.getElementById('social-icons');

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
    cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
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
      overlayImage.src = img.src; // Use the same src for the large image
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
    card.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent event bubbling
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

  // Intersection Observer for lazy loading GIFs
  const lazyGIFs = document.querySelectorAll('img[data-src]');
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        console.log(`Image ${img.getAttribute('data-src')} is in view`);
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
        observer.unobserve(img);
      } else {
        console.log(`Image ${img.getAttribute('data-src')} is out of view`);
      }
    });
  }, { passive: true });

  lazyGIFs.forEach(img => {
    console.log(`Observing image ${img.getAttribute('data-src')}`);
    observer.observe(img);
  });

  // Social Button Click Event
  socialButton.addEventListener('click', () => {
    socialButton.classList.toggle('active');
    if (socialButton.classList.contains('active')) {
      socialIcons.style.display = 'flex';
      socialIcons.style.animation = 'slideIn 0.5s forwards';
    } else {
      socialIcons.style.animation = 'slideOut 0.5s forwards';
      setTimeout(() => {
        socialIcons.style.display = 'none';
      }, 500);
    }
  });
});

// CSS Animations for sliding effect
const style = document.createElement('style');
style.innerHTML = `
@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideOut {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}
`;
document.head.appendChild(style);
