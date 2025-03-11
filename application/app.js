const express = require('express');
const fs = require('fs');
const path = require('path');
const livereload = require('livereload');
const connectLivereload = require('connect-livereload');
const exec = require('child_process').exec;

// Enable/disable LiveReload for homepage
const UPDATE = false;

// Port number
const PORT = 1000;

const app = express();

if (UPDATE) {
    // LiveReload setup
    const liveReloadServer = livereload.createServer();
    liveReloadServer.watch([
        path.join(__dirname, 'public'), 
        path.join(__dirname, '..', 'builder', 'public'),
        path.join(__dirname, '..', 'form', 'public'),
    ]); // Watch changes in /public
    app.use(connectLivereload()); // Enable LiveReload in Express
}

// Import the routers from the builder and form modules
const builderRouter = require(path.join(__dirname, '..', 'builder', 'router'));
const formRouter = require(path.join(__dirname, '..', 'form', 'router'));

// Mount the builder router on "/builder"
app.use('/builder', builderRouter);

// Mount the form router on "/form"
app.use('/form', formRouter);

// Mount the static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to get all user images from the builder module
app.get('/api/images', (req, res) => {
    const images = fs.readdirSync(path.join(__dirname, '..', 'builder', 'public', 'images'));
    res.json(images);
});

// API endpoint to import/export the form data  
app.post('/api/form', express.json(), (req, res) => {
    const data = req.body;
    let cmd = '';

    if (data.mode === 'export') {
        const script = path.join(__dirname, '..', 'conversion', 'convert_to_json.js');
        cmd = `node "${script}" "${data.formName}" "${data.userId}"`;
    } else if (data.mode === 'import') {
        const script = path.join(__dirname, '..', 'conversion', 'convert_from_json.js');
        cmd = `node "${script}" "${data.formName}"`;
    } else {
        return res.status(400).send('Invalid mode');
    }

    exec(cmd, (error, stdout, stderr) => {
        if (error) {
            console.error('Error running script:', error);
            return res.status(500).send('Error running script');
        }
        res.send('Script executed successfully');
    });
});

// API to get the variables from variables.json
app.get('/api/variables', (req, res) => {
    const varPath = path.join(__dirname, '..', 'variables.json');
    if (!fs.existsSync(varPath)) {
        fs.writeFileSync(varPath, '{ "DMS": "", "BEARER": "" }');
    }

    const variables = fs.readFileSync(path.join(__dirname, '..', 'variables.json'), 'utf8');
    res.json(JSON.parse(variables));
});

// API to update the variables in variables.json
app.put('/api/variables', express.json(), (req, res) => {
    const variables = req.body;
    fs.writeFileSync(path.join(__dirname, '..', 'variables.json'), JSON.stringify(variables, null, 4));
    res.send('Variables updated successfully');
});

// Start the server
app.listen(PORT, () => {
    console.info(` [server] application running at http://localhost:${PORT}`,);
    console.info(' [server] close this terminal or press Ctrl+C to quit.\n');
});

if (UPDATE) {
    // Reload browser when files change
    liveReloadServer.server.once("connection", () => {
        console.info("refreshing homepage...");
        setTimeout(() => {
            liveReloadServer.refresh("/");
        }, 100);
    });
}
