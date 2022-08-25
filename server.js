const http = require("http");
const port = 8080;

const todolist = ["cricket", "football", "baseball"];

http
  .createServer((req, res) => {
    const { method, url } = req;
    if (url === "/list") {
      if (method === "GET") {
        res.writeHead(200, { "content-type": "text/html" });
        res.write(todolist.toString());
      } else if (method === "POST") {
        let body = "";
        req
          .on("error", (err) => {
            console.error(err);
          })
          .on("data", (chunks) => {
            body = body + chunks;
          })
          .on("end", () => {
            body = JSON.parse(body);
          });
      }
    } else {
      res.writeHead(404);
    }
    res.end();
  })

  .listen(port, () => {
    console.log(`node.js server port: ${port}`);
  });
