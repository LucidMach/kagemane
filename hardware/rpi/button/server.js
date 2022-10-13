const ip = require("ip");
const {exec} = require("child_process")
const { WebSocketServer } = require("ws");

const pingIP = require("./pingIP");

// updating DB
const botID = "rPI0"
pingIP(botID, ip.address())

let ledState = false;

// creating a secure websocketserver
const wss = new WebSocketServer({ port: 5000 });

wss.on("connection", function connection(ws) {
  console.log("a client connected");

  ws.on("message", function message(data) {
    const msg = data.toString()

    if (msg === "toggle") {
      ledState = !ledState;
      ws.emit(ledState);
      exec(`echo ${ledState ? 1 : 0} |sudo tee /sys/class/leds/led0/brightness`)
    }
  });
  ws.on("close", () => {
    console.log("client disconnected");
  });
});
