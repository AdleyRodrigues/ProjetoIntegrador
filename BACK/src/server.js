require('dotenv').config({ path: '.env' });
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const server = express();
const session = require('express-session');

server.use(session({
    secret: 'my key cookie',
    saveUninitialized: true,
    resave: true,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 // 1 hora
    },
}));

server.use(cors({
    origin: [
        'http://localhost:5500',
        'https://localhost:5500',
        'http://127.0.0.1:5500',
        'https://127.0.0.1:5500'
    ],
    credentials: true
}));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use('/api', routes);

server.listen(process.env.SERVER_PORT, () => {
    console.log(`Server started at http://localhost:${process.env.SERVER_PORT}`);
});