const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'course_management',
  password: 'password',
  port: 5432,
});

module.exports = pool;
