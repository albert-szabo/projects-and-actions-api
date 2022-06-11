// Write your "projects" router here!

const express = require('express');

const Projects = require('./projects-model');

const router = express.Router();

router.get('/', (request, response, next) => {
    Projects.get()
        .then(projects => {
            response.json(projects);
        })
        .catch(next);
});

module.exports = router;