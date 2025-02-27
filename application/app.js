const express = require('express');
const path = require('path');
const livereload = require('livereload');
const connectLivereload = require('connect-livereload');

// Port number
const PORT = 1000;

const app = express();

const liveReloadServer = livereload.createServer();
liveReloadServer.watch([
    path.join(__dirname, 'public'), 
    path.join(__dirname, '..', 'builder', 'public'),
    path.join(__dirname, '..', 'form', 'public'),
]); // Watch changes in /public
app.use(connectLivereload()); // Enable LiveReload in Express

// Import the routers from the builder and form modules
const builderRouter = require(path.join(__dirname, '..', 'builder', 'router'));
const formRouter = require(path.join(__dirname, '..', 'form', 'router'));

// Mount the builder router on "/builder"
app.use('/builder', builderRouter);

// Mount the form router on "/form"
app.use('/form', formRouter);

// Mount the static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(PORT, () => {
    console.info(` [server] application running at http://localhost:${PORT}`,);
    console.info(' [server] close this terminal or press Ctrl+C to quit.\n');
});

// Reload browser when files change
liveReloadServer.server.once("connection", () => {
    console.info("refreshing homepage...");
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});
