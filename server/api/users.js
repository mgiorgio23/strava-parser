const express = require("express");

const router = express.Router();
const { Pool } = require('pg');

// app.use(express.json({limit:'50mb'}));

// Configure the connection pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'strava',
  password: 'stravadb',
  port: 5432, 
});

// router.get('/', (req,res) => {
//     res.send("HERE USer")
// });

router.get('/', async (req, res) => {
    try {
      const result = await pool.query(
        'Select * FROM "Users"'
      ); res.status(200).json(result.rows);
    }
    catch(err) {
      console.error(err.message);
    }
  });

router.post('/', async (req, res) => {

    const { id, refresh } = req.body; // Extract name and email from the request body

    try {
        // Insert the new user into the database
        const result = await pool.query(
        'INSERT INTO "Users" (id, refresh) VALUES ($1, $2) RETURNING *',
        ['asd', 'asf']
        );

        // Respond with the newly created user
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
  

module.exports = router