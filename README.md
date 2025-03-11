# Form Maker

Form Maker is a project that allows users to create and manage forms using Form.io. 
This project includes custom CSS and JavaScript to enhance the functionality and appearance of the forms.

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

To run this project, make sure you have Node.js installed on your machine.
ou can download it from the official website: https://nodejs.org/.

## Usage
### Starting the Application

To start the application, execute `start.bat`.
This will show a loading bar, and open a command prompt window in the background which runs the following commands:

```bash
cd path/to/form-maker/form
npm install
npm run dev
```
and then open the browser at `http://localhost:1000`.
The first time you run the project, it will probably take more time to start than the loading bar suggests, because it needs to install all the dependencies.
This means that when the loading bar is finished, the project might still be installing dependencies and the browser might show that it can't connect to the server.
This is normal. Just wait a bit longer and refresh the page.
After the first time, it will start faster and the loading bar will be more accurate.
If the start script fails, you can also run the commands manually in the terminal

When the project has started, you are greeted with a homepage.
Here you first need to specify on which DMS you are going to work and add a custom Bearer token **for that DMS**.
To get the Bearer token, navigate to the DMS and log in.
Then open "Configuration" -> "Login options" and press on the fingerprint icon on the right.
Here you can manage the Bearer tokens and create a new one.
When you have done this, the buttons on the homepage will be enabled and you can start creating forms.

### Creating a Form

To create a form, click on the "Builder" button on the homepage.
This will open the form builder, where you can add form components and customize their properties.
You can add new components by dragging them from the left sidebar to the form canvas.
You can customize the properties of each component by clicking on the component in the form canvas.
You can also rearrange the components by dragging them to a new position.
When you are done creating the form, click on the "Save" button to save the form.
You can also use "Ctrl + S" to save the form.
The form will be saved in the `form/public/js/form.js` file and replace the existing form.

To view the form, click on the "Form" button on the homepage, or from the builder click on the eye icon next to the save button.
This will open the form viewer, where you can see the form that is defined in the `form.js` file.
You can interact with the form and test its functionality.
The form will automatically update when the `form.js` file is changed, so you don't need to refresh the page to see the changes.

### Importing a Form

To import a form, click on the "Import/Export" button on the homepage.
This will open the import/export page, where you can import a form from a JSON file.
Select "Import" and enter the filename of the JSON file that contains the form.
The file needs to be in the correct format, that is, the format from the Form Builder in the DMS and needs to be in the `form-maker/` directory.
If the file is in the correct format and location, click on the "Import" button to import the form.
If the form is successfully imported, you will see a success message.

### Exporting a Form

To export a form, click on the "Import/Export" button on the homepage.
This will open the import/export page, where you can export the form to a JSON file.
Select "Export" and enter the name of your form and select the author.
Click on the "Export" button to export the form.
The form will be exported to a JSON file in the `form-maker/` directory.
You can directly upload it to the DMS.

## File Structure

The project has the following structure:

```
form-maker/
├── application/
│   ├── public/
│   |   ├── style.css
│   |   ├── index.html
│   |   ├── favicon.ico
│   |   └── script.js
│   |
│   ├── app.js
│   ├── package-lock.json
│   └── package.json
|
├── builder/
│   ├── public/
│   │   ├── images/
│   │   ├── components/
│   │   |   ├── process-start.js
│   │   |   ├── task-completion.js
│   │   |   └── user-select.js
│   │   |
│   │   ├── index_app.html
│   │   ├── index.html
│   |   ├── favicon.ico
│   |   └── builder.js
|   |
│   ├── app.js
│   ├── router.js
│   ├── package-lock.json
│   └── package.json
|
├── conversion/
│   ├── convert_from_json.js
│   └── convert_to_json.js
|
├── form/
│   ├── public/
│   │   ├── js/
│   │   |   ├── form.js
│   │   |   └── main.js
│   │   |
│   │   ├── customcss.css
│   │   ├── index_app.html
│   │   ├── index.html
│   |   ├── favicon.ico
│   |   └── build.js
|   |
│   ├── app.js
│   ├── router.js
│   ├── package-lock.json
│   └── package.json
|
├── .gitattributes
├── .gitignore
├── start.bat
└── README.md
```

The following files can be edited to customize the form:
- `form/public/customcss.css`: Contains custom CSS styles for the form.
- `form/public/js/`: Contains JavaScript files for form functionality. Here you can add new JavaScript files and edit existing ones.
- `form/public/js/form.js`: Defines the form components and their properties.

**Note: Do not edit any other files unless you know what you are doing.**

## Customization

### Custom CSS

You can add custom CSS styles in the `form/public/customcss.css` file. 
These styles will be applied to the form to enhance its appearance.

### Custom Form

You can customize the form components and their properties using the form builder.
If you want to manually change them in the code, you can do so in the `form/public/form.js` file.
This file defines the form structure and properties using Form.io's JSON schema format.

### Custom JavaScript

You can add custom JavaScript functions in the `form/public/js/` directory.
These functions can be used to add custom behavior to the form components.
It should not be added to the `form.js` file, since the JavaScript in this file will be ignored at conversion.

To declare a initializerFunction and get the form component and data object you can use the normal way of using the "dv-intialized" event, or you can use the following declarations:

```javascript
let form;
let data;

setTimeout(() => {
  form = window.Formio.forms[document.getElementsByClassName("formio-component-form")[0].id];
  data = form["_data"];

  functionName();
}, 100);
```

It is important to use a timeout and set it to 100ms to ensure that the form is fully loaded before the function is executed.
This is because the DMS is slower that this local version.
Not using a timeout will sometimes work locally, but definitely not in the DMS.

Because this project is built using Webpack, you can use ES6 syntax and features in your JavaScript files.
However, you should not use import statements in these files, as they will not work.

### Adding New JavaScript Files
All files in `form/public/js/` are bundled together at conversion (except for `form.js`).
You can add new JavaScript files to this directory and they will be included in the bundle.
**Don't forget to add an export statement to every new JavaScript file you add which exports all the functions in the file.**

```javascript
export { 
  functionName1, 
  functionName2, 
  ... 
};
```

## License

This project is created by and for **Doccomplete, Blending B.V.** and should not be used or distributed without permission.
