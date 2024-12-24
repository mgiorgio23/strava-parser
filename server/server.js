const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();
const { Pool } = require('pg');

app.use(express.json({limit:'50mb'}));

// Configure the connection pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'strava',
  password: 'stravadb',
  port: 5432, 
});

app.get("/", (req, res) => {
    res.json({ message: "Hello from Express!" });
  });

app.get('/users', async (req, res) => {
  try {
    const result = await pool.query(
      'Select * FROM "Users"'
    ); res.status(200).json(result.rows);
  }
  catch(err) {
    console.error(err.message);
  }
});

app.post('/users', async (req, res) => {
  
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

app.post('/activities', async (req, res) => {
  const client = await pool.connect();

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

// app.get('/activities', async (req, res) => {
//   const {
//     startDate,
//     endDate,
//     type,
//     minDistance,
//     maxDistance,
//     minElevation,
//     maxElevation
//   } = req.query;

//   let query = `
//     SELECT * FROM activities
//     WHERE 1=1
//   `;
//   const queryParams = [];

//   // Add filters based on query parameters
//   if (athlete_id) {
//     queryParams.push(athlete_id);
//     query += ` AND athlete_id = $${queryParams.length}`
//   }
//   if (startDate) {
//     queryParams.push(startDate);
//     query += ` AND start_date >= $${queryParams.length}`;
//   }

//   if (endDate) {
//     queryParams.push(endDate);
//     query += ` AND start_date <= $${queryParams.length}`;
//   }

//   if (type) {
//     queryParams.push(type);
//     query += ` AND type = $${queryParams.length}`;
//   }

//   if (minDistance) {
//     queryParams.push(minDistance);
//     query += ` AND distance >= $${queryParams.length}`;
//   }

//   if (maxDistance) {
//     queryParams.push(maxDistance);
//     query += ` AND distance <= $${queryParams.length}`;
//   }

//   if (minElevation) {
//     queryParams.push(minElevation);
//     query += ` AND total_elevation_gain >= $${queryParams.length}`;
//   }

//   if (maxElevation) {
//     queryParams.push(maxElevation);
//     query += ` AND total_elevation_gain <= $${queryParams.length}`;
//   }

//   try {
//     const client = await pool.connect();
//     const result = await client.query(query, queryParams);
//     client.release();
//     res.status(200).json(result.rows);
//   } catch (err) {
//     console.error('Error fetching activities:', err.message);
//     res.status(500).send('Server Error');
//   }
// });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});