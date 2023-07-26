const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const jsonParser = bodyParser.json();

// Import the necessary response classes and the UserService
const UserService = require('../service/UserService');
const LoginRequest = require('../domain/LoginRequest');
const SignupRequest = require('../domain/SignupRequest');
const PortfolioRequest = require('../domain/PortfolioRequest');

const userService = new UserService();

// POST route for '/portfolio'
router.post('/portfolio', jsonParser, async (req, res) => {
  try {
    const portfolioRequest = new PortfolioRequest(req.body.name);
    const portfolioResponse = await userService.getUser(portfolioRequest);
    res.json(portfolioResponse);
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
    res.json(loginResponse);
  }
  catch (error) {
    console.error(error);
  }
});

// Endpoint for user login
router.post('/signup', jsonParser, async (req, res) => {
  try{
    const signupRequest = new SignupRequest(req.body.name, req.body.email, req.body.password);
    const signupResponse = await userService.signup(signupRequest);
    res.json(signupResponse);
  }
  catch (error) {
    console.error(error);
  }
});


module.exports = router;
