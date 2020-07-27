require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB working'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log('App running on port', PORT);
});
