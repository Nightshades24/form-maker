const express = require('express');
const fs = require('fs');
const path = require('path');
const livereload = require('livereload');
const connectLivereload = require('connect-livereload');

const app = express();

// LiveReload setup
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public')); // Watch changes in /public
app.use(connectLivereload()); // Enable LiveReload in Express

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// API to list JS files in /public/js
app.get('/api/modules', (req, res) => {
    const jsDir = path.join(__dirname, 'public', 'js');
    const moduleFiles = fs.readdirSync(jsDir)
        .filter(file => file.endsWith('.js'))
        .map(file => `/js/${file}`);  // Convert to URL paths

    res.json(moduleFiles);
});

// API to see if there is a custom action on form initialization
app.get('/api/init', (req, res) => {
    // Read the file content
    const fileContent = fs.readFileSync('public/js/form.js', 'utf8');

    // Extract the JSON from the Formio.createForm call
    const components = fileContent.split(/\r?\n/).slice(2, -2).join("\n");
    if (!components) {
        console.log("No Formio.createForm config found.");
        return;
    }

    const cleanedComponents = `[${components}]`
        .replace(/\\r\\n/g, '')             // Remove Windows-style newlines (\r\n)
        // .replace(/\\"/g, '"')               // Convert escaped quotes (\") to normal quotes (")
        .replace(/([{,]\s*)(\w+)(\s*:)/g, '$1"$2"$3') // Add double quotes around keys
        .replace(/,(\s*[}\]])/g, '$1');      // Remove trailing commas before } or ]
    
    // Parse the extracted JSON
    const formConfig = JSON.parse(cleanedComponents);

    // Ensure components exist
    if (!formConfig || !Array.isArray(formConfig)) {
        console.log("No components found in form.");
        return;
    }

    const customActions = [];

    // Iterate over components
    formConfig.forEach(component => {
        if (component.logic && Array.isArray(component.logic)) {
            component.logic.forEach(logicBlock => {
                if (logicBlock.trigger?.type === "event" && logicBlock.trigger.event === "dv-initialized") {
                    logicBlock.actions.forEach(action => {
                        if (action.type === "customAction" && action.customAction) {
                            console.log("Custom action found:", action.customAction);
                            customActions.push(action.customAction);
                        }
                    });
                }
            });
        }
    });

    res.json(customActions);
});

// Start the server
const PORT = 8080;
app.listen(PORT, () => {
    console.info(` [server] server running at http://localhost:${PORT}`,);
    console.info(' [server] close this terminal or press Ctrl+C to quit.\n');
});

// Reload browser when files change
liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});
