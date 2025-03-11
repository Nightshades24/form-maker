///////////////////////////////////////////////////////////////////////////
/// This file is responsible for loading all modules in the form directory.
/// Do not modify this file unless you know what you are doing.
///////////////////////////////////////////////////////////////////////////

// Load all modules, variables, and custom actions from the server
let variables;
let moduleFiles;
let customActions;

// Save the original fetch function
const ogFetch = window.fetch;

// Let "originalFetch" be a function that prepends the route with the path
const originalFetch = async (input, init = {}) => {
    // Prepend the route with the path
    if (typeof input === "string" && input.startsWith('/api')) {
        input = window.location.pathname + input.slice(1);
    }

    return ogFetch(input, init);
};
window.originalFetch = originalFetch;

// Intercept all fetch requests
window.fetch = async (input, init = {}) => {
    // Wait until variables are loaded
    while (!variables) {
        await new Promise(resolve => setTimeout(resolve, 100));
    }

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
        url = new URL(window.location.href + "demo" + url.pathname);
    }
    else if (url.hostname === "dms.blending.nl") {
        url = new URL(window.location.href + "prod" + url.pathname);
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

// Load modules when the page loads and then load the init actions
window.onload = async () => {
    variables = await originalFetch('/api/variables').then(response => response.json());
    moduleFiles = await originalFetch('/api/modules').then(response => response.json());
    customActions = await originalFetch('/api/init').then(response => response.json());

    await loadAllModules();
    await loadInitActions();
    setTimeout(disableTaskBtns, 1000);
};

window.onchange = () => disableTaskBtns();

async function loadAllModules() {
    for (const file of moduleFiles) {
        try {
            const path = window.location.pathname;
            const module = await import(`${path.slice(0, path.length - 1)}${file}`);
            for (const [key, value] of Object.entries(module)) {
                window[key] = value; // Attach module to window
            }
        } catch (error) {
            console.error(`Error loading module ${file}:`, error);
        }
    }
}

async function loadInitActions() {
    let form = window.Formio.forms[document.getElementsByClassName("formio-component-form")[0].id];
    let data = form["_data"];

    for (const action of customActions) {
        const customFunction = new Function('form', 'data', action);
        customFunction(form, data);
    }
}

function disableTaskBtns() {
    // Select all elements with the given class
    const buttons = document.querySelectorAll(".formio-component-taskCompletionBtn");

    // Loop through each element and set properties
    buttons.forEach(comp => {
        const button = comp.component.refs.button;

        button.disabled = true; // Disable the button
        button.title = "Not available in Formio preview, only in DMS."; // Set the tooltip
        button.setAttribute("style", "cursor: not-allowed; background-color:#747474 !important; border-color: #d0d0d0;"); // Change the cursor and grey out the button
    });
}
