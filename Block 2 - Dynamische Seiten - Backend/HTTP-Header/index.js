const http = require('http');

function handler (req, res) {
  res.statusCode = 200;

  if (req.url === '/header') {
    res.setHeader('Content-Type', 'text/plain');
    return res.end(JSON.stringify(req.headers, null, 2));
  }

  res.setHeader('Content-Type', 'text/html');
  res.end(`
    <h1>Hello World ${new Date().toLocaleString()}</h1>
    <p>Sorry, ${req.url} gibt es nicht.</p>
    <p>Die Anfrage kam per ${req.method}</p>
    <p>Deine IP ist ${req.connection.remoteAddress}</p>
  `);
};

const server = http.createServer(handler);

server.listen(3000, () => console.log('Server started'));
