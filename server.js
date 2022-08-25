const http = require("http");
const port = 8080;

http
  .createServer((req, res) => {
    res.writeHead(201, { "content-type": "text/html" });
    res.write("<h1>Peeyush's servers yo yo banta repper</h1>");
    res.end();
  })

  .listen(port, () => {
    console.log(`node.js server port: ${port}`);
  });
