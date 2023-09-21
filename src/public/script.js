const arrayOfPixels = [
  [255, 254, 253, 252, 251, 250, 249, 248, 247, 246, 245, 244, 243, 242, 241, 240],
  [224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239],
  [223, 222, 221, 220, 219, 218, 217, 216, 215, 214, 213, 212, 211, 210, 209, 208],
  [192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207],
  [191, 190, 189, 188, 187, 186, 185, 184, 183, 182, 181, 180, 179, 178, 177, 176],
  [160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175],
  [159, 158, 157, 156, 155, 154, 153, 152, 151, 150, 149, 148, 147, 146, 145, 144],
  [128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143],
  [127, 126, 125, 124, 123, 122, 121, 120, 119, 118, 117, 116, 115, 114, 113, 112],
  [96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111],
  [95, 94, 93, 92, 91, 90, 89, 88, 87, 86, 85, 84, 83, 82, 81, 80],
  [64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79],
  [63, 62, 61, 60, 59, 58, 57, 56, 55, 54, 53, 52, 51, 50, 49, 48],
  [32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47],
  [31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
];
  
const gridContainer = document.getElementById('pixel-grid');

for (let i = 0; i < arrayOfPixels.length; i++) {
  for (let j = 0; j < arrayOfPixels[i].length; j++) {
    const pixelElement = document.createElement('div');
    pixelElement.classList.add('pixel');
    pixelElement.id = arrayOfPixels[i][j];
    gridContainer.appendChild(pixelElement);

    // Add event listeners for mouseover and mouseup
    pixelElement.addEventListener('mouseover', handlePixelColoring);
  }
}

// Variable to track if mouse button is held down
let isMouseDown = false;

// Event listener for mouseup and mousedown on the document
document.addEventListener('mousedown', () => {
  isMouseDown = true;
});

document.addEventListener('mouseup', () => {
  isMouseDown = false;
});

document.addEventListener('click', () => {
  const selectedColor = document.getElementById('colorPicker').value;
    const rgbSelectedColor = hexToRgb(selectedColor);

    const currentBackgroundColor = this.style.backgroundColor;

    if (currentBackgroundColor === rgbSelectedColor && !isMouseDown) {
      this.style.backgroundColor = '#000';
    } else {
      this.style.backgroundColor = rgbSelectedColor;

      const r = parseInt(selectedColor.slice(1, 3), 16);
      const g = parseInt(selectedColor.slice(3, 5), 16);
      const b = parseInt(selectedColor.slice(5, 7), 16);

      let logObject = { position: parseInt(this.id), r: r, g: g, b: b };
      console.log(logObject)
      axios.post('/led', logObject)
        .then(response => {
          console.log('POST request successful:', response.data);
        })
        .catch(error => {
          console.error('Error making POST request:', error);
        });
    }
});

const pixelsElements = document.querySelectorAll('.pixel');
const btn = document.getElementById('btn');


btn.addEventListener('click', () => {
  pixelsElements.forEach(pixelElement => {
    pixelElement.style.backgroundColor = '#000';
  });
  axios.delete('/clean')
  .then(response => {
    console.log('DELETE request successful:', response.data);
  })
  .catch(error => {
    console.error('Error making DELETE request:', error);
  });
});

function handlePixelColoring() {
  if (isMouseDown) {
    const selectedColor = document.getElementById('colorPicker').value;
    const rgbSelectedColor = hexToRgb(selectedColor);

    const currentBackgroundColor = this.style.backgroundColor;

    if (currentBackgroundColor === rgbSelectedColor && !isMouseDown) {
      this.style.backgroundColor = '#000';
    } else {
      this.style.backgroundColor = rgbSelectedColor;

      const r = parseInt(selectedColor.slice(1, 3), 16);
      const g = parseInt(selectedColor.slice(3, 5), 16);
      const b = parseInt(selectedColor.slice(5, 7), 16);

      let logObject = { position: parseInt(this.id), r: r, g: g, b: b };
      
      axios.post('/led', logObject)
        .then(response => {
          console.log('POST request successful:', response.data);
        })
        .catch(error => {
          console.error('Error making POST request:', error);
        });
      
    }
  }
}

function hexToRgb(hex) {
  hex = hex.replace(/^#/, '');
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgb(${r}, ${g}, ${b})`;
}




pixelsElements.forEach(pixelElement => {
  pixelElement.addEventListener('click', () => {
    const selectedColor = document.getElementById('colorPicker').value;

    // Convert the selected color from hex to RGB
    const rgbSelectedColor = hexToRgb(selectedColor);

    const currentBackgroundColor = pixelElement.style.backgroundColor;

    // Check if the background color matches the selected color
    if (currentBackgroundColor === rgbSelectedColor) {
      pixelElement.style.backgroundColor = '#000'; // Set to black if already the selected color
    } else {
      pixelElement.style.backgroundColor = rgbSelectedColor;

      const r = parseInt(selectedColor.slice(1, 3), 16);
      const g = parseInt(selectedColor.slice(3, 5), 16);
      const b = parseInt(selectedColor.slice(5, 7), 16);

      let logObject = {position: parseInt(pixelElement.id), r: r, g: g, b: b}

      console.log(logObject);
    }
  });
});