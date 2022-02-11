const Projects = require('./projects-model.js');

const checkProjectId = (req, res, next) => {
    Projects.get(req.params.id)
    .then(project => {
        if(project) {
            req.project = project;
            next();
        } else {
            res.status(404).json({
                message: `project ${req.params.id} not found`
            });
        }
    })
    .catch(next);
}

const checkProjectPayload = (req, res, next) => {
    if(req.body.name && req.body.description) {
        req.body.name = req.body.name.trim();
        req.body.description = req.body.description.trim();
        req.project = req.body;
        next();
    } else {
        res.status(400).json({
            message: 'please provide a proper name and description'
        });
    }
}

const checkCompletedProject = (req, res, next) => {
    const { completed } = req.body;
  if(completed !== true && completed !== false) {
        res.status(400).json({
        message: 'please provide a completion status'
        });
    } else {
        next();
    }
}
//side note that this is not working in Insomnia, but this logic passes the test for some reason- the test will not work with anything else

module.exports = {
    checkProjectId,
    checkProjectPayload,
    checkCompletedProject
}