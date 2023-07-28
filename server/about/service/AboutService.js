const AboutResponse = require('../domain/AboutResponse');
const AboutEntity = require('../../about/domain/AboutEntity');
const AboutRepository = require('../repository/AboutRepository')
const pool = require('../../db'); // Adjust the path if needed.

class AboutService {
    constructor(aboutRepository) {
      //this.aboutRepository = new AboutRepository();
      this.aboutRepository = aboutRepository;
    }
  
    async create(aboutRequest) {
      const aboutEntitySrc = await findByUserId(aboutRequest.userId);
  
      try {
        if (!aboutEntitySrc) {
          const aboutEntity = new AboutEntity(
            aboutRequest.userId,
            aboutRequest.occupation,
            aboutRequest.description,
            aboutRequest.backgroundImageLink,
            aboutRequest.aboutImageLink
          );
          await save(aboutEntity);
          return new AboutResponse('ABOUT_SAVED_SUCCESSFULLY');
        } 
        else {
          aboutEntitySrc.occupation = aboutRequest.occupation;
          aboutEntitySrc.description = aboutRequest.description;
          aboutEntitySrc.backgroundImageLink = aboutRequest.backgroundImageLink;
          aboutEntitySrc.aboutImageLink = aboutRequest.aboutImageLink;
          await update(aboutEntitySrc);
          return new AboutResponse('ABOUT_UPDATED_SUCCESSFULLY');
        }
      } 
      catch (error) {
        console.error('Error while saving object:', error);
        return new AboutResponse('ABOUT_SAVED_FAILED');
      }
    }
  
    async viewPersonal(aboutViewRequest) {
        return findByUserId(aboutViewRequest.userId);
    }
  
    async viewAll() {
        return findAll();
    }
}
  
async function findByUserId(userId) {
    const query = 'SELECT * FROM about WHERE user_id = $1';
    const values = [userId];
    try {
        const result = await pool.query(query, values);
        if (result.rows.length > 0) {
            const aboutEntities = result.rows[0];
            return new AboutEntity(
                aboutEntities.id, 
                aboutEntities.user_id, 
                aboutEntities.occupation, 
                aboutEntities.description, 
                aboutEntities.background_image_link, 
                aboutEntities.about_image_link
            );
        }
        return null;
    } 
    catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
}

async function save(aboutEntity) {
    const insertQuery = 'INSERT INTO about (user_id, occupation, description, background_image_link, about_image_link) VALUES ($1, $2, $3, $4, $5)';
      const insertValues = [
        aboutEntity.userId,
        aboutEntity.occupation,
        aboutEntity.description,
        aboutEntity.backgroundImageLink,
        aboutEntity.aboutImageLink
    ];
    try {
        await pool.query(insertQuery, insertValues);
        console.log('Record inserted successfully.');
    } 
    catch (error) {
        console.error('Error executing insert query:', error);
        throw error;
    }
}
async function update(aboutEntity) {
    const updateQuery = 'UPDATE about SET occupation = $1, description = $2, background_image_link = $3, about_image_link = $4 WHERE user_id = $5';

    const updateValues = [
        aboutEntity.occupation,
        aboutEntity.description,
        aboutEntity.backgroundImageLink,
        aboutEntity.aboutImageLink,
        aboutEntity.userId
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

async function findAll() {
    const query = 'SELECT * FROM about';
    try {
        const result = await pool.query(query);
        const aboutEntities = result.rows.map(row => {
            return new AboutEntity(
                row.id, 
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
        console.error('Error executing query:', error);
        throw error;
    }
}

module.exports = AboutService;