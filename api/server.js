const express = require('express');
const server = express();

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

server.use(express.json());



server.use('/', (request, response) => {
    response.send('<h1>Test</h1>');
});

server.use('*', (request, response) => {
    response.status(404).json({ message: `That ${request.method} request could not be completed because the URL ${request.baseUrl} was not found.` });
});

server.use((error, request, response, next) => {
    response.status(error.status || 500).json({ message: error.message || 'An internal server error occurred.' });
});

module.exports = server;
