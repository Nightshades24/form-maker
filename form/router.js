const express = require('express');
const fs = require('fs');
const path = require('path');
const livereload = require('livereload');
const connectLivereload = require('connect-livereload');
const { createProxyMiddleware, fixRequestBody } = require('http-proxy-middleware');

const router = express.Router();
const extensiveLogging = false;
const RL_PORT = 2020;

// LiveReload setup
const liveReloadServer = livereload.createServer({ port: RL_PORT });
liveReloadServer.watch([
    path.join(__dirname, 'public'),
    path.join(__dirname, '..', 'builder', 'public', 'components')
]);
router.use(connectLivereload({ port: RL_PORT }));

// For raw JSON payloads
router.use(express.raw({ type: 'application/json' }));

// Serve static files from the form's public folder
router.use(express.static(path.join(__dirname, 'public')));
router.use('/components', express.static(path.join(__dirname, '..', 'builder', 'public', 'components')));
router.use('/images', express.static(path.join(__dirname, '..', 'builder', 'public', 'images')));

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
                fixRequestBody(proxyReq, req);
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

// Proxy middleware for /prod
router.use('/prod', createProxyMiddleware({
    target: 'https://dms.blending.nl',
    changeOrigin: true,
    pathRewrite: { '^/prod': '' },
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
                fixRequestBody(proxyReq, req);
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
router.get('/api/modules', (req, res) => {
    const jsDir = path.join(__dirname, 'public', 'js');
    const moduleFiles = fs.readdirSync(jsDir)
        .filter(file => file.endsWith('.js'))
        .map(file => `/js/${file}`);
    res.json(moduleFiles);
});

// API to get variables from variables.json
router.get('/api/variables', (req, res) => {
    const variables = fs.readFileSync(path.join(__dirname, '..', 'variables.json'), 'utf8');
    res.json(JSON.parse(variables));
});

// API to check for custom actions on form initialization
router.get('/api/init', (req, res) => {
    const fileContent = fs.readFileSync(path.join(__dirname, '..', 'form', 'public', 'js', 'form.js'), 'utf8');
    const components = fileContent.split(/\r?\n/).slice(2, -2).join("\n");
    if (!components) {
        console.log("No Formio.createForm config found.");
        return;
    }
    const cleanedComponents = `[${components}]`
        .replace(/\\r\\n/g, '')
        .replace(/([{,]\s*)(\w+)(\s*:)/g, '$1"$2"$3')
        .replace(/,(\s*[}\]])/g, '$1');
    const formConfig = JSON.parse(cleanedComponents);
    if (!formConfig || !Array.isArray(formConfig)) {
        console.log("No components found in form.");
        return;
    }
    const customActions = [];
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

// LiveReload refresh logic
liveReloadServer.server.once("connection", () => {
    console.info(" refreshing form...");
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});

module.exports = router;
