const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const projectsRouter = require('./projects/projects-router.js');
const actionsRouter = require('./actions/actions-router.js');

const server = express();

server.use(express.json());
server.use(morgan('tiny'))
server.use(cors());

server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

server.use('*', (req,res) => {
    res.status(500).json({
        message: `[${req.method}]: ${req.baseUrl} not found!`
    });
})

module.exports = server;
