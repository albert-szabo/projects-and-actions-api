const express = require('express');

const server = express();

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

const projectsRouter = require('./projects/projects-router');
const actionsRouter = require('./actions/actions-router');

server.use(express.json());

server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

server.get('/', (request, response) => {
    response.send('<h1>Test</h1>');
});

server.use('*', (request, response) => {
    response.status(404).json({ message: `That ${request.method} request could not be completed because the path ${request.baseUrl} was not found.` });
});

server.use((error, request, response, next) => {
    response.status(error.status || 500).json({ message: error.message || 'An internal server error occurred.' });
});

module.exports = server;
