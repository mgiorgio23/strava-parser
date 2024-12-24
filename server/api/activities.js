const express = require("express");

const router = express.Router();
const pool = require('../db');

router.options('/', (req, res) => {
  console.log("IN OPTIONS");
    res.set('Access-Control-Allow-Origin', '*'); // Adjust as needed
    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(204); // No Content
  });

router.post('/', async (req, res) => {
    const client = await pool.connect();
    console.log(req.body.length)
    try {
      await client.query('BEGIN');
  
      for (const activity of req.body) {
        const { id,
          athlete,
          athlete_count,
          average_heartrate,
          distance,
          elapsed_time,
          kudos_count,
          max_heartrate,
          name,
          start_date,
          total_elevation_gain,
          total_photo_count,
          type
        } = activity; // Extract relevant info from body
        
        await client.query(
          `
          INSERT INTO "Activities" (
            id,
            athlete_id,
            athlete_count,
            average_heartrate,
            distance,
            elapsed_time,
            kudos_count,
            max_heartrate,
            name,
            start_date,
            total_elevation_gain,
            total_photo_count,
            type
          ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13
          ) ON CONFLICT (id) DO NOTHING;
          `,
          [
            id,
            athlete.id,
            athlete_count,
            average_heartrate,
            distance,
            elapsed_time,
            kudos_count,
            max_heartrate,
            name,
            start_date,
            total_elevation_gain,
            total_photo_count,
            type
          ]
        );
      }
      await client.query('COMMIT');
      res.status(200).send("Data Saved")
    } catch (err) {
      await client.query('ROLLBACK');
      console.error(err.message);
      res.status(500).send('Server Error');
    } finally {
      console.log("Data Saved")
      // res.status(200).send(JSON.stringify('Data Saved'))
      client.release();
    }
  });

router.get('/', async (req, res) => {
    const {
    startDate,
    endDate,
    type,
    minDistance,
    maxDistance,
    minElevation,
    maxElevation
    } = req.query;

    let query = `
    SELECT * FROM activities
    WHERE 1=1
    `;
    const queryParams = [];

    // Add filters based on query parameters
    if (athlete_id) {
    queryParams.push(athlete_id);
    query += ` AND athlete_id = $${queryParams.length}`
    }

    if (startDate) {
    queryParams.push(startDate);
    query += ` AND start_date >= $${queryParams.length}`;
    }

    if (endDate) {
    queryParams.push(endDate);
    query += ` AND start_date <= $${queryParams.length}`;
    }

    if (type) {
    queryParams.push(type);
    query += ` AND type = $${queryParams.length}`;
    }

    if (minDistance) {
    queryParams.push(minDistance);
    query += ` AND distance >= $${queryParams.length}`;
    }

    if (maxDistance) {
    queryParams.push(maxDistance);
    query += ` AND distance <= $${queryParams.length}`;
    }

    if (minElevation) {
    queryParams.push(minElevation);
    query += ` AND total_elevation_gain >= $${queryParams.length}`;
    }

    if (maxElevation) {
    queryParams.push(maxElevation);
    query += ` AND total_elevation_gain <= $${queryParams.length}`;
    }

    try {
    const client = await pool.connect();
    const result = await client.query(query, queryParams);
    client.release();
    res.status(200).json(result.rows);
    } catch (err) {
    console.error('Error fetching activities:', err.message);
    res.status(500).send('Server Error');
    }
});

module.exports = router