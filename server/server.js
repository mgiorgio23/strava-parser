const express = require("express");
const cors = require('cors');

// require('dotenv').config();
const PORT = process.env.PORT || 3001;

const app = express();
const { Pool } = require('pg');

app.use(express.json({limit:'50mb'}));
app.use(cors());
app.set('view engine','ejs')

const userRouter = require('./api/users');
const activityRouter = require('./api/activities')

// Configure the connection pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'strava',
  password: 'stravadb',
  port: 5432, 
});

app.use('/users', userRouter);
app.use('/activities', activityRouter);

app.get("/", (req, res) => {
    res.json({ message: "Hello from Express!" });
  });

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});






