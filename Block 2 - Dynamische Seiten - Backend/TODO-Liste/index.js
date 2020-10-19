const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('todos.db', main);

function initTable() {
  db.run(`CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT,
    isComplete INTEGER DEFAULT 0
  )`);
}

function createTodo(text) {
  db.run('INSERT INTO todos (text) VALUES (?)', [text]);
}

function finishTodo(id) {
  db.run('UPDATE todos SET isComplete = 1 WHERE id = ?', [id]);
}

function listTodos() {
  db.all('SELECT * from todos', (err, rows) => {
    if (err || !rows || !rows.length === 0) return;
    rows.forEach(todo => console.log(`- [${ todo.isComplete ? 'x' : ' '}] ${todo.id}: ${todo.text}`))
  });
}

function main() {
  db.serialize(() => {
    initTable();

    const [node, script, command, ...rest] = process.argv;

    const params = rest.join(' ');

    if (command === 'add') {
      createTodo(params);
      listTodos();
    }
    else if (command === 'finish') {
      finishTodo(params)
      listTodos();
    }
    else if (command === 'list') {
      listTodos();
    }
    else {
      console.log('Befehle: add <text>, finish <id>, list');
    }

    db.close();
  });

}
