// Server index.js
const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const SECRET_KEY = 'your_secret_key_here';

const app = express();

app.use(express.json());

app.use('/customer', session({ secret: 'fingerprint_customer', resave: true, saveUninitialized: true }));

app.use('/customer/auth/*', function auth(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Authorization token missing' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded.username;
        next();
    } catch (e) {
        return res.status(401).json({ message: 'Invalid token' });
    }
});

app.use('/customer', customer_routes);
app.use('/', genl_routes);

const PORT = 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
