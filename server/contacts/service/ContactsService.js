const ContactsResponse = require('../domain/ContactsResponse');
const ContactsEntity = require('..//domain/ContactsEntity');
const ContactsRepository = require('../repository/ContactsRepository')
const pool = require('../../db'); // Adjust the path if needed.

class ContactsService {
  constructor() {}

  async create(contactsRequest) {
    const contactsEntitySrc = await this.findByUserId(contactsRequest.userId);

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
            await this.save(contactsEntity);
            return new ContactsResponse('CONTACTS_SAVED_SUCCESSFULLY');
        } 
        else {
            contactsEntitySrc.phoneNo = contactsRequest.phoneNo;
            contactsEntitySrc.email = contactsRequest.email;
            contactsEntitySrc.facebookLink = contactsRequest.facebookLink;
            contactsEntitySrc.instagramLink = contactsRequest.instagramLink;
            contactsEntitySrc.githubLink = contactsRequest.githubLink;
            contactsEntitySrc.linkedinLink = contactsRequest.linkedinLink;
            await this.update(contactsEntitySrc);
            return new ContactsResponse('CONTACTS_UPDATED_SUCCESSFULLY');
        }
    } 
    catch (error) {
        console.error('Error while saving object:', error);
        return new ContactsResponse('CONTACTS_SAVED_FAILED');
    }
  }

  async viewPersonal(contactsViewRequest) {
    return this.findByUserId(contactsViewRequest.userId);
  }

  async viewAll() {
    return this.findAll();
  }

  async findByUserId(userId) {
    const query = 'SELECT * FROM contacts WHERE user_id = ?';
    const values = [userId];
    try {
        const result = await pool.query(query, values);
        if (result.rows.length > 0) {
            const contactsEntityData = result.rows[0];
            return new ContactsEntity(
                contactsEntityData.id,
                contactsEntityData.userId,
                contactsEntityData.phoneNo,
                contactsEntityData.email,
                contactsEntityData.facebookLink,
                contactsEntityData.instagramLink,
                contactsEntityData.githubLink,
                contactsEntityData.linkedinLink
            );
        }
        return null;
    } 
    catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }

  async save(contactsEntity) {
    const insertQuery =
      'INSERT INTO contacts (user_id, phoneNo, email, facebookLink, instagramLink, githubLink, linkedinLink) VALUES (?, ?, ?, ?, ?, ?, ?)';
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

async update(contactsEntity) {
    const updateQuery =
      'UPDATE contacts SET phoneNo = ?, email = ?, facebookLink = ?, instagramLink = ?, githubLink = ?, linkedinLink = ? WHERE user_id = ?';

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

async findAll() {
    const query = 'SELECT * FROM contacts';
    try {
        const result = await pool.query(query);
        const contactsEntities = result.rows.map((row) => {
            return new ContactsEntity(
                row.id,
                row.user_id,
                row.phoneNo,
                row.email,
                row.facebookLink,
                row.instagramLink,
                row.githubLink,
                row.linkedinLink
            );
        });
        return contactsEntities;
    } 
    catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
  }
}

module.exports = ContactsService;
