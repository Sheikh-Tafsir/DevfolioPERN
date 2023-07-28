const ContactsResponse = require('../domain/ContactsResponse');
const ContactsEntity = require('..//domain/ContactsEntity');
const ContactsRepository = require('../repository/ContactsRepository')
const pool = require('../../db'); // Adjust the path if needed.

class ContactsService {
    constructor(contactsRepository) {
        this.contactsRepository = contactsRepository;
    }

    async create(contactsRequest) {
        const contactsEntitySrc = await findByUserId(contactsRequest.userId);

        try {
            if (!contactsEntitySrc) {
                const contactsEntity = new ContactsEntity(
                contactsRequest.userId,
                contactsRequest.phoneNo,
                contactsRequest.email,
                contactsRequest.facebookLink,
                contactsRequest.instagramLink,
                contactsRequest.githubLink,
                contactsRequest.linkedinLink
                );
                await save(contactsEntity);
                return new ContactsResponse('CONTACTS_SAVED_SUCCESSFULLY');
            } 
            else {
                contactsEntitySrc.phoneNo = contactsRequest.phoneNo;
                contactsEntitySrc.email = contactsRequest.email;
                contactsEntitySrc.facebookLink = contactsRequest.facebookLink;
                contactsEntitySrc.instagramLink = contactsRequest.instagramLink;
                contactsEntitySrc.githubLink = contactsRequest.githubLink;
                contactsEntitySrc.linkedinLink = contactsRequest.linkedinLink;
                await update(contactsEntitySrc);
                return new ContactsResponse('CONTACTS_UPDATED_SUCCESSFULLY');
            }
        } 
        catch (error) {
            console.error('Error while saving object:', error);
            return new ContactsResponse('CONTACTS_SAVED_FAILED');
        }
    }

    async viewPersonal(contactsViewRequest) {
        const abc = await findByUserId(contactsViewRequest.userId);
        // console.log("in service");
        // console.log(abc);
        return abc;
    }

    async viewAll() {
        return findAll();
    }
}

async function findByUserId(userId) {
    const query = 'SELECT * FROM contacts WHERE user_id = $1';
    const values = [userId];
    try {
        const result = await pool.query(query, values);
        if (result.rows.length > 0) {
            const contactsEntityData = result.rows[0];
            return new ContactsEntity(
                contactsEntityData.id,
                contactsEntityData.user_id,
                contactsEntityData.phone_no,
                contactsEntityData.email,
                contactsEntityData.facebook_link,
                contactsEntityData.instagram_link,
                contactsEntityData.github_link,
                contactsEntityData.linkedin_link
            );
        }
        return null;
    } 
    catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
}

async function save(contactsEntity) {
    const insertQuery = 'INSERT INTO contacts (user_id, phone_no, email, facebook_link, instagram_link, github_link, linkedin_link) VALUES ($1, $2, $3, $4, $5, $6, $7)';
    const insertValues = [
      contactsEntity.userId,
      contactsEntity.phoneNo,
      contactsEntity.email,
      contactsEntity.facebookLink,
      contactsEntity.instagramLink,
      contactsEntity.githubLink,
      contactsEntity.linkedinLink
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

async function update(contactsEntity) {
    const updateQuery = 'UPDATE contacts SET phone_no = $1, email = $2, facebook_link = $3, instagram_link = $4, github_link = $5, linkedin_link = $6 WHERE user_id = $7';

    const updateValues = [
      contactsEntity.phoneNo,
      contactsEntity.email,
      contactsEntity.facebookLink,
      contactsEntity.instagramLink,
      contactsEntity.githubLink,
      contactsEntity.linkedinLink,
      contactsEntity.userId
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
    const query = 'SELECT * FROM contacts';
    try {
        const result = await pool.query(query);
        const contactsEntities = result.rows.map((row) => {
            return new ContactsEntity(
                row.id,
                row.user_id,
                row.phone_no,
                row.email,
                row.facebook_link,
                row.instagram_link,
                row.github_link,
                row.linkedin_link
            );
        });
        return contactsEntities;
    } 
    catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
  }

module.exports = ContactsService;
