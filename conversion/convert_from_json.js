// Converter to convert exported form custom_form.json to formio form definition.
const fs = require('fs');
const path = require('path');

const FORM_NAME = process.argv[2];

let formJson;
try {
    formJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', `${FORM_NAME}.json`), 'utf8'));
} 
catch (error) {
    console.error(`Error reading or parsing the file ${FORM_NAME}.json:`, error);
    process.exit(1);
}
const form = formJson.definition && formJson.definition.formioFormDefinition ? formJson.definition : JSON.parse(formJson.definition || '{}');

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
const functionMatches = mainJsContent.match(/function\s+(\w+)\s*\(/g);
const functionNames = functionMatches ? functionMatches.map(match => match.match(/function\s+(\w+)\s*\(/)[1]) : [];

const objectMatches = mainJsContent.match(/const\s+(\w+)\s*=\s*{/g);
const objectNames = objectMatches ? objectMatches.map(match => match.match(/const\s+(\w+)\s*=\s*{/)[1]) : [];

// Define the content of main.js to form/public/js/main.js and export the function names
let mainJsExportContent = `${mainJsContent}`;

// Write every object to form/public/js/objectName.js and export the objects
objectNames.forEach(objectName => {
    // Check if objectName starts with a capital letter
    if (!/^[A-Z]/.test(objectName)) return;
    
    const objectMatch = mainJsContent.match(new RegExp(`const\\s+${objectName}\\s*=\\s*\\{[\\s\\S]*?^};`, 'm'));
    if (!objectMatch) return;
    const objectContent = objectMatch[0];
    const objectExportContent = `export ${objectContent}`;
    fs.writeFileSync(path.join(__dirname, '..', 'form', 'public', 'js', `${objectName}.js`), objectExportContent);

    // Remove the object content from mainJsExportContent
    mainJsExportContent = mainJsExportContent.replace(objectContent, '');
});
const constMatches = mainJsExportContent.match(/^const\s+(\w+)\s*=\s*/gm);
const letMatches = mainJsExportContent.match(/^let\s+(\w+)\s*=\s*/gm);

const variableConst = constMatches ? constMatches.map(match => match.match(/^const\s+(\w+)\s*=\s*/)[1]) : [];
const variableLet = letMatches ? letMatches.map(match => match.match(/^let\s+(\w+)\s*=\s*/)[1]) : [];
const exportJsExportContent = [functionNames.join(',\n    '), variableConst.join(',\n    '), variableLet.join(',\n    ')].filter(Boolean).join(',\n    ');

mainJsExportContent = `${mainJsExportContent.trim()}\n\nexport {\n    ${exportJsExportContent}\n};\n`;

fs.writeFileSync(path.join(__dirname, '..', 'form', 'public', 'js', 'main.js'), mainJsExportContent);