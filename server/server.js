const express = require("express");
const cors = require('cors');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(cors());
app.set('view engine','ejs')

const userRouter = require('./api/users');
const activityRouter = require('./api/activities')

app.use('/users', userRouter);
app.use('/activities', activityRouter);

app.get("/", (req, res) => {
    res.json({ message: "Hello from Express!" });
  });

  if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  }

 module.exports = app





