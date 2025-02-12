///////////////////////////////////////////////////////////////////////////
/// This file is responsible for loading all modules in the form directory.
/// Do not modify this file unless you know what you are doing.
///////////////////////////////////////////////////////////////////////////

// Save the original fetch function
const originalFetch = window.fetch;

// Load all modules, variables, and custom actions
const variables = await originalFetch('/api/variables').then(response => response.json());
const moduleFiles = await originalFetch('/api/modules').then(response => response.json());
const customActions = await originalFetch('/api/init').then(response => response.json());

async function loadAllModules() {
    for (const file of moduleFiles) {
        try {
            const module = await import(file);
            for (const [key, value] of Object.entries(module)) {
                window[key] = value; // Attach module to window
            }
        } catch (error) {
            console.error(`Error loading module ${file}:`, error);
        }
    }
}

// Load modules when the page loads and then load the init actions
window.onload = loadAllModules()
    .then(() => {
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
            console.log("Intercepted request:", url.href, init);
        
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
        
            // Always set the Authorization header
            init.headers.set('Authorization', `Bearer ${variables.BEARER}`);
                
            // Call the original fetch with the modified parameters
            return originalFetch(url.href, init);
        };
    })
    .then(() => { loadInitActions(); });

async function loadInitActions() {
    let form = window.Formio.forms[document.getElementsByClassName("formio-component-form")[0].id];
    let data = form["_data"];

    for (const action of customActions) {
        const customFunction = new Function('form', 'data', action);
        customFunction(form, data);
    }
}
