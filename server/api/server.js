const express = require("express");
const cors = require('cors');
const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();
const allowedOrigins = [
  'https://strava-client.vercel.app',
  'http://localhost:3000',
  'http://localhost:3001'
];

app.use(express.json());
app.use(cors());
// app.use(cors({
//   origin: function (origin, callback) {
//     // Allow requests with no origin (like mobile apps or curl requests)
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials:true,
//   optionSuccessStatus:200
// }));
app.options('*', cors());
app.set('view engine','ejs')

const userRouter = require('./users');
const activityRouter = require('./activities')
const analysisRouter = require('./analyze')

app.use('/users', userRouter);
app.use('/activities', activityRouter);
app.use('/analyze', analysisRouter);

const _dirname = path.dirname("");
const buildPath = path.join(_dirname, "../../client/build");
app.use(express.static(buildPath));

app.get("/*", function (req, res) {
  res.sendFile(
    path.join(__dirname, "../../client/build/index.html"),
    function(err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  )});

  // if (process.env.NODE_ENV !== 'production') {
  //   app.listen(PORT, () => {
  //     console.log(`Server listening on port ${PORT}`);
  //   });
  // };
app.listen(PORT, () => console.log("Listening to port " + PORT));
module.exports = app





