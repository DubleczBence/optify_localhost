const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost', 
  user: process.env.DB_USER || 'rootee',      
  password: process.env.DB_PASSWORD || 'jelszo',      
  database: process.env.DB_NAME || 'survey_app', 
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  } else {
    console.log('Connected to the MySQL database.');
  }
});

module.exports = db;