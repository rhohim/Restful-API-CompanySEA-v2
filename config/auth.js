require('dotenv').config()
const jwt = require('jsonwebtoken');
 
const secretKey = process.env.tokensecret;
const tokeAdmin = process.env.admintoken;
const username = process.env.uname

const authenticateAndAuthorize = (req, res, next) => {
    const authHeader = req.header('Authorization');

    // console.log(authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized Bearer' });
    }

    const token = authHeader.slice(7); 
    const decoded = jwt.decode(token);
    // console.log(token);
    // console.log(tokeAdmin);

    if (token === null || token === 'null') {
        return res.status(403).json({ message: 'Forbidden: Token is null' });
    }
    if(decoded !== null ){
        if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
            return res.status(401).json({ message: 'Unauthorized: Token has expired' });
        }
        try {
            if (decoded.username === username) {
                next();
            } else {
                return res.status(403).json({ message: 'Forbidden' });
            }
        } catch (error) {
            res.status(401).json({ message: 'Unauthorized' });
        }
    } else {
        try {
            if (token === tokeAdmin || token === secretKey) {
                next();
            } else {
                return res.status(403).json({ message: 'Forbidden' });
            }
        } catch {
            res.status(401).json({ message: 'Unauthorized' });
        }
    }

    
};

module.exports = authenticateAndAuthorize;