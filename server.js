require('dotenv').config('./.env');
const mongoose = require('mongoose');
const app = require('./app');

const DB_STRING = process.env.DB_URL.replace(
  '<PASSWORD>',
  process.env.DB_PASSWORD
);

mongoose
  .connect(DB_STRING, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB working'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('App running on port', PORT);
});
