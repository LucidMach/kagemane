const { WebSocketServer } = require("ws");

const wss = new WebSocketServer({ port: 5000 });

let ledState = false;

wss.on("connection", function connection(ws) {
  console.log("a client connected");

  ws.on("message", function message(data) {
    if (message === "toggle") {
      ledState = !ledState;
      ws.emit(ledState);
    }
  });
  ws.on("close", () => {
    console.log("client disconnected");
  });
});
