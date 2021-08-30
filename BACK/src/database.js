const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

connection.connect((error) => {
    if (error) {
        console.log(`Erro na conexão com banco de dados. [${error.errno}: ${error.message}]`)
    }

    console.log(`Database ${process.env.DB_NAME} connected`);
});

module.exports = connection;