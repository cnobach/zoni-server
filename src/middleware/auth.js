const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    const header = req.headers.authorization;
    if(!header) {
        return res.status(401).json({ error: 'Invalid/Expired Token. Please log in again.' });
    }
    
    const token = header.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid/Expired Token. Please log in again.' });
    }
}

module.exports = authMiddleware;