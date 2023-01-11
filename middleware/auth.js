const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../.env' });

module.exports = (req, res, next) => {
    //try {
        const token = req.headers.authorization.split(' ')[1];
        console.log("token is: ", process.env.JWT_TOKEN_SECRET );
        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET );
        const now = Date.now() / 1000;
        if (decodedToken.exp < now) {
            throw 'Please provid a valid token!' 
        }
        else {
            next();
        } 
    /*} catch {
        res.status(401).json({ 
            Error: 'User is not authorized, Please provid a valid token!' });
    }*/
};