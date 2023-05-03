require('dotenv').config({ path: './config.env' });
//rea;
const db = require('./db/config');
const express = require('express');

const port = process.env.port || 8080;

app = express();

app.use(express.json());

app.use('/api', require('./routes/routes.js'));

app.listen(port, () => console.log(`Server running on port ${port}`));
