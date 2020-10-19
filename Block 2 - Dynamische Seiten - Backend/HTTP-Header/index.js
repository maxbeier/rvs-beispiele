const http = require('http');

function handler (req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end(`
    <h1>Hello World ${new Date().toLocaleString()}</h1>
    <p>Sorry, ${req.url} gibt es nicht.</p>
  `);
};

const server = http.createServer(handler);

server.listen(3000, () => console.log('Server started'));
