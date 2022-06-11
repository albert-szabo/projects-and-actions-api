// Write your "projects" router here!

const express = require('express');

const Projects = require('./projects-model');

const { validateProjectID } = require('./projects-middleware');

const router = express.Router();

router.get('/', (request, response, next) => {
    Projects.get()
        .then(projects => {
            response.json(projects);
        })
        .catch(next);
});

router.get('/:id', validateProjectID, (request, response) => {
    response.json(request.project);
});

module.exports = router;