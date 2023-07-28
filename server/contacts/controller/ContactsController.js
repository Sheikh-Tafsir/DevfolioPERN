const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const jsonParser = bodyParser.json();

// Assuming you have imported necessary modules and set up the server with Express
const ResponseUtil = require('../../common/domain/ResponseUtil');
const ContactsRequest = require('../domain/ContactsRequest');
const ContactsViewRequest = require('../domain/ContactsViewRequest');

const ContactsService = require('../service/ContactsService');
const contactsService = new ContactsService();

router.post('/create', jsonParser, async(req, res) => {
    try {
        const contactsRequest = req.body;
        const contactsResponse = await contactsService.create(contactsRequest);
        const apiResponse = ResponseUtil.createResponse(contactsResponse.respMessage, contactsResponse);
        res.status(200).json(apiResponse);
    } 
    catch (error) {
        console.error('Error while creating contacts record:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
  
router.post('/viewpersonal', jsonParser, async(req, res) => {
    try {
        const contactsViewRequest = new ContactsViewRequest(req.body.userId);
        const contactsEntity = await contactsService.viewPersonal(contactsViewRequest);
        res.status(200).json(contactsEntity);
    }
    catch (error) {
        console.error('Error while viewing personal contacts record:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
  
router.get('/viewall', jsonParser, async(req, res) => {
    try{
        const contactsList = await contactsService.viewAll();
        return res.status(200).json(contactsList);
    } 
    catch (error) {
        console.error('Error while viewing all contacts:', error);
        return res.status(500).json({ message: 'Error while viewing all contacts' });
    }
});

module.exports = router;