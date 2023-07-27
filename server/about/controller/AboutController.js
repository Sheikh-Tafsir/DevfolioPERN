const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const jsonParser = bodyParser.json();

// Assuming you have imported necessary modules and set up the server with Express
const ResponseUtil = require('../../common/domain/ResponseUtil');
const AboutRequest = require('../domain/AboutRequest');
const AboutViewRequest = require('../domain/AboutViewRequest');

const AboutService = require('../service/AboutService');
const aboutService = new AboutService();

    // POST /create - Create a new about record
    router.post('/create', jsonParser, async (req, res) => {
        try {
            const aboutRequest = new AboutRequest(req.body.userId, req.body.occupation, req.body.description, req.body.backgroundImageLink, req.body.aboutImageLink);
            const aboutResponse = await aboutService.create(aboutRequest);
            const apiResponse = ResponseUtil.createResponse(aboutResponse.respMessage, aboutResponse);
            res.status(200).json(apiResponse);
        } 
        catch (error) {
            console.error('Error while creating about record:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    // POST /viewpersonal - View personal about record based on user ID
    router.post('/viewpersonal', jsonParser, async (req, res) => {
        try {
            const aboutViewRequest = new AboutViewRequest(req.body.userId);
            const aboutEntity = await aboutService.viewPersonal(aboutViewRequest);
            res.status(200).json(aboutEntity);
        }
        catch (error) {
            console.error('Error while viewing personal about record:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
   

    // GET /viewall - View all about records
    router.get('/viewall',jsonParser, async (req, res) => {
        try {
            const allAbout = await aboutService.viewAll();
            return res.status(200).json(allAbout);
        } 
        catch (error) {
            console.error('Error while viewing all about:', error);
            return res.status(500).json({ message: 'Error while viewing all about' });
        }
    });

module.exports = router;