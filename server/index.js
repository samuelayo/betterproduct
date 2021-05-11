const express = require('express');
// Configure Localization
const i18n = require('i18n');

const config = require('./config');

// Bootstrap express
const expressConfig = require('./config/express');
 
const { port } = config.webserver;
const app = express();
const server = require('http').Server(app);


// Pass the io instance, so we can emmit events in routes.
app.use((req, res, next) => {
    next();
});


i18n.configure({
    locales: [ 'en', 'fr' ],
    defaultLocale: 'en',
    directory: './locales',
    queryParameter: 'lang',
    autoReload: true,
    logWarnFn: (msg) => {
        logger.warn(msg);
    },
    logErrorFn: (msg) => {
        logger.error(msg);
    }
});

app.use(i18n.init);

expressConfig(app);

server.listen(port);
logger.info(`Application started on port ${port}`);

process.on('unhandledRejection', (reason, p) => {
    console.log('Possibly Unhandled Rejection at: Promise ', p, ' reason: ', reason);
    // application specific logging here
});

process.on('uncaughtException', (err) => {
    console.log('Got an uncaught exception', err);
});

module.exports = app;