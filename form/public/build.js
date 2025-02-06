///////////////////////////////////////////////////////////////////////////
/// This file is responsible for loading all modules in the form directory.
/// Do not modify this file unless you know what you are doing.
///////////////////////////////////////////////////////////////////////////

async function loadAllModules() {
    const response = await fetch('/api/modules');
    const moduleFiles = await response.json();

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
window.onload = loadAllModules().then(() => { loadInitActions(); });

async function loadInitActions() {
  let form = window.Formio.forms[document.getElementsByClassName("formio-component-form")[0].id];
  let data = form["_data"];

    const response = await fetch('/api/init');
    const customActions = await response.json();

    for (const action of customActions) {
        const customFunction = new Function('form', 'data', action);
        customFunction(form, data);
    }
}
