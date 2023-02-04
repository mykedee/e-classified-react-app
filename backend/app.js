const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./db');
const cookieParser = require('cookie-parser')

const dotenv = require('dotenv');
dotenv.config();
connectDB();


const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');
const shopRoutes = require('./routes/shop');
// const errorHandler = require('./middleware/error');


const app = express();

app.use(cors());
app.use(cookieParser())
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/v1', authRoutes);
app.use('/api/v1', productRoutes);
app.use('/api/v1', categoryRoutes);
app.use('/api/v1', shopRoutes);

// app.use(errorHandler);

const PORT = process.env.PORT || 2101;

app.listen(PORT, console.log(`app running on ${PORT}`));
