const ip = require("ip");
const { spawn } = require("child_process");
const { WebSocketServer } = require("ws");

const pingIP = require("./pingIP");

// updating DB
const botID = "rPI0"
pingIP(botID, ip.address())

// creating a secure websocketserver
const wss = new WebSocketServer({ port: 5000 });

wss.on("connection", function connection(ws) {
  console.log("a client connected");

  ws.on("message", function message(data) {
    const msg = JSON.parse(data.toString()) // expects {"angle":0..180}
    if (msg.angle) {
      console.log(msg.angle);
      const py = spawn("python", ["servo.py", msg.angle]);
    }
  });
  ws.on("close", () => {
    console.log("client disconnected");
  });
});