const crypto = require('crypto');
const argon2 = require('argon2');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'ejs'); // views sind vom typ "ejs"
app.set('views', 'views'); // … und liegen im ordner "views"
app.use(cookieParser()); // cookies sollen vorberarbeitet werden
app.use(bodyParser.json()); // … und formularinhalte auch
app.use(bodyParser.urlencoded({ extended: false })); // … und formularinhalte auch

// map aller user (anfänglich keine)
const users = {};

// map aller sessions und deren user (anfänglich keine)
const sessions = {};

// generiert eine zufällige zeichenkette
const generateToken = () => crypto.randomBytes(16).toString('hex');

/*
  HIER CODE EINFÜGEN
 */

app.listen(3000, () => {
  console.log('Listening on port 3000.');
});
