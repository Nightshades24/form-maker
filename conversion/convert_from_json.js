// Converter to convert exported form custom_form.json to formio form definition.
const fs = require('fs');
const path = require('path');

const FORM_NAME = process.argv[2];

const formJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', `${FORM_NAME}.json`), 'utf8'));
const form = formJson.definition.formioFormDefinition ? formJson.definition : JSON.parse(formJson.definition);

const components = form.formioFormDefinition.components;
const customCss = form.customCss;
const customJs = form.customJs;

// Write the form components to form/public/form.js
const formJsContent = `Formio.createForm(document.getElementById('dvf-form-viewer'), {\n    components: ${JSON.stringify(components, null, 4).replaceAll("\n", "\n    ")}\n});`;
fs.writeFileSync(path.join(__dirname, '..', 'form', 'public', 'js', 'form.js'), formJsContent.replaceAll("instance.root", "form"));

// Write the custom css to form/public/customcss.css
fs.writeFileSync(path.join(__dirname, '..', 'form', 'public', 'customcss.css'), customCss);

// Write the custom js to form/public/js/main.js
fs.writeFileSync(path.join(__dirname, '..', 'form', 'public', 'js', 'main.js'), customJs.replaceAll("instance.root", "form"));

// Get all function names and objects from form/public/js/main.js
const mainJsContent = fs.readFileSync(path.join(__dirname, '..', 'form', 'public', 'js', 'main.js'), 'utf8');
const functionNames = mainJsContent.match(/function\s+(\w+)\s*\(/g) ? mainJsContent.match(/function\s+(\w+)\s*\(/g).map(match => match.match(/function\s+(\w+)\s*\(/)[1]) : [];
const objectNames = mainJsContent.match(/const\s+(\w+)\s*=\s*{/g) ? mainJsContent.match(/const\s+(\w+)\s*=\s*{/g).map(match => match.match(/const\s+(\w+)\s*=\s*{/)[1]) : [];

// Define the content of main.js to form/public/js/main.js and export the function names
let mainJsExportContent = `${mainJsContent}`;

// Write every object to form/public/js/objectName.js and export the objects
objectNames.forEach(objectName => {
    // Check if objectName starts with a capital letter
    if (!/^[A-Z]/.test(objectName)) return;
    
    const objectContent = mainJsContent.match(new RegExp(`const\\s+${objectName}\\s*=\\s*\\{[\\s\\S]*?^};`, 'm'))[0];
    const objectExportContent = `export ${objectContent}`;
    fs.writeFileSync(path.join(__dirname, '..', 'form', 'public', 'js', `${objectName}.js`), objectExportContent);

    // Remove the object content from mainJsExportContent
    mainJsExportContent = mainJsExportContent.replace(objectContent, '');
});

// Get all variable names from main.js and export them
const variableConst = mainJsExportContent.match(/^const\s+(\w+)\s*=\s*/gm) ? mainJsExportContent.match(/^const\s+(\w+)\s*=\s*/gm).map(match => match.match(/^const\s+(\w+)\s*=\s*/)[1]) : [];
const variableLet = mainJsExportContent.match(/^let\s+(\w+)\s*=\s*/gm) ? mainJsExportContent.match(/^let\s+(\w+)\s*=\s*/gm).map(match => match.match(/^let\s+(\w+)\s*=\s*/)[1]) : [];
const exportJsExportContent = [functionNames.join(',\n    '), variableConst.join(',\n    '), variableLet.join(',\n    ')].filter(Boolean).join(',\n    ');

mainJsExportContent = `${mainJsExportContent.trim()}\n\nexport {\n    ${exportJsExportContent}\n};\n`;

fs.writeFileSync(path.join(__dirname, '..', 'form', 'public', 'js', 'main.js'), mainJsExportContent);