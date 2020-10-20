const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(cookieParser('ein geheimnis')); // geheimnis definieren

app.use((req, res, next) => {
  req.trackingId = req.cookies.trackingId;

  if (!req.trackingId) {
    const trackingId = Date.now().toString(32);
    res.cookie('trackingId', trackingId);
    req.trackingId = trackingId;
  }

  next();
});

app.get('/', (req, res) => {
  const name = req.signedCookies.name;
  res.send(`Hallo ${name}, wir tracken dich unter ${req.trackingId}`);
});

app.get('/login', (req, res) => {
  res.send('<form action="/login" method="POST">Login: <input name="name"></form>');
});

app.post('/login', (req, res) => {
  res.cookie('name', req.body.name, { signed: true });
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('Listening on port 3000.');
});
