// Write your "actions" router here!

const express = require('express');

const Actions = require('./actions-model');



const router = express.Router();

router.get('/', (request, response, next) => {
    Actions.get()
        .then(actions => {
            response.json(actions);
        })
        .catch(next);
});

module.exports = router;
