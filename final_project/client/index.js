// Client index.js
const express = require('express');
const client_routes = require('./router/client_routes.js').client;

const app = express();

app.use(express.json());

app.use('/', client_routes);

const PORT = 5001;

app.listen(PORT, () => console.log(`Client is running on port ${PORT}`));
