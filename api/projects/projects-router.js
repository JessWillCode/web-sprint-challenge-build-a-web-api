const router = require('express').Router();
const { checkProjectId, checkProjectPayload, checkCompletedProject } = require('./projects-middleware')
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

router.put('/:id',checkProjectId, checkProjectPayload, checkCompletedProject, (req, res, next) => {
    Projects.update(req.params.id, req.body)
    .then(project => {
        res.status(200).json(project);
    })
    .catch(next);
});

router.delete('/:id', checkProjectId, async (req, res, next) => {
    try {
        const deletedProject = await Projects.get(req.params.id);
        if(!deletedProject) {
            next();
        } else {
            await Projects.remove(req.params.id);
            res.json(deletedProject);
        }

    } catch (err) {
        next();
    }
});

router.get('/:id/actions', checkProjectId, (req, res, next) => {
    Projects.getProjectActions(req.params.id)
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(next);
});

module.exports = router;