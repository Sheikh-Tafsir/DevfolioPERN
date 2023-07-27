const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const jsonParser = bodyParser.json();

// Import the necessary response classes and the UserService
const ResponseUtil = require('../../common/domain/ResponseUtil');
const LoginRequest = require('../domain/LoginRequest');
const SignupRequest = require('../domain/SignupRequest');
const PortfolioRequest = require('../domain/PortfolioRequest');

const UserService = require('../service/UserService');
const userService = new UserService();

// POST route for '/portfolio'
router.post('/portfolio', jsonParser, async (req, res) => {
  try {
    const portfolioRequest = new PortfolioRequest(req.body.name);
    const portfolioResponse = await userService.getUser(portfolioRequest);
    const apiResponse = ResponseUtil.createResponse(portfolioResponse.responseMessage, portfolioResponse);
    res.status(200).json(apiResponse);
    //res.status(apiResponse.status).json({ message: apiResponse.body.message, data: apiResponse.body });
  } 
  catch (error) {
    console.error('Error occurred:', error);
    return res.status(500).json({
      status: 'error',
      message: 'An error occurred during processing.',
      data: null,
    });
  }
});

// Endpoint for user login
router.post('/login', jsonParser, async (req, res) => {
  try{
    const loginRequest = new LoginRequest(req.body.name, req.body.password);
    const loginResponse = await userService.login(loginRequest);
    //console.log(loginResponse);
    if (loginResponse.token !== null) {
      const apiResponse = ResponseUtil.createResponse(loginResponse.respMessage, loginResponse);
      res.status(200).json(apiResponse);
    } 
    else {
      const apiResponse = ResponseUtil.createResponse(null, null);
      res.status(401).json(null);
    }
  }
  catch (error) {
    console.error("error: "+ error);
  }
});

// Endpoint for user login
router.post('/signup', jsonParser, async (req, res) => {
  try{
    const signupRequest = new SignupRequest(req.body.name, req.body.email, req.body.password);
    const signupResponse = await userService.signup(signupRequest);
    if (signupResponse.token !== null) {
      const apiResponse = ResponseUtil.createResponse(signupResponse.respMessage, signupResponse);
      res.status(200).json(apiResponse);
    } 
    else {
      const apiResponse = ResponseUtil.createResponse(null, null);
      res.status(401).json(null);
    }
  }
  catch (error) {
    console.error(error);
  }
});


module.exports = router;
