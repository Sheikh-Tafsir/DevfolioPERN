const ServiceResponse = require('../domain/ServiceResponse');
const ServiceEntity = require('../domain/ServiceEntity');
//const ProjectRepository = require('../repository/ProjectRepository')
const pool = require('../../db'); // Adjust the path if needed.

class ServiceService {
    constructor(serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    async create(serviceRequest) {  
        // console.log("in service");
        // console.log(projectsRequest);
        try {
            const serviceEntity = new ServiceEntity(
                serviceRequest.userId,
                serviceRequest.name,
                serviceRequest.description,
            );
      
            await save(serviceEntity);
            return new ServiceResponse('PROJECTS_SAVED_SUCCESSFULLY');
        } 
        catch (error) {
            console.error('Error while saving object:', error);
            return new ProjectsResponse('PROJECTS_SAVED_FAILED');
        }
    }
}


async function save(serviceEntity) {
    // console.log("in sql fun");
    // console.log(projectEntity);
    const insertQuery = 'INSERT INTO service (user_id, name, description) VALUES ($1, $2, $3) RETURNING id';
    const insertValues = [
        serviceEntity.userId,
        serviceEntity.name,
        serviceEntity.description,
    ];
  
    try {
      await pool.query(insertQuery, insertValues);
      console.log('Record inserted successfully.');
    } catch (error) {
      console.error('Error executing insert query:', error);
      throw error;
    }
}

async function update(projectEntity) {
    const updateQuery =
      'UPDATE service SET name = $1, description = $2 WHERE user_id = $8';
    const updateValues = [
        serviceEntity.name,
        serviceEntity.description,
        serviceEntity.userId,
    ];
  
    try {
      await pool.query(updateQuery, updateValues);
      console.log('Record updated successfully.');
    } 
    catch (error) {
      console.error('Error executing update query:', error);
      throw error;
    }
}
  
  
  

module.exports = ServiceService;