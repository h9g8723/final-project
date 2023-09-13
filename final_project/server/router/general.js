// Server router/general.js
const express = require('express');
let books = require('./booksdb.js');
let isValid = require('./auth_users.js').isValid;
let users = require('./auth_users.js').users;
const public_users = express.Router();

public_users.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (isValid(username)) {
        return res.status(409).json({ message: 'Username already exists' });
    }
    users.push({ username, password });
    return res.status(201).json({ message: 'User registered successfully' });
});

public_users.get('/', (req, res) => {
    return res.status(200).json(books);
});

public_users.get('/isbn/:isbn', (req, res) => {
    const { isbn } = req.params;
    const book = books[isbn];
    if (book) {
        return res.status(200).json(book);
    }
    return res.status(404).json({ message: 'Book not found' });
});

public_users.get('/author/:author', (req, res) => {
    const { author } = req.params;
    const foundBooks = Object.values(books).filter((book) => book.author === author);
    if (foundBooks.length > 0) {
        return res.status(200).json(foundBooks);
    }
    return res.status(404).json({ message: 'Books not found' });
});

public_users.get('/title/:title', (req, res) => {
    const { title } = req.params;
    const foundBooks = Object.values(books).filter((book) => book.title === title);
    if (foundBooks.length > 0) {
        return res.status(200).json(foundBooks);
    }
    return res.status(404).json({ message: 'Books not found' });
});

public_users.get('/isbn/:isbn/reviews', (req, res) => {
    const { isbn } = req.params;
    const book = books[isbn];
    if (book && book.reviews) {
        return res.status(200).json(book.reviews);
    }
    return res.status(404).json({ message: 'Reviews not found' });
});

module.exports.general = public_users;
