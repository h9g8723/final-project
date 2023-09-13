// Client client_routes.js
const express = require('express');
const axios = require('axios');
const client = express.Router();

client.get('/', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:5000');
        return res.status(200).json(response.data);
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error });
    }
});

client.post('/register', async (req, res) => {
    try {
        const response = await axios.post('http://localhost:5000/register', req.body);
        return res.status(201).json(response.data);
    } catch (error) {
        return res.status(500).json({ message: 'Registration failed', error });
    }
});

client.post('/login', async (req, res) => {
    try {
        const response = await axios.post('http://localhost:5000/login', req.body);
        return res.status(200).json(response.data);
    } catch (error) {
        return res.status(500).json({ message: 'Login failed', error });
    }
});

client.put('/auth/review/:isbn', async (req, res) => {
    try {
        const response = await axios.put(`http://localhost:5000/auth/review/${req.params.isbn}`, req.body);
        return res.status(200).json(response.data);
    } catch (error) {
        return res.status(500).json({ message: 'Failed to add review', error });
    }
});

client.delete('/auth/review/:isbn', async (req, res) => {
    try {
        const response = await axios.delete(`http://localhost:5000/auth/review/${req.params.isbn}`);
        return res.status(200).json(response.data);
    } catch (error) {
        return res.status(500).json({ message: 'Failed to delete review', error });
    }
});

client.get('/isbn/:isbn', async (req, res) => {
    try {
        const response = await axios.get(`http://localhost:5000/isbn/${req.params.isbn}`);
        return res.status(200).json(response.data);
    } catch (error) {
        return res.status(500).json({ message: 'Failed to get book by ISBN', error });
    }
});

client.get('/author/:author', async (req, res) => {
    try {
        const response = await axios.get(`http://localhost:5000/author/${req.params.author}`);
        return res.status(200).json(response.data);
    } catch (error) {
        return res.status(500).json({ message: 'Failed to get book by author', error });
    }
});

client.get('/title/:title', async (req, res) => {
    try {
        const response = await axios.get(`http://localhost:5000/title/${req.params.title}`);
        return res.status(200).json(response.data);
    } catch (error) {
        return res.status(500).json({ message: 'Failed to get book by title', error });
    }
});

module.exports.client = client;
