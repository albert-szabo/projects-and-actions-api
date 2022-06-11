// add middlewares here related to projects

const Projects = require('../projects/projects-model');

async function validateProjectID(request, response, next) {
    const project = await Projects.get(request.params.id);
    if(!project) {
        next({ status: 404, message: 'That project was not found.' });
    } else {
        request.project = project;
        next();
    }
}

module.exports = { validateProjectID };