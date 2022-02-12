const router = require('express').Router();
const { checkActionId, checkActionPayload, } = require('./actions-middlware.js');
const Actions = require('./actions-model.js');

router.get('/', (req, res, next) => {
    Actions.get()
    .then(actions => {
        res.status(200).json(actions);
    })
    .catch(next);
});

router.get('/:id', checkActionId, (req, res, next) => {
    res.json(req.action);
});

router.post('/', checkActionPayload, (req, res, next) => {
    Actions.insert(req.action)
    .then(action => {
        res.status(200).json(action);
    })
    .catch(next);

});

router.put('/:id', checkActionId, checkActionPayload, (req, res, next) => {
    Actions.update(req.params.id, req.body)
    .then(action => {
        res.status(200).json(action);
    })
    .catch(next);
});

router.delete('/:id', checkActionId, async (req, res, next) => {
    try {
        const deletedAction = await Actions.get(req.params.id);
        if(!deletedAction) {
            next();
        } else {
            await Actions.remove(req.params.id);
            res.json(deletedAction);
        }

    } catch (err) {
        next();
    }

});


module.exports = router;





