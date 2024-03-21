require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./index');

const DB_URL = process.env.MONGO_URI;

mongoose
  .connect(DB_URL)
  .then((data) => {
    console.log('DB connected');
  })
  .catch((err) => {
    console.log(err, 'DB not connected');
  });

const port = process.env.PORT || 4000;

app.listen(port, (err) => {
  if (err) console.log(err, 'Server not running');
  else console.log(`Server running on port ${port}`);
});
