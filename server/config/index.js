const path = require('path');
const util = require('util');

const development = require('./env/development');
const test = require('./env/test');
const production = require('./env/production');

const extend = (util)._extend;
const defaults = {
    root: path.normalize(`${__dirname}/..`),
    webserver: {
        port: process.env.PORT || '3024'
    },
    application_logging: {
        file: process.env.LOG_PATH,
        level: process.env.LOG_LEVEL || 'info',
        console: process.env.LOG_ENABLE_CONSOLE || true
    }
};

const environment = {
    development: extend(development, defaults),
    test: extend(test, defaults),
    production: extend(production, defaults)
}[process.env.NODE_ENV || 'development'];

module.exports = environment;
