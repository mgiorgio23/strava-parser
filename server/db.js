const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'strava',
  password: 'stravadb',
  port: 5432, 
});

module.exports = pool;