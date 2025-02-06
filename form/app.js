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

// Start the server
const PORT = 8080;
app.listen(PORT, () => {
    console.info(` [server] server running at http://localhost:${PORT}`,);
    console.info(' [server] close this terminal or press Ctrl+C to quit.');
});

// Reload browser when files change
liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});