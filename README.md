# Form Maker

Form Maker is a project that allows users to create and manage forms using Form.io. This project includes custom CSS and JavaScript to enhance the functionality and appearance of the forms.

## Table of Contents

- [Usage](#usage)
- [File Structure](#file-structure)
- [Customization](#customization)
- [License](#license)

## Usage

To run the project, install the "Live Server" extension in Visual Studio Code and open the `index.html` file in the `form/` directory using the live server. You can do this by right-clicking on the `index.html` file and selecting "Open with Live Server" in the context menu in Visual Studio Code. 

This will render the form defined in `form.js` using Form.io.

To convert the form to JSON format for the DMS, run the following command:

```
node convert_to_formio.js
```

This will generate a `custom_form.json` file containing the form definition in JSON format.

## File Structure

The project has the following structure:

```
Form Maker/
├── form/
│   ├── js/
│   │   └── main.js
│   ├── style.css
│   ├── customcss.css
│   ├── form.js
|   ├── hook.js
│   ├── index.html
├── convert_to_formio.js
└── README.md
```

**The following files contain base functionality for the form and should not be edited:**
- `form/style.css`: Contains the main CSS styles for the form. 
- `form/index.html`: The main HTML file to render the form.
- `convert_to_formio.js`: Script to convert the form definition to JSON format.

**The following files can be edited to customize the form:**
- `form/js/`: Contains JavaScript files for form functionality.
- `form/js/main.js`: Is the entry point for the JavaScript functions and is the only file in included in the `index.html` file.
- `form/customcss.css`: Contains custom CSS styles.
- `form/form.js`: Defines the form components and their properties.

## Customization

### Custom CSS

You can add custom CSS styles in the `form/customcss.css` file. These styles will be applied to the form to enhance its appearance.

### Custom Form

You can customize the form components and their properties in the `form/form.js` file. This file defines the form structure and properties using Form.io's JSON schema format.

### Custom JavaScript

You can add custom JavaScript functions in the `form/js/` directory. These functions can be used to add custom behavior to the form components. It should not be added to the `form.js` file, since it then will not be converted to JSON format.

### Adding New JavaScript Files
For every new JavaScript file you add, make sure to include it in the `MODULE_FILES` array in `form.js`:

```javascript
const MODULE_FILES = [
  'js/main.js',
];
```

Don't forget to add a single line to every new JavaScript file you add which exports all the functions in the file.

```javascript
export { functionName1, functionName2, ... };
```

## License

This project is created by and for **Doccomplete, Blending B.V.** and should not be used or distributed without permission.