const express = require('express');
const morgan = require('morgan');
const categoryRouter = require('./routes/categoryRoutes');
const productRouter = require('./routes/productRoutes');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/products', productRouter);

module.exports = app;
