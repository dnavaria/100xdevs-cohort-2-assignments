const Auth = require('../auth');
// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const token = req.headers?.authorization?.split(' ')[1];
    const isTokenVerified = Auth.verifyJwt(token);
    if (!isTokenVerified) {
        return res.status(401).send("Unauthorized");
    }
    next();
}

module.exports = adminMiddleware;