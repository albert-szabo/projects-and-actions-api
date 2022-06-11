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

function validateProject(request, response, next) {
    const { name, description } = request.body;
    if (!name || !name.trim() || !description || !description.trim()) {
        next({ status: 400, message: 'Please provide both a name and a description.' });
    } else {
        request.name = name.trim();
        request.description = description.trim();
        next();
    }
}

function validateProjectWithCompletion(request, response, next) {
    const { name, description, completed } = request.body;
    if (!name || !name.trim() || !description || !description.trim() || completed === null || completed === undefined) {
        next({ status: 400, message: 'Please provide a name, a description, and a completion status.' });
    } else {
        request.name = name.trim();
        request.description = description.trim();
        request.completed = completed;
        next();
    }
}

module.exports = { validateProjectID, validateProject, validateProjectWithCompletion };