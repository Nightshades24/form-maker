// Converter to convert the form.io form defined in "form" to json so it can be imported.
const fs = require('fs');
const path = require('path');

// Get form name from variable FORM_NAME from variables.json which is 1 level up
const variables = fs.readFileSync(path.join(__dirname, '..', 'variables.json'), 'utf8');
const { FORM_NAME, USER } = JSON.parse(variables);

// Get the form/customcss.css file content as a string
const customCss = fs.readFileSync(path.join(__dirname, '..', 'form', 'public', 'customcss.css'), 'utf8');

// Get all js files and filter out all import and export statements
const jsFiles = fs.readdirSync(path.join(__dirname, '..', 'form', 'public', 'js')).filter(file => file.endsWith('.js'));
const jsContent = jsFiles.map(file => {
    if (file === 'form.js') return ''; // Skip
    const content = fs.readFileSync(path.join(__dirname, '..', 'form', 'public', 'js', file), 'utf8');
    return content.replace(/(import|export)\s*\{[^}]*\}\s*;?/gs, '');
}).join('').trim();

// Get all components from the form/form.js file
const formJsContent = fs.readFileSync(path.join(__dirname, '..', 'form', 'public', 'js', 'form.js'), 'utf8');
const components = formJsContent.split(/\r?\n/).slice(2, -2).join("\n");

const cleanedComponents = `[${components}]`
    .replace(/\\r\\n/g, '')             // Remove Windows-style newlines (\r\n)
    .replace(/([{,]\s*)(\w+)(\s*:)/g, '$1"$2"$3') // Add double quotes around keys
    .replace(/,(\s*[}\]])/g, '$1');      // Remove trailing commas before } or ]

const definition = {
    "formioFormDefinition":{
        "display":"form",
        "components": JSON.parse(cleanedComponents),
    },
    "customCss": customCss,
    "dvfDefVersion":"1.0",
    "customJs": jsContent,
};

function getFormattedDateTime() {
    const now = new Date();

    // Get the local timezone offset in minutes
    const offsetMinutes = now.getTimezoneOffset();
    const offsetHours = Math.abs(Math.floor(offsetMinutes / 60));
    const offsetMinutesPart = Math.abs(offsetMinutes % 60);
    
    // Determine offset sign
    const offsetSign = offsetMinutes < 0 ? "+" : "-";

    // Format the timezone offset as ±HH:MM
    const timezoneOffset = `${offsetSign}${String(offsetHours).padStart(2, '0')}:${String(offsetMinutesPart).padStart(2, '0')}`;

    // Format the date in ISO 8601 with milliseconds and timezone
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}T` +
           `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}.` +
           `${String(now.getMilliseconds()).padStart(3, '0')}${timezoneOffset}`;
}

// Generate random GUID
function generateGUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

fs.writeFileSync(path.join(__dirname, '..', 'custom_form.json'), JSON.stringify({
    "id": generateGUID(),
    "name": FORM_NAME,
    "author": USER,
    "creationDate": getFormattedDateTime(),
    "lastEditor": USER,
    "lastModificationDate": getFormattedDateTime(),
    "definition": definition,
}));