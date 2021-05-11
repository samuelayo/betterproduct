const LOGIN_QUERY = `
    SELECT 
        uuid, username, user_group 
    FROM users
    WHERE 
        username = $1
    AND 
        user_password = crypt($2, user_password)
`;


module.exports = {
    LOGIN_QUERY
}