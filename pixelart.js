document.addEventListener('DOMContentLoaded', () => {
    // Check if we are on the pixelart.html page by looking for the #canvas element
    const canvas = document.getElementById('canvas');
    if (!canvas) return; // Exit if #canvas is not found

    const colorPicker = document.getElementById('colorPicker');
    const slider = document.getElementById('slider');
    const pixelSizeLabel = document.getElementById('pixelSizeLabel');
    const socialButton = document.getElementById('social-button');
    const socialIcons = document.getElementById('social-icons');

    let selectedColor = colorPicker.value;
    let isMouseDown = false;

    // Function to create the canvas grid
    function createCanvasGrid(size) {
        canvas.innerHTML = ''; // Clear the canvas
        canvas.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
        canvas.style.gridTemplateRows = `repeat(${size}, 1fr)`;

        for (let i = 0; i < size * size; i++) {
            const pixel = document.createElement('div');
            pixel.classList.add('pixel');
            pixel.addEventListener('click', () => {
                pixel.style.backgroundColor = selectedColor;
            });
            pixel.addEventListener('mouseover', () => {
                if (isMouseDown) {
                    pixel.style.backgroundColor = selectedColor;
                }
            });
            canvas.appendChild(pixel);
        }
    }

    // Initialize the canvas
    createCanvasGrid(slider.value);

    // Update canvas size when slider changes
    slider.addEventListener('input', () => {
        const size = slider.value;
        pixelSizeLabel.textContent = `Adjust Pixel Size: ${size}x${size}`;
        createCanvasGrid(size);
    });

    // Update selected color when color picker changes
    colorPicker.addEventListener('input', () => {
        selectedColor = colorPicker.value;
    });

    // Track mouse down and up events
    canvas.addEventListener('mousedown', () => {
        isMouseDown = true;
    });

    canvas.addEventListener('mouseup', () => {
        isMouseDown = false;
    });

    canvas.addEventListener('mouseleave', () => {
        isMouseDown = false;
    });

    // Social button functionality
    if (socialButton && socialIcons) {
        socialButton.addEventListener('click', () => {
            socialIcons.classList.toggle('visible');
        });
    }
});