const development = {
    database_url:  process.env.BETTER_SERVICE_DEV_DATABASE_URL,
    cookie_secret: process.env.BETTER_SERVICE_DEV_COOKIE_SECRET || 'dev-1234', 
    cookie_expiration: process.env.BETTER_SERVICE_DEV_COOKIE_EXPIRATION || '1800'
};

module.exports = development;
