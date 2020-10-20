const express = require('express');

const app = express();
app.set('view engine', 'ejs'); // views sind vom typ "ejs"
app.set('views', 'views'); // … und liegen im ordner "views"

/*
  HIER CODE EINFÜGEN

  - route definieren
  - werte entegegen nehmen
  - werte verrechnen
  - template rendern

 */

app.listen(3000, () => {
  console.log('Listening on port 3000.');
});
