const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const defaultProducts = require('./product-data.js');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

let products = [...defaultProducts];

// Alle Produkte lesen
app.get('/', (req, res) => {
  res.send({ sucess: true, data: products });
});

// Ein Produkt lesen
app.get('/:id', (req, res) => {
  const id = req.params.id;
  const product = products.find(product => product.id === id);
  if (!product) return res.sendStatus(404);
  res.send({ sucess: true, data: product });
});

// Produkt anlegen
app.post('/', (req, res) => {
  const id = uuidv4();
  const timestamp = new Date().toISOString();
  const product = { id, timestamp, ...req.body };
  products.push(product);
  res.send({ sucess: true, data: product });
});

// Produkt (teilweise) ändern
app.patch('/:id', (req, res) => {
  const id = req.params.id;
  const index = products.findIndex(product => product.id === id);
  if (!index) return res.sendStatus(404);
  products[index] = { ...products[index], ...req.body };
  res.send({ sucess: true, data: products[index] });
});

// Produkt löschen
app.delete('/:id', (req, res) => {
  const id = req.params.id;
  products = products.filter(product => product.id !== id);
  res.send({ sucess: true });
});

// Server starten
app.listen(3001, () => {
  console.log('Listening on port 3001.');
});
