const Actions = require('./actions-model.js');

const checkActionId = (req, res, next) => {
Actions.get(req.params.id)
.then(action => {
    if(action) {
        req.action = action;
        next();
    } else {
        res.status(404).json({
            message: `action ${req.params.id} not found`
            });
    }
})
.catch(next);
}

const checkActionPayload = (req, res, next) => {
     if(req.body.notes && req.body.description) {
        req.body.notes = req.body.notes.trim();
        req.body.description = req.body.description.trim();
        req.action = req.body;
        next();
    } else {
        res.status(400).json({
            message: 'please provide proper notes and description'
        });
    }

}

module.exports = {
    checkActionId,
    checkActionPayload,
    
}