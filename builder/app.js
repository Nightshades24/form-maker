const express = require('express');
const fs = require('fs');
const path = require('path');
const livereload = require('livereload');
const connectLivereload = require('connect-livereload');

// Port number
const PORT = 3000;
const RL_PORT = 1010;

const app = express();

// LiveReload setup
const liveReloadServer = livereload.createServer({ port: RL_PORT });
liveReloadServer.watch(path.join(__dirname, 'public')); // Watch changes in /public
app.use(connectLivereload({ port: RL_PORT })); // Enable LiveReload in Express

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// API to get the saved form data
app.get('/api/form', (req, res) => {
    let formJson = fs.readFileSync(path.join(__dirname, '..', 'form', 'public', 'js', 'form.js'), 'utf8');

    // Remove first and last lines of the form.js file to get the JSON data
    formJson = formJson.substring(formJson.indexOf('['), formJson.lastIndexOf(']') + 1);

    console.log(' [server] sending form data:', JSON.parse(formJson));

    res.json(JSON.parse(formJson));
});

// API to save the form data
app.post('/api/save', express.json(), (req, res) => {
    const formJson = JSON.stringify(req.body, null, 4).replaceAll('\n', '\n    ');

    fs.writeFileSync(path.join(__dirname, '..', 'form', 'public', 'js', 'form.js'), `Formio.createForm(document.getElementById('dvf-form-viewer'), {\n    components: ${formJson}\n});`);

    res.send('Form data saved successfully!');
});

// Start the server
app.listen(PORT, () => {
    console.info(` [server] form builder running at http://localhost:${PORT}`,);
    console.info(' [server] close this terminal or press Ctrl+C to quit.\n');
});

// Reload browser when files change
liveReloadServer.server.once("connection", () => {
    console.info("refreshing builder...");
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});