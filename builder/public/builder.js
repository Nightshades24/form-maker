let defaultForm;
let builder;

const ogFetch = window.fetch;

// Save the original fetch function
const originalFetch = async (input, init = {}) => {
    // Prepend the route with the path
    if (typeof input === "string" && input.startsWith('/api')) {
        input = window.location.pathname + input.slice(1);
    } 

    return ogFetch(input, init);
} ;
window.originalFetch = originalFetch;

// Load variables
const variables = await originalFetch('/api/variables').then(async response => {
    const vars = await response.json();

    window.variables = vars;
    return vars;
});

const old = variables.DMS == "https://demo.doccomplete.nl";

// Intercept all fetch requests
window.fetch = async (input, init = {}) => {
    // Convert input to a URL object for easier handling
    let url;
    if (typeof input === "string") {
        url = new URL(input, window.location.origin);
    }
    else if (input instanceof Request) {
        url = new URL(input.url);
    }
    else {
        url = input;
    }
    console.debug("Intercepted request:", url.href, init);

    // Modify URL if it starts with "/" (relative path)
    if (typeof input === "string" && input.startsWith('/')) {
        url = new URL(variables.DMS + input); // Prepend base API URL
    }

    if (url.hostname === "demo.doccomplete.nl") {
        url = new URL(window.location.href + "demo" + url.pathname + "?" + url.searchParams.toString());
    }
    else if (url.hostname === "dms.blending.nl") {
        url = new URL(window.location.href + "prod" + url.pathname + "?" + url.searchParams.toString());
    }
    else {
        // Do nothing
        return originalFetch(input, init);
    }

    // Ensure headers object exists
    init.headers = new Headers(init.headers || {});

    // Ensure Authorization header is correctly set with a Bearer token
    if (!init.headers.has('Authorization') || init.headers.get('Authorization').trim() === "Bearer") {
        init.headers.set('Authorization', `Bearer ${variables.BEARER}`);
    }

    // Call the original fetch with the modified parameters
    return originalFetch(url.href, init);
};

