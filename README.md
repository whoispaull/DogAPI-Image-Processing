# Web Technologies Homework - Image Processing

This project demonstrates basic image processing on a randomly fetched image from the Dog CEO API. The app allows users to interact with the image through two processing options: 

1. **Mirror Image**: The image is mirrored horizontally.
2. **Negative Image**: The left half of the image is converted to a negative.

## Files
- `imagine.html`: The main HTML file containing the structure of the webpage. It includes a canvas element to display the image and areas to show execution times and fetched JSON data.
- `styles.css`: The CSS file defining the styling for the webpage. It includes layout and design for displaying the image, JSON data, and execution times.
- `script.js`: The JavaScript file that fetches an image from the API and processes it according to the selected option (mirror or negative). It also measures and displays the execution time for each operation.

## How it works
By default, the app mirrors the image horizontally. However, if you want to apply the **Negative Image** effect (which inverts the left half of the image), you can do so by changing the `let option = 0;` line in the JavaScript file (`script.js`):

- **Option 1**: Mirror the image horizontally (default).
- **Option 2**: Apply the negative filter on the left half of the image.

### Steps
1. The app fetches a random image from the Dog CEO API.
2. It displays the image on a canvas.
3. If the `option` variable is set to `0` (default), it mirrors the image.
4. If you change the `option` variable to `1`, the left half of the image is converted into a negative effect.
5. Execution times for both fetching the image and processing it are displayed.

### Libraries & Technologies
- **HTML**: Used to structure the webpage.
- **CSS**: Used to style the webpage, including the canvas and data display areas.
- **JavaScript**: Used to fetch the image and apply the selected processing options on the canvas.

## Usage
To use the app, open the `imagine.html` file in a web browser. The image will be fetched and processed automatically. The status and execution times will be displayed on the page.

**Note**: If you want to change the processing effect from mirror to negative, open `script.js` and change the `option` variable from `0` to `1`.
