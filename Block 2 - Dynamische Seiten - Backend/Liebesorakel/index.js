const express = require('express');

const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs'); // views sind vom typ "ejs"
app.set('views', 'views'); // … und liegen im ordner "views"

const getCharValue = (string = '') =>
  string.split('').reduce((sum, c) => sum + c.charCodeAt(), 0);

const getScore = (stringA, stringB) => {
  const scores = [getCharValue(stringA), getCharValue(stringB)].sort();
  return scores[0] > 0 && scores[1] > 0
    ? ((scores[0] / scores[1]) * 100).toFixed()
    : 0;
};

function getStatement(score) {
  switch (true) {
    case score > 90:
      return 'Ihr seid ein Traumpaar.';
    case score > 70:
      return 'Einen Versuch ist es wert.';
    case score > 50:
      return 'Naja…';
    case score > 30:
      return 'Wird wohl nichts.';
    default:
      return 'Lasst es lieber!';
  }
}

app.get('/', (req, res) => {
  const { name_du, name_schatzi } = req.query;

  if (!name_du || !name_schatzi) {
    return res.render('liebesorakel', {
      name_du: '',
      name_schatzi: '',
      score: null,
    });
  }

  const score = getScore(name_du, name_schatzi);

  res.render('liebesorakel', {
    name_du,
    name_schatzi,
    score,
    statement: getStatement(score),
  });
});

app.listen(3000, () => {
  console.log('Listening on port 3000.');
});
