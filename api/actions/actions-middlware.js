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

module.exports = { validateActionID };