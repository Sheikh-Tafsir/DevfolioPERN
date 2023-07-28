const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const jsonParser = bodyParser.json();

// Assuming you have imported necessary modules and set up the server with Express
const ResponseUtil = require('../../common/domain/ResponseUtil');
const ProjectRequest = require('../domain/ProjectRequest');

const ProjectService = require('../service/ProjectService');
const projectService = new ProjectService();

router.post('/create', jsonParser, async(req, res) => {
    try {
        const projectRequest = req.body;
        const projectResponse = await projectService.create(projectRequest);
        const apiResponse = ResponseUtil.createResponse(projectResponse.respMessage, projectResponse);
        res.status(200).json(apiResponse);
    } 
    catch (error) {
        console.error('Error while creating projects record:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;