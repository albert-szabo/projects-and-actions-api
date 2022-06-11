// Write your "projects" router here!

const express = require('express');

const Projects = require('./projects-model');

const { validateProjectID, validateProject } = require('./projects-middleware');

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

router.post('/', validateProject, (request, response, next) => {
    const projectToAdd = { name: request.name, description: request.description, completed: true };
    Projects.insert(projectToAdd)
        .then(newProject => {
            response.status(201).json(newProject);
        })
        .catch(next);
});

module.exports = router;