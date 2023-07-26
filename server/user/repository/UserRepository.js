

// Assuming you have already defined the Sequelize instance as 'sequelize'
// and have defined the model for your database table as 'User' with the name attribute.

async function findByName(name) {
    try {
      const query = 'SELECT * FROM users WHERE username = $1';
      const values = [name];
      const result = await pool.query(query, values);
      if (result.rows.length == 1) {
        return result.rows[0];
      }
      else{
        throw error;
      }
    } 
    catch (error) {
      throw error;
    }
}