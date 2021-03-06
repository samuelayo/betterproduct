const fs = require('fs');
const morgan = require('morgan');
var session = require('express-session')
const bodyParser = require('body-parser');
const helmet = require('helmet');
const FileStreamRotator = require('file-stream-rotator');
const express = require('express');
const loggerInit = require('./logger');
const routes = require('../app/routes/index');
const config = require('./index');
const logDirectory = './log';
const path = require('path');
const checkLogDir = fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const expressConfig = (app) => {
    let accessLogStream;
    let logger;

    // initialize logger
    if (app.get('env') === 'development') {
        logger = loggerInit('development');
    } else if (app.get('env') === 'production') {
        logger = loggerInit('production');
    } else if (app.get('env') === 'test') {
        logger = loggerInit('test');
    } else {
        logger = loggerInit();
    }

    global.logger = logger;
    logger.info('Application starting...');
    logger.debug("Overriding 'Express' logger");


    if (checkLogDir) {
        accessLogStream = FileStreamRotator.getStream({
            date_format: 'YYYYMMDD',
            filename: `${logDirectory}/access-%DATE%.log`,
            frequency: 'weekly',
            verbose: false
        });
    }

    console.log(path.join(__dirname, '../../client/build/'))
    app.use(express.static(path.join(__dirname, '../../client/build')));
    app.use(morgan('combined', { stream: accessLogStream }));

    const sess = {
        secret: config.cookie_secret,
        cookie: {},
        resave: false, // don't save session if unmodified
        saveUninitialized: false, // don't create session until something stored
    }

    if (app.get('env') === 'production') {
        app.set('trust proxy', 1) // trust first proxy
        sess.cookie.secure = true // serve secure cookies
    }
       
    app.use(session(sess))

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));


    
    // Use helmet to secure Express headers
    app.use(helmet());
    app.disable('x-powered-by');


    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Authorization, Origin, Content-Type, Accept');
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });


    app.use('/', routes);

    // catch 404 and forward to error handler
    app.use((req, res, next) => {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    });


    // error handlers

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development' || app.get('env') === 'test') {
        app.use((err, req, res, next) =>
            res.status(err.status || 500)
                .json({
                    message: err.message,
                    error: err
                }),);
    }

    // production error handler
    // remove stacktrace
    app.use((err, req, res, next) =>
        res.status(err.status || 500).json({ message: err.message }),);
};

module.exports = expressConfig;
