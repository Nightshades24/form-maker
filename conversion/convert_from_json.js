// Converter to convert exported form custom_form.json to formio form definition.
const fs = require('fs');
const path = require('path');

const formJson = fs.readFileSync(path.join(__dirname, '..', 'custom_form.json'), 'utf8');
const form = JSON.parse(formJson);

const components = form.definition.formioFormDefinition.components;
const customCss = form.definition.customCss;
const customJs = form.definition.customJs;

// Write the form components to form/public/form.js
const formJsContent = `Formio.createForm(document.getElementById('dvf-form-viewer'), {\n    components: ${JSON.stringify(components, null, 4).replaceAll("\n", "\n    ")}\n});`;
fs.writeFileSync(path.join(__dirname, '..', 'form', 'public', 'js', 'form.js'), formJsContent);

// Write the custom css to form/public/customcss.css
fs.writeFileSync(path.join(__dirname, '..', 'form', 'public', 'customcss.css'), customCss);

// Write the custom js to form/public/js/main.js
fs.writeFileSync(path.join(__dirname, '..', 'form', 'public', 'js', 'main.js'), customJs);

// Get all function names from form/public/js/main.js
const mainJsContent = fs.readFileSync(path.join(__dirname, '..', 'form', 'public', 'js', 'main.js'), 'utf8');
const functionNames = mainJsContent.match(/function\s+(\w+)\s*\(/g).map(match => match.match(/function\s+(\w+)\s*\(/)[1]);

// Write the content of main.js to form/public/js/main.js and export the function names
const mainJsExportContent = `${mainJsContent}\n\nexport {\n    ${functionNames.join(',\n  ')}\n};\n`;
fs.writeFileSync(path.join(__dirname, '..', 'form', 'public', 'js', 'main.js'), mainJsExportContent);