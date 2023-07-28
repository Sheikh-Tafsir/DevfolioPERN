const ProjectResponse = require('../domain/ProjectResponse');
const ProjectEntity = require('../domain/ProjectEntity');
//const ProjectRepository = require('../repository/ProjectRepository')
const pool = require('../../db'); // Adjust the path if needed.

class ProjectService {
    constructor(projectRepository) {
        this.projectRepository = projectRepository;
    }

    async create(projectsRequest) {  
        // console.log("in service");
        // console.log(projectsRequest);
        try {
            const projectEntity = new ProjectEntity(
              projectsRequest.userId,
              projectsRequest.name,
              projectsRequest.description,
              projectsRequest.technologies,
              projectsRequest.category,
              projectsRequest.liveLink,
              projectsRequest.gitLink,
              projectsRequest.imageLink,
            );
      
            await save(projectEntity);
            return new ProjectResponse('PROJECTS_SAVED_SUCCESSFULLY');
        } 
        catch (error) {
            console.error('Error while saving object:', error);
            return new ProjectsResponse('PROJECTS_SAVED_FAILED');
        }
    }
}


async function save(projectEntity) {
    // console.log("in sql fun");
    // console.log(projectEntity);
    const insertQuery = 'INSERT INTO projects (user_id, name, description, technologies, category, live_link, git_link, image_link) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id';
    const insertValues = [
      projectEntity.userId,
      projectEntity.name,
      projectEntity.description,
      projectEntity.technologies,
      projectEntity.category,
      projectEntity.liveLink,
      projectEntity.gitLink,
      projectEntity.imageLink,
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
      'UPDATE projects SET name = $1, description = $2, technologies = $3, category = $4, live_link = $5, git_link = $6, image_link = $7 WHERE user_id = $8';
    const updateValues = [
      projectEntity.name,
      projectEntity.description,
      projectEntity.technologies,
      projectEntity.category,
      projectEntity.liveLink,
      projectEntity.gitLink,
      projectEntity.imageLink,
      projectEntity.userId,
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
  
  
  

module.exports = ProjectService;