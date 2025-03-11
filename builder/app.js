const express = require('express');
const fs = require('fs');
const path = require('path');
const livereload = require('livereload');
const connectLivereload = require('connect-livereload');
const { createProxyMiddleware } = require('http-proxy-middleware');
const multer = require('multer');

// Port number
const PORT = 2000;
const RL_PORT = 2020;

const app = express();

// Serve the builder app on the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index_app.html'));
});

// Configure multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

// LiveReload setup
const liveReloadServer = livereload.createServer({ port: RL_PORT });
liveReloadServer.watch(path.join(__dirname, 'public')); // Watch changes in /public
app.use(connectLivereload({ port: RL_PORT })); // Enable LiveReload in Express

// Serve static files (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

// API to save a picture. The input is 
// body: JSON.stringify({
//     id: user.id,
//     image: imageUrl, which is a blob URL
// }),
app.post('/api/picture', upload.single('image'), async (req, res) => {
    try {
        const { id } = req.body;
        if (!id || !req.file) {
            return res.status(400).json({ error: 'Missing user ID or image file' });
        }

        // Define the file path
        const filename = path.join(__dirname, '..', 'builder', 'public', 'images', `${id}.svg`);
        
        // Ensure the directory exists
        fs.mkdirSync(path.dirname(filename), { recursive: true });
        
        // Write the file to disk
        fs.writeFileSync(filename, req.file.buffer);

        res.json({ success: true, filePath: `/images/${id}.svg` });

    } catch (error) {
        console.error('Error saving picture:', error);
        res.status(500).json({ error: 'Failed to save picture' });
    }
});

// API to get the saved form data
app.get('/api/form', (req, res) => {
    let formJson = fs.readFileSync(path.join(__dirname, '..', 'form', 'public', 'js', 'form.js'), 'utf8');

    // Remove first and last lines of the form.js file to get the JSON data
    formJson = formJson.substring(formJson.indexOf('['), formJson.lastIndexOf(']') + 1);

    res.json(JSON.parse(formJson));
});

// API to save the form data
app.post('/api/save', express.json(), (req, res) => {
    const formJson = JSON.stringify(req.body, null, 4).replaceAll('\n', '\n    ');

    fs.writeFileSync(path.join(__dirname, '..', 'form', 'public', 'js', 'form.js'), `Formio.createForm(document.getElementById('dvf-form-viewer'), {\n    components: ${formJson}\n});`);

    res.send('Form data saved successfully!');
});

// API to get the variables from variables.json
app.get('/api/variables', (req, res) => {
    const variables = fs.readFileSync(path.join(__dirname, '..', 'variables.json'), 'utf8');
    res.json(JSON.parse(variables));
});

app.use('/demo', createProxyMiddleware({
    target: 'https://demo.doccomplete.nl',
    changeOrigin: true,
    pathRewrite: { '^/demo': '' }, // Removes "/demo" but keeps the rest of the URL
    on: {
        proxyReq: (proxyReq, req, res) => {
            proxyReq.setHeader('Origin', "https://demo.doccomplete.nl");
            proxyReq.setHeader('Referer', "https://demo.doccomplete.nl");
            
            if (req.path.includes("identityprovider")) return;
            
            console.log(`\n[PROXY REQUEST] ${req.method} ${req.originalUrl} → ${proxyReq.protocol}//${proxyReq.host}${proxyReq.path}`);
        },
        proxyRes: (proxyRes, req, res) => {
            if (req.path.includes("identityprovider")) return;

            console.log(`[PROXY RESPONSE] ${req.method} ${req.originalUrl} ← ${proxyRes.statusCode}, ${proxyRes.statusMessage}`);
        },
        error: (err, req, res) => {
            console.error(`[PROXY ERROR] ${req.method} ${req.originalUrl} - ${err.message}`);
        }
    }
}));

app.use('/prod', createProxyMiddleware({
    target: 'https://dms.blending.nl',
    changeOrigin: true,
    pathRewrite: { '^/prod': '' }, // Removes "/prod" but keeps the rest of the URL
    on: {
        proxyReq: (proxyReq, req, res) => {
            proxyReq.setHeader('Origin', "https://dms.blending.nl");
            proxyReq.setHeader('Referer', "https://dms.blending.nl");
            
            if (req.path.includes("identityprovider")) return;
            
            console.log(`\n[PROXY REQUEST] ${req.method} ${req.originalUrl} → ${proxyReq.protocol}//${proxyReq.host}${proxyReq.path}`);
        },
        proxyRes: (proxyRes, req, res) => {
            if (req.path.includes("identityprovider")) return;
            
            console.log(`[PROXY RESPONSE] ${req.method} ${req.originalUrl} ← ${proxyRes.statusCode}, ${proxyRes.statusMessage}`);
        },
        error: (err, req, res) => {
            console.error(`[PROXY ERROR] ${req.method} ${req.originalUrl} - ${err.message}`);
        }
    }
}));

// Start the server
app.listen(PORT, () => {
    console.info(` [server] form builder running at http://localhost:${PORT}`);
    console.info(' [server] close this terminal or press Ctrl+C to quit.\n');
});

// Reload browser when files change
liveReloadServer.server.once("connection", () => {
    console.info("refreshing builder...");
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});