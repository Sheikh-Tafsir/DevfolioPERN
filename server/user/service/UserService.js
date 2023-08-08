const jwt = require('jsonwebtoken');
const LoginResponse = require('../domain/LoginResponse');
const SignupResponse = require('../domain/SignupResponse');
const PortfolioResponse = require('../domain/PortfolioResponse');
const UserEntity = require("../domain/UserEntity");
const AboutEntity = require('../../about/domain/AboutEntity');
const ProjectEntity = require('../../projects/domain/ProjectEntity');
const ServiceEntity = require('../../services/domain/ServiceEntity');
const UserRepository = require('../repository/UserRepository');
const pool = require('../../db'); // Adjust the path if needed.

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async getUser(portfolioRequest) {
    try {      
      const user = await findByNameWithoutCase(portfolioRequest.name);
      //console.log(portfolioRequest.name);
      if (user) {
        const about = await findAboutById(user.id);
        const service = await findAllServicesById(user.id);
        const projects = await findAllProjectsById(user.id);
        const contacts = await findContactsById(user.id);
        const userEntity = new UserEntity(user.name, user.email, about, service, projects, contacts);
        return new PortfolioResponse("user found", userEntity);
      } 
      else {
        return new PortfolioResponse("user does not exist", null);
      }
    } 
    catch (error) {
      console.error('Error occurred during getUser:', error);
      return new PortfolioResponse(USER_DONT_EXIST.getMessage(), null);
    }
  }

  async signup(signupRequest) {
    try {
      const user = await findByName(signupRequest.name);
      //console.log("email: "+ signupRequest.email);
      if (user == null || user == undefined) {
        const userId = await userAdd(signupRequest.name, signupRequest.email, signupRequest.password);
        return new SignupResponse('Signup successful', generateJwtToken(signupRequest.name, signupRequest.password), userId);
      } 
      else {
        return new SignupResponse('Name already taken', null, null);
      }
    } 
    catch (error) {
      //console.error('Error occurred during signup:', error);
      return new SignupResponse('Error occurred during signup', null, null);
    }
  }

  async login(loginRequest) {
    try {
      // Assuming 'userRepository' has an async method 'findByName' to fetch the user by name
      const user = await findByName(loginRequest.name);
      //console.log("name: " + user.name + " password: " + user.password);
      if (user && user.password === loginRequest.password) {
        return new LoginResponse('Login successful', generateJwtToken(loginRequest.name, loginRequest.password), user.id);
      } 
      else {
        //console.log("User does not exist");
        return new LoginResponse('User does not exist', null, null);
      }
    } 
    catch (error) {
      // Handle any errors that may occur during database queries or token generation
      return new LoginResponse('Error occurred during login', null, null);
    }
  }


}

function generateJwtToken(name, password) {
  // const secretKey = 'your_secret_key'; // Replace with your own secret key
  // const expiresIn = '1h'; // Set the token expiration time, e.g., '1h' for one hour

  // const payload = {
  //   name: name,
  //   password: password,
  //   // You can add additional data to the payload as needed
  // };

  // const token = jwt.sign(payload, secretKey, { expiresIn });

  // return token;
  return "123";
}

async function findByName(name) {
  try {
    const query = 'SELECT * FROM users WHERE name = $1';
    const values = [name];
    const result = await pool.query(query, values);
    if (result.rows.length == 1) {
     // console.log(result.rows[0]);
      return result.rows[0];
    }
    else{
      return null;
    }
  } 
  catch (error) {
    throw error;
  }
}

async function findByNameWithoutCase(name) {
  try {
    const query = 'SELECT * FROM users WHERE name ILIKE $1';
    const values = [`%${name}%`];
    const result = await pool.query(query, values);
    if (result.rows.length == 1) {
     // console.log(result.rows[0]);
      return result.rows[0];
    }
    else{
      return null;
    }
  } 
  catch (error) {
    throw error;
  }
}

async function findAboutById(userid) {
  try {
    const query = 'SELECT * FROM about WHERE user_id = $1';
    const value = [userid];
    const result = await pool.query(query, value);

    const aboutEntities = result.rows.map(row => {
      return new AboutEntity(
        row.user_id,
        row.occupation,
        row.description,
        row.background_image_link,
        row.about_image_link
      );
    });
    return aboutEntities;
  } 
  catch (error) {
    throw error;
  }
}

async function findAllProjectsById(userId) {
  
  try {
    const query = 'SELECT * FROM projects WHERE user_id = $1';
    const value = [userId];
    const result = await pool.query(query, value);

    const projectEntities = result.rows.map(row => {
      return new ProjectEntity(
        row.user_id,
        row.name,
        row.description,
        row.technologies,
        row.category,
        row.live_link,
        row.git_link,
        row.image_link
      );
      
    });
    return projectEntities;
  } 
  catch (error) {
    throw error;
  }
}

async function findAllServicesById(userid) {
  try {
    const query = 'SELECT * FROM service WHERE user_id = $1';
    const values = [userid];
    const result = await pool.query(query, values);
    return result.rows;
  } 
  catch (error) {
    throw error;
  }
}



async function findContactsById(userid) {
  try {
    const query = 'SELECT * FROM contacts WHERE user_id = $1';
    const value = [userid];
    const result = await pool.query(query, value);
    return result.rows;
  } 
  catch (error) {
    throw error;
  }
}

async function userAdd(name,email,password) {
  try {
    const query = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id';
    const values = [name,email,password];
    const result = await pool.query(query, values);
    return result.rows[0].id;
  }
  catch (error) {
    throw error;
  }
}

module.exports = UserService;

  