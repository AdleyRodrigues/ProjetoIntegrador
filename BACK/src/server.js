require('dotenv').config({ path: '.env' });
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use('/api', routes);

server.listen(process.env.PORT, () => {
    console.log(`Server started at http://localhost:${process.env.PORT}`);
});