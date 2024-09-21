require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const fullTimeJobsRoute = require('./routes/jobsRoute');
const connectDB = require('./db/connection')

const app = express();
const PORT = process.env.PORT || 3000;

connectDB(); 
app.use(cors());

// Middleware 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
// routes
app.use('/api', authRoutes);
app.use('/jobs', fullTimeJobsRoute);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
