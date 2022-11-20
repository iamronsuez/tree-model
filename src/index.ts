import Tree from "./Tree";
const gracefulShutdown = require("http-graceful-shutdown");
const express = require("express");

const values = [20, 10, 30, 6, 21, 4, 3, 8];
const tree = Tree.fromValues([7, 4, 9, 1, 6, 8, 10]);

//create express app
const app = express();

//port at which the server will run
const port = 8082;

//create end point
app.get("/", (_: any, response: any) => {
  //send 'Hi, from Node server' to client
  response.setHeader("content-type", "application/json");
  response.json({
    tree,
    minimum: tree.minimum(),
    height: tree.height(),
    valid: tree.isValid(),
    //levelOrder Traversal
    nodesAtHeight: {
      0: tree.nodesAt(0),
      1: tree.nodesAt(1),
      2: tree.nodesAt(2),
      3: tree.nodesAt(3),
      4: tree.nodesAt(4),
      100: tree.nodesAt(100),
    },
  });
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
    valid: tree.isValid(),
    equality: tree.isEqualTo(otherTree),
  });
});

app.get("/traverse", (request: any, response: any) => {
  //send 'Hi, from Node server' to client
  response.setHeader("content-type", "application/json");
  response.json({
    order: request.query.order,
    tree: Tree.fromValues(tree.traverse(request.query.order)),
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
    },
  }
);
