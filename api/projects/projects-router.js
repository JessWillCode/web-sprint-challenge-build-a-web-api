const router = require('express').Router();
const { checkProjectId, checkProjectPayload } = require('./projects-middleware')
const Projects = require('./projects-model.js');

router.get('/', (req, res, next) => {
    Projects.get()
    .then(projects =>{
        res.status(200).json(projects);
    })
    .catch(next);
});

router.get('/:id', checkProjectId, (req, res, next) => {
    res.json(req.project);
});

router.post('/', checkProjectPayload, (req, res, next) => {
    Projects.insert(req.project)
    .then(project => {
        res.status(201).json(project);
    })
    .catch(next);
});

router.put('/:id', (req, res, next) => {

});

router.delete('/:id', (req, res, next) => {

});

router.get('/:id/actions', (req, res, next) => {

});

module.exports = router;