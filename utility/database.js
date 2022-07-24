const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database:'node-app',
    password:'umit',
});

//sorgular database'e asyncron olarak gönderilir database bize bir promise gönderir

module.exports = connection.promise();