// Converter to convert exported form custom_form.json to formio form definition.
const fs = require('fs');
const path = require('path');

const formJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'custom_form.json'), 'utf8'));
const form = JSON.parse(formJson.definition);

const components = form.formioFormDefinition.components;
const customCss = form.customCss;
const customJs = form.customJs;

// Write the form components to form/public/form.js
const formJsContent = `Formio.createForm(document.getElementById('dvf-form-viewer'), {\n    components: ${JSON.stringify(components, null, 4).replaceAll("\n", "\n    ")}\n});`;
fs.writeFileSync(path.join(__dirname, '..', 'form', 'public', 'js', 'form.js'), formJsContent);

// Write the custom css to form/public/customcss.css
fs.writeFileSync(path.join(__dirname, '..', 'form', 'public', 'customcss.css'), customCss);

// Write the custom js to form/public/js/main.js
fs.writeFileSync(path.join(__dirname, '..', 'form', 'public', 'js', 'main.js'), customJs);

// Get all function names and objects from form/public/js/main.js
const mainJsContent = fs.readFileSync(path.join(__dirname, '..', 'form', 'public', 'js', 'main.js'), 'utf8');
const functionNames = mainJsContent.match(/function\s+(\w+)\s*\(/g).map(match => match.match(/function\s+(\w+)\s*\(/)[1]);
const objectNames = mainJsContent.match(/const\s+(\w+)\s*=\s*{/g).map(match => match.match(/const\s+(\w+)\s*=\s*{/)[1]);

// Define the content of main.js to form/public/js/main.js and export the function names
let mainJsExportContent = `${mainJsContent}\n\nexport {\n    ${functionNames.join(',\n    ')}\n};\n`;

// Write every object to form/public/js/objectName.js and export the objects
objectNames.forEach(objectName => {
    // Check if objectName starts with a capital letter
    if (!/^[A-Z]/.test(objectName)) return;
    
    const objectContent = mainJsContent.match(new RegExp(`const\\s+${objectName}\\s*=\\s*\\{[\\s\\S]*?^};`, 'm'))[0];
    const objectExportContent = `export ${objectContent}`; // \n\nexport default ${objectName};\n`;
    fs.writeFileSync(path.join(__dirname, '..', 'form', 'public', 'js', `${objectName}.js`), objectExportContent);

    // Remove the object content from mainJsExportContent
    mainJsExportContent = mainJsExportContent.replace(objectContent, '');
});

fs.writeFileSync(path.join(__dirname, '..', 'form', 'public', 'js', 'main.js'), mainJsExportContent);