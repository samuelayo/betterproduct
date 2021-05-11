const production = {
    database_url:  process.env.BETTER_SERVICE_PROD_DATABASE_URL,
    cookie_secret: process.env.BETTER_SERVICE_PROD_COOKIE_SECRET || 'prod-1234',
    cookie_expiration: process.env.BETTER_SERVICE_PROD_COOKIE_EXPIRATION || '1800'
};

module.exports = production;
