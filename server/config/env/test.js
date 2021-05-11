const test = {
    database_url:  process.env.BETTER_SERVICE_TEST_DATABASE_URL,
    cookie_secret: process.env.BETTER_SERVICE_TEST_COOKIE_SECRET || 'test-1234',
    cookie_expiration: process.env.BETTER_SERVICE_TEST_COOKIE_EXPIRATION || '1800'
};;

module.exports = test;
