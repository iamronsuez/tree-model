import Tree from "./tree";
const gracefulShutdown = require("http-graceful-shutdown");
const express = require("express");

const values = [10, 5, 15, 6, 1, 8, 12, 18, 17];
const tree = Tree.fromValues(values);
//create express app
const app = express();

//port at which the server will run
const port = 8082;

//create end point
app.get("/", (_: any, response: any) => {
  //send 'Hi, from Node server' to client
  response.setHeader("content-type", "application/json");
  response.send(JSON.stringify(tree, null, 2));
});

//create end point
app.get("/find", (request: any, response: any) => {
  //send 'Hi, from Node server' to client
  const otherTree = Tree.fromValues([...values, 0]);

  response.setHeader("content-type", "application/json");
  response.json({
    value: request.query.value,
    result: tree.find(parseInt(request.query.value, 10)),
    tree,
    minimum: tree.minimum(),
    height: tree.height(),
    equality: tree.isEqualTo(otherTree)
  });
});

app.get("/traverse", (request: any, response: any) => {
  //send 'Hi, from Node server' to client
  response.setHeader("content-type", "application/json");
  response.json({
    order: request.query.order,
    tree: Tree.fromValues(tree.traverse(request.query.order))
  });
});

//start server and listen for the request

gracefulShutdown(
  app.listen(port, () =>
    console.log(`server is listening at http://localhost:${port}`)
  ),
  {
    development: false,
    forceExit: true,
    timeout: 60000,
    onShutdown: async function (): Promise<void> {
      console.log("closed");
      return Promise.resolve();
    }
  }
);
