const express = require('express');
const fs = require('fs');
const path = require('path');
const livereload = require('livereload');
const connectLivereload = require('connect-livereload');
const { createProxyMiddleware } = require('http-proxy-middleware');
const multer = require('multer');

// Use a router instead of a full app
const router = express.Router();

// Configure multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

// LiveReload setup
const RL_PORT = 1010;
const liveReloadServer = livereload.createServer({ port: RL_PORT });
liveReloadServer.watch(path.join(__dirname, 'public'));
router.use(connectLivereload({ port: RL_PORT }));

// Serve static files from the builder's public folder
router.use(express.static(path.join(__dirname, 'public')));
router.use('/images', express.static(path.join(__dirname, '..', 'builder', 'public', 'images')));

// API to save a picture
router.post('/api/picture', upload.single('image'), async (req, res) => {
    try {
        const { id } = req.body;
        if (!id || !req.file) {
            return res.status(400).json({ error: 'Missing user ID or image file' });
        }

        // Define file paths
        const filenameBuilder = path.join(__dirname, 'public', 'images', `${id}.svg`);
        const filenameForm = path.join(__dirname, '..', 'form', 'public', 'images', `${id}.svg`);
        
        // Ensure directories exist
        fs.mkdirSync(path.dirname(filenameBuilder), { recursive: true });
        fs.mkdirSync(path.dirname(filenameForm), { recursive: true });
        
        // Write the image file to both locations
        fs.writeFileSync(filenameBuilder, req.file.buffer);
        fs.writeFileSync(filenameForm, req.file.buffer);

        res.json({ success: true, filePath: `/images/${id}.svg` });
    } catch (error) {
        console.error('Error saving picture:', error);
        res.status(500).json({ error: 'Failed to save picture' });
    }
});

// API to get the saved form data
router.get('/api/form', (req, res) => {
    let formJson = fs.readFileSync(path.join(__dirname, '..', 'form', 'public', 'js', 'form.js'), 'utf8');
    // Extract the JSON array from the file content
    formJson = formJson.substring(formJson.indexOf('['), formJson.lastIndexOf(']') + 1);
    res.json(JSON.parse(formJson));
});

// API to save the form data
router.post('/api/save', express.json(), (req, res) => {
    const formJson = JSON.stringify(req.body, null, 4).replaceAll('\n', '\n    ');
    fs.writeFileSync(
        path.join(__dirname, '..', 'form', 'public', 'js', 'form.js'),
        `Formio.createForm(document.getElementById('dvf-form-viewer'), {\n    components: ${formJson}\n});`
    );
    res.send('Form data saved successfully!');
});

// API to get variables from variables.json
router.get('/api/variables', (req, res) => {
    const variables = fs.readFileSync(path.join(__dirname, '..', 'variables.json'), 'utf8');
    res.json(JSON.parse(variables));
});

// Proxy middleware for /demo
router.use('/demo', createProxyMiddleware({
    target: 'https://demo.doccomplete.nl',
    changeOrigin: true,
    pathRewrite: { '^/demo': '' },
    on: {
        proxyReq: (proxyReq, req, res) => {
            proxyReq.setHeader('Origin', "https://demo.doccomplete.nl");
            proxyReq.setHeader('Referer', "https://demo.doccomplete.nl/");
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

// Proxy middleware for /prod
router.use('/prod', createProxyMiddleware({
    target: 'https://dms.blending.nl',
    changeOrigin: true,
    pathRewrite: { '^/prod': '' },
    on: {
        proxyReq: (proxyReq, req, res) => {
            proxyReq.setHeader('Origin', "https://demo.doccomplete.nl");
            proxyReq.setHeader('Referer', "https://demo.doccomplete.nl/");
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

// LiveReload refresh logic
liveReloadServer.server.once("connection", () => {
    console.info("refreshing builder...");
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});

module.exports = router;
