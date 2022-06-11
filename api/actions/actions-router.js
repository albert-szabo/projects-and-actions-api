// Write your "actions" router here!

const express = require('express');

const Actions = require('./actions-model');

const { validateActionID, validateAction, validateActionWithCompletion } = require('./actions-middlware');

const router = express.Router();

router.get('/', (request, response, next) => {
    Actions.get()
        .then(actions => {
            response.json(actions);
        })
        .catch(next);
});

router.get('/:id', validateActionID, (request, response) => {
    response.json(request.action);
});

router.post('/', validateAction, (request, response, next) => {
    const actionToAdd = { project_id: request.projectID, description: request.description, notes: request.notes };
    Actions.insert(actionToAdd)
        .then(newAction => {
            response.status(201).json(newAction);
        })
        .catch(next);
});

router.put('/:id', validateActionID, validateActionWithCompletion, (request, response, next) => {
    const actionToUpdate = { project_id: request.projectID, description: request.description, notes: request.notes, completed: request.completed };
    Actions.update(request.params.id, actionToUpdate)
        .then(updatedAction => {
            response.json(updatedAction);
        })
        .catch(next);
});

module.exports = router;
