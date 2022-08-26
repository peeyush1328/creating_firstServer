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
        console.log(todolist);
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
            let newtodo = todolist;
            newtodo.push(body.item);
            console.log(newtodo);
            res.writeHead(201);
          });
      } else if (method === "DELETE") {
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
            let deletethis = body.item;
            todolist.find((element, index) => {
              if (element === deletethis) {
                todolist.splice(index, 1);
              }
            });
            // for (let i = 0; i < todolist.length; i++) {
            //   if (todolist[i] === deletethis) {
            //     todolist.splice(i, 1);
            //   }
            // }
            res.writeHead(201);
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