// Load form data and initialize builder
async function initializeBuilder() {

    const form = await getLoadedForm(); // Fetch the form data
    defaultForm = {
        components: form
    };

    const componentOrder = [
        "hidden",
        "container",
        "datamap",
        "datagrid",
        "editgrid",
        "tree",
    ];

    const components = {
        tree: {
            title: 'Tree',
            group: 'data',
            icon: 'indent',
            key: 'tree',
            weight: 100,
            schema: {
                "label": "Tree",
                "labelPosition": "top",
                "placeholder": "",
                "description": "",
                "tooltip": "",
                "customClass": "",
                "tabindex": "",
                "hidden": false,
                "hideLabel": false,
                "autofocus": false,
                "dataGridLabel": false,
                "disabled": false,
                "tableView": false,
                "modalEdit": false,
                "protected": false,
                "dbIndex": false,
                "redrawOn": "",
                "clearOnHide": false,
                "customDefaultValue": "",
                "calculateValue": "",
                "allowCalculateOverride": false,
                "validate": {
                    "required": false,
                    "customMessage": "",
                    "custom": "",
                    "customPrivate": false,
                    "json": "",
                    "strictDateValidation": false,
                    "multiple": false,
                    "unique": false
                },
                "validateOn": "change",
                "errorLabel": "",
                "key": "tree",
                "properties": {},
                "conditional": {
                    "show": null,
                    "when": null,
                    "eq": "",
                    "json": ""
                },
                "attributes": {},
                "overlay": {
                    "style": "",
                    "page": "",
                    "left": "",
                    "top": "",
                    "width": "",
                    "height": ""
                },
                "type": "tree",
                "input": true,
                "prefix": "",
                "suffix": "",
                "multiple": false,
                "unique": false,
                "persistent": true,
                "refreshOn": "",
                "calculateServer": false,
                "widget": null,
                "encrypted": false,
                "showCharCount": false,
                "showWordCount": false,
                "allowMultipleMasks": false,
                "addons": [],
                "tree": true,
                "components": [],
                "defaultValue": null
            }
        },
    };

    if (!old) {
        componentOrder.push("file");
        components.file = {
            documentation: "/userguide/form-building/premium-components#file",
            title: 'File',
            group: 'data',
            icon: 'file',
            key: 'file',
            weight: 100,
            schema: {
                "input": true,
                "key": "file",
                "placeholder": "",
                "prefix": "",
                "customClass": "",
                "suffix": "",
                "multiple": false,
                "defaultValue": null,
                "protected": false,
                "unique": false,
                "persistent": true,
                "hidden": false,
                "clearOnHide": true,
                "refreshOn": "",
                "redrawOn": "",
                "tableView": false,
                "modalEdit": false,
                "label": "Upload",
                "dataGridLabel": false,
                "labelPosition": "top",
                "description": "",
                "errorLabel": "",
                "tooltip": "",
                "hideLabel": false,
                "tabindex": "",
                "disabled": false,
                "autofocus": false,
                "dbIndex": false,
                "customDefaultValue": "",
                "calculateValue": "",
                "calculateServer": false,
                "widget": null,
                "attributes": {},
                "validateOn": "change",
                "validate": {
                    "required": false,
                    "custom": "",
                    "customPrivate": false,
                    "strictDateValidation": false,
                    "multiple": false,
                    "unique": false
                },
                "conditional": {
                    "show": null,
                    "when": null,
                    "eq": ""
                },
                "overlay": {
                    "style": "",
                    "left": "",
                    "top": "",
                    "width": "",
                    "height": ""
                },
                "allowCalculateOverride": false,
                "encrypted": false,
                "showCharCount": false,
                "showWordCount": false,
                "properties": {},
                "allowMultipleMasks": false,
                "addons": [],
                "type": "file",
                "image": false,
                "privateDownload": false,
                "imageSize": "200",
                "filePattern": "*",
                "fileMinSize": "0KB",
                "fileMaxSize": "1GB",
                "uploadOnly": false
            }
        };
    }

    // Assign builder to the global variable
    builder = await new Formio.builder(document.getElementById('dvf-form-builder'), defaultForm, {
        builder: {
            premium: old ? { title: 'Premium', weight: 40 } : false,
            data: {
                componentOrder: componentOrder,
                components: components,
            },
            dvelop: old ? false : {
                title: 'd.velop platform',
                weight: 50,
            }
        }
    });

    document.addEventListener("mousedown", function () {
        setTimeout(async () => {
            document.getElementById('save-form').disabled = !(await isFormModified());
        }, 500);
    });

    // Check if the form has been modified
    document.getElementById('save-form').disabled = !(await isFormModified());

    window.builder = builder;

    console.log("Builder initialized");
}

// Fetch the form data
async function getLoadedForm() {
    const response = await originalFetch('/api/form');
    return response.json();
}

// Save form function
async function saveForm() {
    if (!builder) {
        console.error("Builder is not initialized yet!");
        return;
    }

    await originalFetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(builder.schema.components)
    });

    // Disable the save button
    document.getElementById('save-form').disabled = true;

    // Update the default form
    defaultForm.components = builder.schema.components;

    console.log(defaultForm.components);
    console.log(await isFormModified());
}

async function isFormModified() {
    if (!builder || !builder.schema) {
        console.error("Builder is not initialized yet!", builder);
        return;
    }

    // Compare the form data with the default form
    const form = builder.schema.components;
    const defaultComponents = await getLoadedForm();

    // Check if the form has been modified by looping through all components and their properties and comparing them
    for (let i = 0; i < form.length; i++) {
        const component = form[i];
        const defaultComponent = defaultComponents[i];

        if (!defaultComponent) {
            console.debug(`Component ${component.key} not found in default components!`);
            return true;
        }

        if (JSON.stringify(component) !== JSON.stringify(defaultComponent)) {
            console.debug(`Form modified: ${component.key}`);
            console.debug("Component:", component);
            console.debug("Default component:", defaultComponent);
            return true;
        }
    }

    console.debug('Form not modified');

    return false;
}

// Initialize builder when the page loads
setTimeout(async () => await initializeBuilder(), 100);

// Attach event listeners
document.getElementById('save-form').addEventListener('click', saveForm);
document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        saveForm();
    }
});
