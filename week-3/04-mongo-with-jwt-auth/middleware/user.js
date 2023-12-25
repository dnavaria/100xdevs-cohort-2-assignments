const Auth = require('../auth');

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const token = req.headers?.authorization?.split(' ')[1];
    const isTokenVerified = Auth.verifyJwt(token);
    if (!isTokenVerified) {
        return res.status(401).send("Unauthorized");
    }
    next();
}

module.exports = userMiddleware;