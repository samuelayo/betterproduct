
const db = require('../utils/database');
const userQueries = require('../queries/user.queries');
const jwt = require('jsonwebtoken');
const config = require('../../config/index');

const login = async (req, res) => {
    const { body = {} } = req ;
    const { username, password } = body;
    if(!username || !password){
        throw new Error("Username and or password not present");
    }
    if(typeof username !== 'string'){
        throw new Error("Username must be of type string");
    }

    if(typeof password !== 'string'){
        throw new Error("Password must be of type string");
    }

   const userDetails = await db.oneOrNone(userQueries.LOGIN_QUERY, [ username, password ])
   if(!userDetails) throw new Error("Username or Password incorrect");
   const token = jwt.sign(userDetails, config.cookie_secret, { expiresIn: config.cookie_expiration + 's' });
   req.session[userDetails.uuid] = token
   return {userDetails, token};

}



const logout = async (req) => {
    const { body = {} } = req ;
    const { uuid } = body;
    req.session[uuid] = null;
    return true;
}

module.exports = {
    login,
    logout
}
