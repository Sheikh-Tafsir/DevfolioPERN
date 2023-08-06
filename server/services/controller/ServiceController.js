const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const jsonParser = bodyParser.json();

// Assuming you have imported necessary modules and set up the server with Express
const ResponseUtil = require('../../common/domain/ResponseUtil');
const ServiceRequest = require('../domain/ServiceRequest');

const ServiceService = require('../service/ServiceService');
const serviceService = new ServiceService();

router.post('/create', jsonParser, async(req, res) => {
    console.log("yes");
    try {
        const serviceRequest = req.body;
        const serviceResponse = await serviceService.create(serviceRequest);
        const apiResponse = ResponseUtil.createResponse(serviceResponse.respMessage, serviceResponse);
        res.status(200).json(apiResponse);
    } 
    catch (error) {
        console.error('Error while creating services record:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;