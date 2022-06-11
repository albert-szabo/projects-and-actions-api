// Write your "actions" router here!

const express = require('express');

const Actions = require('./actions-model');

const { validateActionID } = require('./actions-middlware');

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

module.exports = router;
