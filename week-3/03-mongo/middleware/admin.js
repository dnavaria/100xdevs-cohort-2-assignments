const Admin = require('../db').Admin;

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const username = req.headers.username;
    const password = req.headers.password;
    if (!username || !password) {
        return res.status(400).send("Username or password missing in headers");
    }
    const queryResult = await Admin.findOne({ username: username, password: password });
    if (!queryResult) {
        return res.status(401).send("Unauthorized");
    }
    next();
}

module.exports = adminMiddleware;