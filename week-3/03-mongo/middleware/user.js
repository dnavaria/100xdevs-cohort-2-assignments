const User = require('../db').User;
async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const username = req.headers.username;
    const password = req.headers.password;
    if (!username || !password) {
        return res.status(400).send("Username or password missing in headers");
    }
    const queryResult = await User.findOne({ username: username, password: password });
    if (!queryResult) {
        return res.status(401).send("Unauthorized");
    }
    next();
}

module.exports = userMiddleware;