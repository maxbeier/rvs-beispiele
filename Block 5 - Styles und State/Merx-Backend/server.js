const crypto = require('crypto');
const argon2 = require('argon2');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const products = require('./products.json');

const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const users = {
  'max.beier@finnoconsult.at':
    '$argon2i$v=19$m=4096,t=3,p=1$9eqgtr3IgF8t/NtplKy34g$vMsINw0RdTyfUtvc/YFP4v1fBIjWvA9XR2KyDBqVwZE',
};
const sessions = {};
const dummyDescription = `<p>Der Akku-Bohrschrauber für exakte Bohr- und Schraubarbeiten mit zwei Akkus (Li-Ion 14,4 V / 1,3 Ah) inklusive. Der Akku-Bohrschrauber verfügt über ein staubgeschütztes 2-Gang-Planetengetriebe mit Metallzahnrädern und eine Motorbremse. Der rutschfeste Handgriff mit eingelegtem Gummipolster sorgt für ein sicheres Arbeiten.</p>\n\n<ul>\n\n<li>\nLeerlaufdrehzahl 1. Gang / 2. Gang: 0 - 400 U/min / 0 - 1.300 U/min</li>\n<li>\nDrehmoment hart / weich: 36 / 20 Nm</li>\n<li>\nBohrfutterspannweite: 0,8 - 10 mm</li>\n<li>\nBohrleistung Stahl: 10 mm</li>\n<li>\nBohrleistung Holz: 25 mm</li>\n<li>\nAkku: Li-Ion 14,4 V / 1,3 Ah</li>\n<li>\nAnzahl Akkus: 2 Stk.</li>\n<li>\nGewicht: 1,4 kg</li>\n<li>\nZubehör: Koffer, Ladegerät, Schnellspannbohrfutter</li>\n<li>\nTipp: Akkuwerkzeuge sollten geschützt vor Umwelteinflüssen wie Feuchtigkeit und Staub bei Raumtemperatur gelagert werden. Zu hohe Temperaturen können die Lebensdauer des Akkus beeinträchtigen.</li></ul>`;

const generateToken = () => crypto.randomBytes(16).toString('hex');
const generateReleated = (id = 0) =>
  [-3, -2, 0, 1].map((offset) => ((id + offset + products.length) % products.length) + 1 + '');

// künstliche Verzögerung für alle Anfragen
app.use((req, res, next) => setTimeout(next, 1000));

app.use((req, res, next) => {
  req.user = sessions[req.cookies.session];
  next();
});

// Nutzeraccount anlegen
app.post('/register', (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const { email, password } = req.body;

  argon2.hash(password).then((hash) => {
    users[email] = hash;
    res.send({ success: true, data: email });
  });
});

// Nutzer einloggen
app.post('/login', (req, res) => {
  console.log('login', req.body);
  if (!req.body) return res.status(400).send({ success: false, error: 'insufficient data provided' });
  if (!users[req.body.email]) return res.status(401).send({ success: false, error: 'wrong email or password' });

  const { email, password } = req.body;
  const hash = users[email];

  argon2
    .verify(hash, password)
    .then((isCorrect) => {
      if (!isCorrect) throw new Error('wrong email or password');
      const session = generateToken();
      sessions[session] = email;
      res.cookie('session', session, {
        expires: 0,
        httpOnly: true /*secure: true*/,
      });
      return res.send({ success: true, data: { email, name: 'Max Muster' } });
    })
    .catch((err) => {
      res.status(401).send({ success: false, error: err.message });
    });
});

// Nutzer ausloggen
app.get('/logout', (req, res) => {
  console.log(`logout user ${req.user} / session ${req.cookies.session}`);
  delete sessions[req.cookies.session];
  res.clearCookie('session');
  res.send({ success: true });
});

// Alle Produkte lesen
app.get('/products', (req, res) => {
  const data = products.slice(0, 10); // nur erste 10
  res.send({ success: true, data });
});

// Ein Produkt lesen
app.get('/products/:id', (req, res) => {
  const id = req.params.id;
  const product = products.find((product) => product.id === id);
  if (!product) return res.sendStatus(404);
  const data = { ...product, bodyHtml: dummyDescription, related: generateReleated(+id) };
  res.send({ success: true, data });
});

// Produkt anlegen
app.post('/products', (req, res) => {
  const id = uuidv4();
  const timestamp = new Date().toISOString();
  const product = { id, timestamp, ...req.body };
  products.push(product);
  res.send({ success: true, data: product });
});

// Server starten
app.listen(3001, () => {
  console.log('Listening on port 3001.');
});
