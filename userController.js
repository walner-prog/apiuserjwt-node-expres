

// Consultar todos los usuarios
const getUsers = () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM users', (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  };
  
  module.exports = {
    getUsers
  };
  
