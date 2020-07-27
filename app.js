const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const userRouter = require('./routes/userRoutes');
const loginRouter = require('./routes/loginRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const productRouter = require('./routes/productRoutes');

const app = express();

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/login', loginRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/products', productRouter);

module.exports = app;
