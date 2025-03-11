const express = require('express');
const fs = require('fs');
const path = require('path');
const livereload = require('livereload');
const connectLivereload = require('connect-livereload');
const { createProxyMiddleware, fixRequestBody } = require('http-proxy-middleware');

// Enable extensive logging in the proxy
const extensiveLogging = false;

// Port number
const PORT = 3000;
const RL_PORT = 3030;

const app = express();

// Serve the form preview app on the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index_app.html'));
})

// LiveReload setup
const liveReloadServer = livereload.createServer({ port: RL_PORT });
liveReloadServer.watch([path.join(__dirname, 'public'), path.join(__dirname, '..', 'builder', 'public', 'components')]); // Watch changes in /public
app.use(connectLivereload({ port: RL_PORT })); // Enable LiveReload in Express

// Serve static files (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/components', express.static(path.join(__dirname, '..', 'builder', 'public', 'components')));
app.use('/images', express.static(path.join(__dirname, '..', 'builder', 'public', 'images')));

app.use('/demo', createProxyMiddleware({
    target: 'https://demo.doccomplete.nl',
    changeOrigin: true,
    pathRewrite: { '^/demo': '' }, // Removes "/api" but keeps the rest of the URL
    on: {
        proxyReq: (proxyReq, req, res) => {
            proxyReq.setHeader('Origin', "https://demo.doccomplete.nl");
            proxyReq.setHeader('Referer', "https://demo.doccomplete.nl/");

            if (req.path.includes("identityprovider")) return;

            console.log(`\n[PROXY REQUEST] ${req.method} ${req.originalUrl} → ${proxyReq.protocol}//${proxyReq.host}${proxyReq.path}`);

            if (extensiveLogging) {
                console.log("Method:", proxyReq.method);
                console.log("Content-Length:", proxyReq.getHeader('Content-Length'));
                console.log("Content-Type:", proxyReq.getHeader('Content-Type'));
                console.log("Origin:", proxyReq.getHeader('Origin'));
                console.log("Referer:", proxyReq.getHeader('Referer'));
                console.log("User-Agent:", proxyReq.getHeader('User-Agent'));
                console.log("Host:", proxyReq.getHeader('Host'));
            }

            if (req.body && Object.keys(req.body).length > 0) {
                fixRequestBody(proxyReq, req)
            }
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
    pathRewrite: { '^/prod': '' }, // Removes "/api" but keeps the rest of the URL
    on: {
        proxyReq: (proxyReq, req, res) => {
            proxyReq.setHeader('Origin', "https://dms.blending.nl");
            proxyReq.setHeader('Referer', "https://dms.blending.nl/");

            if (req.path.includes("identityprovider")) return;

            console.log(`\n[PROXY REQUEST] ${req.method} ${req.originalUrl} → ${proxyReq.protocol}//${proxyReq.host}${proxyReq.path}`);

            if (extensiveLogging) {
                console.log("Method:", proxyReq.method);
                console.log("Content-Length:", proxyReq.getHeader('Content-Length'));
                console.log("Content-Type:", proxyReq.getHeader('Content-Type'));
                console.log("Origin:", proxyReq.getHeader('Origin'));
                console.log("Referer:", proxyReq.getHeader('Referer'));
                console.log("User-Agent:", proxyReq.getHeader('User-Agent'));
                console.log("Host:", proxyReq.getHeader('Host'));
            }

            if (req.body && Object.keys(req.body).length > 0) {
                fixRequestBody(proxyReq, req)
            }
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

// API to list JS files in /public/js
app.get('/api/modules', (req, res) => {
    const jsDir = path.join(__dirname, 'public', 'js');
    const moduleFiles = fs.readdirSync(jsDir)
        .filter(file => file.endsWith('.js'))
        .map(file => `/js/${file}`);  // Convert to URL paths

    res.json(moduleFiles);
});

// API to get the variables from variables.json
app.get('/api/variables', (req, res) => {
    const variables = fs.readFileSync(path.join(__dirname, '..', 'variables.json'), 'utf8');
    res.json(JSON.parse(variables));
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
        .replace(/\\r\\n/g, '')                         // Remove Windows-style newlines (\r\n)
        .replace(/([{,]\s*)(\w+)(\s*:)/g, '$1"$2"$3')   // Add double quotes around keys
        .replace(/,(\s*[}\]])/g, '$1');                 // Remove trailing commas before } or ]

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
app.listen(PORT, () => {
    console.info(` [server] form preview running at http://localhost:${PORT}`,);
    console.info(' [server] close this terminal or press Ctrl+C to quit.\n');
});

// Reload browser when files change
liveReloadServer.server.once("connection", () => {
    console.info(" refreshing form...");
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});
