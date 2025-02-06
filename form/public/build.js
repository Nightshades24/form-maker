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

// Load modules when the page loads
window.onload = loadAllModules;