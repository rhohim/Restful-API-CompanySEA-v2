// const mysql = require('mysql2')
// require('dotenv').config()

// const db = mysql.createConnection({
//     host : process.env.host,
//     user : process.env.user,
//     password : process.env.password,
//     database : process.env.database
// })

// module.exports = db

const mysql = require('mysql2');
require('dotenv').config();

const MAX_TIMEOUT = 2147483; // Maximum timeout value in seconds (~24 days)

function createConnection() {
    const db = mysql.createConnection({
        host: process.env.host,
        user: process.env.user,
        password: process.env.password,
        database: process.env.database
    });

    // Handle errors and reconnection
    db.on('error', function (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Connection lost, reconnecting...');
            handleReconnect();
        } else {
            throw err;
        }
    });

    return db;
}

function handleReconnect() {
    const db = createConnection();
    
    // Set keep-alive interval
    setInterval(() => {
        db.query('SELECT 1', (err) => {
            if (err) throw err;
            console.log('Keep-alive query sent');
        });
    }, MAX_TIMEOUT * 1000 - 1000); // Send query just before the max timeout

    return db;
}

// Initialize connection
let db = handleReconnect();

module.exports = db;
