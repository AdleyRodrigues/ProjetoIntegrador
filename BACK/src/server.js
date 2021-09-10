require('dotenv').config({ path: '.env' });

const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const server = express();

server.use(express.static('./public'));
server.use(cors({
    origin: ['http://localhost:5500', 'http://127.0.0.1:5500', 'http://localhost:5555', 'http://127.0.0.1:5555'],
    credentials: true
}));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use('/api', routes);

server.listen(process.env.SERVER_PORT, () => {
    console.log(`Server started at http://localhost:${process.env.SERVER_PORT}`);
});