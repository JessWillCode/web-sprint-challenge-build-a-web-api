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

module.exports = {
    checkProjectId,
}