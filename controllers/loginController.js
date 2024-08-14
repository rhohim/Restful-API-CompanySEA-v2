const db = require("../models/connection")
const bcrypt = require('bcrypt');
require("dotenv").config()
const jwt = require('jsonwebtoken');

const postlogin = (req,res) => {
    let substringToRemove = process.env.spassword;
    const { username, password } = req.body;
    db.query('SELECT * FROM user WHERE username = ?', [username], (err, results) => {
        if (err) {
          return res.status(500).json({ message: 'Server error' });
        }
    
        if (results.length === 0) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        const user = results[0];
        let originalString = user.password
        let pass = originalString.replace(substringToRemove, "");
        // Compare hashed password
        bcrypt.compare(password, pass, (err, match) => {
          if (err) {
            return res.status(500).json({ message: 'Server error' });
          }
    
          if (!match) {
            return res.status(401).json({ message: 'Invalid credentials' });
          } else{
            if (user) {
              const secretKey = `${username}:${password}:${new Date().getTime()}`;
              const token = jwt.sign({ userId: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
              res.json({ token });
            } else {
              res.status(401).json({ message: 'Invalid credentials' });
            }
            // res.json({ message: 'Login successful' });
          }
    
        });
      });
}

module.exports = {
    postlogin
}