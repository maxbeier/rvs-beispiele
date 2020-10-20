const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const validator = require('validator');

const FILENAME = 'subscribe.csv';
const TEMPLATE = 'Name, E-Mail-Adresse, Account anlegen?, Datum\n';

const escapeForCsv = (string) => string.replace(/"/g, "\"\"");

function saveData(username, email, createAccount) {
  if (!fs.existsSync(FILENAME))
    fs.writeFileSync(FILENAME, TEMPLATE);

  const now = new Date().toISOString();
  const content = `"${escapeForCsv(username)}", "${escapeForCsv(email)}", "${createAccount}", "${now}"\n`;
  fs.appendFileSync(FILENAME, content);
}

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('subscribe', {
    username: '',
    email: '',
    createAccount: false,
    usernameClass: '',
    emailClass: '',
    success: false,
  });
});

app.post('/', (req, res) => {
  // daten entgegennehmen
  const { username, email, createAccount } = req.body;
  const templateData = {
    username,
    email,
    createAccount: !!createAccount,
    success: false,
    usernameClass: '',
    emailClass: '',
  }

  // valididerung

  const isNameValid = validator.isLength(username, { min: 1, max: 32 });
  const isEmailValid = validator.isEmail(email);

  if (!isNameValid) {
    templateData.usernameClass += ' has-error';
  }

  if (!isEmailValid) {
    templateData.emailClass += ' has-error';
  }

  if (isNameValid && isEmailValid) {
    // datei anlegen (wenn nicht vorhanden)
    // daten in datei schreiben
    saveData(username, email, !!createAccount);
    // success-nachricht ausgeben
    templateData.success = true;
  }

  res.render('subscribe', templateData);
});

app.listen(3000, () => {
  console.log('Listening on port 3000.');
});
