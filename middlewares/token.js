const jwt = require('jsonwebtoken');

const path = require('path');
const fs = require('fs');
const pathToKey = path.join(__dirname, '..', 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');

// require('dotenv').config();

module.exports = {
    issueUserToken: (user) => {
        // const SECRET = process.env.SECRET;
        const payload = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        const expiresIn = '1d';
        const token = jwt.sign(payload, PRIV_KEY, { expiresIn, algorithm: 'PS512' });

        return {
            token: 'Bearer ' + token,
            expiresIn: '1d'
        }
    }
}