const express = require('express');

const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs'); // views sind vom typ "ejs"
app.set('views', 'views'); // … und liegen im ordner "views" (default)

// nur authentifizierte Benutzer durchlassen
function onlyAuthenticated(req, res, next) {
  if (req.query.valid)
    next();
  else
    res.sendStatus(403);
}

// Wird zu Beginn jeder Anfrage ausgeführt und speichert die Startzeit
app.use((req, res, next) => {
  console.log('Starte Zeitmessung...');
  req.requestTime = Date.now();
  next();
});

// app.use((req, res, nextKannAuchAndersHeissen) => {
//   console.log('before');
//
//   if (req.requestTime % 2 === 0) {
//     console.log('NEIN!');
//     return;
//   }
//
//   nextKannAuchAndersHeissen();
// });

/*
  TODO
  künstliche Verzögerung einbauen
 */

app.get('/', (req, res, next) => {
  if (req.query.suche)
    res.send(`Sie haben um ${req.requestTime} nach
      <strong>${req.query.suche}</strong> gesucht.`);
  else
    res.send(`
      <link rel="stylesheet" href="/style.css">
      <label>Suche</label>
      <form action="/" method="GET">
        <input name="suche">
      </form>
    `);
  next();
});

app.get('/secret', onlyAuthenticated, (req, res, next) => {
  res.send('Nur du bist würdig, diese Seite zu sehen.')
});

// Behandelt HTTP POST auf `/`
app.post('/', (req, res, next) => {
  res.send('Danke für das Formular!');
  next();
});

// Behandelt HTTP GET auf `/header` und gibt JSON zurück
app.get('/header', (req, res, next) => {
  res.render('headers', { username: 'Alice', headers: req.headers });
  next();
});

// Middleware die nachträglich ausgeführt wird
// Berechnet die Zeit von Beginn der Anfrage bis Ende
app.use((req, res, next) => {
  console.log(`Bearbeitung dauerte ${Date.now() - req.requestTime} ms.`);
  next();
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
