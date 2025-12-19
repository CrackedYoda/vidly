import express from 'express';
import connectdb from './db/connectdb.js';
import route from './routes/route.js';
import cookieParser from 'cookie-parser';

const app = express();
const port = process.env.PORT || 4000;

// Connect to database
connectdb();

// Middleware - MUST be before routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Routes
app.use(route);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start server
app.listen(port, () => {
  console.log(`App running on port ${port}`);
  console.log(`Environment: ${app.get("env")}`);
});