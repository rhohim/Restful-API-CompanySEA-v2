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

    // Set keep-alive interval (every hour)
    setInterval(() => {
        db.query('SELECT 1', (err) => {
            if (err) {
                console.error('Keep-alive query failed:', err);
                handleReconnect(); // Reconnect if keep-alive fails
            } else {
                console.log('Keep-alive query sent');
            }
        });
    }, 1000 * 60 * 60); // Every hour

    return db;
}

// Initialize connection
let db = handleReconnect();

module.exports = db;
