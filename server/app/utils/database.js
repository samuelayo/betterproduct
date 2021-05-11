const bluebird = require('bluebird');
const config = require('../../config');

const pg = require('pg-promise')({
    promiseLib: bluebird,
    noLocking: true
});

const db = pg(config.database_url);

module.exports = db;
