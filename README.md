# Form Maker

Form Maker is a project that allows users to create and manage forms using Form.io. This project includes custom CSS and JavaScript to enhance the functionality and appearance of the forms.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [File Structure](#file-structure)
- [Customization](#customization)
- [License](#license)

## Installation

To install the project, clone the repository to your local machine:

```bash
git clone https://github.com/Nightshades24/form-maker.git
```

Or download the ZIP file from the repository and extract it to a folder on your machine.

## Usage

First make sure you have Node.js installed on your machine. You can download it from the official website: https://nodejs.org/.

To start the form, you can execute `start.bat` or run the following commands in the terminal:

```bash
npm install
npm run dev
```

This will install the required dependencies and start the project in development mode. The project will be available at `http://localhost:8080`.

To convert the form to JSON format for the DMS, execute `export.bat`. This will generate a `custom_form.json` file containing the form definition in JSON format.

To convert a form downloaded from the DMS to the project format, make sure you named the form `custom_form.json` and then execute `import.bat`. This will generate the form in the project format.

## File Structure

The project has the following structure:

```
form-maker/
├── conversion/
│   ├── convert_from_json.js
│   └── convert_to_json.js
|
├── form/
│   ├── node_modules/
│   ├── public/
|   │   ├── font-awesome/
│   │   ├── js/
│   │   |   ├── form.js
│   │   |   └── main.js
│   │   |
│   │   ├── customcss.css
│   │   ├── style.css
│   │   ├── index.html
│   |   ├── favicon.ico
│   |   └── build.js
|   |
│   ├── app.js
│   ├── package-lock.json
│   └── package.json
|
├── .gitattributes
├── .gitignore
├── export form.bat
├── import form.bat
├── start.bat
├── custom_form.json
├── variables.json
└── README.md
```

The following files can be edited to customize the form:
- `form/public/`: Contains the main files for the form and exposes them to the browser.
- `form/public/customcss.css`: Contains custom CSS styles for the form.
- `form/public/js/`: Contains JavaScript files for form functionality. Here you can add new JavaScript files.
- `form/public/js/form.js`: Defines the form components and their properties.
- `variables.json`: Contains variables such as "name" and "creator" used for defining the form in the DMS.

**Note: Do not edit any other files unless you know what you are doing.**

## Customization

### Custom CSS

You can add custom CSS styles in the `form/public/customcss.css` file. These styles will be applied to the form to enhance its appearance.

### Custom Form

You can customize the form components and their properties in the `form/public/form.js` file. This file defines the form structure and properties using Form.io's JSON schema format. 
**Do not add a newline at the end of the file!**

### Custom JavaScript

You can add custom JavaScript functions in the `form/public/js/` directory. These functions can be used to add custom behavior to the form components. It should not be added to the `form.js` file, since the JavaScript in this file will be ignored at conversion.

To declare a initializerFunction and get the form component and data object, you can use the following declarations:

```javascript
let form;
let data;

setTimeout(() => {
  form = window.Formio.forms[document.getElementsByClassName("formio-component-form")[0].id];
  data = form["_data"];

  functionName();
}, 100);
```

It is important to use a timeout and set it to 100ms to ensure that the form is fully loaded before the function is executed. This is because the DMS is slower that this local version. Not using a timeout will work locally, but not in the DMS.

Because this project is built using Webpack, you can use ES6 syntax and features in your JavaScript files. However, you should not use import statements in these files, as they will not work.

### Adding New JavaScript Files
All files in `form/public/js/` are bundled together at conversion (except for `form.js`). You can add new JavaScript files to this directory and they will be included in the bundle.
**Don't forget to add a single line to every new JavaScript file you add which exports all the functions in the file.**

```javascript
export { 
  functionName1, 
  functionName2, 
  ... 
};
```

## License

This project is created by and for **Doccomplete, Blending B.V.** and should not be used or distributed without permission.