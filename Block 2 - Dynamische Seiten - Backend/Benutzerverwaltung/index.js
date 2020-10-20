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
const generateToken = () => crypto.randomBytes(32).toString('hex');

app.use((req, res, next) => {
  req.user = sessions[req.cookies.session];
  next();
});

// Debugging Routes
// app.get('/users', (req, res) => {
//   res.send(users);
// });
// app.get('/sessions', (req, res) => {
//   res.send(sessions);
// });


app.get('/', (req, res) => {
  if (!req.user) return res.redirect('/login');
  res.render('secret', { user: req.user });
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/register', (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const { email, password } = req.body;

  argon2.hash(password).then((hash) => {
    console.log(`Created Argon2 hash ${hash} for user ${email}:${password}`);
    users[email] = hash;
    res.redirect('/login');
  });
});

app.post('/login', (req, res) => {
  if (!req.body) return res.sendStatus(400);
  if (!users[req.body.email]) return res.sendStatus(401);

  const { email, password } = req.body;

  const hash = users[email];

  argon2
    .verify(hash, password)
    .then((isCorrect) => {
      if (!isCorrect) throw new Error('wrong password');

      console.log('Correct password supplied!');
      const session = generateToken();
      sessions[session] = email;
      res.cookie('session', session, {
        expires: 0,
        httpOnly: true /*secure: true*/,
      });
      return res.redirect('/');
    })
    .catch((err) => {
      console.log('Invalid password supplied!', err);
      res.sendStatus(401);
    })
});

app.listen(3000, () => {
  console.log('Listening on port 3000.');
});
