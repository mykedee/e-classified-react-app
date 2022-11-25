const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./db');

const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');
const errorHandler = require('./middleware/error');

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/v1', authRoutes);
app.use('/api/v1', productRoutes);
app.use('/api/v1', categoryRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 2101;

app.listen(PORT, console.log(`app running on ${PORT}`));
