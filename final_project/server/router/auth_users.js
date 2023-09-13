// Server router/auth_users.js
const express = require('express');
const jwt = require('jsonwebtoken');
let books = require('./booksdb.js');
const regd_users = express.Router();

const SECRET_KEY = 'your_secret_key_here';

let users = [];

const isValid = (username) => {
    return users.some((user) => user.username === username);
};

const authenticatedUser = (username, password) => {
    return users.some((user) => user.username === username && user.password === password);
};

// Registered users can login
regd_users.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (authenticatedUser(username, password)) {
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
        return res.status(200).json({ token });
    }
    return res.status(401).json({ message: 'Invalid credentials' });
});

// Add a book review
regd_users.put('/auth/review/:isbn', (req, res) => {
    const { review } = req.body;
    const { isbn } = req.params;
    const username = req.user;

    if (books[isbn]) {
        books[isbn].reviews[username] = review;
        return res.status(200).json({ message: 'Review added successfully' });
    }
    return res.status(404).json({ message: 'Book not found' });
});

// Remove a book review
regd_users.delete('/auth/review/:isbn', (req, res) => {
    const { isbn } = req.params;
    const username = req.user;
    if (books[isbn] && books[isbn].reviews[username]) {
        delete books[isbn].reviews[username];
        return res.status(200).json({ message: 'Review deleted successfully' });
    }
    return res.status(404).json({ message: 'Review not found' });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
