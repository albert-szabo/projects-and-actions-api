// add middlewares here related to actions

const Actions = require('./actions-model');

async function validateActionID(request, response, next) {
    const action = await Actions.get(request.params.id);
    if(!action) {
        next({ status: 404, message: 'That action was not found.' });
    } else {
        request.action = action;
        next();
    }
}

function validateAction(request, response, next) {
    const { project_id, description, notes } = request.body;
    if (!project_id || !description || !description.trim() || !notes || !notes.trim()) {
        next({ status: 400, message: 'Please provide both a project ID, a description, and some notes.' });
    } else {
        request.projectID = project_id;
        request.description = description.trim();
        request.notes = notes.trim();
        next();
    }
}

module.exports = { validateActionID, validateAction };